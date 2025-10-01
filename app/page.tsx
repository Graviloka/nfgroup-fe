"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useMemo, useState } from "react";

import styles from "./page.module.css";

import { TogglePillGroup, type ToggleOption } from "../components/TogglePillGroup";
import { SectionCard } from "../components/SectionCard";
import { HeroStepBadge } from "../components/HeroStepBadge";
import { ContactIcon, PropertyIcon, RentIcon, MediaIcon } from "../components/Icons";

type PropertyIntent = "rent" | "sale";

type FormState = {
  name: string;
  phone: string;
  email: string;
  propertyName: string;
  propertyType: string;
  locationPin: string;
  bedrooms: string;
  bathrooms: string;
  landSize: string;
  buildingSize: string;
  propertyDescription: string;
  rentDuration: string;
  managementPackage: string;
  price: string;
  crossListing: boolean;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  propertyName: "",
  propertyType: "villa",
  locationPin: "",
  bedrooms: "1",
  bathrooms: "1",
  landSize: "",
  buildingSize: "",
  propertyDescription: "",
  rentDuration: "daily",
  managementPackage: "online",
  price: "",
  crossListing: false,
};

const propertyIntentOptions: ToggleOption[] = [
  { label: "For rent", value: "rent" },
  { label: "For sale", value: "sale" },
];

