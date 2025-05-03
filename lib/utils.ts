import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function createSlugFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 10)
  const word = await generateRandomWord(5)
  return slug.concat('-', word)
}

export function createAtTagFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  const numbers = getRandomNumberWithDigits(5)
  return '@' + slug.concat('-', numbers.toString())
}

function getRandomNumberWithDigits(digits: number) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function generateRandomWord(length: number) {
  const word = fetch(`https://random-word-api.herokuapp.com/word?length=${length}`)
    .then(response => response.json())
    .then(data => data[0])
  return word
} 

export function combineName(
  user: { firstName?: string; lastName?: string } | null
) {
  if (!user) return 'Anonymous'
  if (!user.firstName && !user.lastName) return 'Anonymous'
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

export function formatDate(date: number) {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  return formatter.format(date)
}

export function makeid(length: number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}