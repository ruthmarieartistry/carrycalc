// Script to parse HUD FY 2025 Section 8 Income Limits Excel file
// and convert to JSON format for the app

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Excel file
const workbook = XLSX.readFile(path.join(__dirname, '../hud_fy2025_section8.xlsx'));

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Total rows:', data.length);
console.log('First few rows:', JSON.stringify(data.slice(0, 3), null, 2));

// Let's examine the column structure
if (data.length > 0) {
    console.log('\nColumn names:', Object.keys(data[0]));
}

// Parse and structure the data
const countyData = {};

data.forEach((row, index) => {
    // Skip header rows or empty rows
    if (!row || index === 0) return;

    // Try to identify key columns (column names may vary)
    // Common HUD Excel columns: Area Name, County Name, State, l50_1 (1 person 50% AMI), etc.

    // Log first 10 rows to understand structure
    if (index < 10) {
        console.log(`\nRow ${index}:`, JSON.stringify(row, null, 2));
    }
});

console.log('\nExamining sheet structure...');
console.log('Sheet range:', worksheet['!ref']);
