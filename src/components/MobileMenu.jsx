import { useState } from 'react';

export default function MobileMenu({ currentPath }) {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Toggle menu"
            >
                <span
                    className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-gray-900 transition-opacity ${isOpen ? 'opacity-0' : ''
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}
                />
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <span className="text-lg font-semibold text-gray-900">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Close menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-6">
                        <ul className="space-y-4">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${currentPath === link.href
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Astro Starter Kit</p>
                    </div>
                </div>
            </div>
        </>
    );
}
