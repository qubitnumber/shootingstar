import { Accordion_1, CodeAccordion_1 } from '@/components/shadcn/registry/ui/accordion/accordion-1'
import { Accordion_2, CodeAccordion_2 } from '@/components/shadcn/registry/ui/accordion/accordion-2'

import { AiChatsDemo_1, CodeAiChats_1 } from '@/components/shadcn/registry/ui/aichats/aichats-1'

import { AlertsDemo_1, CodeAlerts_1 } from '@/components/shadcn/registry/ui/alerts/alerts-1'


export const navMapPostcard: any = {
  'UI Components/Accordions': [
    {
      compoentTitle: 'Default',
      accordionDemo: Accordion_1,
      codeComponent: CodeAccordion_1,
    },
    {
      compoentTitle: 'Tabs',
      accordionDemo: Accordion_2,
      codeComponent: CodeAccordion_2,
    }
  ],
  'UI Components/AI Chats': [
    {
      compoentTitle: 'Default',
      accordionDemo: AiChatsDemo_1,
      codeComponent: CodeAiChats_1,
    },
  ],
    'UI Components/Alerts': [
    {
      compoentTitle: 'Default',
      accordionDemo: AlertsDemo_1,
      codeComponent: CodeAlerts_1,
    }
  ]
}