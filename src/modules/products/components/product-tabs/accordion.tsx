import { clsx as clx } from "clsx"
import { Text } from "@/modules/common/components/ui"
import { Accordion } from "@base-ui/react/accordion"
import React from "react"

type AccordionItemProps = React.ComponentProps<typeof Accordion.Item> & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps = Omit<
  React.ComponentProps<typeof Accordion.Root>,
  "multiple"
> & {
  type?: "single" | "multiple"
}

const AccordionWrapper: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, type, ...props }) => {
  return (
    <Accordion.Root {...props} multiple={type === "multiple"}>
      {children}
    </Accordion.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (
    <Accordion.Item
      {...props}
      className={clx(
        "border-grey-20 group border-t last:mb-0 last:border-b",
        "py-3",
        className
      )}
    >
      <Accordion.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text className="text-ui-fg-subtle text-sm">{title}</Text>
            </div>
            <Accordion.Trigger className="group/trigger">
              {customTrigger || <MorphingTrigger />}
            </Accordion.Trigger>
          </div>
          {subtitle && (
            <Text as="span" size="small" className="mt-1">
              {subtitle}
            </Text>
          )}
        </div>
      </Accordion.Header>
      <Accordion.Panel
        className={clx(
          "overflow-hidden transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 h-[var(--accordion-panel-height)] [&:not([data-open])]:pointer-events-none px-1"
        )}
      >
        <div className="inter-base-regular">
          {description && <Text>{description}</Text>}
          <div className="w-full">{children}</div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

AccordionWrapper.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="text-grey-90 hover:bg-grey-5 active:bg-grey-5 active:text-violet-60 focus:border-violet-60 disabled:text-grey-30 bg-transparent disabled:bg-transparent rounded-rounded group relative p-[6px]">
      <div className="h-5 w-5">
        <span className="bg-grey-50 rounded-circle group-data-[panel-open]/trigger:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] duration-300" />
        <span className="bg-grey-50 rounded-circle group-data-[panel-open]/trigger:rotate-90 group-data-[panel-open]/trigger:left-1/2 group-data-[panel-open]/trigger:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] duration-300" />
      </div>
    </div>
  )
}

export default AccordionWrapper
