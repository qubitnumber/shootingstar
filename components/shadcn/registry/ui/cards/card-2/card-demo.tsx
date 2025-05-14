import Image from "next/image";

import { GlassTimeCard } from "@/components/shadcn/registry/ui/cards/card-2/glass-time-card"

export default function Demo() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-screen bg-cover bg-center flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354')]"
      >
        <GlassTimeCard showSeconds showTimezone />
      </div>
    </div>
  )
}
