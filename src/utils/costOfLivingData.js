// costOfLivingData.js
// Cost of living estimates by state and household size
// Data based on MIT Living Wage Calculator and BLS Consumer Expenditure Survey
// Last updated: FY 2025

/**
 * Cost of living estimates by state for different household sizes
 * Structure: { state: { householdSize: { housing, food, transportation, healthcare, other, total } } }
 *
 * Costs are MONTHLY estimates
 */
const costOfLivingData = {
    "NY": {
        1: { housing: 1800, food: 450, transportation: 350, healthcare: 450, other: 400, total: 3450 },
        2: { housing: 2200, food: 650, transportation: 500, healthcare: 600, other: 550, total: 4500 },
        3: { housing: 2600, food: 850, transportation: 650, healthcare: 750, other: 650, total: 5500 },
        4: { housing: 3000, food: 1050, transportation: 800, healthcare: 900, other: 750, total: 6500 },
        5: { housing: 3300, food: 1200, transportation: 900, healthcare: 1000, other: 850, total: 7250 },
        6: { housing: 3600, food: 1350, transportation: 1000, healthcare: 1100, other: 950, total: 8000 },
        7: { housing: 3900, food: 1500, transportation: 1100, healthcare: 1200, other: 1050, total: 8750 },
        8: { housing: 4200, food: 1650, transportation: 1200, healthcare: 1300, other: 1150, total: 9500 }
    },
    "CA": {
        1: { housing: 2000, food: 500, transportation: 400, healthcare: 400, other: 450, total: 3750 },
        2: { housing: 2500, food: 700, transportation: 550, healthcare: 550, other: 600, total: 4900 },
        3: { housing: 2900, food: 900, transportation: 700, healthcare: 700, other: 700, total: 5900 },
        4: { housing: 3300, food: 1100, transportation: 850, healthcare: 850, other: 800, total: 6900 },
        5: { housing: 3600, food: 1250, transportation: 950, healthcare: 950, other: 900, total: 7650 },
        6: { housing: 3900, food: 1400, transportation: 1050, healthcare: 1050, other: 1000, total: 8400 },
        7: { housing: 4200, food: 1550, transportation: 1150, healthcare: 1150, other: 1100, total: 9150 },
        8: { housing: 4500, food: 1700, transportation: 1250, healthcare: 1250, other: 1200, total: 9900 }
    },
    "TX": {
        1: { housing: 1200, food: 350, transportation: 350, healthcare: 350, other: 350, total: 2600 },
        2: { housing: 1500, food: 500, transportation: 500, healthcare: 500, other: 450, total: 3450 },
        3: { housing: 1800, food: 650, transportation: 600, healthcare: 600, other: 550, total: 4200 },
        4: { housing: 2100, food: 800, transportation: 700, healthcare: 700, other: 650, total: 4950 },
        5: { housing: 2300, food: 900, transportation: 750, healthcare: 800, other: 700, total: 5450 },
        6: { housing: 2500, food: 1000, transportation: 800, healthcare: 900, other: 750, total: 5950 },
        7: { housing: 2700, food: 1100, transportation: 850, healthcare: 1000, other: 800, total: 6450 },
        8: { housing: 2900, food: 1200, transportation: 900, healthcare: 1100, other: 850, total: 6950 }
    },
    "FL": {
        1: { housing: 1400, food: 400, transportation: 350, healthcare: 400, other: 400, total: 2950 },
        2: { housing: 1700, food: 550, transportation: 500, healthcare: 550, other: 500, total: 3800 },
        3: { housing: 2000, food: 700, transportation: 600, healthcare: 650, other: 600, total: 4550 },
        4: { housing: 2300, food: 850, transportation: 700, healthcare: 750, other: 700, total: 5300 },
        5: { housing: 2500, food: 950, transportation: 750, healthcare: 850, other: 750, total: 5800 },
        6: { housing: 2700, food: 1050, transportation: 800, healthcare: 950, other: 800, total: 6300 },
        7: { housing: 2900, food: 1150, transportation: 850, healthcare: 1050, other: 850, total: 6800 },
        8: { housing: 3100, food: 1250, transportation: 900, healthcare: 1150, other: 900, total: 7300 }
    },
    "IL": {
        1: { housing: 1300, food: 400, transportation: 350, healthcare: 400, other: 350, total: 2800 },
        2: { housing: 1600, food: 550, transportation: 500, healthcare: 550, other: 500, total: 3700 },
        3: { housing: 1900, food: 700, transportation: 600, healthcare: 650, other: 600, total: 4450 },
        4: { housing: 2200, food: 850, transportation: 700, healthcare: 750, other: 700, total: 5200 },
        5: { housing: 2400, food: 950, transportation: 750, healthcare: 850, other: 750, total: 5700 },
        6: { housing: 2600, food: 1050, transportation: 800, healthcare: 950, other: 800, total: 6200 },
        7: { housing: 2800, food: 1150, transportation: 850, healthcare: 1050, other: 850, total: 6700 },
        8: { housing: 3000, food: 1250, transportation: 900, healthcare: 1150, other: 900, total: 7200 }
    },
    "CO": {
        1: { housing: 1600, food: 450, transportation: 350, healthcare: 400, other: 400, total: 3200 },
        2: { housing: 2000, food: 600, transportation: 500, healthcare: 550, other: 550, total: 4200 },
        3: { housing: 2400, food: 800, transportation: 650, healthcare: 700, other: 650, total: 5200 },
        4: { housing: 2800, food: 1000, transportation: 800, healthcare: 850, other: 750, total: 6200 },
        5: { housing: 3100, food: 1150, transportation: 900, healthcare: 950, other: 850, total: 6950 },
        6: { housing: 3400, food: 1300, transportation: 1000, healthcare: 1050, other: 950, total: 7700 },
        7: { housing: 3700, food: 1450, transportation: 1100, healthcare: 1150, other: 1050, total: 8450 },
        8: { housing: 4000, food: 1600, transportation: 1200, healthcare: 1250, other: 1150, total: 9200 }
    },
    "VA": {
        1: { housing: 1700, food: 450, transportation: 400, healthcare: 400, other: 400, total: 3350 },
        2: { housing: 2100, food: 650, transportation: 550, healthcare: 550, other: 550, total: 4400 },
        3: { housing: 2500, food: 850, transportation: 700, healthcare: 700, other: 650, total: 5400 },
        4: { housing: 2900, food: 1050, transportation: 850, healthcare: 850, other: 750, total: 6400 },
        5: { housing: 3200, food: 1200, transportation: 950, healthcare: 950, other: 850, total: 7150 },
        6: { housing: 3500, food: 1350, transportation: 1050, healthcare: 1050, other: 950, total: 7900 },
        7: { housing: 3800, food: 1500, transportation: 1150, healthcare: 1150, other: 1050, total: 8650 },
        8: { housing: 4100, food: 1650, transportation: 1250, healthcare: 1250, other: 1150, total: 9400 }
    }
};

