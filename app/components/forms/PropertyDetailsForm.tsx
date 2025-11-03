import { PropertyIcon } from '../../../components/Icons';
import { PropertyTypeOption } from '../../types/forms';
import { Select } from '../ui/Select';

interface PropertyDetailsFormProps {
  formData: {
    propertyAddress: string;
    locationPin: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    buildingSize: string;
    landSize: string;
    propertyDescription: string;
  };
  updateField: <K extends keyof any>(field: K, value: any) => void;
  propertyTypeOptions: PropertyTypeOption[];
}

const inputClass =
  "w-full rounded-lg border border-[#d9d1c8] bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#7a1c1c] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c]/20";

export function PropertyDetailsForm({ formData, updateField, propertyTypeOptions }: PropertyDetailsFormProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#F1F1F1] px-6 py-6 shadow-sm">
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
        <div className="mt-2">
          <Select
            options={propertyTypeOptions}
            value={formData.propertyType}
            placeholder="Select Property Type"
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>
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
  );
}
