import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '../../constants/api';

interface SalePayload {
  data: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    property_address: string;
    maps_long_lat: string;
    property_type: string;
    bedroom_number: number;
    bathroom_number: number;
    building_size: number;
    land_size: number;
    property_description: string | null;
    tenure: string;
    remaining_lease: number;
    building_permits: string;
    listing_price: number;
    villa_photos: number[] | null;
  };
}

interface RentPayload {
  data: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    property_address: string;
    maps_long_lat: string;
    property_type: string;
    bedroom_number: number;
    bathroom_number: number;
    building_size: number;
    land_size: number;
    property_description: string | null;
    rental_type: string;
    managed_property: boolean;
    company_name: string | null;
    rental_price: number;
    rental_period: string;
    villa_photos: number[] | null;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { intent, formData } = body;

    if (!intent || !formData) {
      return NextResponse.json(
        { error: 'Missing required fields: intent and formData' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'propertyAddress'];
    const missingFields = requiredFields.filter(field => !formData[field] || (typeof formData[field] === 'string' && formData[field].trim().length === 0));

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create payload based on intent
    let payload: SalePayload | RentPayload;

    if (intent === "sale") {
      payload = {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email_address: formData.email,
          phone_number: formData.phone,
          property_address: formData.propertyAddress,
          maps_long_lat: formData.locationPin,
          property_type: formData.propertyType,
          bedroom_number: parseInt(formData.bedrooms) || 0,
          bathroom_number: parseInt(formData.bathrooms) || 0,
          building_size: parseInt(formData.buildingSize) || 0,
          land_size: parseInt(formData.landSize) || 0,
          property_description: formData.propertyDescription || null,
          tenure: formData.tenure,
          remaining_lease: parseInt(formData.leaseYears) || 0,
          building_permits: formData.buildingPermits,
          listing_price: parseInt(formData.price) || 0,
          villa_photos: formData.villaPhotos || null,
        }
      };
    } else {
      payload = {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email_address: formData.email,
          phone_number: formData.phone,
          property_address: formData.propertyAddress,
          maps_long_lat: formData.locationPin,
          property_type: formData.propertyType,
          bedroom_number: parseInt(formData.bedrooms) || 0,
          bathroom_number: parseInt(formData.bathrooms) || 0,
          building_size: parseInt(formData.buildingSize) || 0,
          land_size: parseInt(formData.landSize) || 0,
          property_description: formData.propertyDescription || null,
          rental_type: formData.rentDuration,
          managed_property: formData.managedByCompany === "yes",
          company_name: formData.managedByCompany === "yes" ? formData.companyName : null,
          rental_price: parseInt(formData.price) || 0,
          rental_period: formData.pricePeriod,
          villa_photos: formData.villaPhotos || null,
        }
      };
    }

    // Make API call to Strapi
    const endpoint = intent === "sale" ? API_ENDPOINTS.SALE : API_ENDPOINTS.RENT;

    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.API_AUTH_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchError) {
      console.error('Network error calling Strapi:', fetchError);
      return NextResponse.json(
        {
          error: 'Network error: Unable to connect to backend service',
          details: { fetchError: fetchError instanceof Error ? fetchError.message : 'Unknown network error' },
          status: 503
        },
        { status: 503 }
      );
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        errorData = { error: { message: `HTTP ${response.status}: ${response.statusText}` } };
      }

      console.error('Strapi API Error:', errorData);

      // Pass through detailed error information
      return NextResponse.json(
        {
          error: errorData.error?.message || `Request failed with status ${response.status}`,
          details: errorData.error?.details || errorData,
          status: response.status
        },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
