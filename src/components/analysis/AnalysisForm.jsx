import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, DollarSign, MapPin, UserCheck, Users } from "lucide-react";

export default function AnalysisForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        applicant_name: "",
        household_income: "",
        household_size: "",
        zip_code: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.applicant_name && formData.household_income && formData.household_size && formData.zip_code) {
            onSubmit({
                ...formData,
                household_income: parseFloat(formData.household_income),
                household_size: parseInt(formData.household_size)
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isFormValid = formData.applicant_name && formData.household_income && formData.household_size && formData.zip_code;

    return (
        <Card className="shadow-lg border-0" style={{ backgroundColor: 'white' }}>
            <CardHeader className="text-center pb-4" style={{ backgroundColor: '#005567' }}>
                <CardTitle className="text-2xl font-light text-white flex items-center justify-center gap-3">
                    <UserCheck className="w-7 h-7" />
                    Household Financial Details
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label 
                            htmlFor="applicant_name" 
                            className="text-base font-medium"
                            style={{ color: '#005567' }}
                        >
                            Household/Candidate Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                id="applicant_name"
                                value={formData.applicant_name}
                                onChange={(e) => handleInputChange('applicant_name', e.target.value)}
                                className="pl-11 h-12 text-lg border-gray-200 focus:border-[#005567]"
                                placeholder="Enter a name for the assessment"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label 
                                htmlFor="household_income" 
                                className="text-base font-medium"
                                style={{ color: '#005567' }}
                            >
                                Annual Household Income
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                    id="household_income"
                                    type="number"
                                    value={formData.household_income}
                                    onChange={(e) => handleInputChange('household_income', e.target.value)}
                                    className="pl-11 h-12 text-lg border-gray-200 focus:border-[#005567]"
                                    placeholder="75000"
                                    min="0"
                                    step="1000"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label 
                                htmlFor="household_size" 
                                className="text-base font-medium"
                                style={{ color: '#005567' }}
                            >
                                Household Size
                            </Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                    id="household_size"
                                    type="number"
                                    value={formData.household_size}
                                    onChange={(e) => handleInputChange('household_size', e.target.value)}
                                    className="pl-11 h-12 text-lg border-gray-200 focus:border-[#005567]"
                                    placeholder="e.g., 4"
                                    min="1"
                                    step="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label 
                            htmlFor="zip_code" 
                            className="text-base font-medium"
                            style={{ color: '#005567' }}
                        >
                            ZIP Code
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                id="zip_code"
                                value={formData.zip_code}
                                onChange={(e) => handleInputChange('zip_code', e.target.value)}
                                className="pl-11 h-12 text-lg border-gray-200 focus:border-[#005567]"
                                placeholder="12345"
                                pattern="[0-9]{5}"
                                maxLength="5"
                                required
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            We'll automatically determine your state from the ZIP code
                        </p>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        style={{ backgroundColor: isLoading || !isFormValid ? '' : '#217045' }}
                        className="w-full h-12 text-lg font-medium text-white hover:bg-green-800 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Analyzing...' : 'Perform Stability Assessment'}
                    </Button>
                </form>

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This tool assesses if a prospective gestational carrier's household is financially stable—a key requirement for the journey.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}