const allPropertyTypeOptions: ToggleOption[] = [
  { label: "Villa", value: "villa" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
];

const bedroomBathroomOptions: ToggleOption[] = Array.from(
  { length: 9 },
  (_, index) => {
    const value = String(index + 1);
    return { label: value, value };
  }
);

const rentalDurationOptions: ToggleOption[] = [
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const managementOptions: ToggleOption[] = [
  { label: "Online marketing", value: "online" },
  { label: "Full management", value: "full" },
];

const heroSteps = [
  { label: "Contact Information" },
  { label: "Property Details" },
  { label: "Additional Information" },
  { label: "Photos and Media" },
];

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80";

export default function Home() {
  const router = useRouter();
  const [intent, setIntent] = useState<PropertyIntent>("rent");
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [touched, setTouched] =
    useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMediaCount, setSelectedMediaCount] = useState(0);

  const requiredFields: (keyof FormState)[] = useMemo(
    () => ["name", "phone", "email", "locationPin"],
    []
  );

  const propertyTypeOptions: ToggleOption[] = useMemo(() => {
    if (intent === "rent") {
      return allPropertyTypeOptions.filter(option =>
        option.value === "villa" || option.value === "apartment"
      );
    }
    return allPropertyTypeOptions;
  }, [intent]);

  const priceSuffix =
    intent === "rent"
      ? formData.rentDuration === "monthly"
        ? "month"
        : formData.rentDuration === "yearly"
        ? "year"
        : "day"
      : undefined;

  const priceLabel =
    intent === "rent"
      ? `What's the rental price per ${priceSuffix}?`
      : "What's the listing price?";

  const crossListingLabel =
    intent === "rent"
      ? "Also interested in listing this property for sale"
      : "Also interested in listing this property for rent";

  const markTouched = (field: keyof FormState) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIntentChange = (value: string) => {
    const nextIntent = value as PropertyIntent;
    setIntent(nextIntent);

    if (nextIntent === "rent") {
      updateField("rentDuration", "daily");
    } else {
      updateField("rentDuration", "monthly");
    }

    updateField("managementPackage", "online");
    updateField("crossListing", false);
  };

  const isSubmitDisabled = requiredFields.some((field) => {
    const value = formData[field];
    return typeof value === "string" ? value.trim().length === 0 : !value;
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = requiredFields.filter((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim().length === 0 : !value;
    });

    if (missing.length > 0) {
      setTouched((prev) => {
        const next = { ...prev };
        missing.forEach((field) => {
          next[field] = true;
        });
        return next;
      });
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setTouched({});
    setIntent("rent");
    setIsSubmitted(false);
    setSelectedMediaCount(0);
  };

  return (
    <div className="h-screen bg-white text-neutral-900">
      <div className="flex h-screen w-full flex-col lg:flex-row lg:gap-0 lg:p-0">
        <div className="relative overflow-hidden bg-neutral-900 text-white lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-1/2 lg:overflow-hidden">
          <img
            src={backgroundImageUrl}
            alt="Coastal view"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
          <div className="relative flex h-full flex-col justify-between">
            <header className="flex items-center gap-2 px-6 pt-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-xl font-bold text-[#1d4d4f] shadow-[0_14px_30px_-18px_rgba(255,255,255,0.6)]">
                N
              </span>
              <span className="text-lg font-semibold tracking-tight">
                NF Group
              </span>
            </header>

            <nav aria-label="Breadcrumb" className="px-8 text-sm text-white/75">
              <ol className="flex items-center gap-2">
                <li>
                  <Link className="transition hover:text-white" href="/">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">•</li>
                <li aria-current="page" className="font-medium text-white">
                  List Your Property
                </li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-col gap-8 px-6 pb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Follow the steps to submit your listing
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroSteps.map((step) => (
                  <HeroStepBadge key={step.label} label={step.label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lg:ml-[50%] lg:h-screen lg:overflow-y-auto space-y-4 p-6 lg:p-8">
          <header className="space-y-3 rounded-lg border border-[#e2e4ea] bg-white px-5 py-4 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.3)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#3d6dd8]">
              NF Group
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-[2.75rem] sm:leading-[1.1]">
              <span className="text-[#1f4ed8]">List Your Property</span> for Rent
              or Sale
            </h1>
            <p className="max-w-2xl text-sm text-neutral-600 sm:text-base">
              Share your property details and we'll help you reach the right guests
              or buyers. Complete the steps below and our team will get in touch
              shortly.
            </p>
          </header>

          {isSubmitted ? (
            <div className="rounded-lg border border-[#e2e4ea] bg-white px-8 py-16 text-center shadow-[0_22px_60px_-38px_rgba(15,23,42,0.4)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#1f4ed8] text-white shadow-[0_20px_50px_-28px_rgba(31,78,216,0.65)]">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12.5 9.5 17 19 7.5"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-2xl font-semibold text-neutral-900">
                  Thank you!
                </p>
                <p className="text-sm text-neutral-600">
                  Our team will review your submission and get back to you shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 inline-flex items-center justify-center rounded-lg border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                Done
              </button>
            </div>
          ) : (
            <form
              className="space-y-5 sm:space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <section className={styles.formSection}>
                <h2 className="text-base font-semibold text-neutral-900">
                  Choose to Rent or Sell Your Property
                </h2>
                <div className="rounded-lg bg-[#eceef2] p-1">
                  <TogglePillGroup
                    label="Listing intent"
                    legendClassName="sr-only"
                    name="listing-intent"
                    options={propertyIntentOptions}
                    value={intent}
                    onChange={handleIntentChange}
                    layoutClassName="grid grid-cols-2 gap-1"
                    appearance="segmented"
                  />
                </div>
              </section>

              <SectionCard
                icon={<ContactIcon />}
                title="Contact Information"
                description="Tell us how we can reach you about this listing."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className={styles.label}
                    >
                      What's your name?
                      <span className="text-[#d12a2a]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className={`mt-2 w-full rounded-lg border border-[#dcdfe6] bg-white px-4 py-3 text-[15px] text-neutral-900 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.45)] transition focus:border-[#1f4ed8] focus:outline-none focus:ring-2 focus:ring-[#1f4ed8]/30 ${
                        touched.name && formData.name.trim().length === 0
                          ? "border-[#e15b5b] focus:border-[#e15b5b] focus:ring-[#e15b5b]/30"
                          : ""
                      }`}
                      value={formData.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      onBlur={() => markTouched("name")}
                      required
                      aria-invalid={Boolean(
                        touched.name && formData.name.trim().length === 0
                      )}
                      aria-describedby="name-error"
                    />
                    {touched.name && formData.name.trim().length === 0 ? (
                      <p
                        id="name-error"
                        className={styles.error}
                      >
                        Name is a required field.
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className={styles.label}
                    >
                      What's your phone number?
                      <span className="text-[#d12a2a]">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="+62 812 345 678"
                      className={`mt-2 w-full rounded-lg border border-[#dcdfe6] bg-white px-4 py-3 text-[15px] text-neutral-900 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.45)] transition focus:border-[#1f4ed8] focus:outline-none focus:ring-2 focus:ring-[#1f4ed8]/30 ${
                        touched.phone && formData.phone.trim().length === 0
                          ? "border-[#e15b5b] focus:border-[#e15b5b] focus:ring-[#e15b5b]/30"
                          : ""
                      }`}
                      value={formData.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      onBlur={() => markTouched("phone")}
                      required
                      aria-invalid={Boolean(
                        touched.phone && formData.phone.trim().length === 0
                      )}
                      aria-describedby="phone-error"
                    />
                    {touched.phone && formData.phone.trim().length === 0 ? (
                      <p
                        id="phone-error"
                        className={styles.error}
                      >
                        Phone number is a required field.
                      </p>
                    ) : null}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="email"
                      className={styles.label}
                    >
                      What's your email address?
                      <span className="text-[#d12a2a]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      className={`mt-2 w-full rounded-lg border border-[#dcdfe6] bg-white px-4 py-3 text-[15px] text-neutral-900 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.45)] transition focus:border-[#1f4ed8] focus:outline-none focus:ring-2 focus:ring-[#1f4ed8]/30 ${
                        touched.email && formData.email.trim().length === 0
                          ? "border-[#e15b5b] focus:border-[#e15b5b] focus:ring-[#e15b5b]/30"
                          : ""
                      }`}
                      value={formData.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      onBlur={() => markTouched("email")}
                      required
                      aria-invalid={Boolean(
                        touched.email && formData.email.trim().length === 0
                      )}
                      aria-describedby="email-error"
                    />
                    {touched.email && formData.email.trim().length === 0 ? (
                      <p
                        id="email-error"
                        className={styles.error}
                      >
                        Email is a required field.
                      </p>
                    ) : null}
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                icon={<PropertyIcon />}
                title="Property Details"
                description="Provide the basics so we can understand your property better."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="propertyName"
                      className="text-sm font-medium text-neutral-700"
                    >
                      Property name
                    </label>
                    <input
                      id="propertyName"
                      name="propertyName"
                      type="text"
                      placeholder="Cozy Downtown Apartment."
                      className={styles.input}
                      value={formData.propertyName}
                      onChange={(event) =>
                        updateField("propertyName", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="locationPin"
                      className={styles.label}
                    >
                      Location pin
                      <span className="text-[#d12a2a]">*</span>
                    </label>
                    <input
                      id="locationPin"
                      name="locationPin"
                      type="url"
                      placeholder="Enter the URL"
                      className={`mt-2 w-full rounded-lg border border-[#dcdfe6] bg-white px-4 py-3 text-[15px] text-neutral-900 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.45)] transition focus:border-[#1f4ed8] focus:outline-none focus:ring-2 focus:ring-[#1f4ed8]/30 ${
                        touched.locationPin && formData.locationPin.trim().length === 0
                          ? "border-[#e15b5b] focus:border-[#e15b5b] focus:ring-[#e15b5b]/30"
                          : ""
                      }`}
                      value={formData.locationPin}
                      onChange={(event) =>
                        updateField("locationPin", event.target.value)
                      }
                      onBlur={() => markTouched("locationPin")}
                      required
                      aria-invalid={Boolean(
                        touched.locationPin &&
                          formData.locationPin.trim().length === 0
                      )}
                      aria-describedby="locationPin-error"
                    />
                    {touched.locationPin && formData.locationPin.trim().length === 0 ? (
                      <p
                        id="locationPin-error"
                        className={styles.error}
                      >
                        Location pin is a required field.
                      </p>
                    ) : null}
                  </div>
                </div>

                <TogglePillGroup
                  label="What type of property is it?"
                  name="property-type"
                  options={propertyTypeOptions}
                  value={formData.propertyType}
                  onChange={(value) => updateField("propertyType", value)}
                  layoutClassName="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <TogglePillGroup
                    label="How many bedrooms?"
                    name="bedrooms"
                    options={bedroomBathroomOptions}
                    value={formData.bedrooms}
                    onChange={(value) => updateField("bedrooms", value)}
                    layoutClassName="bg-gray-100 rounded-xl p-1.5 grid grid-cols-9 gap-1"
                    appearance="segmented"
                  />
                  <TogglePillGroup
                    label="How many bathrooms?"
                    name="bathrooms"
                    options={bedroomBathroomOptions}
                    value={formData.bathrooms}
                    onChange={(value) => updateField("bathrooms", value)}
                    layoutClassName="bg-gray-100 rounded-xl p-1.5 grid grid-cols-9 gap-1"
                    appearance="segmented"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="landSize"
                      className="text-sm font-medium text-neutral-700"
                    >
                      Land size <span className="text-neutral-400">(in sqm)</span>
                    </label>
                    <input
                      id="landSize"
                      name="landSize"
                      type="number"
                      inputMode="numeric"
                      placeholder="500"
                      min={0}
                      className={styles.input}
                      value={formData.landSize}
                      onChange={(event) => updateField("landSize", event.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="buildingSize"
                      className="text-sm font-medium text-neutral-700"
                    >
                      Building size <span className="text-neutral-400">(in sqm)</span>
                    </label>
                    <input
                      id="buildingSize"
                      name="buildingSize"
                      type="number"
                      inputMode="numeric"
                      placeholder="250"
                      min={0}
                      className={styles.input}
                      value={formData.buildingSize}
                      onChange={(event) =>
                        updateField("buildingSize", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="propertyDescription"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Property description
                  </label>
                  <textarea
                    id="propertyDescription"
                    name="propertyDescription"
                    rows={4}
                    placeholder="A spacious 3-bedroom villa with a beautiful garden and pool."
                    className={styles.input}
                    value={formData.propertyDescription}
                    onChange={(event) =>
                      updateField("propertyDescription", event.target.value)
                    }
                  />
                </div>
              </SectionCard>

              {intent === "rent" ? (
                <SectionCard
                  icon={<RentIcon />}
                  title="Rental Details"
                  description="Help us understand your rental preferences and expectations."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <TogglePillGroup
                      label="How long do you want to rent it out?"
                      name="rent-duration"
                      options={rentalDurationOptions}
                      value={formData.rentDuration}
                      onChange={(value) => updateField("rentDuration", value)}
                      layoutClassName="grid grid-cols-3 gap-2"
                    />
                    <TogglePillGroup
                      label="What management package do you prefer?"
                      name="management-package"
                      options={managementOptions}
                      value={formData.managementPackage}
                      onChange={(value) =>
                        updateField("managementPackage", value)
                      }
                      layoutClassName="grid grid-cols-2 gap-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="text-sm font-medium text-neutral-700"
                    >
                      {priceLabel} <span className="text-neutral-400">(in $)</span>
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      inputMode="decimal"
                      placeholder="$"
                      min={0}
                      className={styles.input}
                      value={formData.price}
                      onChange={(event) => updateField("price", event.target.value)}
                    />
                  </div>
                </SectionCard>
              ) : (
                <SectionCard
                  icon={<RentIcon />}
                  title="Sale Details"
                  description="Provide key information for potential buyers."
                >
                  <div className="rounded-lg border border-[#d7dcf0] bg-[#edf1ff] px-5 py-4 text-sm text-[#2f4075]">
                    <p className="font-semibold text-[#293a75]">Online marketing</p>
                    <p className="mt-1">
                      We'll handle lead generation, buyer communication, and listing
                      exposure while you stay in control of negotiations and on-site
                      viewings.
                    </p>
                    <p className="mt-3 font-semibold text-[#293a75]">
                      Full management
                    </p>
                    <p className="mt-1">
                      Prefer a hands-off approach? Choose full management and we'll
                      coordinate everything from viewings to documentation on your behalf.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="text-sm font-medium text-neutral-700"
                    >
                      {priceLabel} <span className="text-neutral-400">(in $)</span>
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      inputMode="decimal"
                      placeholder="$"
                      min={0}
                      className={styles.input}
                      value={formData.price}
                      onChange={(event) => updateField("price", event.target.value)}
                    />
                  </div>

                  <TogglePillGroup
                    label="Which package fits you best?"
                    name="management-package-sale"
                    options={managementOptions}
                    value={formData.managementPackage}
                    onChange={(value) => updateField("managementPackage", value)}
                    layoutClassName="grid grid-cols-2 gap-2"
                  />
                </SectionCard>
              )}

              <SectionCard
                icon={<MediaIcon />}
                title="Photos and Media"
                description="Upload images and videos of your property."
              >
                <label
                  htmlFor="propertyMedia"
                  className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[#cfd5de] bg-white px-8 py-12 text-center transition hover:border-[#1f4ed8] hover:bg-[#f2f5ff]"
                >
                  <input
                    id="propertyMedia"
                    name="propertyMedia"
                    type="file"
                    accept="image/*,video/*,application/pdf"
                    multiple
                    className="sr-only"
                    onChange={(event) =>
                      setSelectedMediaCount(event.target.files?.length ?? 0)
                    }
                  />
                  <svg
                    aria-hidden="true"
                    className="h-[46px] w-[46px] text-[#1f4ed8] transition group-hover:scale-105"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="32"
                      height="32"
                      rx="12"
                      className="fill-[#e8edff]"
                    />
                    <path
                      d="M24 16v16M16 24h16"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-neutral-800">
                      Drop files to upload <span className="text-neutral-500">or</span>{" "}
                      <span className="text-[#1f4ed8]">browse</span>
                    </p>
                    <p className="text-xs text-neutral-500">
                      JPG, PNG, HEIC, MP4, MOV, or PDF up to 50 MB each.
                    </p>
                    {selectedMediaCount > 0 ? (
                      <p className="text-xs font-medium text-neutral-600">
                        {selectedMediaCount} file
                        {selectedMediaCount > 1 ? "s" : ""} selected
                      </p>
                    ) : null}
                  </div>
                </label>

                <div className="space-y-4 rounded-lg border border-[#e2e4ea] bg-white px-6 py-5 text-sm text-neutral-600">
                  <p className="font-semibold text-neutral-900">
                    Make sure everything looks correct before submitting.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <label className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                      <input
                        id="crossListing"
                        name="crossListing"
                        type="checkbox"
                        className="h-5 w-5 rounded border border-[#cbd0d8] text-[#1f4ed8] focus:ring-[#1f4ed8]"
                        checked={formData.crossListing}
                        onChange={(event) =>
                          updateField("crossListing", event.target.checked)
                        }
                      />
                      {crossListingLabel}
                    </label>
                    <button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className="inline-flex items-center justify-center rounded-lg border border-transparent bg-[#dce2f1] px-10 py-3 text-sm font-semibold text-neutral-500 transition hover:bg-[#cfd8ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4ed8] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#e5e7eb] disabled:text-neutral-400"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </SectionCard>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
