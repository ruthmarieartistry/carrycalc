import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, Car, ShoppingCart, Heart, BookOpen, PiggyBank, Scale } from "lucide-react";

export default function CostBreakdown({ analysis }) {
    const monthlyHouseholdIncome = analysis.household_income / 12;
    const totalEstimatedCost = analysis.total_estimated_monthly_cost;

    // Check for valid data to prevent errors
    if (!totalEstimatedCost || totalEstimatedCost <= 0) {
        return (
             <Card className="border-0 shadow-lg">
                <CardHeader style={{ backgroundColor: '#a5630b' }}>
                    <CardTitle className="text-white text-lg font-light flex items-center gap-2">
                        <Scale className="w-5 h-5" />
                        Estimated Monthly Cost of Living
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center text-gray-500">
                    Local cost of living data could not be retrieved for this area.
                </CardContent>
            </Card>
        );
    }
    
    const surplus = monthlyHouseholdIncome - totalEstimatedCost;

    const expenseItems = [
        { category: 'Housing', amount: analysis.avg_housing_cost, icon: Home, color: '#7d2431' },
        { category: 'Transportation', amount: analysis.avg_transportation_cost, icon: Car, color: '#005567' },
        { category: 'Food', amount: analysis.avg_food_cost, icon: ShoppingCart, color: '#a5630b' },
        { category: 'Healthcare', amount: analysis.avg_healthcare_cost, icon: Heart, color: '#217045' },
        { category: 'Other', amount: analysis.avg_other_necessities_cost, icon: BookOpen, color: '#6b7280' }
    ].map(item => ({...item, percentage: (item.amount / totalEstimatedCost) * 100 }));


    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader style={{ backgroundColor: '#a5630b' }}>
                     <CardTitle className="text-white text-lg font-light flex items-center gap-2">
                        <Scale className="w-5 h-5" />
                        Estimated Monthly Cost of Living
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                <p className="text-sm text-gray-600">Applicant's Income</p>
                                <p className="text-lg font-light" style={{ color: '#217045' }}>
                                    ${monthlyHouseholdIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                             <div className="p-2 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                <p className="text-sm text-gray-600">Avg. Local Costs</p>
                                <p className="text-lg font-light" style={{ color: '#7d2431' }}>
                                    ${totalEstimatedCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                        </div>

                        {expenseItems.map((item, index) => (
                            <div key={index} className="space-y-2 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                                        <span className="text-sm font-medium">{item.category}</span>
                                    </div>
                                    <span className="text-sm font-semibold">${(item.amount || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" style={{ '&& > *': { backgroundColor: item.color } }}/>
                            </div>
                        ))}

                        <div className="border-t pt-4 mt-6">
                            <div className="flex justify-between items-center">
                                <span className="font-medium flex items-center gap-2"><PiggyBank className="w-5 h-5 text-green-600" /> Est. Monthly Surplus/Deficit:</span>
                                <span 
                                    className="text-xl font-semibold"
                                    style={{ color: surplus >= 0 ? '#217045' : '#7d2431' }}
                                >
                                    ${surplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}