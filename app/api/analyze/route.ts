import { analyzeResumeWithGroq } from "@/lib/groq";

export async function POST(req: Request) {
  const { resumeText, jobDescription } = await req.json();

  try {
    const analysis = await analyzeResumeWithGroq(resumeText, jobDescription);
    return Response.json({ analysis });
  } catch (err) {
    console.error("Groq error:", err);
    return Response.json({ error: "Groq API failed" }, { status: 500 });
  }
}
