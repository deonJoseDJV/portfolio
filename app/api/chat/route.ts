import { NextResponse } from "next/server";
import OpenAI from "openai";

// ✅ OpenRouter client (OpenAI-compatible)
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ================= LOCAL FALLBACK =================
function getLocalReply(message: string): string {
  const msg = message.toLowerCase();
  // ================= INTERVIEW ANSWERS =================

if (msg.includes("weakness"))
  return "One area I'm actively improving is balancing perfection with speed. I sometimes spend extra time refining details, but I've been getting better at prioritizing delivery while maintaining quality.";

if (msg.includes("strength"))
  return "My biggest strength is building scalable full-stack applications end-to-end. I combine strong problem-solving with clean UI focus.";

if (msg.includes("five years") || msg.includes("5 years"))
  return "In the next five years, I aim to grow into a strong full-stack engineer working on impactful products, while deepening my expertise in scalable systems and AI integration.";

if (msg.includes("why should we hire"))
  return "Because I bring strong full-stack fundamentals, real project experience, and a mindset focused on continuous learning and delivering clean, scalable solutions.";

if (msg.includes("goal") || msg.includes("career goal"))
  return "My goal is to build impactful software that solves real problems while continuously growing as a full-stack engineer.";

if (msg.includes("challenge") || msg.includes("difficult"))
  return "One challenge I enjoy tackling is breaking down complex problems into scalable, maintainable solutions — especially in full-stack systems.";
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
// ================= DEON FACTS =================
const DEON_CONTEXT = `
Name: Deon Jose
Role: Full-stack Developer

Education:
- Computer Science undergraduate at College of Engineering Trivandrum (CET)

Core Skills:
- React
- Next.js
- Node.js
- MongoDB
- Tailwind CSS
- MERN Stack
- AI/ML basics
- Data Science fundamentals

Projects:
- Lost & Found Tracker
- Zerodha Clone
- GPT Portfolio Assistant

Focus Areas:
- Full-stack development
- AI/ML
- Data-driven applications

Important:
- Do NOT mention skills like UI/UX design, video editing, graphic design unless explicitly listed above.
`;
// ================= SYSTEM PROMPT =================
const SYSTEM_PROMPT = `
You are Deon Jose's personal portfolio AI assistant.

ABOUT DEON:
- Full-stack developer
- Focus: MERN, Next.js, AI/ML
- Strong in scalable web apps and modern UI
- Hackathon competitor
- Based in India

RULES:
- Only answer about Deon Jose
- Keep answers short and confident
- Do NOT mention skills he does NOT have
- Do NOT invent fake experience
- If unsure, say briefly and safely
- Tone: friendly, professional, human

INTERVIEW MODE:
- If user asks HR/interview questions (weakness, strengths, 5 years, etc.)
- Answer like Deon speaking professionally
`;
// ================= MAIN =================
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 🔥 TRY OPENROUTER FIRST
    try {
      const completion = await client.chat.completions.create({
        // ⭐ BEST CHEAP MODEL (recommended)
        model: "deepseek/deepseek-chat",

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
    } catch (openrouterError: any) {
      console.log("OpenRouter failed, using fallback");
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