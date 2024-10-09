import { NextResponse } from "next/server";
import { prisma } from '@/app/lib/prisma'; 
import cloudinary from "cloudinary"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || null);
        }
      }
    );

    
    file.arrayBuffer().then(buffer => {
      uploadStream.end(Buffer.from(buffer));
    }).catch(reject);
  });
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const projectName = formData.get("projectName")?.toString();
    const projectDescription = formData.get("projectDescription")?.toString();
    const projectLink = formData.get("projectLink")?.toString() || null;
    const projectRepoLink = formData.get("projectRepoLink")?.toString() || null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    // Upload image to Cloudinary if provided
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    // Store project details in the database
    const newProject = await prisma.project.create({
      data: {
        projectName: projectName || "",
        projectDescription: projectDescription || "",
        projectLink: projectLink,
        projectRepoLink: projectRepoLink,
        image: imageUrl || "",
        userId: session.user.id, // Associate project with the logged-in user
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error uploading project:", error);
    return NextResponse.json({ error: "Failed to upload project" }, { status: 500 });
  }
}
