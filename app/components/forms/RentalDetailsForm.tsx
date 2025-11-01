import { RentIcon } from '../../../components/Icons';
import { PropertyIntent, SelectOption } from '../../types/forms';

interface RentalDetailsFormProps {
  intent: PropertyIntent;
  formData: {
    rentDuration: string;
    tenure: string;
    leaseYears: string;
    buildingPermits: string;
    price: string;
    managedByCompany: string;
    companyName: string;
    pricePeriod: string;
  };
  updateField: <K extends keyof any>(field: K, value: any) => void;
  tenureOptions: SelectOption[];
  tenureLabel: string;
  priceLabel: string;
}

const inputClass =
  "w-full rounded-lg border border-[#d9d1c8] bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#7a1c1c] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c]/20";

export function RentalDetailsForm({
  intent,
  formData,
  updateField,
  tenureOptions,
  tenureLabel,
  priceLabel
}: RentalDetailsFormProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#F1F1F1] px-6 py-6 shadow-sm">
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
            <option value="img_pbg">IMG / PBG</option>
            <option value="slf">SLF</option>
            <option value="none">None</option>
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
  );
}
