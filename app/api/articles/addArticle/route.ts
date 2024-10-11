import { prisma } from "@/app/lib/prisma";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import stream from "stream";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // Parse the incoming form data (image, title, description, content, userId)
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;
    const image = formData.get("image") as File | null;

    let imageUrl = null;

    // If an image is uploaded, upload it to Cloudinary
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());

      // Upload image to Cloudinary via stream
      imageUrl = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "articles", // Folder name for storing images in Cloudinary
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

        const readableStream = new stream.PassThrough();
        readableStream.end(buffer);
        readableStream.pipe(uploadStream); // Pipe the buffer stream to Cloudinary
      });
    }

    // Save article to the database using Prisma
    const newArticle = await prisma.article.create({
      data: {
        title: title ,
        description: description ,
        content: content ,
        image: imageUrl || null, // Cloudinary image URL if an image was uploaded
        userId: userId, // Associate the article with the user
      },
      include: {
        user: true, // Include user information with the article response
      },
    });

    return NextResponse.json({ newArticle }, { status: 200 });
  } catch (error) {
    console.error("Error while publishing article!", error);
    return NextResponse.json(
      { message: "Error while publishing article!" },
      { status: 500 }
    );
  }
}
