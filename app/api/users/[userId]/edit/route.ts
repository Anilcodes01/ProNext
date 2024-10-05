import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/app/lib/prisma';  // Import your Prisma instance
import { authOptions } from '@/app/lib/authOptions'; // Adjust the import path according to your setup
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to handle Cloudinary upload using a Promise
const uploadToCloudinary = (buffer: Buffer, publicId: string) => {
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
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer); // Pass the buffer into the upload stream
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
  const file = formData.get('avatar'); // File object from the form data (if provided)

  try {
    // Retrieve the current user from the database
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Prepare update data with current values as fallback
    let updateData: any = {
      name: name || currentUser.name,
      bio: bio || currentUser.bio,
      city: city || currentUser.city,
      website: website || currentUser.website,
    };

    // If a new avatar image is provided, upload it to Cloudinary
    if (file && file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse: any = await uploadToCloudinary(buffer, `${currentUserId}_profile_pic`);

      if (uploadResponse && uploadResponse.secure_url) {
        updateData.avatarUrl = uploadResponse.secure_url;
      }
    }

    // Update the user with the modified data
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
