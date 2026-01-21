
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export default function History() {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyses = () => {
            setLoading(true);
            // Get analyses from localStorage
            const data = JSON.parse(localStorage.getItem('carrycalc_analyses') || '[]');
            // Sort by created_at descending (most recent first)
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setAnalyses(data);
            setLoading(false);
        };
        fetchAnalyses();
    }, []);

    const stabilityColors = {
        stable: 'bg-green-100 text-green-800',
        borderline: 'bg-yellow-100 text-yellow-800',
        unstable: 'bg-red-100 text-red-800',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }
    
    return (
        <div className="p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Assessment History</h1>
                <Card>
                    <CardContent className="p-0 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="whitespace-nowrap">Applicant</TableHead>
                                    <TableHead className="whitespace-nowrap">Date</TableHead>
                                    <TableHead className="whitespace-nowrap hidden md:table-cell">Location</TableHead>
                                    <TableHead className="whitespace-nowrap">State</TableHead>
                                    <TableHead className="whitespace-nowrap">Income</TableHead>
                                    <TableHead className="whitespace-nowrap">Stability</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {analyses.map(analysis => (
                                    <TableRow key={analysis.id}>
                                        <TableCell className="font-medium">{analysis.applicant_name}</TableCell>
                                        <TableCell className="whitespace-nowrap">{new Date(analysis.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="hidden md:table-cell">{analysis.location_name}</TableCell>
                                        <TableCell>{analysis.state}</TableCell>
                                        <TableCell className="whitespace-nowrap">${Number(analysis.household_income).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge className={`${stabilityColors[analysis.financial_stability_level]} hover:${stabilityColors[analysis.financial_stability_level]}`}>
                                                {analysis.financial_stability_level}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {analyses.length === 0 && (
                            <div className="text-center p-8 text-gray-500">
                                No assessment history found.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
