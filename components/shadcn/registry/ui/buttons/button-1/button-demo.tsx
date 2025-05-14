import { RetroButton } from "@/components/shadcn/registry/ui/buttons/button-1/retro-button"

export default function RetroButtonDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap justify-center items-center max-w-[26em] gap-4">
        <RetroButton>Record</RetroButton>
        <RetroButton variant="darkGray">Sound</RetroButton>
        <RetroButton variant="white">Erase</RetroButton>
        <RetroButton variant="lightGray">Shift</RetroButton>
        <RetroButton variant="gray">Play</RetroButton>
      </div>
    </div>
  )
}
