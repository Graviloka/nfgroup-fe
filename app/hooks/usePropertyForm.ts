import { useState, useMemo, useCallback } from 'react';
import { PropertyFormData, PropertyIntent, FormValidationResult } from '../types/forms';
import { initialFormState, requiredFields, allPropertyTypeOptions, rentalDurationOptions, saleTenureOptions } from '../constants/forms';
import { API_ENDPOINTS, API_HEADERS } from '../constants/api';
import { useFileUpload } from './useFileUpload';

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

export function usePropertyForm() {
  const [intent, setIntent] = useState<PropertyIntent>("rent");
  const [formData, setFormData] = useState<PropertyFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { uploadFiles, validateAndProcessFiles, isUploading } = useFileUpload();

  const propertyTypeOptions = useMemo(() => {
    if (intent === "rent") {
      return allPropertyTypeOptions.filter(
        (option) => option.value === "villa" || option.value === "townhouse" || option.value === "apartment"
      );
    }
    return allPropertyTypeOptions;
  }, [intent]);

  const tenureOptions = intent === "rent" ? rentalDurationOptions : saleTenureOptions;
  const priceLabel = intent === "rent" ? "Rental Price (IDR)" : "Listing Price (IDR)";
  const tenureLabel = intent === "rent" ? "Rental Type" : "Tenure";

  const updateField = useCallback(<K extends keyof PropertyFormData>(field: K, value: PropertyFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleIntentChange = useCallback((value: PropertyIntent) => {
    setIntent(value);
    setFormData((prev) => ({
      ...prev,
      rentDuration: value === "rent" ? "monthly" : prev.rentDuration,
      tenure: "",
      leaseYears: "",
      buildingPermits: "",
      price: "",
      managedByCompany: "",
      companyName: "",
      pricePeriod: "monthly",
      villaPhotos: [],
    }));
  }, []);

  const validateForm = useCallback((): FormValidationResult => {
    const errors: Record<string, string> = {};

    // Check required fields
    requiredFields.forEach((field) => {
      const value = formData[field];
      if (typeof value === "string" && value.trim().length === 0) {
        errors[field] = `${field} is required`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [formData]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const { validFiles, errors } = validateAndProcessFiles(files);

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        villaPhotos: [...prev.villaPhotos, ...validFiles].slice(0, 11), // Max 10 images + 1 video
      }));
    }
  }, [validateAndProcessFiles]);

  const removeFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      villaPhotos: prev.villaPhotos.filter((_, i) => i !== index),
    }));
  }, []);

  const createPayload = useCallback(async (): Promise<SalePayload | RentPayload> => {
    let uploadedFileIds: number[] = [];

    if (formData.villaPhotos.length > 0) {
      uploadedFileIds = await uploadFiles(formData.villaPhotos);
    }

    if (intent === "sale") {
      const payload: SalePayload = {
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
          villa_photos: uploadedFileIds.length > 0 ? uploadedFileIds : null,
        }
      };
      return payload;
    } else {
      const payload: RentPayload = {
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
          villa_photos: uploadedFileIds.length > 0 ? uploadedFileIds : null,
        }
      };
      return payload;
    }
  }, [formData, intent, uploadFiles]);

  const submitForm = useCallback(async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = await createPayload();
      const endpoint = intent === "sale" ? API_ENDPOINTS.SALE : API_ENDPOINTS.RENT;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, createPayload, intent]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setIntent("rent");
    setIsSubmitted(false);
    setSubmitError(null);
  }, []);

  const isSubmitDisabled = useMemo(() => {
    return requiredFields.some((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim().length === 0 : !value;
    }) || isSubmitting || isUploading;
  }, [formData, isSubmitting, isUploading]);

  return {
    // State
    intent,
    formData,
    isSubmitting,
    isSubmitted,
    submitError,
    isUploading,

    // Computed values
    propertyTypeOptions,
    tenureOptions,
    priceLabel,
    tenureLabel,
    isSubmitDisabled,

    // Actions
    updateField,
    handleIntentChange,
    handleFileUpload,
    removeFile,
    submitForm,
    resetForm,
  };
}
