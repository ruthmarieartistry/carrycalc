
// Data for FY 2025 - All 50 States + DC
// SNAP and Medicaid based on 2025 Federal Poverty Guidelines (effective January 15, 2025)
// Section 8 income limits are county-specific and looked up from HUD data dynamically

import { allStatesBenefitData } from './AllStatesBenefits.jsx';

const findThreshold = (thresholds, size) => {
    if (!thresholds || size <= 0) return 0;
    // Find the threshold for the exact size, or the largest size available if the household is larger.
    const maxSize = Math.max(...Object.keys(thresholds).filter(k => k !== 'additional').map(Number));
    let baseThreshold = thresholds[size];

    if (baseThreshold === undefined) {
        // If exact size not found, check if size is larger than max existing
        if (size > maxSize && thresholds.additional) {
            baseThreshold = thresholds[maxSize] || 0;
            baseThreshold += (size - maxSize) * thresholds.additional;
        } else {
            // Find the closest smaller size or default to 0 if no smaller size exists
            const availableSizes = Object.keys(thresholds).filter(k => k !== 'additional').map(Number).filter(s => s <= size);
            if (availableSizes.length > 0) {
                const effectiveSize = Math.max(...availableSizes);
                baseThreshold = thresholds[effectiveSize] || 0;
            } else {
                baseThreshold = 0;
            }
        }
    }

    return baseThreshold;
};

export const getThresholdsForState = (state, householdSize) => {
    const stateData = allStatesBenefitData[state];
    if (!stateData) {
        // Return an error or default if state data isn't available
        return {
            snap_threshold: 0,
            public_housing_threshold: 0,
            medicaid_threshold: 0,
            note: null,
            error: `Benefit data is not available for state: ${state}.`
        };
    }

    const result = {
        // Section 8 is looked up by county dynamically - return 0 here as placeholder
        // The actual Section 8 limit is fetched by county in EconomicAnalysis.jsx
        public_housing_threshold: 0,
        // SNAP and Medicaid from 2025 FPL-based calculations
        snap_threshold: findThreshold(stateData.snap, householdSize),
        medicaid_threshold: findThreshold(stateData.medicaid, householdSize),
        note: null
    };

    return result;
};
