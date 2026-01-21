// Convert ZIP to County CSV to JSON
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read CSV
const csvPath = path.join(__dirname, '../zip_county_simple.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const lines = csvContent.split('\n');
const headers = lines[0].split(',');

// Build ZIP to County lookup
const zipLookup = {};

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(',');
    if (parts.length < 6) continue;

    const zip = parts[3];
    const state = parts[2];
    const county = parts[4];
    const city = parts[5];

    if (zip && state && county) {
        zipLookup[zip] = {
            state,
            county,
            city
        };
    }
}

// Write to JSON
const outputPath = path.join(__dirname, '../public/zipToCounty.json');
fs.writeFileSync(outputPath, JSON.stringify(zipLookup, null, 2));

console.log(`✅ Converted ${Object.keys(zipLookup).length} ZIP codes`);
console.log(`💾 Output: ${outputPath}`);
console.log(`📦 Size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);

// Test samples
console.log('\n📋 Sample lookups:');
console.log('20151:', zipLookup['20151']);
console.log('30338:', zipLookup['30338']);
console.log('10001:', zipLookup['10001']);
