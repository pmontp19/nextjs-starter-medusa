"use client"

import React, {
  createElement,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  ElementType,
} from "react"
import { clsx } from "clsx"
import { cn } from "@/modules/common/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Toaster as SonnerToaster, toast } from "sonner"
import { Loader2 } from "lucide-react"
import useToggleState from "@lib/hooks/use-toggle-state"

export { clsx as clx }
export { cn }
export { toast }
export { useToggleState }
export const Toaster = SonnerToaster

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700 border border-gray-200",
        secondary: "bg-ui-bg-subtle text-ui-fg-subtle",
        success: "bg-green-100 text-green-700 border border-green-200",
        danger: "bg-red-100 text-red-700 border border-red-200",
        warning: "bg-orange-100 text-orange-700 border border-orange-200",
        error: "bg-red-600 text-white",
        info: "bg-blue-100 text-blue-700 border border-blue-200",
        primary:
          "ring-1 ring-ui-border-base text-ui-fg-base focus-visible:ring-2",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        base: "text-sm px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
)

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

type IconBadgeProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
} & VariantProps<typeof badgeVariants>

const IconBadge = forwardRef<HTMLDivElement, IconBadgeProps>(
  ({ variant, size, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        badgeVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
IconBadge.displayName = "IconBadge"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ui-fg-on-color text-white hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed focus-visible:ring-2 focus:bg-ui-fg-base",
        secondary:
          "bg-white text-black hover:bg-ui-bg-subtle text-ui-fg-subtle active:bg-ui-bg-subtle focus-visible:ring-2 border border-ui-border-base",
        transparent: "bg-transparent text-gray-900 hover:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        small: "h-8 px-2 text-sm",
        base: "h-10 px-4 text-base",
        large: "h-12 px-6 text-large",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
)

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    href?: string
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, className, isLoading, children, disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
)
Button.displayName = "Button"

type IconButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: "transparent" | "primary" | "secondary"
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "transparent", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors",
        {
          "bg-transparent hover:bg-gray-100": variant === "transparent",
          "bg-black text-white hover:bg-gray-800": variant === "primary",
          "bg-white border border-gray-200 hover:bg-gray-50":
            variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
IconButton.displayName = "IconButton"

type HeadingProps = {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className">

const Heading = ({
  level = "h1",
  className,
  children,
  ...props
}: HeadingProps) => {
  return createElement(level, { className, ...props }, children)
}

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Component = "p", className, children, ...props }, ref) => (
    <Component ref={ref} className={cn(className)} {...props}>
      {children}
    </Component>
  )
)
Text.displayName = "Text"

type ContainerProps = HTMLAttributes<HTMLDivElement>

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-rounded bg-white p-4 shadow-borders-base",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Container.displayName = "Container"

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm",
        "placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  size?: "small" | "large" | "xlarge"
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        {
          "text-xs": size === "small",
          "text-base": size === "large",
          "text-lg": size === "xlarge",
        },
        className
      )}
      {...props}
    />
  )
)
Label.displayName = "Label"

type CheckboxProps = HTMLAttributes<HTMLButtonElement> & {
  checked?: boolean
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => (
    <button
      ref={ref}
      role="checkbox"
      type="button"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "h-5 w-5 shrink-0 rounded-sm border border-gray-300",
        "flex items-center justify-center transition-colors",
        checked && "bg-black border-black text-white",
        className
      )}
      {...props}
    >
      {checked && <Loader2 className="h-4 w-4" />}
    </button>
  )
)
Checkbox.displayName = "Checkbox"

interface RadioGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  checked?: boolean
}

const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, checked, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      value={value}
      className={className}
      {...props}
    />
  )
)
RadioGroupItem.displayName = "RadioGroupItem"

interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string
  onValueChange?: (value: string) => void
  onChange?: (value: string) => void
  children?: ReactNode
}

interface RadioGroupComponent extends React.ForwardRefExoticComponent<
  RadioGroupProps & React.RefAttributes<HTMLDivElement>
> {
  Item: typeof RadioGroupItem
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onValueChange, onChange, className, children, ...props }, ref) => (
    <div ref={ref} role="radiogroup" className={className} {...props}>
      {Children.map(children, (child) => {
        if (
          isValidElement<RadioGroupItemProps>(child) &&
          child.type === RadioGroupItem
        ) {
          const childValue = child.props.value
          return cloneElement(child, {
            checked: childValue === value,
            onChange: () => {
              onValueChange?.(childValue)
              onChange?.(childValue)
            },
          })
        }
        return child
      })}
    </div>
  )
) as unknown as RadioGroupComponent
RadioGroup.displayName = "RadioGroup"
RadioGroup.Item = RadioGroupItem

interface TableComponent extends React.FC<HTMLAttributes<HTMLTableElement>> {
  Header: React.FC<HTMLAttributes<HTMLTableSectionElement>>
  Body: React.FC<HTMLAttributes<HTMLTableSectionElement>>
  Row: React.FC<HTMLAttributes<HTMLTableRowElement>>
  Cell: React.FC<HTMLAttributes<HTMLTableCellElement>>
  HeaderCell: React.FC<HTMLAttributes<HTMLTableCellElement>>
}

const TableBase = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) => (
  <table
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
)

const TableHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
)

const TableBody = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)

const TableRow = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b border-gray-200 transition-colors hover:bg-gray-50/50",
      className
    )}
    {...props}
  />
)

const TableCell = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("p-4 align-middle", className)} {...props} />
)

const TableHeaderCell = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-500",
      className
    )}
    {...props}
  />
)

const Table = TableBase as TableComponent
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.HeaderCell = TableHeaderCell

export {
  Badge,
  IconBadge,
  Button,
  IconButton,
  Heading,
  Text,
  Container,
  Input,
  Label,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Table,
}
