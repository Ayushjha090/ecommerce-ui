import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 4,
  delayDuration = 150,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <AnimatePresence>
            {open && (
              <TooltipPrimitive.Content
                side={side}
                align={align}
                sideOffset={sideOffset}
                asChild
                forceMount
              >
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.95, 
                    y: side === "top" ? 4 : side === "bottom" ? -4 : 0, 
                    x: side === "left" ? 4 : side === "right" ? -4 : 0 
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.95, 
                    y: side === "top" ? 4 : side === "bottom" ? -4 : 0, 
                    x: side === "left" ? 4 : side === "right" ? -4 : 0 
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="z-50 overflow-hidden rounded-lg bg-surface-900 px-3 py-1.5 text-xs font-sans font-medium text-surface-50 shadow-soft dark:bg-surface-50 dark:text-surface-900 border border-surface-200/10 select-none"
                >
                  {content}
                  <TooltipPrimitive.Arrow className="fill-surface-900 dark:fill-surface-50" />
                </motion.div>
              </TooltipPrimitive.Content>
            )}
          </AnimatePresence>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
