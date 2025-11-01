export const API_ENDPOINTS = {
  SALE: process.env.NEXT_PUBLIC_API_SALE!,
  RENT: process.env.NEXT_PUBLIC_API_RENT!,
  UPLOAD: process.env.NEXT_PUBLIC_API_UPLOAD!,
  AUTH_TOKEN: process.env.NEXT_PUBLIC_API_AUTH_TOKEN!,
} as const;

export const FILE_CONSTRAINTS = {
  IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  VIDEO_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 11, // 10 images + 1 video
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_VIDEO_TYPES: ['video/mp4'],
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_ENDPOINTS.AUTH_TOKEN}`,
} as const;
