import Link from 'next/link'

import { ThemeToggle } from '@/components/medium/theme-toggle'
import InputSearch from '@/components/medium/input-search'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'

import { Menu, NotebookPen } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='font-serif text-2xl font-semibold'>
                <SheetClose asChild>
                  <Link href='/'>Bridge AI</Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
          <li className='font-serif text-xl font-semibold'>
            <Link href='/'>Bridge AI</Link>
          </li>
          <InputSearch />
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />

          <SignedIn>
            <Button size='sm' variant='secondary' asChild>
              <Link href='/write'>
                <NotebookPen className='h-6 w-6' />
                <p>Write</p>
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
            {/* <Badge className='text-sm' variant="destructive"><SignOutButton redirectUrl= "/" /></Badge> */}
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}