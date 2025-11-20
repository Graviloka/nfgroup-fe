import { PropertyTypeOption, SelectOption } from '../types/forms';

export const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  propertyAddress: "",
  locationPin: "",
  propertyType: "villa",
  bedrooms: "1",
  bathrooms: "1",
  buildingSize: "",
  landSize: "",
  propertyDescription: "",
  rentDuration: "",
  tenure: "",
  leaseYears: "",
  buildingPermits: "",
  price: "",
  managedByCompany: "",
  companyName: "",
  pricePeriod: "monthly",
  villaPhotos: [],
};

export const allPropertyTypeOptions: PropertyTypeOption[] = [
  { label: "Villa", value: "villa" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Apartment", value: "apartment" },
  { label: "Land", value: "land" },
  { label: "Other", value: "other" },
];

export const rentalDurationOptions: SelectOption[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export const saleTenureOptions: SelectOption[] = [
  { label: "Freehold (SHM)", value: "freehold_shm" },
  { label: "Leasehold", value: "leasehold" },
  { label: "HGB (Company Title)", value: "hgb" },
  { label: "Right of Use (Hak Pakai)", value: "hak_pakai" },
];

export const buildingPermitOptions: SelectOption[] = [
  { label: "IMG / PBG", value: "img_pbg" },
  { label: "SLF", value: "slf" },
  { label: "None", value: "none" },
];

export const managedByCompanyOptions: SelectOption[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const pricePeriodOptions: SelectOption[] = [
  { label: "Per Month", value: "monthly" },
  { label: "Per Year", value: "yearly" },
];

export const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "propertyAddress",
] as const;
