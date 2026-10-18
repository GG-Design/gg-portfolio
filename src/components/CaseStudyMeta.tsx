import { Children, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

export type ClientLogo = {
  src: string
  alt: string
}

type CaseStudyMetaProps = {
  children: ReactNode
  clientLogo?: ClientLogo
}

export function CaseStudyMeta({ children, clientLogo }: CaseStudyMetaProps) {
  const reduceMotion = useReducedMotion() === true

  const containerVariants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { delayChildren: 0, staggerChildren: 0 }
        : { delayChildren: 0.15, staggerChildren: 0.08 },
    },
  }

  const pillVariants = reduceMotion
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, x: -12 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease },
        },
      }

  return (
    <div
      className={cn(
        "mb-6 flex w-full flex-col items-start",
        "lg:flex-row lg:items-center lg:justify-between",
      )}
    >
      <motion.div
        className="order-2 flex flex-wrap gap-2 lg:order-1"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {Children.map(children, (child, index) => (
          <motion.div key={index} className="w-fit" variants={pillVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>

      {clientLogo ? (
        <motion.div
          className={cn("order-1 mb-6 h-10 w-32 shrink-0 lg:order-2 lg:mb-0")}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0, delay: 0 }
              : { delay: 0.7, duration: 0.7, ease }
          }
        >
          <img
            src={clientLogo.src}
            alt={clientLogo.alt}
            className={cn("h-10 w-32 object-contain object-left lg:object-right")}
          />
        </motion.div>
      ) : null}
    </div>
  )
}
