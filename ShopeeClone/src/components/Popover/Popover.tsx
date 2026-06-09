import { FloatingPortal, useFloating, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { useRef, useState, useId, type ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const id = useId()

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }

  return (
    <Element
      className={className}
      ref={(node: Element | null) => refs.setReference(node)}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <div ref={(node) => refs.setFloating(node)} style={floatingStyles}>
              <motion.div
                style={{ transformOrigin: `${middlewareData.arrow?.x}px top` }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute -translate-y-full'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
