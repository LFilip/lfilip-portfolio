"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  return (
    <Disclosure as="div" className="border border-zinc-800 rounded-lg overflow-hidden" defaultOpen={defaultOpen}>
      <DisclosureButton className="w-full px-4 py-3 flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 transition-colors text-left">
        <span className="font-medium text-zinc-100">{title}</span>
        <svg
          className="w-5 h-5 text-zinc-400 transition-transform ui-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </DisclosureButton>
      <DisclosurePanel className="px-4 py-4 bg-zinc-950 border-t border-zinc-800">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
}
