"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { chrome } from "@/content/chrome";
import { routes } from "@/lib/routes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (href: string) => void;
};

// DESIGN.md: ⌘K jumps to Home, Why, or Examine and saves nothing. Esc closes.
export function CommandPalette({ open, onOpenChange, onNavigate }: Props) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label={chrome.palette.label}>
      <Command.Input placeholder={chrome.palette.placeholder} />
      <Command.List data-lenis-prevent>
        <Command.Empty>{chrome.palette.empty}</Command.Empty>
        {routes.map((route) => (
          <Command.Item
            key={route.href}
            value={`${route.label} ${route.href}`}
            onSelect={() => {
              onOpenChange(false);
              onNavigate(route.href);
              router.push(route.href);
            }}
          >
            <span>{route.label}</span>
            <span aria-hidden="true">{route.href}</span>
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
