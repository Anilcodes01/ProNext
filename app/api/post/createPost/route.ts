import {prisma} from "@/app/lib/prisma";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import stream from 'stream';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;
    const image = formData.get("image") as File | null;

    let imageUrl = null;

    // If an image is uploaded, upload it to Cloudinary
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer()); // Convert File to Buffer

      // Create a Promise for the upload
      imageUrl = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "posts",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Failed to upload image to Cloudinary"));
            }
            if (result) {
              resolve(result.secure_url); // Get the secure Cloudinary URL
            } else {
              reject(new Error("Upload result is undefined"));
            }
          }
        );

        // Create a readable stream from the buffer and pipe it to Cloudinary
        const readableStream = new stream.PassThrough();
        readableStream.end(buffer);
        readableStream.pipe(uploadStream);
      });
    }

    // Create the post in the database
    const post = await prisma.post.create({
      data: {
        content: content || null,
        image: imageUrl || null, // Save Cloudinary URL if available
        userId: userId,
      },
    });

    return NextResponse.json({ createPost: post }, { status: 200 });
  } catch (error) {
    console.error("Error while creating post!", error);
    return NextResponse.json(
      { message: "Error while creating post!" },
      { status: 500 }
    );
  }
}
