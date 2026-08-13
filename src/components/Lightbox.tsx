import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface LightboxImage {
  src: string
  alt: string
}

/** Manages which image (if any) is open in the lightbox. */
export function useLightbox() {
  const [image, setImage] = useState<LightboxImage | null>(null)
  const open = useCallback((src: string, alt: string) => setImage({ src, alt }), [])
  const close = useCallback(() => setImage(null), [])
  return { image, open, close }
}

/** Fullscreen image overlay — fade in/out, closes on backdrop click or Escape. Click the image to toggle full-resolution zoom. */
export function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    setZoomed(false)
  }, [image])

  useEffect(() => {
    if (!image) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [image, onClose])

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-[100] flex bg-black/90 p-6 md:p-12
                      ${zoomed ? "overflow-auto" : "items-center justify-center"}`}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed top-5 right-5 z-[110] flex h-10 w-10 items-center justify-center
                       rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.img
            key="lightbox-image"
            src={image.src}
            alt={image.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={zoomed
              ? "m-auto block max-w-none rounded-lg shadow-2xl cursor-zoom-out"
              : "m-auto block max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-in"}
            onClick={(e) => {
              e.stopPropagation()
              setZoomed(z => !z)
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
