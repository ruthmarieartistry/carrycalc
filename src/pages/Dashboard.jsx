import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Dashboard() {
    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to CarryCalc</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>This is your dashboard. Use the sidebar to navigate the application.</p>
                            <p className="mt-4">You can start a new assessment or view past results.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}