// lib/groq.ts
import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function analyzeResumeWithGroq(resume: string, job: string) {
  const prompt = `
Analyze the resume against the job description and provide:

1. Overall match score (0-100)
2. Missing keywords
3. Resume strengths
4. Areas for improvement
5. ATS compatibility score (0-100)
6. Specific actionable recommendations

RESUME:
${resume}

JOB DESCRIPTION:
${job}
`;

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: "llama3-70b-8192", // 👈 No extra {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7, // optional, controls creativity
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}
