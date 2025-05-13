import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/registry/ui/accordion/accordion-1/accordion'

import { getAccordionItems } from '@/components/shadcn/registry/ui/accordion/accordion-items'

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

