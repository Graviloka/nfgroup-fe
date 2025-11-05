import { PropertyIntent, PropertyFormData } from '../../types/forms';
import { ContactForm } from '../forms/ContactForm';
import { PropertyDetailsForm } from '../forms/PropertyDetailsForm';
import { RentalDetailsForm } from '../forms/RentalDetailsForm';
import { MediaUploadForm } from '../forms/MediaUploadForm';
import { FormSubmission } from '../forms/FormSubmission';

interface FormSectionProps {
  intent: PropertyIntent;
  formData: PropertyFormData;
  updateField: <K extends keyof any>(field: K, value: any) => void;
  onIntentChange: (intent: PropertyIntent) => void;
  propertyTypeOptions: any[];
  tenureOptions: any[];
  tenureLabel: string;
  priceLabel: string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  isUploading: boolean;
  isSubmitted: boolean;
  isSubmitDisabled: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
  onReset: () => void;
}

export function FormSection({
  intent,
  formData,
  updateField,
  onIntentChange,
  propertyTypeOptions,
  tenureOptions,
  tenureLabel,
  priceLabel,
  handleFileUpload,
  removeFile,
  isUploading,
  isSubmitted,
  isSubmitDisabled,
  isSubmitting,
  submitError,
  onSubmit,
  onReset,
}: FormSectionProps) {
  return (
    <section id="form-section" className="h-full max-h-screen overflow-y-auto bg-white px-6 py-10 sm:px-10 lg:px-16 lg:w-[50%]">
      <div className="mx-auto w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl text-neutral-900">
            Submit your property for rent or sale.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3" style={{ padding: "5px", borderRadius: "10px", backgroundColor: "#F1F1F1" }}>
          <button
            type="button"
            onClick={() => onIntentChange("rent")}
            className={`rounded-lg px-5 py-3 text-base font-semibold transition ${
              intent === "rent"
                ? "bg-[#7a1c1c] text-white"
                : "bg-[#F1F1F1] text-neutral-700 hover:bg-[#e7dfd7]"
            }`}
          >
            For Rent
          </button>
          <button
            type="button"
            onClick={() => onIntentChange("sale")}
            className={`rounded-lg px-5 py-3 text-base font-semibold transition ${
              intent === "sale"
                ? "bg-[#7a1c1c] text-white"
                : "bg-[#F1F1F1] text-neutral-700 hover:bg-[#e7dfd7]"
            }`}
          >
            For Sale
          </button>
        </div>

        {isSubmitted ? (
          <FormSubmission
            isSubmitted={isSubmitted}
            isSubmitDisabled={isSubmitDisabled}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={onSubmit}
            onReset={onReset}
          />
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }} noValidate>
            <ContactForm
              formData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
              }}
              updateField={updateField}
            />

            <PropertyDetailsForm
              formData={{
                propertyAddress: formData.propertyAddress,
                locationPin: formData.locationPin,
                propertyType: formData.propertyType,
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                buildingSize: formData.buildingSize,
                landSize: formData.landSize,
                propertyDescription: formData.propertyDescription,
              }}
              updateField={updateField}
              propertyTypeOptions={propertyTypeOptions}
            />

            <RentalDetailsForm
              intent={intent}
              formData={{
                rentDuration: formData.rentDuration,
                tenure: formData.tenure,
                leaseYears: formData.leaseYears,
                buildingPermits: formData.buildingPermits,
                price: formData.price,
                managedByCompany: formData.managedByCompany,
                companyName: formData.companyName,
                pricePeriod: formData.pricePeriod,
              }}
              updateField={updateField}
              tenureOptions={tenureOptions}
              tenureLabel={tenureLabel}
              priceLabel={priceLabel}
            />

            <MediaUploadForm
              villaPhotos={formData.villaPhotos}
              handleFileUpload={handleFileUpload}
              removeFile={removeFile}
              isUploading={isUploading}
            />

            <FormSubmission
              isSubmitted={isSubmitted}
              isSubmitDisabled={isSubmitDisabled}
              isSubmitting={isSubmitting}
              submitError={submitError}
              onSubmit={onSubmit}
              onReset={onReset}
            />
          </form>
        )}
      </div>
    </section>
  );
}
