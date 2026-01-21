
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children, currentPageName }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:relative inset-y-0 left-0 z-40
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <Sidebar user={null} currentPageName={currentPageName} onNavigate={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="lg:hidden h-16" /> {/* Spacer for mobile menu button */}
                {children}
            </main>
        </div>
    );
}
