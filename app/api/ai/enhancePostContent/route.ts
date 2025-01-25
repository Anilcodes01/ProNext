import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  try {
    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Enhance the following text while STRICTLY maintaining:
  - Only improve clarity and conciseness WITHOUT changing style
  Original text:
  ${content}
  `,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const enhancedContent = aiResponse.data.candidates[0].content.parts[0].text;
    return NextResponse.json({ enhancedContent });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while enhancing the post:",
        error
      },
      { status: 500 }
    );
  }
}
