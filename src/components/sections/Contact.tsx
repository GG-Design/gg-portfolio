import { useState } from "react"
import { Input }    from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label }    from "@/components/ui/label"
import { Button }   from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Status = "idle" | "loading" | "success" | "error"

interface FormState {
  name:    string
  email:   string
  subject: string
  message: string
  website: string  // honeypot
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "", website: "" }

export function Contact() {
  const [form,    setForm]    = useState<FormState>(EMPTY)
  const [status,  setStatus]  = useState<Status>("idle")
  const [errMsg,  setErrMsg]  = useState("")

  function field(key: keyof Pick<FormState, "name" | "email" | "message" | "website">) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject) return

    setStatus("loading")
    setErrMsg("")

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus("error")
        setErrMsg(data.error ?? "Something went wrong. Please try again.")
      } else {
        setStatus("success")
      }
    } catch {
      setStatus("error")
      setErrMsg("Failed to send. Please check your connection and try again.")
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center px-6 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="border-t border-zinc-800 pt-16">

          <p className="text-xs tracking-[0.2em] uppercase font-light text-zinc-500 mb-4">Contact</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-zinc-50 mb-12">Get in Touch</h2>

          {status === "success" ? (
            <p className="text-lg font-light text-zinc-50">
              Thanks {form.name}. I'll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">

              {/* Honeypot — hidden from real users, traps bots */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={field("website")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={field("name")}
                  required
                  placeholder="Your name"
                  className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={field("email")}
                  required
                  placeholder="you@example.com"
                  className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-zinc-300">What's this about?</Label>
                <Select
                  value={form.subject}
                  onValueChange={(val: string) => setForm(prev => ({ ...prev, subject: val }))}
                >
                  <SelectTrigger
                    id="subject"
                    className="bg-white border-zinc-200 text-zinc-900 data-[placeholder]:text-zinc-400"
                  >
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New role">New role</SelectItem>
                    <SelectItem value="Freelance project">Freelance project</SelectItem>
                    <SelectItem value="Collaboration">Collaboration</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-300">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={field("message")}
                  placeholder="Tell me more..."
                  className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </Button>

              {/* Inline error */}
              {status === "error" && (
                <p className="text-sm text-red-400">{errMsg}</p>
              )}

            </form>
          )}

        </div>
      </div>
    </section>
  )
}
