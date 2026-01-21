import json

# Load all data files
print("Loading data files...")
with open('zip_lookup_filtered.json', 'r') as f:
    zip_data = json.load(f)

with open('section8_data.json', 'r') as f:
    section8_data = json.load(f)

with open('county_costs.json', 'r') as f:
    county_costs = json.load(f)

print(f"✅ Loaded {len(zip_data)} ZIP codes")
print(f"✅ Loaded Section 8 data for {len(section8_data)} states")
print(f"✅ Loaded cost data for {len(county_costs)} counties")

# Read the current index.html as template
with open('index.html', 'r') as f:
    html_content = f.read()

# Create the embedded data JavaScript
embedded_data_js = f"""
    // ========== EMBEDDED DATA ==========
    // CarryCalc v2.0 - Comprehensive Financial Stability Assessment
    // Coverage: 21 states, 21,902 ZIP codes, 1,291 counties
    // Data: HUD FY 2025, 2025 FPL, MIT Living Wage Calculator
    
    // ZIP Code to Location Lookup
    const zipLookup = {json.dumps(zip_data, separators=(',', ':'))};
    
    // Section 8 Income Limits by State/County
    const section8Data = {json.dumps(section8_data, separators=(',', ':'))};
    
    // County-Level Cost of Living
    const countyCosts = {json.dumps(county_costs, separators=(',', ':'))};
    
    // SNAP Income Limits (130% FPL)
    const federalSNAP = {{
        1: 20345, 2: 27495, 3: 34645, 4: 41795, 5: 48945,
        6: 56095, 7: 63245, 8: 70395, additional: 7150
    }};
    
    // Medicaid Expansion States (138% FPL)
    const medicaidExpansion = {{
        1: 21597, 2: 29187, 3: 36777, 4: 44367, 5: 51957,
        6: 59547, 7: 67137, 8: 74727, additional: 7590
    }};
    
    // Medicaid Non-Expansion States
    const nonExpansionMedicaid = {{
        1: 4801, 2: 6501, 3: 8201, 4: 9901, 5: 11601,
        6: 13301, 7: 15001, 8: 16701, additional: 1700
    }};
    
    const expansionStates = {json.dumps(['AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'HI', 'ID', 'IL', 'IN', 'IA', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SD', 'UT', 'VT', 'VA', 'WA', 'WV', 'AK'])};
    
    // ========== END EMBEDDED DATA ==========
"""

# Find where to insert the data (after the opening <script> tag)
script_start = html_content.find("<script>")
if script_start == -1:
    print("ERROR: Could not find <script> tag")
    exit(1)

script_start += len("<script>")

# Insert the embedded data
new_html = html_content[:script_start] + embedded_data_js + html_content[script_start:]

# Now update the JavaScript to use the embedded data instead of hardcoded data
# Remove the old hardcoded data sections

# Save to new file
output_file = 'CarryCalc_v2.html'
with open(output_file, 'w') as f:
    f.write(new_html)

print(f"\n✅ Created {output_file}")

# Check file size
import os
size_mb = os.path.getsize(output_file) / 1024 / 1024
print(f"✅ File size: {size_mb:.2f} MB")

