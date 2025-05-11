'use client'

import Link from 'next/link'

import { ThemeToggle } from '@/components/medium/theme-toggle'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { Menu, NotebookPen } from 'lucide-react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useTab } from '@/context/TabContext'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetTitle className="hidden">
              Bridge AI
            </SheetTitle>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='hidden font-serif text-lg font-semibold'>
                <SheetClose asChild>
                  <Link href='/'>Bridge AI</Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-10 text-sm font-medium sm:flex'>
          <li className='font-serif text-lg font-semibold mr-10'>
            <Link href='/'>Bridge AI</Link>
          </li>
          <Tabs />
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

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}

function Tabs() {
  const { selectedTag, setSelectedTag } = useTab()

  return (
    <div className='inline-flex flex-row items-center font-light text-sm gap-10'>
      <Link
        href='/?tab=medium'
        onNavigate={() => setSelectedTag('medium')}
        className={`border-b ${(selectedTag === 'medium' || selectedTag === null) && 'border-b-black border-b-2'}`}
      >
        Medium
      </Link>
      <Link
        href='/?tab=shadcn'
        onNavigate={() => setSelectedTag('shadcn')}
        className={`border-b ${selectedTag === 'shadcn' && 'border-b-black border-b-2'}`}
      >
        Assests
      </Link>
      <Link
        href='/?tab=getpro'
        onNavigate={() => setSelectedTag('getpro')}
        className={`border-b ${selectedTag === 'getpro' && 'border-b-black border-b-2'}`}
      >
        Get Pro
      </Link>
    </div>
  )
}