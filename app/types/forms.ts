export type PropertyIntent = "rent" | "sale";

export interface PropertyFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Property Details
  propertyAddress: string;
  locationPin: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  buildingSize: string;
  landSize: string;
  propertyDescription: string;

  // Sale/Rent Specific
  rentDuration: string;
  tenure: string;
  leaseYears: string;
  buildingPermits: string;
  price: string;
  managedByCompany: string;
  companyName: string;
  pricePeriod: string;

  // Media
  villaPhotos: File[];
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface PropertyTypeOption {
  label: string;
  value: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
