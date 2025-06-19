import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // For demo purposes, we'll simulate PDF text extraction
    // In a real implementation, you'd use a library like pdf-parse
    const simulatedText = `
    John Doe
    Software Engineer
    
    Experience:
    - 3 years of experience in React and Node.js development
    - Built scalable web applications using modern JavaScript frameworks
    - Experience with database design and API development
    - Worked with agile development methodologies
    
    Skills:
    JavaScript, React, Node.js, Python, SQL, Git, AWS
    
    Education:
    Bachelor of Science in Computer Science
    `

    return NextResponse.json({ text: simulatedText })
  } catch (error) {
    console.error("PDF extraction error:", error)
    return NextResponse.json({ error: "Failed to extract PDF text" }, { status: 500 })
  }
}
