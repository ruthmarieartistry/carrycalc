// Convert HUD FY 2025 data to optimized JSON format
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Excel file
const workbook = XLSX.readFile(path.join(__dirname, '../hud_fy2025_section8.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`Processing ${data.length} county records...`);

// Build a lookup structure: state -> county -> income limits
const hudData = {};

data.forEach((row) => {
    const state = row.stusps;
    const countyName = row.County_Name;

    if (!state || !countyName) return;

    // Initialize state if needed
    if (!hudData[state]) {
        hudData[state] = {};
    }

    // Store county data with 50% AMI (Very Low Income) limits
    hudData[state][countyName] = {
        1: row.l50_1,
        2: row.l50_2,
        3: row.l50_3,
        4: row.l50_4,
        5: row.l50_5,
        6: row.l50_6,
        7: row.l50_7,
        8: row.l50_8,
        area: row.hud_area_name,
        median: row.median2025
    };
});

// Write to JSON file
const outputPath = path.join(__dirname, '../src/data/hudSection8FY2025.json');

// Create data directory if it doesn't exist
const dataDir = path.dirname(outputPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(hudData, null, 2));

console.log(`✅ Successfully converted HUD data!`);
console.log(`📊 Total states: ${Object.keys(hudData).length}`);
console.log(`📍 Total counties: ${data.length}`);
console.log(`💾 Output file: ${outputPath}`);
console.log(`📦 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);

// Show sample data
console.log(`\n📋 Sample data for Virginia:`);
if (hudData['VA']) {
    const vaCounties = Object.keys(hudData['VA']);
    console.log(`   Counties in VA: ${vaCounties.length}`);
    console.log(`   Sample counties:`, vaCounties.slice(0, 5));

    if (hudData['VA']['Fairfax County']) {
        console.log(`\n   Fairfax County data:`);
        console.log(JSON.stringify(hudData['VA']['Fairfax County'], null, 4));
    }
}
