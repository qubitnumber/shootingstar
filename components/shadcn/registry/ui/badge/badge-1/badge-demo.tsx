import { BadgeDelta } from "@/components/shadcn/registry/ui/badge/badge-1/badge-delta"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <BadgeDelta 
        variant="complex"
        deltaType="increase"
        value="13.3%"
      />
      <BadgeDelta 
        variant="complex"
        deltaType="decrease"
        value="1.9%"
      />
      <BadgeDelta 
        variant="complex"
        deltaType="neutral"
        value="0.6%"
      />
    </div>
  )
}