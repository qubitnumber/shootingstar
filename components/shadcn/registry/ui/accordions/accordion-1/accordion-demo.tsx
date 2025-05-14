import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/registry/ui/accordions/accordion-1/accordion'

import { getAccordionItems } from '@/components/shadcn/registry/ui/accordions/accordion-items'

const items = getAccordionItems()

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
    {items.map(({ title, content }, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
      >
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    ))}
    </Accordion>
  )
}

