"use client";

const API_ENDPOINT_SALE = "https://nfgroup.hopbackend.gravitasi.net/api/villa-for-sales";
const API_ENDPOINT_RENT = "https://nfgroup.hopbackend.gravitasi.net/api/villa-for-rents";

import { FormEvent, useMemo, useState } from "react";

import { ContactIcon, PropertyIcon, RentIcon, MediaIcon, UploadIcon } from "../components/Icons";

type PropertyIntent = "rent" | "sale";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  locationPin: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  buildingSize: string;
  landSize: string;
  propertyDescription: string;
  rentDuration: string;
  tenure: string;
  leaseYears: string;
  buildingPermits: string;
  price: string;
  managedByCompany: string;
  companyName: string;
  pricePeriod: string;
  villaPhotos: File[];
};

const initialFormState: FormState = {
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
  rentDuration: "monthly",
  tenure: "",
  leaseYears: "",
  buildingPermits: "",
  price: "",
  managedByCompany: "",
  companyName: "",
  pricePeriod: "monthly",
  villaPhotos: [],
};

const allPropertyTypeOptions = [
  { label: "Villa", value: "villa" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Apartment", value: "apartment" },
  { label: "Land", value: "land" },
  { label: "Other", value: "other" },
];

const rentalDurationOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const saleTenureOptions = [
  { label: "Freehold (SHM)", value: "freehold_shm" },
  { label: "Leasehold", value: "leasehold" },
  { label: "HGB (Company Title)", value: "hgb" },
  { label: "Right of Use (Hak Pakai)", value: "hak_pakai" },
];

const buildingPermitOptions = [
  { label: "IMG / PBG", value: "img_pbg" },
  { label: "SLF", value: "slf" },
  { label: "None", value: "none" },
];

const footerSections = [
  {
    title: "Offers",
    items: ["Property Sales", "Land Sales", "Off-Plan", "Villa Rentals"],
  },
  {
    title: "Company",
    items: ["About NF Group", "Partnership Programs", "Client Reviews"],
  },
  {
    title: "Services",
    items: ["Villa & Resort Management", "Project Marketing", "Exclusive Listings", "Consultancy"],
  },
  {
    title: "Resources",
    items: ["Quarterly Market Wide", "Quarterly Market Sector", "News", "Privacy Policy"],
  },
  {
    title: "Socials",
    items: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/nf-group-indonesia-real-estate/" },
      { label: "Youtube", href: "#" },
    ],
  },
  {
    title: "Certified By",
    items: ["LSP", "AREBI"],
  },
];

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1800&q=80";

