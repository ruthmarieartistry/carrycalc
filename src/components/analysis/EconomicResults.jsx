
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShieldAlert, ShieldCheck, Shield, User, TrendingUp, Home, ShoppingCart, Heart, Users } from "lucide-react";

export default function EconomicResults({ analysis }) {
    const getStabilityInfo = (level) => {
        switch (level) {
            case 'stable':
                return {
                    color: '#217045',
                    text: 'Stable',
                    icon: ShieldCheck
                };
            case 'borderline':
                return {
                    color: '#e1b321',
                    text: 'Borderline',
                    icon: Shield
                };
            case 'unstable':
                return {
                    color: '#7d2431',
                    text: 'Unstable',
                    icon: ShieldAlert
                };
            default:
                return {
                    color: '#005567',
                    text: 'Unknown',
                    icon: Shield
                };
        }
    };

    const stabilityInfo = getStabilityInfo(analysis.financial_stability_level);
    const householdIncome = Number(analysis.household_income) || 0;
    const monthlyIncome = householdIncome / 12;
    
    // Get annual thresholds directly from analysis
    const publicHousingThreshold = Number(analysis.public_housing_threshold) || 0;
    const snapThreshold = Number(analysis.snap_threshold) || 0;
    const medicaidThreshold = Number(analysis.medicaid_threshold) || 0;
    
    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader style={{ backgroundColor: '#005567' }}>
                    <CardTitle className="text-white text-xl font-light flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="w-6 h-6" />
                            <div>
                                <div>{analysis.applicant_name}</div>
                                <div className="text-sm font-normal opacity-90">{analysis.location_name}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-normal opacity-90">Annual Income</div>
                            <div className="text-lg font-semibold">${householdIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <DollarSign className="w-5 h-5 mx-auto mb-2" style={{ color: '#005567' }} />
                            <p className="text-xs text-gray-600">Monthly Income</p>
                            <p className="font-semibold text-xs">${monthlyIncome?.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <Users className="w-5 h-5 mx-auto mb-2" style={{ color: '#005567' }} />
                            <p className="text-xs text-gray-600">Household Size</p>
                            <p className="font-semibold text-xs">{analysis.household_size}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <Home className="w-5 h-5 mx-auto mb-2" style={{ color: '#a5630b' }} />
                            <p className="text-xs text-gray-600">Section 8 Limit*</p>
                            <p className="text-xs opacity-75">Annual</p>
                            <p className="font-semibold text-xs">${publicHousingThreshold?.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <ShoppingCart className="w-5 h-5 mx-auto mb-2" style={{ color: '#7d2431' }} />
                            <p className="text-xs text-gray-600">SNAP Limit</p>
                            <p className="text-xs opacity-75">Annual</p>
                            <p className="font-semibold text-xs">${snapThreshold?.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <Heart className="w-5 h-5 mx-auto mb-2" style={{ color: '#217045' }} />
                            <p className="text-xs text-gray-600">Medicaid Limit</p>
                            <p className="text-xs opacity-75">Annual</p>
                            <p className="font-semibold text-xs">${medicaidThreshold?.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-left px-1 mb-4">
                        *Based on HUD's 'Very Low Income' (50% AMI) threshold.
                    </div>
                    
                    {analysis.data_source_note && (
                        <div className="text-xs text-gray-500 text-left px-1 mb-4 font-semibold" style={{ color: '#005567' }}>
                            {analysis.data_source_note}
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <p className="text-lg font-medium mb-2" style={{ color: '#005567' }}>
                            Financial Stability Assessment
                        </p>
                        <Badge
                            className="px-6 py-2 text-lg font-medium capitalize flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: stabilityInfo.color,
                                color: 'white'
                            }}
                        >
                            <stabilityInfo.icon className="w-5 h-5" />
                            {stabilityInfo.text}
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium" style={{ color: '#005567' }}>
                            Assessment Notes
                        </h3>
                        <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="pt-1">
                                <TrendingUp className="w-5 h-5" style={{ color: '#005567' }} />
                            </div>
                            <p className="text-sm text-gray-800 leading-relaxed">
                                {analysis.analysis_notes}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
