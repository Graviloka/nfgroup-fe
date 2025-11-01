import { useState, useCallback } from 'react';
import { FileValidationResult } from '../types/forms';
import { FILE_CONSTRAINTS, API_ENDPOINTS, API_HEADERS } from '../constants/api';
import { ApiError, FileUploadResponse } from '../types/api';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = useCallback((file: File): FileValidationResult => {
    const allowedImageTypes = FILE_CONSTRAINTS.ALLOWED_IMAGE_TYPES;
    const allowedVideoTypes = FILE_CONSTRAINTS.ALLOWED_VIDEO_TYPES;

    if (allowedImageTypes.includes(file.type as any)) {
      if (file.size > FILE_CONSTRAINTS.IMAGE_MAX_SIZE) {
        return {
          isValid: false,
          error: 'Image file size must not exceed 2MB'
        };
      }
    } else if (allowedVideoTypes.includes(file.type as any)) {
      if (file.size > FILE_CONSTRAINTS.VIDEO_MAX_SIZE) {
        return {
          isValid: false,
          error: 'Video file size must not exceed 10MB'
        };
      }
    } else {
      return {
        isValid: false,
        error: 'Only JPG, PNG images and MP4 videos are allowed'
      };
    }

    return { isValid: true };
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<number> => {
    const formData = new FormData();
    formData.append('files', file);

    const uploadResponse = await fetch(API_ENDPOINTS.UPLOAD, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${API_ENDPOINTS.AUTH_TOKEN}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file: ${file.name}`);
    }

    const uploadResult = await uploadResponse.json();
    if (uploadResult && uploadResult[0] && uploadResult[0].id) {
      return uploadResult[0].id;
    }

    throw new Error('Invalid upload response');
  }, []);

  const uploadFiles = useCallback(async (files: File[]): Promise<number[]> => {
    setIsUploading(true);
    setUploadProgress(0);

    const uploadedFileIds: number[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const fileId = await uploadFile(files[i]);
        uploadedFileIds.push(fileId);
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      return uploadedFileIds;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [uploadFile]);

  const validateAndProcessFiles = useCallback((files: FileList): {
    validFiles: File[];
    errors: string[];
  } => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    return { validFiles, errors };
  }, [validateFile]);

  return {
    validateFile,
    uploadFiles,
    validateAndProcessFiles,
    isUploading,
    uploadProgress,
  };
}