export default function Home() {
  const [intent, setIntent] = useState<PropertyIntent>("rent");
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requiredFields: (keyof FormState)[] = useMemo(
    () => ["firstName", "lastName", "email", "phone", "propertyAddress"],
    []
  );

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

  const inputClass =
    "w-full rounded-lg border border-[#d9d1c8] bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#7a1c1c] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c]/20";

    const handleIntentChange = (value: PropertyIntent) => {
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
  };

    const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFile = (file: File): string | null => {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedVideoTypes = ['video/mp4'];

    if (allowedImageTypes.includes(file.type)) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        return 'Image file size must not exceed 2MB';
      }
    } else if (allowedVideoTypes.includes(file.type)) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        return 'Video file size must not exceed 10MB';
      }
    } else {
      return 'Only JPG, PNG images and MP4 videos are allowed';
    }

    return null;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        villaPhotos: [...prev.villaPhotos, ...validFiles].slice(0, 11), // Max 10 images + 1 video
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      villaPhotos: prev.villaPhotos.filter((_, i) => i !== index),
    }));
  };

  const isSubmitDisabled = requiredFields.some((field) => {
    const value = formData[field];
    return typeof value === "string" ? value.trim().length === 0 : !value;
  });

  const uploadFilesToStrapi = async (files: File[]): Promise<number[]> => {
    const uploadedFileIds: number[] = [];

    for (const file of files) {
      const formDataUpload = new FormData();
      formDataUpload.append('files', file);

      const uploadResponse = await fetch(`${API_ENDPOINT_SALE.replace('/villa-for-sales', '/upload')}`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer 483ba344dd1a74ca0aaf28cac4d7b0df8e8c12e9330cc66ff532f38b7fb19929b8bbf380cbc7bdb1a006893e3c241c7cbeb705bd33652bc0cad0b139cdb199812295ba40e27cf706143638cd31d987fc4b2a88727cd7c075d1870b27c673cc28c1ec853a0bc1fb5b20d9855dbcc1d64c4937a5b974446635dc89caa8c28d2cee",
        },
        body: formDataUpload,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${file.name}`);
      }

      const uploadResult = await uploadResponse.json();
      if (uploadResult && uploadResult[0] && uploadResult[0].id) {
        uploadedFileIds.push(uploadResult[0].id);
      }
    }

    return uploadedFileIds;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const missing = requiredFields.filter((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim().length === 0 : !value;
    });

    if (missing.length > 0) {
      return;
    }

    try {
      // Upload files first if any
      let uploadedFileIds: number[] = [];
      if (formData.villaPhotos.length > 0) {
        uploadedFileIds = await uploadFilesToStrapi(formData.villaPhotos);
      }

      let payload: any;

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
            property_description: formData.propertyDescription ? [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: formData.propertyDescription
                  }
                ]
              }
            ] : null,
            tenure: formData.tenure,
            remaining_lease: parseInt(formData.leaseYears) || 0,
            building_permits: formData.buildingPermits,
            listing_price: parseInt(formData.price) || 0,
            villa_photos: uploadedFileIds.length > 0 ? uploadedFileIds : null,
          }
        };
      } else {
        // For Rent payload
        payload = {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email_address: formData.email,
            phone_number: formData.phone,
            property_address: formData.propertyAddress,
            maps_long_lat: formData.locationPin,
            property_type: formData.propertyType,
            bedroom_numbers: parseInt(formData.bedrooms) || 0,
            bathroom_number: parseInt(formData.bathrooms) || 0,
            building_size: parseInt(formData.buildingSize) || 0,
            land_size: parseInt(formData.landSize) || 0,
            property_description: formData.propertyDescription ? [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: formData.propertyDescription
                  }
                ]
              }
            ] : null,
            rental_type: formData.rentDuration,
            managed_property: formData.managedByCompany === "yes",
            company_name: formData.managedByCompany === "yes" ? formData.companyName : null,
            rental_price: parseInt(formData.price) || 0,
            rental_period: formData.pricePeriod,
            villa_photos: uploadedFileIds.length > 0 ? uploadedFileIds : null,
          }
        };
      }

      const response = await fetch(intent === "sale" ? API_ENDPOINT_SALE : API_ENDPOINT_RENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 483ba344dd1a74ca0aaf28cac4d7b0df8e8c12e9330cc66ff532f38b7fb19929b8bbf380cbc7bdb1a006893e3c241c7cbeb705bd33652bc0cad0b139cdb199812295ba40e27cf706143638cd31d987fc4b2a88727cd7c075d1870b27c673cc28c1ec853a0bc1fb5b20d9855dbcc1d64c4937a5b974446635dc89caa8c28d2cee",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle success
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // TODO: handle error state
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setIntent("sale");
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-neutral-900 relative overflow-y-scroll">
      <main className="flex flex-1 lg:flex-row">
        <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white lg:w-[50%]">
          <img
            src={backgroundImageUrl}
            alt="Coastal view"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/70" />
          <div className="relative flex h-full flex-col justify-between px-8 py-12 sm:px-12 lg:px-16 lg:py-[96px]">
            <header className="flex items-center gap-3">
              <img src="/nfgroup_logo.svg" alt="NF Group Logo" className="h-10 w-auto brightness-0 invert" />
            </header>
            <div className="max-w-md space-y-5">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">List with Us</h1>
              <p className="text-base text-white/85">
                Looking to sell or rent out your property?{" "}
                <span className="font-semibold text-white">List your property with us</span> — we help
                owners reach verified buyers and reliable renters through our proven marketing and sales
                network.
              </p>
            </div>
            <div className="mt-10 h-px w-16 bg-white/50" />
          </div>
        </section>

        <section
          id="form-section"
          className="h-full max-h-screen overflow-y-auto bg-white px-6 py-10 sm:px-10 lg:px-16 lg:w-[50%]"
        >
          <div className="mx-auto w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Submit your property for rent or sale.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3" style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#f7f2f0" }}>
              <button
                type="button"
                onClick={() => handleIntentChange("rent")}
                className={`rounded-lg px-5 py-3 text-sm font-semibold transition ${
                  intent === "rent"
                    ? "bg-[#7a1c1c] text-white shadow-lg shadow-[#7a1c1c]/25"
                    : "bg-[#f2ebe4] text-neutral-700 hover:bg-[#e7dfd7]"
                }`}
              >
                For Rent
              </button>
              <button
                type="button"
                onClick={() => handleIntentChange("sale")}
                className={`rounded-lg px-5 py-3 text-sm font-semibold transition ${
                  intent === "sale"
                    ? "bg-[#7a1c1c] text-white shadow-lg shadow-[#7a1c1c]/25"
                    : "bg-[#f2ebe4] text-neutral-700 hover:bg-[#e7dfd7]"
                }`}
              >
                For Sale
              </button>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-10 py-16 text-center shadow-lg shadow-[#7a1c1c]/10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#7a1c1c] text-white shadow-lg shadow-[#7a1c1c]/35">
                  <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M5 12.5 9.5 17 19 7.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                    />
                  </svg>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-2xl font-semibold text-neutral-900">Thank you!</p>
                  <p className="text-sm text-neutral-600">
                    Our team will review your submission and contact you soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center justify-center rounded-lg border border-[#7a1c1c] bg-[#7a1c1c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#651515]"
                >
                  Back to form
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-6 py-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <ContactIcon />
                    <h3 className="text-lg font-semibold text-neutral-900">Contact Information</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">First Name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className={`${inputClass} mt-2`}
                        value={formData.firstName}
                        onChange={(event) => updateField("firstName", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className={`${inputClass} mt-2`}
                        value={formData.lastName}
                        onChange={(event) => updateField("lastName", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        className={`${inputClass} mt-2`}
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className={`${inputClass} mt-2`}
                        value={formData.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-6 py-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <PropertyIcon />
                    <h3 className="text-lg font-semibold text-neutral-900">Property Details</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">Property Address</label>
                    <input
                      type="text"
                      placeholder="Property Address"
                      className={`${inputClass} mt-2`}
                      value={formData.propertyAddress}
                      onChange={(event) => updateField("propertyAddress", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Google Maps Location Pin
                    </label>
                    <input
                      type="url"
                      placeholder="Google Maps Location Pin"
                      className={`${inputClass} mt-2`}
                      value={formData.locationPin}
                      onChange={(event) => updateField("locationPin", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">Property Type</label>
                    <select
                      className={`${inputClass} mt-2`}
                      value={formData.propertyType}
                      onChange={(event) => updateField("propertyType", event.target.value)}
                    >
                      {propertyTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">
                        Number of Bedrooms
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="Number of Bedrooms"
                        className={`${inputClass} mt-2`}
                        value={formData.bedrooms}
                        onChange={(event) => updateField("bedrooms", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">
                        Number of Bathrooms
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="Number of Bathrooms"
                        className={`${inputClass} mt-2`}
                        value={formData.bathrooms}
                        onChange={(event) => updateField("bathrooms", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">
                        Building Size (sqm)
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="Building Size (sqm)"
                        className={`${inputClass} mt-2`}
                        value={formData.buildingSize}
                        onChange={(event) => updateField("buildingSize", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">
                        Land Size (sqm)
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="Land Size (sqm)"
                        className={`${inputClass} mt-2`}
                        value={formData.landSize}
                        onChange={(event) => updateField("landSize", event.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Property Description
                    </label>
                    <textarea
                      placeholder="Property Description"
                      rows={4}
                      className={`${inputClass} mt-2 resize-none`}
                      value={formData.propertyDescription}
                      onChange={(event) => updateField("propertyDescription", event.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-6 py-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <RentIcon />
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {intent === "rent" ? "Rental Details" : "Sale Details"}
                    </h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">{tenureLabel}</label>
                    <select
                      className={`${inputClass} mt-2`}
                      value={intent === "rent" ? formData.rentDuration : formData.tenure}
                      onChange={(event) =>
                        intent === "rent"
                          ? updateField("rentDuration", event.target.value)
                          : updateField("tenure", event.target.value)
                      }
                    >
                      <option value="">{intent === "rent" ? "Select Rental Type" : "Select Tenure"}</option>
                      {tenureOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                   {intent === "rent" && (
                     <div>
                       <label className="block text-sm font-medium text-neutral-800">
                         Managed by a Property Management Company
                       </label>
                       <select
                         className={`${inputClass} mt-2`}
                         value={formData.managedByCompany}
                         onChange={(event) => updateField("managedByCompany", event.target.value)}
                       >
                         <option value="">Select option</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                       </select>
                     </div>
                   )}
                   {intent === "rent" && formData.managedByCompany === "yes" && (
                     <div>
                       <label className="block text-sm font-medium text-neutral-800">
                         Please specify the company name
                       </label>
                       <input
                         type="text"
                         placeholder="Company name"
                         className={`${inputClass} mt-2`}
                         value={formData.companyName}
                         onChange={(event) => updateField("companyName", event.target.value)}
                       />
                     </div>
                   )}
                  {intent === "sale" && formData.tenure === "leasehold" && (
                    <div>
                      <p className="text-sm text-neutral-600">
                        Please specify remaining lease period
                      </p>
                      <div className="mt-0">
                        <input
                          type="number"
                          min={0}
                          placeholder="Years"
                          className={`${inputClass} mt-2`}
                          value={formData.leaseYears}
                          onChange={(event) => updateField("leaseYears", event.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {intent === "sale" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-neutral-800">
                        Building Permits
                      </label>
                      <select
                        className={`${inputClass} mt-2`}
                        value={formData.buildingPermits}
                        onChange={(event) => updateField("buildingPermits", event.target.value)}
                      >
                        <option value="">Select Building Permits</option>
                        {buildingPermitOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {intent === "rent" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-neutral-800">Rental Price (IDR)</label>
                        <input
                          type="number"
                          min={0}
                          placeholder="Rental Price"
                          className={`${inputClass} mt-2`}
                          value={formData.price}
                          onChange={(event) => updateField("price", event.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-800">Period</label>
                        <select
                          className={`${inputClass} mt-2`}
                          value={formData.pricePeriod}
                          onChange={(event) => updateField("pricePeriod", event.target.value)}
                        >
                          <option value="monthly">Per Month</option>
                          <option value="yearly">Per Year</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-neutral-800">{priceLabel}</label>
                      <input
                        type="number"
                        min={0}
                        placeholder={priceLabel}
                        className={`${inputClass} mt-2`}
                        value={formData.price}
                        onChange={(event) => updateField("price", event.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-6 py-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MediaIcon />
                    <h3 className="text-lg font-bold text-neutral-900">Photos and Media</h3>
                  </div>
                  <p className="text-sm text-neutral-600">
                    Upload images and video of your property
                  </p>
                  <label
                    htmlFor="propertyMedia"
                    className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#d7cec6] bg-white px-10 py-12 text-center transition hover:border-[#7a1c1c]"
                  >
                    <input
                      id="propertyMedia"
                      name="propertyMedia"
                      type="file"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,video/mp4"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                    <UploadIcon />
                    <p className="text-neutral-500 font-medium mt-3">
                      Upload up to 10 photos (JPG/PNG, max 2MB each) and 1 video (MP4, max 1 minute, 10MB)
                      showcasing key areas of the property.
                    </p>
                  </label>

                  {formData.villaPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.villaPhotos.map((file, index) => (
                        <div key={index} className="relative group">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                          ) : (
                            <div className="w-full h-24 bg-gray-100 rounded-lg border flex items-center justify-center">
                              <video className="w-8 h-8 text-gray-400">
                                <source src={URL.createObjectURL(file)} type={file.type} />
                              </video>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-[#e3dcd8] bg-[#f6f2ef] px-6 py-6 shadow-sm">
                  <p className="text-sm font-medium text-neutral-900">
                    <em>Make sure everything looks correct before submitting.</em>
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="mt-5 w-full rounded-lg bg-[#7a1c1c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#651515] disabled:bg-[#c7b9b2] disabled:text-white/80"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="bg-[#7a1c1c] text-white z-10 relative">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-12 sm:px-10 lg:px-0">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center justify-center">
            <div className="flex items-center gap-3">
              <img src="/nfgroup_logo.svg" alt="NF Group Logo" className="h-10 w-auto brightness-0 invert" />
            </div>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-6">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                  {section.title}
                </p>
                {section.title === "Certified By" ? (
                  <div className="flex gap-4 items-center">
                    <img src="/cert-lsp-property.png" alt="LSP Certification" className="h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                    <img src="/cert-arebi.png" alt="AREBI Certification" className="h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                  </div>
                ) : section.title === "Socials" ? (
                  <ul className="space-y-2 text-white/90">
                    {section.items.map((item) => (
                      <li key={typeof item === 'string' ? item : item.label}>
                        {typeof item === 'string' ? item : <a href={item.href} className="hover:underline">{item.label}</a>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-white/90">
                    {section.items.map((item) => (
                      <li key={typeof item === 'string' ? item : item.label}>
                        {typeof item === 'string' ? item : <a href={item.href} className="hover:underline">{item.label}</a>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <span>The functional currency of trade in Indonesia is the Indonesian Rupiah (IDR).</span>
            <span>©2025 NF Group | All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
