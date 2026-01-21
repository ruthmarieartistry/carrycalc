// locationLookup.js
// Provides accurate ZIP code to location mapping with COUNTY data

// Cache for loaded data
let zipData = null;
let loadingPromise = null;

/**
 * Load ZIP to County data from public folder (lazy loading)
 */
const loadZipData = async () => {
    if (zipData) return zipData;
    if (loadingPromise) return loadingPromise;

    loadingPromise = fetch('/zipToCounty.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ZIP data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            zipData = data;
            loadingPromise = null;
            console.log('✅ ZIP to County data loaded:', Object.keys(data).length, 'ZIP codes');
            return data;
        })
        .catch(error => {
            console.error('❌ Error loading ZIP data:', error);
            loadingPromise = null;
            throw error;
        });

    return loadingPromise;
};

/**
 * Looks up location information from a ZIP code
 * @param {string} zipCode - 5-digit ZIP code
 * @returns {Promise<object>} - { state, city, county, location_name, error }
 */
export const getLocationFromZip = async (zipCode) => {
    if (!zipCode || zipCode.length !== 5) {
        return {
            state: null,
            city: null,
            county: null,
            location_name: null,
            error: 'Invalid ZIP code format. Please enter a 5-digit ZIP code.'
        };
    }

    try {
        const data = await loadZipData();
        const locationData = data[zipCode];

        if (!locationData) {
            return {
                state: null,
                city: null,
                county: null,
                location_name: null,
                error: `ZIP code ${zipCode} not found. Please verify the ZIP code.`
            };
        }

        const state = locationData.state;
        // Remove "Zcta " prefix from city names if present
        const city = locationData.city.replace(/^Zcta\s+/i, '');
        const county = locationData.county;
        const location_name = `${city}, ${state}`;

        return {
            state,
            city,
            county,
            location_name,
            error: null
        };
    } catch (error) {
        return {
            state: null,
            city: null,
            county: null,
            location_name: null,
            error: `Failed to load ZIP code data: ${error.message}`
        };
    }
};
