import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/app/lib/prisma';  
import { authOptions } from '@/app/lib/authOptions'; 
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResponse {
  secure_url: string;
}

const uploadToCloudinary = (buffer: Buffer, publicId: string): Promise<CloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'profile_pictures',
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryResponse);  
        }
      }
    );
    uploadStream.end(buffer); 
  });
};

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);
  const { userId } = params;

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const currentUserId = session.user.id;

  if (currentUserId !== userId) {
    return NextResponse.json({ message: 'You can only edit your own profile' }, { status: 403 });
  }

  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const bio = formData.get('bio')?.toString();
  const city = formData.get('city')?.toString();
  const website = formData.get('website')?.toString();
  const avatarFile = formData.get('avatar');
  const profilePageImageFile = formData.get('profilePageImage');

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updateData: {
      name?: string;
      bio?: string;
      city?: string;
      website?: string;
      avatarUrl?: string;
      ProfilePageImage?: string; // Updated field name to match the schema
    } = {
      name: name || currentUser.name,
      bio: bio || currentUser.bio || undefined,
      city: city || currentUser.city || undefined,
      website: website || currentUser.website || undefined,
    };
    
    if (avatarFile && avatarFile instanceof File) {
      const avatarBuffer = Buffer.from(await avatarFile.arrayBuffer());
      const avatarUploadResponse = await uploadToCloudinary(avatarBuffer, `${currentUserId}_avatar`);
      if (avatarUploadResponse?.secure_url) {
        updateData.avatarUrl = avatarUploadResponse.secure_url;
      }
    }
    
    if (profilePageImageFile && profilePageImageFile instanceof File) {
      const profileImageBuffer = Buffer.from(await profilePageImageFile.arrayBuffer());
      const profileImageUploadResponse = await uploadToCloudinary(profileImageBuffer, `${currentUserId}_profilePageImage`);
      if (profileImageUploadResponse?.secure_url) {
        updateData.ProfilePageImage = profileImageUploadResponse.secure_url; // Corrected field name
      }
    }
    
    // Update user in Prisma
    const updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: updateData,
    });
    

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ message: 'Failed to update profile', error }, { status: 500 });
  }
}
