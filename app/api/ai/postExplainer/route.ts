import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function POST(req: NextRequest) {

    const {content} = await req.json();

    if(!content) {
        return NextResponse.json({
            message: 'Post content is required...!'
        }, {status: 401})
    }

    try {
        const aiResponse = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Explain this post content in deep and thorough and make it more understandable without losing the context, Original text:${content}`,
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
      
          const explainedContent = aiResponse.data.candidates[0].content.parts[0].text;
          return NextResponse.json({ explainedContent });
    } catch (error) {
        return NextResponse.json({
            message: 'Error while fetching explained post from ai...!',
            error
        },{status: 500})
    }
    
}