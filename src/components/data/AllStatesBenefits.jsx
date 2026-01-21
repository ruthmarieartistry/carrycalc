// All 50 States + DC Benefit Thresholds
// Based on 2025 Federal Poverty Guidelines (effective January 15, 2025)
// 2025 FPL: $15,650 (1 person) + $5,500 per additional person

// Federal SNAP limits (130% of 2025 FPL) - applies to most states
const federalSNAP = {
    1: 20345, 2: 27495, 3: 34645, 4: 41795, 5: 48945,
    6: 56095, 7: 63245, 8: 70395, additional: 7150
};

// Medicaid expansion states (138% of 2025 FPL)
const medicaidExpansion = {
    1: 21597, 2: 29187, 3: 36777, 4: 44367, 5: 51957,
    6: 59547, 7: 67137, 8: 74727, additional: 7590
};

// Non-expansion states have very low Medicaid limits (varies by state)
const nonExpansionMedicaid = {
    1: 4801, 2: 6501, 3: 8201, 4: 9901, 5: 11601,
    6: 13301, 7: 15001, 8: 16701, additional: 1700
};

// All states data - Updated with 2025 FPL
export const allStatesBenefitData = {
    "AL": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "AK": { snap: { 1: 25449, 2: 34385, 3: 43321, 4: 52257, 5: 61193, 6: 70129, 7: 79065, 8: 88001, additional: 8936 }, medicaid: medicaidExpansion }, // Expansion + higher SNAP
    "AZ": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "AR": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "CA": { snap: { 1: 26449, 2: 35735, 3: 45021, 4: 54307, 5: 63593, 6: 72879, 7: 82165, 8: 91451, additional: 9286 }, medicaid: medicaidExpansion }, // Expansion + higher SNAP
    "CO": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "CT": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "DE": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "DC": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "FL": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "GA": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "HI": { snap: { 1: 23397, 2: 31636, 3: 39875, 4: 48114, 5: 56353, 6: 64592, 7: 72831, 8: 81070, additional: 8239 }, medicaid: medicaidExpansion }, // Expansion + higher SNAP
    "ID": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "IL": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "IN": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "IA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "KS": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "KY": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "LA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "ME": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MD": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MI": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MN": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MS": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "MO": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "MT": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NE": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NV": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NH": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NJ": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NM": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NY": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "NC": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion (2024)
    "ND": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "OH": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "OK": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion (2021)
    "OR": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "PA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "RI": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "SC": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "SD": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion (2023)
    "TN": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "TX": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "UT": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "VT": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "VA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "WA": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "WV": { snap: federalSNAP, medicaid: medicaidExpansion }, // Expansion
    "WI": { snap: federalSNAP, medicaid: nonExpansionMedicaid }, // No expansion
    "WY": { snap: federalSNAP, medicaid: nonExpansionMedicaid } // No expansion
};
