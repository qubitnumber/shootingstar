import { Alert } from "@/components/shadcn/registry/ui/alerts/alert-1/alert"
import { Button } from "@/components/shadcn/registry/ui/alerts/alert-1/button"
import { X } from "lucide-react"

export default function AlertUserMention() {
  return (
    <Alert
      className="min-w-[400px]"
      layout="complex"
      isNotification
      size="lg"
      action={
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
          aria-label="Close notification"
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
          />
        </Button>
      }
    >
      <div className="flex gap-3">
        <img
          className="size-9 rounded-full"
          src="https://originui.com/avatar-32-01.jpg"
          width={32}
          height={32}
          alt="Mary Palmer"
        />
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <a className="font-medium text-foreground hover:underline" href="#">
                Mary Palmer
              </a>{" "}
              mentioned you in{" "}
              <a className="font-medium text-foreground hover:underline" href="#">
                project-campaign-02
              </a>
              .
            </p>
            <p className="text-xs text-muted-foreground">2 min ago</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Accept</Button>
            <Button size="sm" variant="outline">Decline</Button>
          </div>
        </div>
      </div>
    </Alert>
  )
}

export { AlertUserMention }
