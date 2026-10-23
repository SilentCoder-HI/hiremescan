import { NextResponse } from "next/server"
import pdfParse from "pdf-parse/lib/pdf-parse.js"

export const runtime = "nodejs"
export const maxDuration = 60

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MIN_TEXT_LENGTH = 80

function cleanPdfText(raw: string) {
  return raw
    .replace(/\u0000/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume")

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No resume file was provided.", code: "NO_FILE" },
        { status: 400 }
      )
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty.", code: "EMPTY_FILE" },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "The file is larger than the 10 MB limit.", code: "FILE_TOO_LARGE" },
        { status: 413 }
      )
    }

    const isPdfMime = file.type === "application/pdf"
    const isPdfExtension = file.name.toLowerCase().endsWith(".pdf")
    if (!isPdfMime && !isPdfExtension) {
      return NextResponse.json(
        { error: "Please upload a PDF file.", code: "NOT_PDF" },
        { status: 415 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (!buffer.subarray(0, 1024).toString("latin1").includes("%PDF-")) {
      return NextResponse.json(
        { error: "That file does not appear to be a valid PDF.", code: "INVALID_PDF" },
        { status: 415 }
      )
    }

    const parsed = await pdfParse(buffer)
    const text = cleanPdfText(parsed.text)

    if (text.length < MIN_TEXT_LENGTH) {
      return NextResponse.json(
        {
          error:
            "We could not read meaningful text from this PDF. It may be a scanned image. Please upload a text-based PDF exported from your resume editor.",
          code: "NO_TEXT",
        },
        { status: 422 }
      )
    }

    return NextResponse.json({
      text,
      pages: parsed.numpages,
      characters: text.length,
    })
  } catch (error) {
    console.error("PDF extraction error:", error)
    return NextResponse.json(
      {
        error:
          "We could not read that PDF. Try exporting it again as a text-based PDF and retry.",
        code: "EXTRACTION_FAILED",
      },
      { status: 500 }
    )
  }
}
