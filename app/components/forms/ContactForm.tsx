import { ContactIcon } from '../../../components/Icons';

interface ContactFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updateField: <K extends keyof any>(field: K, value: any) => void;
}

const inputClass =
  "w-full rounded-lg bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#7a1c1c] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c]/20";

export function ContactForm({ formData, updateField }: ContactFormProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-[#F1F1F1] px-6 py-6">
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
  );
}
