export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface FileUploadResponse {
  id: number;
  url: string;
  name: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: ValidationError[];
}
