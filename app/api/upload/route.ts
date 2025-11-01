import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '../../constants/api';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate files
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedVideoTypes = ['video/mp4'];
    const maxImageSize = 2 * 1024 * 1024; // 2MB
    const maxVideoSize = 10 * 1024 * 1024; // 10MB

    const validationErrors: string[] = [];

    files.forEach((file, index) => {
      if (!(file instanceof File)) {
        validationErrors.push(`File ${index + 1}: Invalid file format`);
        return;
      }

      if (allowedImageTypes.includes(file.type)) {
        if (file.size > maxImageSize) {
          validationErrors.push(`${file.name}: Image file size must not exceed 2MB`);
        }
      } else if (allowedVideoTypes.includes(file.type)) {
        if (file.size > maxVideoSize) {
          validationErrors.push(`${file.name}: Video file size must not exceed 10MB`);
        }
      } else {
        validationErrors.push(`${file.name}: Only JPG, PNG images and MP4 videos are allowed`);
      }
    });

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'File validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Create new FormData for Strapi upload
    const strapiFormData = new FormData();
    files.forEach((file) => {
      strapiFormData.append('files', file);
    });

    // Upload to Strapi
    const uploadResponse = await fetch(API_ENDPOINTS.UPLOAD, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: strapiFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('Strapi upload error:', errorData);
      return NextResponse.json(
        { error: 'Failed to upload files to server' },
        { status: uploadResponse.status }
      );
    }

    const uploadResult = await uploadResponse.json();

    // Validate response format
    if (!Array.isArray(uploadResult) || uploadResult.length === 0) {
      return NextResponse.json(
        { error: 'Invalid upload response from server' },
        { status: 500 }
      );
    }

    // Extract file IDs
    const fileIds = uploadResult.map((file: any) => {
      if (!file || !file.id) {
        throw new Error('Invalid file data in upload response');
      }
      return file.id;
    });

    return NextResponse.json({
      success: true,
      data: fileIds
    });

  } catch (error) {
    console.error('Upload API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during file upload' },
      { status: 500 }
    );
  }
}
