import { useEffect } from 'react';
import { MediaIcon, UploadIcon } from '../../../components/Icons';

interface MediaUploadFormProps {
  villaPhotos: File[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  isUploading: boolean;
}

export function MediaUploadForm({
  villaPhotos,
  handleFileUpload,
  removeFile,
  isUploading
}: MediaUploadFormProps) {
  useEffect(() => {
    let backdropTimeout: NodeJS.Timeout;
    const input = document.getElementById('propertyMedia') as HTMLInputElement;

    const createBackdrop = () => {
      const backdrop = document.createElement('div');
      backdrop.id = 'file-upload-backdrop';
      Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: '1000',
      });
      return backdrop;
    };

    const showBackdrop = () => {
      document.body.style.overflow = 'hidden';
      let backdrop = document.getElementById('file-upload-backdrop');
      if (!backdrop) {
        backdrop = createBackdrop();
        document.body.appendChild(backdrop);
      }
    };

    const hideBackdrop = () => {
      if (backdropTimeout) {
        clearTimeout(backdropTimeout);
      }
      document.body.style.overflow = '';
      const backdrop = document.getElementById('file-upload-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    };

    const handleFocus = () => {
      showBackdrop();

      // Auto-hide backdrop if user cancels (no files selected within 2 seconds)
      backdropTimeout = setTimeout(() => {
        if (!input.files || input.files.length === 0) {
          hideBackdrop();
        }
      }, 500);
    };

    const handleChange = () => {
      // Clear timeout if files are selected
      if (backdropTimeout) {
        clearTimeout(backdropTimeout);
      }
    };

    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', hideBackdrop);
      input.addEventListener('change', handleChange);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', hideBackdrop);
        input.removeEventListener('change', handleChange);
      }
      hideBackdrop();
    };
  }, []);

  return (
    <div className="space-y-5 rounded-2xl bg-[#F1F1F1] px-6 py-6 relative z-0">
      <div className="flex items-center gap-3">
        <MediaIcon />
        <h3 className="text-lg font-bold text-neutral-900">Photos and Media</h3>
      </div>
      <p className="text-sm text-neutral-600">
        Upload images and video of your property
      </p>
      <label
        htmlFor="propertyMedia"
        className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl bg-white px-10 py-12 text-center transition hover:border-[#7a1c1c]"
      >
        <input
          id="propertyMedia"
          name="propertyMedia"
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,video/mp4"
          className="sr-only"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <UploadIcon />
        <p className="text-neutral-500 font-medium mt-3">
          Upload at least 2 photos (JPG/PNG, max 2MB each) and up to 1 video (MP4, max 1 minute, 10MB)
          showcasing key areas of the property. Photos are required.
        </p>
        {isUploading && (
          <p className="text-sm text-blue-600">Uploading files...</p>
        )}
      </label>

      {villaPhotos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {villaPhotos.map((file, index) => (
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
  );
}
