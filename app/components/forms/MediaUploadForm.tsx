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
  return (
    <div className="space-y-5 rounded-2xl border border-[#e3dcd8] bg-[#F1F1F1] px-6 py-6 shadow-sm">
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
          disabled={isUploading}
        />
        <UploadIcon />
        <p className="text-neutral-500 font-medium mt-3">
          Upload up to 10 photos (JPG/PNG, max 2MB each) and 1 video (MP4, max 1 minute, 10MB)
          showcasing key areas of the property.
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
