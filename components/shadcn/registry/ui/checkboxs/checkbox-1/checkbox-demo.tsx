import { Checkbox } from '@/components/shadcn/registry/ui/checkboxs/checkbox-1/checkbox'
import { Label } from '@/components/shadcn/registry/ui/checkboxs/checkbox-1/label'
import { useId } from 'react'

export default function CheckboxDemo() {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        className="rounded-full data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
        defaultChecked
      />
      <Label
        htmlFor={id}
        className="peer-data-[state=checked]:line-throgh relative after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        Fancy todo item
      </Label>
    </div>
  );
}