/**
 * National average cost of living for states not in the database
 * Based on BLS Consumer Expenditure Survey averages
 */
const nationalAverageCosts = {
    1: { housing: 1400, food: 400, transportation: 350, healthcare: 400, other: 400, total: 2950 },
    2: { housing: 1800, food: 600, transportation: 500, healthcare: 550, other: 550, total: 4000 },
    3: { housing: 2200, food: 800, transportation: 650, healthcare: 700, other: 650, total: 5000 },
    4: { housing: 2600, food: 1000, transportation: 800, healthcare: 850, other: 750, total: 6000 },
    5: { housing: 2900, food: 1150, transportation: 900, healthcare: 950, other: 850, total: 6750 },
    6: { housing: 3200, food: 1300, transportation: 1000, healthcare: 1050, other: 950, total: 7500 },
    7: { housing: 3500, food: 1450, transportation: 1100, healthcare: 1150, other: 1050, total: 8250 },
    8: { housing: 3800, food: 1600, transportation: 1200, healthcare: 1250, other: 1150, total: 9000 }
};

/**
 * Get cost of living estimates for a given state and household size
 * @param {string} state - Two-letter state code
 * @param {number} householdSize - Number of people in household
 * @returns {object} - Cost breakdown with housing, food, transportation, healthcare, other, total, and note
 */
export const getCostOfLiving = (state, householdSize) => {
    if (!state || householdSize < 1) {
        return {
            housing: 0,
            food: 0,
            transportation: 0,
            healthcare: 0,
            other: 0,
            total: 0,
            note: 'Invalid state or household size',
            error: true
        };
    }

    // Cap household size at 8 for lookup purposes
    const lookupSize = Math.min(householdSize, 8);

    const stateData = costOfLivingData[state];

    if (stateData && stateData[lookupSize]) {
        // If we have specific data for this state and size
        let costs = stateData[lookupSize];

        // If household size is larger than 8, add proportional costs
        if (householdSize > 8) {
            const additionalMembers = householdSize - 8;
            const perPersonMultiplier = 0.85; // Each additional person adds 85% of per-person average
            const avgPerPerson = costs.total / 8;
            const additionalCost = Math.round(avgPerPerson * additionalMembers * perPersonMultiplier);

            costs = {
                housing: costs.housing,
                food: costs.food + Math.round(additionalCost * 0.35),
                transportation: costs.transportation + Math.round(additionalCost * 0.20),
                healthcare: costs.healthcare + Math.round(additionalCost * 0.25),
                other: costs.other + Math.round(additionalCost * 0.20),
                total: costs.total + additionalCost
            };
        }

        return {
            ...costs,
            note: householdSize > 8 ?
                `Cost estimates for ${state} adjusted for ${householdSize}-person household based on 8-person baseline.` :
                `Cost of living estimates for ${state} (${householdSize}-person household).`,
            error: false
        };
    } else {
        // Fall back to national average
        let costs = nationalAverageCosts[lookupSize];

        if (householdSize > 8) {
            const additionalMembers = householdSize - 8;
            const perPersonMultiplier = 0.85;
            const avgPerPerson = costs.total / 8;
            const additionalCost = Math.round(avgPerPerson * additionalMembers * perPersonMultiplier);

            costs = {
                housing: costs.housing,
                food: costs.food + Math.round(additionalCost * 0.35),
                transportation: costs.transportation + Math.round(additionalCost * 0.20),
                healthcare: costs.healthcare + Math.round(additionalCost * 0.25),
                other: costs.other + Math.round(additionalCost * 0.20),
                total: costs.total + additionalCost
            };
        }

        return {
            ...costs,
            note: `Using national average cost of living data for ${state}. State-specific data not available.`,
            error: false,
            isNationalAverage: true
        };
    }
};

/**
 * Check if we have specific state data (not falling back to national average)
 * @param {string} state - Two-letter state code
 * @returns {boolean} - True if state-specific data exists
 */
export const hasStateSpecificData = (state) => {
    return costOfLivingData.hasOwnProperty(state);
};

/**
 * Get list of states with specific cost of living data
 * @returns {array} - Array of state codes
 */
export const getAvailableStates = () => {
    return Object.keys(costOfLivingData);
};
