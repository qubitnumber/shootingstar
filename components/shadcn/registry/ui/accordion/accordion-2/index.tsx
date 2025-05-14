import { CodeBlock } from "@/components/ui/code-block";

import Accordion_2 from '@/components/shadcn/registry/ui/accordion/accordion-2/accordion-demo'

function CodeAccordion_2() {
  return (
    <CodeBlock
      language="tsx"
      filename=""
      tabs={[
        {
          name: "Demo.tsx",
          code: AccordionDemoToCode,
          language: "tsx"
        },
        {
          name: "accordion.tsx",
          code: AccordionToCode,
          language: "tsx",
        },
        {
          name: "utils.ts",
          code: CnToCode,
          language: "ts",
        }
      ]}
    />
  )
}

const AccordionDemoToCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion.tsx'

import { getAccordionItems } from '@/lib/utils'

const items = getAccordionItems()

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map(({ title, content }, index) => (
      <AccordionItem
        key={index}
        value={\`item-\${index}\`}
        className="rounded border bg-primary-foreground px-4"
      >
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">{content}</AccordionContent>
      </AccordionItem>
      ))}
    </Accordion>
  );
}
`

const AccordionToCode = `// components/ui/accordion.tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1",
          "items-start justify-between gap-4 rounded-md py-4 text-left",
          "text-sm font-medium transition-all outline-none hover:underline",
          "focus-visible:ring-[3px] disabled:pointer-events-none",
          "disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className={cn(
          "text-muted-foreground pointer-events-none size-4 shrink-0",
          "translate-y-0.5 transition-transform duration-200"
        )} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
`
const CnToCode = `// @/lib/utils

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAccordionItems() {
  return ([
    {
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      title: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      title: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ])
}
`

export { Accordion_2, CodeAccordion_2 }