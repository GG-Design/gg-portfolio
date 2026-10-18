import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type HeroVideoProps = {
  src: string
  label: string
  className?: string
}

function seekToFinalFrame(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return
  video.pause()
  // The exact duration sits past the last painted sample in some browsers.
  video.currentTime = Math.max(0, video.duration - 0.001)
}

export function HeroVideo({ src, label, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playingRef = useRef(false)
  const playGenerationRef = useRef(0)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    playingRef.current = false

    let cancelled = false

    const onReadyForFinalFrame = () => {
      video.removeEventListener("loadedmetadata", onReadyForFinalFrame)
      if (!cancelled) seekToFinalFrame(video)
    }

    const showFinalFrame = () => {
      if (cancelled) return
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        seekToFinalFrame(video)
        return
      }
      video.addEventListener("loadedmetadata", onReadyForFinalFrame)
    }

    if (reduceMotion) {
      showFinalFrame()
      return () => {
        cancelled = true
        video.removeEventListener("loadedmetadata", onReadyForFinalFrame)
        video.pause()
      }
    }

    let playbackBlocked = false

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (!entry || playbackBlocked) return

        const ratio = entry.intersectionRatio

        if (ratio === 0) {
          playGenerationRef.current += 1
          playingRef.current = false
          video.pause()
          if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            video.currentTime = 0
          }
          return
        }

        if (ratio >= 0.35 && !playingRef.current) {
          const generation = ++playGenerationRef.current
          playingRef.current = true
          if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            video.currentTime = 0
          }
          video.play().then(() => {
            if (generation !== playGenerationRef.current || !playingRef.current) {
              video.pause()
              if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
                video.currentTime = 0
              }
            }
          }).catch((error: unknown) => {
            const name = error instanceof DOMException ? error.name : ""
            if (name === "AbortError") return
            playbackBlocked = true
            playingRef.current = false
            showFinalFrame()
          })
        }
      },
      { threshold: [0, 0.35] },
    )

    observer.observe(video)

    return () => {
      cancelled = true
      playGenerationRef.current += 1
      observer.disconnect()
      video.removeEventListener("loadedmetadata", onReadyForFinalFrame)
      video.pause()
    }
  }, [reduceMotion, src])

  const frameSrc = src.includes("#") ? src : `${src}#t=0.001`

  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <video
        ref={videoRef}
        src={frameSrc}
        muted
        playsInline
        preload="auto"
        aria-label={label}
        className="block h-full w-[calc(100%+2px)] max-w-none -ml-px bg-transparent object-cover"
      />
    </div>
  )
}
