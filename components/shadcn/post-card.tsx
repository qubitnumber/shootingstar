import React, { ComponentType } from 'react';

import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

import { ChevronsLeftRight } from 'lucide-react'


export default function PostCard({
  compoentTitle,
  ComponentDemo,
  CodeComponent,
}: Readonly<{
  compoentTitle: string,
  ComponentDemo: ComponentType,
  CodeComponent: ComponentType,
}>) {
  return (
    <div>
      <div className='flex justify-between'>
      <span className={'text-opacity-80 text-sm mt-5 ml-1'}>{compoentTitle}</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className='mt-3'>
              <ChevronsLeftRight />
              Code
            </Button>
          </PopoverTrigger>
          <PopoverContent align='center' sideOffset={-40} className="w-full p-0">  
            <CodeComponent />
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-center items-center pt-5">
        <ComponentDemo />
      </div>
    </div>
  )
}
