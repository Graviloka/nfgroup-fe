"use client";

import { usePropertyForm } from '../hooks/usePropertyForm';
import { HeroSection } from './layout/HeroSection';
import { FormSection } from './layout/FormSection';
import { Footer } from './layout/Footer';

export function PropertyListingForm() {
  const {
    intent,
    formData,
    isSubmitting,
    isSubmitted,
    submitError,
    isUploading,
    propertyTypeOptions,
    tenureOptions,
    priceLabel,
    tenureLabel,
    isSubmitDisabled,
    updateField,
    handleIntentChange,
    handleFileUpload,
    removeFile,
    submitForm,
    resetForm,
  } = usePropertyForm();

  const handleIntentChangeWrapper = (value: "rent" | "sale") => {
    handleIntentChange(value);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-neutral-900 overflow-y-scroll">
      <main className="flex flex-1 flex-col lg:flex-row">
        <HeroSection />

        <FormSection
          intent={intent}
          formData={formData}
          updateField={updateField as any}
          onIntentChange={handleIntentChange}
          propertyTypeOptions={propertyTypeOptions}
          tenureOptions={tenureOptions}
          tenureLabel={tenureLabel}
          priceLabel={priceLabel}
          handleFileUpload={handleFileUpload}
          removeFile={removeFile}
          isUploading={isUploading}
          isSubmitted={isSubmitted}
          isSubmitDisabled={isSubmitDisabled}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={submitForm}
          onReset={resetForm}
        />
      </main>
      <Footer />
    </div>
  );
}
