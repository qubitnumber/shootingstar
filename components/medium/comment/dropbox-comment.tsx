import {
  Pencil,
  Trash2,
  Save,
  Ellipsis,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownComment({
  setEditComment,
  setDelComment,
  isDeleted
}: {
  setEditComment: Function,
  setDelComment: Function,
  isDeleted: boolean
}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='rounded-full'><Ellipsis /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuItem>
          <Button
            disabled={isDeleted}
            variant='ghost'
            onClick={() => setEditComment(true)}
          >
            <Pencil />
            <span className={'text-opacity-80 text-sm text-muted-foreground'}>Edit comment</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            disabled={isDeleted}
            variant='ghost'
            onClick={() => setDelComment(true)}
          >
            <Trash2 />
            <span className={'text-opacity-80 text-sm text-muted-foreground'}>Delete comment</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}