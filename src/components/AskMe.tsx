import { useEffect, useRef, useState } from "react"
import { X, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AskMeProps {
  question: string
  onClose: () => void
}

async function sendToAPI(
  messages: Message[],
  onChunk: (text: string) => void
): Promise<void> {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error ?? `Error ${res.status}`)
  }

  const data = await res.json()
  const text = data?.content?.[0]?.text ?? ""
  if (text) onChunk(text)
}

export function AskMe({ question, onClose }: AskMeProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingText, setStreamingText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [followUp, setFollowUp] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialised = useRef(false)

  async function sendMessage(userText: string, history: Message[]) {
    const updatedMessages: Message[] = [...history, { role: "user", content: userText }]
    setMessages(updatedMessages)
    setStreamingText("")
    setLoading(true)
    setError("")

    try {
      let accumulated = ""
      await sendToAPI(updatedMessages, (chunk) => {
        accumulated += chunk
        setStreamingText(accumulated)
        setLoading(false)
      })
      setMessages((prev) => [...prev, { role: "assistant", content: accumulated }])
      setStreamingText("")
    } catch (err: any) {
      setLoading(false)
      setError(err.message ?? "Something went wrong. Try again.")
    }
  }

  useEffect(() => {
    if (!question.trim() || initialised.current) return
    initialised.current = true
    sendMessage(question, [])
  }, [question])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingText, loading])

  function handleSend() {
    const text = followUp.trim()
    if (!text || loading) return
    setFollowUp("")
    sendMessage(text, messages)
  }

  return (
    <div className="w-full mt-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-left relative flex flex-col max-h-[480px]">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors z-10"
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 space-y-5">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <p key={i} className="text-xs text-zinc-500 pr-6">
              <span className="text-cyan-400 font-medium">You:</span>{" "}
              {msg.content}
            </p>
          ) : (
            <div key={i} className="border-t border-zinc-800 pt-4">
              <p className="text-sm text-zinc-100 leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          )
        )}

        {streamingText && (
          <div className="border-t border-zinc-800 pt-4">
            <p className="text-sm text-zinc-100 leading-relaxed whitespace-pre-wrap">
              {streamingText}
            </p>
          </div>
        )}

        {loading && (
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                  style={{
                    animation: "bounce 1.2s ease-in-out infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400 leading-relaxed">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-zinc-800 px-4 py-3 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a follow-up..."
          className="flex-1 text-sm text-zinc-300 placeholder:text-zinc-600 bg-transparent outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!followUp.trim() || loading}
          className="text-cyan-400 hover:text-cyan-300 disabled:text-zinc-600 transition-colors flex-shrink-0"
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </div>

    </div>
  )
}
