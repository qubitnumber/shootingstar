import { CodeBlock } from "@/components/ui/code-block";

import AlertsDemo_1 from '@/components/shadcn/registry/ui/alerts/alert-1/alert-demo'

function CodeAlerts_1() {
  return (
    <CodeBlock
      language="tsx"
      filename=""
      tabs={[
        {
          name: "Demo.tsx",
          code: AlertsDemoToCode,
          language: "tsx"
        },
        {
          name: "alert.tsx",
          code: AlertToCode,
          language: "tsx",
        },
        {
          name: "button.tsx",
          code: ButtonToCode,
          language: "tsx",
        }
      ]}
    />
  )
}

const AlertsDemoToCode = `import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
`

const AlertToCode = ` // @/components/ui/alert
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva("relative rounded-lg border", {
  variants: {
    variant: {
      default: "border-border bg-background",
      warning: "border-amber-500/50 text-amber-600",
      error: "border-red-500/50 text-red-600",
      success: "border-emerald-500/50",
      info: "border-blue-500/50 text-blue-600",
    },
    size: {
      sm: "px-4 py-3",
      lg: "p-4",
    },
    isNotification: {
      true: "z-[100] max-w-[400px] bg-background shadow-lg shadow-black/5",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    isNotification: false,
  },
})

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  layout?: "row" | "complex"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      isNotification,
      icon,
      action,
      layout = "row",
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant, size, isNotification }),
        className,
      )}
      {...props}
    >
      {layout === "row" ? (
        // Однострочный вариант
        <div className="flex items-center gap-2">
          <div className="grow flex items-center">
            {icon && <span className="me-3 inline-flex">{icon}</span>}
            {children}
          </div>
          {action && <div className="flex items-center shrink-0">{action}</div>}
        </div>
      ) : (
        // Многострочный вариант
        <div className="flex gap-2">
          {icon && children ? (
            <div className="flex grow gap-3">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <div className="grow">{children}</div>
            </div>
          ) : (
            <div className="grow">
              {icon && <span className="me-3 inline-flex">{icon}</span>}
              {children}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  ),
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("text-sm font-medium", className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
AlertContent.displayName = "AlertContent"

export { Alert, AlertTitle, AlertDescription, AlertContent }
`

const ButtonToCode = ` // @/components/ui/button
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
`

export { AlertsDemo_1, CodeAlerts_1 }