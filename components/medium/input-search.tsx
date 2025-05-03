"use client"

import { useEffect, useMemo, useState } from "react"
import { useQuery } from 'convex/react'
import { Check, Hash, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useSearch } from '@/context/SearchContext';
import { api } from '@/convex/_generated/api'

export default function InputSearch() {
  const [open, setOpen] = useState(false)
  const { searchTag, setSearchTag } = useSearch()
  const [searchItems, setSearchItems] = useState<{value: string | undefined, label: string | undefined}[]>([])
  const tags = useQuery(api.posts.getPosTags)

  useEffect(() => {
    if (tags && tags.length) {
      const items = tags.map((tag) => ({
        value: tag?.toString().toLowerCase(),
        label: tag?.toString().toUpperCase()
      }))
      setSearchItems(items)
    }
  }, [tags])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[210px] justify-between"
        >
          {searchTag
            ? searchItems.find((searchItem) => searchItem.value === searchTag)?.label
            : "Select tag..."}
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {searchItems.map((searchItem) => (
                <CommandItem
                  key={searchItem.value}
                  value={searchItem.value}
                  onSelect={(currentValue) => {
                    setSearchTag(currentValue === searchTag ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <div className='flex items-center gap-1'>
                    <Hash className='h-2 w-2' />
                    {searchItem.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        searchTag === searchItem.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
