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

    // Check minimum photo requirement
    if (formData.villaPhotos.length < 2) {
      errors.photos = 'At least 2 photos are required';
    }

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
      // Show specific validation errors
      const errorMessages = Object.values(validation.errors);
      setSubmitError(errorMessages.join('; '));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload files first if any
      let uploadedFileIds: number[] = [];
      if (formData.villaPhotos.length > 0) {
        uploadedFileIds = await uploadFiles(formData.villaPhotos);
      }

      // Prepare data for API route
      const submitData = {
        intent,
        formData: {
          ...formData,
          villaPhotos: uploadedFileIds, // Use actual file IDs from upload
        }
      };

      const response = await fetch('/api/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle different error formats from Strapi
        let errorMessage = result.error || "Failed to submit form";

        if (result.details?.errors) {
          if (Array.isArray(result.details.errors)) {
            // Handle array format: [{ path: [...], message: "...", ... }]
            const fieldErrors = result.details.errors.map((err: any) => {
              const fieldName = err.path?.[0] || 'unknown field';
              // Clean up the error message by removing regex patterns
              let cleanMessage = err.message || '';

              // Remove regex pattern from message for user-friendliness
              cleanMessage = cleanMessage.replace(/ must match the following: "\/[^"]*\/?"/, ' has invalid format');
              // Remove the field name from the beginning of the message if it exists
              cleanMessage = cleanMessage.replace(new RegExp(`^${fieldName}\\s*`), '');
              // Clean up any remaining escaped quotes
              cleanMessage = cleanMessage.replace(/"/g, '');

              // Convert field names to user-friendly labels
              const fieldLabels: Record<string, string> = {
                'phone_number': 'Phone Number',
                'maps_long_lat': 'Location Pin',
                'email_address': 'Email',
                'first_name': 'First Name',
                'last_name': 'Last Name',
                'property_address': 'Property Address'
              };

              const friendlyField = fieldLabels[fieldName] || fieldName.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

              return `${friendlyField}: ${cleanMessage}`;
            });

            errorMessage = fieldErrors.map((err: string) => `• ${err}`).join('\n');
          } else if (typeof result.details.errors === 'object') {
            // Handle object format: { field: [messages] }
            const fieldErrors = Object.entries(result.details.errors).map(([field, messages]) => {
              const fieldLabels: Record<string, string> = {
                'phone_number': 'Phone Number',
                'maps_long_lat': 'Location Pin',
                'email_address': 'Email',
                'first_name': 'First Name',
                'last_name': 'Last Name',
                'property_address': 'Property Address'
              };

              const friendlyField = fieldLabels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
              const message = Array.isArray(messages) ? messages.join(', ') : messages;

              return `${friendlyField}: ${message}`;
            });

            errorMessage = fieldErrors.join('; ');
          }
        }

        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, formData, intent, uploadFiles]);

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
