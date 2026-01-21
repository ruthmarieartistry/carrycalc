// section8Lookup.js
// Lookup HUD Section 8 income limits by state and county

// Cache for the loaded data
let hudData = null;
let loadingPromise = null;

/**
 * Load HUD data from public folder (lazy loading)
 * @returns {Promise<object>} - HUD data object
 */
const loadHudData = async () => {
    // Return cached data if already loaded
    if (hudData) {
        return hudData;
    }

    // Return existing promise if already loading
    if (loadingPromise) {
        return loadingPromise;
    }

    // Fetch the data
    loadingPromise = fetch('/hudSection8FY2025.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load HUD data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            hudData = data;
            loadingPromise = null;
            console.log('✅ HUD FY 2025 data loaded:', Object.keys(data).length, 'states');
            return data;
        })
        .catch(error => {
            console.error('❌ Error loading HUD data:', error);
            loadingPromise = null;
            throw error;
        });

    return loadingPromise;
};

/**
 * Get Section 8 Very Low Income (50% AMI) limits for a specific county
 * @param {string} state - Two-letter state code (e.g., 'VA')
 * @param {string} county - County name (e.g., 'Fairfax County')
 * @param {number} householdSize - Number of people in household (1-8+)
 * @returns {Promise<object>} - { limit: number, area: string, median: number, error: null } or error object
 */
export const getSection8Limit = async (state, county, householdSize) => {
    if (!state || !county) {
        return {
            limit: 0,
            error: 'State and county are required'
        };
    }

    try {
        // Load data if not already loaded
        const data = await loadHudData();

        // Normalize inputs
        state = state.toUpperCase();

        // Normalize county name - handle various formats
        let normalizedCounty = county.trim();

        // Add "County" suffix if not present (common in HUD data)
        if (!normalizedCounty.toLowerCase().includes('county') &&
            !normalizedCounty.toLowerCase().includes('city') &&
            !normalizedCounty.toLowerCase().includes('parish')) {
            normalizedCounty = `${normalizedCounty} County`;
        }

        // Check if state exists
        if (!data[state]) {
            return {
                limit: 0,
                error: `No HUD data available for state: ${state}`
            };
        }

        // Try exact match first
        let countyData = data[state][normalizedCounty];

        // If not found, try fuzzy matching (case-insensitive)
        if (!countyData) {
            const countyKeys = Object.keys(data[state]);
            const fuzzyMatch = countyKeys.find(key =>
                key.toLowerCase() === normalizedCounty.toLowerCase()
            );

            if (fuzzyMatch) {
                countyData = data[state][fuzzyMatch];
            }
        }

        // If still not found, return error
        if (!countyData) {
            return {
                limit: 0,
                error: `County "${county}" not found in ${state}. Available counties: ${Object.keys(data[state]).length}`,
                availableCounties: Object.keys(data[state]).slice(0, 5) // Show first 5 as hint
            };
        }

        // Get the limit for the household size
        const size = Math.min(householdSize, 8); // Cap at 8
        const limit = countyData[size];

        if (!limit) {
            return {
                limit: 0,
                error: `No income limit data for household size ${householdSize}`
            };
        }

        return {
            limit,
            area: countyData.area,
            median: countyData.median,
            error: null
        };
    } catch (error) {
        console.error('Error in getSection8Limit:', error);
        return {
            limit: 0,
            error: `Failed to load HUD data: ${error.message}`
        };
    }
};

/**
 * Check if a state has HUD data available
 * @param {string} state - Two-letter state code
 * @returns {Promise<boolean>}
 */
export const hasSection8Data = async (state) => {
    try {
        const data = await loadHudData();
        return data.hasOwnProperty(state.toUpperCase());
    } catch (error) {
        return false;
    }
};

/**
 * Get list of all counties in a state
 * @param {string} state - Two-letter state code
 * @returns {Promise<array>} - Array of county names
 */
export const getCountiesInState = async (state) => {
    try {
        const data = await loadHudData();
        const stateData = data[state.toUpperCase()];
        return stateData ? Object.keys(stateData) : [];
    } catch (error) {
        return [];
    }
};

/**
 * Get all states with HUD data
 * @returns {Promise<array>} - Array of state codes
 */
export const getAvailableStates = async () => {
    try {
        const data = await loadHudData();
        return Object.keys(data);
    } catch (error) {
        return [];
    }
};
