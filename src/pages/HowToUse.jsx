import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function HowToUse() {
    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">How To Use CarryCalc</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-700">
                        <p><strong>1. Start an Assessment:</strong> Navigate to "New Assessment" from the sidebar.</p>
                        <p><strong>2. Enter Details:</strong> Fill in all the fields in the form: Household/Applicant Name, Annual Household Income, Household Size, and the 5-digit ZIP Code.</p>
                        <p><strong>3. Run Analysis:</strong> Click the "Perform Stability Assessment" button to have the AI analyze the financial data against local benchmarks.</p>
                        <p><strong>4. Review Results:</strong> The results page will show you the income thresholds for key assistance programs (Public Housing, SNAP, Medicaid) and a final stability assessment—Stable, Borderline, or Unstable.</p>
                        <p><strong>5. View History:</strong> Find all past assessments you've run on the "Assessment History" page.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}