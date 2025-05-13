import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/registry/ui/accordion/accordion-2/accordion'

import { getAccordionItems } from '@/components/shadcn/registry/ui/accordion/accordion-items'

const items = getAccordionItems()

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map(({ title, content }, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className="rounded border bg-primary-foreground px-4"
      >
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">{content}</AccordionContent>
      </AccordionItem>
      ))}
    </Accordion>
  );
}
