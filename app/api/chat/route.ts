import { NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = { role: "user" | "assistant"; content: string };

// ✅ OpenAI client (falls back to OpenRouter if that key is set instead)
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
const useOpenRouter = !process.env.OPENAI_API_KEY && !!process.env.OPENROUTER_API_KEY;

const client = new OpenAI({
  apiKey,
  ...(useOpenRouter ? { baseURL: "https://openrouter.ai/api/v1" } : {}),
  // Fail fast to the local fallback instead of hanging on retries
  // (e.g. behind a corporate proxy that breaks TLS to the API).
  maxRetries: 1,
  timeout: 8000,
});

const MODEL = useOpenRouter ? "deepseek/deepseek-chat" : "gpt-4o-mini";

// ================= LOCAL FALLBACK =================
function getLocalReply(message: string): string {
  const msg = (message || "").toLowerCase();
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
    const body = await req.json().catch(() => ({}));

    // Accept either a full conversation (`messages`) or a single `message`.
    const history: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages.filter(
          (m: any) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
      : [];

    const latest =
      typeof body.message === "string"
        ? body.message
        : history.filter((m) => m.role === "user").at(-1)?.content ?? "";

    if (!latest.trim() && history.length === 0) {
      return NextResponse.json(
        { reply: "Please ask a question 🙂" },
        { status: 400 }
      );
    }

    const conversation: ChatMessage[] =
      history.length > 0 ? history : [{ role: "user", content: latest }];

    // 🔥 TRY THE MODEL FIRST (only if a key is configured)
    if (apiKey) {
      try {
        const completion = await client.chat.completions.create({
          model: MODEL,
          temperature: 0.4,
          messages: [
            // System prompt + the actual facts about Deon so answers are accurate.
            { role: "system", content: `${SYSTEM_PROMPT}\n\n${DEON_CONTEXT}` },
            ...conversation,
          ],
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return NextResponse.json({ reply });
        }
      } catch (modelError) {
        console.error("Chat model failed, using local fallback:", modelError);
      }
    }

    // 🧠 LOCAL FALLBACK (always works)
    return NextResponse.json({ reply: getLocalReply(latest) });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}