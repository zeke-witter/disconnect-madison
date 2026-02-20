'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

export function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Disclosure as="div" className="border-b border-(--secondary-accent)/30">
            <DisclosureButton className="group flex w-full items-center justify-between py-5 text-left cursor-pointer">
                <span className="font-bold text-lg text-(--primary-accent)">{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 shrink-0 text-(--secondary-accent) transition-transform duration-200 group-data-[open]:rotate-180"
                    aria-hidden="true"
                >
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </DisclosureButton>
            <DisclosurePanel
                transition
                className="pb-8 origin-top transition duration-150 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0"
            >
                {children}
            </DisclosurePanel>
        </Disclosure>
    );
}

export function Accordion({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full border-t border-(--secondary-accent)/30">
            {children}
        </div>
    );
}
