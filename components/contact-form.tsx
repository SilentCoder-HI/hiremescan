"use client"

import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const inputClass =
  "mt-1.5 flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [topic, setTopic] = useState("General question")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`[HireMeScan] ${topic}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="text-sm font-medium text-slate-800">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className={inputClass}
        >
          <option>General question</option>
          <option>Bug report</option>
          <option>Feature request</option>
          <option>Privacy question</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1.5 flex w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
          placeholder="What is on your mind?"
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          This opens your email app with the message pre-filled.
        </p>
        <Button
          type="submit"
          className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Compose email
        </Button>
      </div>

      {sent && (
        <p
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
          role="status"
        >
          Your email app should have opened. If it did not, email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  )
}
