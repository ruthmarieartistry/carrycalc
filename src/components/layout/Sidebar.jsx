
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, PlusSquare, History, FileText, HelpCircle, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar({ user, currentPageName, onNavigate }) {
    const [analysisCount, setAnalysisCount] = useState(0);

    useEffect(() => {
        const fetchCounts = () => {
            // Get analyses from localStorage
            const analyses = JSON.parse(localStorage.getItem('carrycalc_analyses') || '[]');
            setAnalysisCount(analyses.length);
        };
        fetchCounts();
    }, [currentPageName]); // Refetch when page changes

    const navItems = [
        { name: 'Dashboard', href: createPageUrl('Dashboard'), icon: Home },
        { name: 'New Assessment', href: createPageUrl('EconomicAnalysis'), icon: PlusSquare },
        { name: 'Assessment History', href: createPageUrl('History'), icon: History },
    ];

    const getActiveClasses = (name) => {
        return currentPageName === name.replace(/\s+/g, '') 
            ? 'bg-gray-100 text-gray-900 font-semibold' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
    };

    return (
        <aside className="w-72 h-full flex-shrink-0 bg-white border-r border-gray-200 flex flex-col p-4 overflow-y-auto">
            <div className="p-4 mb-4 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Created For</p>
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                 <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd6cc9d7c75744747bf789/a12e5cf51_AlceaFontLogo.png" alt="Alcea Logo" className="mx-auto w-36" />
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <Button asChild className="w-full justify-start text-left text-white" style={{ backgroundColor: '#a5630b' }} onClick={onNavigate}>
                    <Link to={createPageUrl('HowToUse')}>
                        <HelpCircle className="w-4 h-4 mr-2" /> How To Use
                    </Link>
                </Button>
                 <Button asChild className="w-full justify-start text-left text-white" style={{ backgroundColor: '#217045' }} onClick={onNavigate}>
                    <Link to={createPageUrl('MethodAndReliability')}>
                        <ClipboardList className="w-4 h-4 mr-2" /> Method & Reliability
                    </Link>
                </Button>
            </div>

            <nav className="flex-1">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navigation</p>
                <ul className="space-y-1">
                    {navItems.map(item => (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                onClick={onNavigate}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${getActiveClasses(item.name)}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="mt-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent Activity</p>
                <div className="space-y-2 text-sm text-gray-600 px-3">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><FileText className="w-4 h-4"/> Assessments</span>
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{analysisCount}</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="text-center text-sm text-gray-500">
                    <p className="font-semibold">CarryCalc</p>
                    <p className="text-xs">Standalone Edition</p>
                </div>
            </div>
        </aside>
    );
}
