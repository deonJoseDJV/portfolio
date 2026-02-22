import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= LOCAL FALLBACK =================
function getLocalReply(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("work"))
    return "I build modern full-stack applications using MERN and Next.js.";

  if (msg.includes("about"))
    return "I'm Deon Jose, a passionate full-stack developer focused on scalable web apps.";

  if (msg.includes("skills"))
    return "My core skills include React, Next.js, Node.js, MongoDB, and modern UI development.";

  if (msg.includes("contact"))
    return "You can reach me through the contact section below — I'd love to connect!";

  return "I'd be happy to tell you more about my work, skills, or experience 😊";
}

// ================= SYSTEM PROMPT =================
const SYSTEM_PROMPT = `
You are Deon Jose's portfolio AI assistant.

Rules:
- Only answer about Deon Jose.
- Keep responses short and friendly.
- Do not invent fake information.
`;

// ================= MAIN =================
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 🔥 TRY OPENAI FIRST
    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      });

      const reply = completion.choices[0]?.message?.content;

      if (reply) {
        return NextResponse.json({ reply });
      }
    } catch (openaiError: any) {
      // ✅ FALLBACK TRIGGER
      console.log("OpenAI failed, using fallback");
    }

    // 🧠 LOCAL FALLBACK (always works)
    return NextResponse.json({
      reply: getLocalReply(message),
    });

  } catch (error) {
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}