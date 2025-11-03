import { RentIcon } from '../../../components/Icons';
import { PropertyIntent, SelectOption } from '../../types/forms';
import { Select } from '../ui/Select';
import {
  managedByCompanyOptions,
  buildingPermitOptions,
  pricePeriodOptions
} from '../../constants/forms';

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
        <div className="mt-2">
          <Select
            options={tenureOptions}
            value={intent === "rent" ? formData.rentDuration : formData.tenure}
            placeholder={intent === "rent" ? "Select Rental Type" : "Select Tenure"}
            onChange={(value) =>
              intent === "rent"
                ? updateField("rentDuration", value)
                : updateField("tenure", value)
            }
          />
        </div>
      </div>
       {intent === "rent" && (
         <div>
           <label className="block text-sm font-medium text-neutral-800">
             Managed by a Property Management Company
           </label>
           <div className="mt-2">
             <Select
               options={managedByCompanyOptions}
               value={formData.managedByCompany}
               placeholder="Select option"
               onChange={(value) => updateField("managedByCompany", value)}
             />
           </div>
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
          <div className="mt-2">
            <Select
              options={buildingPermitOptions}
              value={formData.buildingPermits}
              placeholder="Select Building Permits"
              onChange={(value) => updateField("buildingPermits", value)}
            />
          </div>
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
            <div className="mt-2">
              <Select
                options={pricePeriodOptions}
                value={formData.pricePeriod}
                placeholder="Select Period"
                onChange={(value) => updateField("pricePeriod", value)}
              />
            </div>
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
