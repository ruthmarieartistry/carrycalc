
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import { getThresholdsForState } from '../components/data/BenefitThresholds';
import { getLocationFromZip } from '../utils/locationLookup';
import { getCostOfLiving } from '../utils/costOfLivingData';
import { getSection8Limit } from '../utils/section8Lookup';

import AnalysisForm from "../components/analysis/AnalysisForm";
import EconomicResults from "../components/analysis/EconomicResults";
import CostBreakdown from "../components/analysis/CostBreakdown";

export default function EconomicAnalysis() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [error, setError] = useState(null);

    const analyzeCandidate = async (formData) => {
        setIsAnalyzing(true);
        setError(null);

        try {
            // Step 1: Get location info from ZIP code (includes county!)
            const locationData = await getLocationFromZip(formData.zip_code);

            if (locationData.error) {
                setError(locationData.error);
                setIsAnalyzing(false);
                return;
            }

            const { state, city, county, location_name } = locationData;

            console.log("Location lookup:", { state, city, county, location_name });

            // Step 2: Get Section 8 limits from county-specific HUD data (async)
            const section8Data = await getSection8Limit(state, county, formData.household_size);

            let snap_threshold = 0;
            let public_housing_threshold = 0;
            let medicaid_threshold = 0;
            let data_source_note = null;

            if (!section8Data.error) {
                // Use county-specific Section 8 data
                console.log("Using county-specific Section 8 data for:", county, state);
                console.log("Section 8 limit:", section8Data.limit, "Area:", section8Data.area);
                public_housing_threshold = section8Data.limit;
                data_source_note = `Section 8 income limits for ${county}, ${state} (${section8Data.area}). `;
            } else {
                console.warn(`No Section 8 data for ${county}, ${state}:`, section8Data.error);
                data_source_note = `Section 8 data not available for ${county}, ${state}. `;
            }

            // Get SNAP and Medicaid from state-level data (they're typically statewide)
            const stateThresholds = getThresholdsForState(state, formData.household_size);
            if (!stateThresholds.error) {
                snap_threshold = stateThresholds.snap_threshold;
                medicaid_threshold = stateThresholds.medicaid_threshold;
                data_source_note += "SNAP and Medicaid limits from state data. Data from official FY 2025 government sources.";
            } else {
                data_source_note += "SNAP and Medicaid data not available for this state.";
            }

            // Step 3: Get cost of living data from static dataset
            const costData = getCostOfLiving(state, formData.household_size);

            const avg_housing_cost = costData.housing;
            const avg_food_cost = costData.food;
            const avg_transportation_cost = costData.transportation;
            const avg_healthcare_cost = costData.healthcare;
            const avg_other_necessities_cost = costData.other;
            const total_estimated_monthly_cost = costData.total;

            // Append cost of living note to data source note
            if (costData.note) {
                data_source_note = data_source_note ? `${data_source_note} ${costData.note}` : costData.note;
            }

            console.log("Cost of living data:", {
                housing: avg_housing_cost,
                food: avg_food_cost,
                transportation: avg_transportation_cost,
                healthcare: avg_healthcare_cost,
                other: avg_other_necessities_cost,
                total: total_estimated_monthly_cost
            });
            
            // Step 4: Analyze financial stability
            const { household_income } = formData;
            const monthlyIncome = household_income / 12;
            
            let financial_stability_level = '';
            let analysis_notes = '';
            
            const failingThresholds = [];
            if (public_housing_threshold > 0 && household_income <= public_housing_threshold) failingThresholds.push("Section 8 (Very Low Income Limit)");
            if (snap_threshold > 0 && household_income <= snap_threshold) failingThresholds.push("SNAP");
            if (medicaid_threshold > 0 && household_income <= medicaid_threshold) failingThresholds.push("Medicaid");

            if (failingThresholds.length > 0) {
                financial_stability_level = 'unstable';
                analysis_notes = `The household income of $${household_income.toLocaleString()} is at or below the current threshold for ${failingThresholds.join(' and ')} benefits. Reliance on public assistance indicates financial instability for a gestational carrier journey.`;
            } else {
                if(total_estimated_monthly_cost > 0) {
                    const monthlySurplus = monthlyIncome - total_estimated_monthly_cost;
                    if (monthlySurplus < 0) {
                        financial_stability_level = 'unstable';
                        analysis_notes = `While above public benefit thresholds, the household's monthly income ($${monthlyIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}) falls short of estimated living costs ($${total_estimated_monthly_cost.toLocaleString()}), creating financial strain.`;
                    } else if (monthlySurplus < total_estimated_monthly_cost * 0.15) {
                        financial_stability_level = 'borderline';
                        analysis_notes = `The household is self-sufficient but has a minimal monthly surplus of $${monthlySurplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}, indicating tight finances with little room for unexpected expenses.`;
                    } else {
                        financial_stability_level = 'stable';
                        analysis_notes = `The household shows strong financial stability with income of $${household_income.toLocaleString()} well above current benefit thresholds and a healthy monthly surplus of $${monthlySurplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}.`;
                    }
                } else {
                     financial_stability_level = 'stable';
                     analysis_notes = `The household income of $${household_income.toLocaleString()} is above the thresholds for major public benefits. Cost of living data was unavailable, but the household appears self-sufficient based on benefit eligibility.`;
                }
            }

            // Step 5: Save the analysis
            const analysisData = {
                ...formData,
                state,
                location_name,
                snap_threshold,
                public_housing_threshold,
                medicaid_threshold,
                avg_housing_cost,
                avg_food_cost,
                avg_transportation_cost,
                avg_healthcare_cost,
                avg_other_necessities_cost,
                total_estimated_monthly_cost,
                financial_stability_level,
                analysis_notes,
                data_source_note
            };

            console.log("Final analysis data:", analysisData);

            // Save to local storage and add ID + timestamp
            const analysisWithMetadata = {
                ...analysisData,
                id: Date.now(), // Simple ID using timestamp
                created_at: new Date().toISOString()
            };

            // Save to localStorage
            const existingAnalyses = JSON.parse(localStorage.getItem('carrycalc_analyses') || '[]');
            existingAnalyses.push(analysisWithMetadata);
            localStorage.setItem('carrycalc_analyses', JSON.stringify(existingAnalyses));

            setCurrentAnalysis(analysisWithMetadata);
            
        } catch (err) {
            console.error("Analysis error:", err);
            setError("Analysis failed. Please try again.");
        }
        
        setIsAnalyzing(false);
    };

    const startNewAnalysis = () => {
        setCurrentAnalysis(null);
        setError(null);
    };

    return (
        <div className="p-4 md:p-6" style={{ backgroundColor: '#fafafa' }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                    <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd6cc9d7c75744747bf789/497240a84_CARRYCalc.png"
                        alt="CarryCalc"
                        className="h-12 md:h-16 lg:h-20 mb-2"
                    />
                    <p className="text-lg md:text-xl text-black font-light">
                        Financials, Figured.
                    </p>
                </div>

                {error && (
                    <Card className="mb-6 border-red-200" style={{ backgroundColor: '#fef2f2' }}>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2" style={{ color: '#7d2431' }}>
                                <AlertTriangle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {!currentAnalysis ? (
                    <div className="max-w-2xl mx-auto">
                        <AnalysisForm 
                            onSubmit={analyzeCandidate}
                            isLoading={isAnalyzing}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-xl md:text-2xl font-light" style={{ color: '#005567' }}>
                                Assessment Results
                            </h2>
                            <Button
                                onClick={startNewAnalysis}
                                variant="outline"
                                style={{ 
                                    borderColor: '#7d2431',
                                    color: '#7d2431'
                                }}
                                className="hover:bg-red-50 w-full sm:w-auto"
                            >
                                New Assessment
                            </Button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <EconomicResults analysis={currentAnalysis} />
                            </div>
                            <div>
                                <CostBreakdown analysis={currentAnalysis} />
                            </div>
                        </div>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#005567' }} />
                                <span className="text-lg">Analyzing financial stability...</span>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
