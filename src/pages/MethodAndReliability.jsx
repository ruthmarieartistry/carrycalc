
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function MethodAndReliability() {
    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Method & Reliability</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Our Methodology</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-700">
                        <h3 className="font-semibold text-lg mt-4">How We Get the Data</h3>
                        <p>CarryCalc uses official government data sources to provide accurate benefit thresholds for your area:</p>

                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Section 8 Housing:</strong> County-specific income limits come directly from the U.S. Department of Housing and Urban Development (HUD) FY 2025 dataset. We have all 4,764 counties pre-loaded in the app.</li>
                            <li><strong>SNAP (Food Stamps):</strong> Based on the 2025 Federal Poverty Guidelines published by the Department of Health and Human Services. SNAP uses 130% of the poverty level as the income limit.</li>
                            <li><strong>Medicaid:</strong> Uses state-specific rules. States that expanded Medicaid use 138% of the federal poverty level. States that didn't expand have much lower limits that vary by state.</li>
                            <li><strong>Cost of Living:</strong> Based on data from the MIT Living Wage Calculator and Bureau of Labor Statistics for average expenses in your state.</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-6">When to Update</h3>
                        <p>Government benefit programs update their numbers on a regular schedule:</p>

                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>HUD Section 8 Limits:</strong> Updated annually, usually released in March-April for the new fiscal year (October 1st). Check <a href="https://www.huduser.gov/portal/datasets/il.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">HUD's Income Limits page</a>.</li>
                            <li><strong>Federal Poverty Guidelines (SNAP/Medicaid):</strong> Updated annually in January by HHS. Check the <a href="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">HHS Poverty Guidelines page</a>.</li>
                            <li><strong>State Medicaid Rules:</strong> Can change when states expand or modify their programs. Check your state's Medicaid website for changes.</li>
                        </ul>

                        <p className="text-sm text-gray-600 mt-4"><strong>Current Data:</strong> This app is loaded with FY 2025 data (effective January-October 2025). The next update should be done around January 2026 for new poverty guidelines and April 2026 for new HUD limits.</p>

                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Important Disclaimer</AlertTitle>
                            <AlertDescription>
                               The figures provided by CarryCalc are estimates for informational purposes only and should not be considered financial or legal advice. These income limits are just one part of eligibility - actual qualification for benefits depends on many other factors including assets, citizenship status, work requirements, and program-specific rules. Always contact your local benefits office for official eligibility determination.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
