interface FormSubmissionProps {
  isSubmitted: boolean;
  isSubmitDisabled: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
  onReset: () => void;
}

export function FormSubmission({
  isSubmitted,
  isSubmitDisabled,
  isSubmitting,
  submitError,
  onSubmit,
  onReset
}: FormSubmissionProps) {
  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-[#F1F1F1] px-10 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#7a1c1c] text-white">
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
          onClick={onReset}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#74141E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#511a1c]"
        >
          Back to form
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#F1F1F1] px-6 py-6">
      {submitError && (
        <div className="mb-4 rounded-lg bg-red-50 p-4">
          <div className="text-sm text-red-600 whitespace-pre-line">
            {submitError}
          </div>
        </div>
      )}
      <p className="text-sm font-medium text-neutral-900">
        <em>Make sure everything looks correct before submitting.</em>
      </p>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        onClick={onSubmit}
        className="mt-5 w-full rounded-lg bg-[#74141E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#511a1c] disabled:bg-[#b1b1b1] disabled:text-white/80"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  );
}
