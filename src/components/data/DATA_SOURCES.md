# Official Data Sources for Benefit Thresholds

This document provides information on where to find accurate, official data for benefit eligibility thresholds.

## Section 8 Housing (Very Low Income - 50% AMI)

**Source:** HUD User - Income Limits
**URL:** https://www.huduser.gov/portal/datasets/il.html

### How to Find Data:
1. Visit the HUD User Income Limits page
2. Select the current fiscal year (FY 2025)
3. Download the complete dataset or search by:
   - State
   - County
   - Metropolitan Statistical Area (MSA)
4. Look for "Very Low Income (50% of Median)" limits
5. Data is provided for household sizes 1-8, with formulas for larger households

### Notes:
- Income limits vary by county/MSA
- Updated annually (usually in March/April)
- Most accurate source for Section 8 eligibility

## SNAP (Supplemental Nutrition Assistance Program)

**Source:** USDA Food and Nutrition Service
**URL:** https://www.fns.usda.gov/snap/recipient/eligibility

### How to Find Data:
1. Visit the SNAP Eligibility page
2. Find "Gross Income Limits" table
3. Data is usually 130% of federal poverty guidelines
4. Most states use federal standards, but some have state-specific limits

### State-Specific SNAP Resources:
- Check individual state SNAP/food stamp agency websites
- Search: "[State] SNAP income limits FY 2025"

### Notes:
- SNAP limits are typically uniform across most states
- Some states have broad-based categorical eligibility
- Updated annually based on federal poverty guidelines

## Medicaid

**Source:** Medicaid.gov and State Medicaid Agencies
**URL:** https://www.medicaid.gov/medicaid/index.html

### How to Find Data:
Medicaid eligibility varies significantly by state due to Medicaid expansion status.

#### For Expansion States:
- Generally 138% of Federal Poverty Level (FPL) for adults
- Find FPL guidelines at: https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines

#### For Non-Expansion States:
- Income limits vary widely by state
- Must check individual state Medicaid agency websites
- Search: "[State] Medicaid income limits adults"

### Key Resources:
- **Kaiser Family Foundation:** https://www.kff.org/medicaid/
  - Provides state-by-state Medicaid eligibility comparison tools
- **State Medicaid Agencies:** Each state has its own website
  - Example: California - Medi-Cal, New York - NY State of Health

### Notes:
- Medicaid rules are complex and vary by:
  - State expansion status
  - Household composition
  - Disability status
  - Pregnancy status
- For surrogacy screening, focus on "Adult Medicaid" income limits
- Updated annually, typically in January/February

## Federal Poverty Guidelines (FPL)

**Source:** HHS Office of the Assistant Secretary for Planning and Evaluation
**URL:** https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines

### How to Find Data:
1. Visit the ASPE poverty guidelines page
2. Find the current year guidelines
3. Note: Alaska and Hawaii have different poverty guidelines than the 48 contiguous states

### Notes:
- Updated annually in January
- Used as basis for many benefit program calculations
- SNAP and Medicaid often calculated as percentage of FPL

## Recommended Update Schedule

- **HUD Income Limits:** Check in April each year
- **SNAP Limits:** Check in October each year
- **Medicaid Limits:** Check in January-February each year
- **FPL Guidelines:** Check in January-February each year

## How to Update BenefitThresholds.jsx

1. Download the latest data from official sources
2. For each state you want to add/update:
   - Find Section 8 Very Low Income limits (50% AMI) for the major metro area or county
   - Find SNAP gross income limits for household sizes 1-8
   - Find Medicaid adult income limits for household sizes 1-8
3. Add/update the state entry in `benefitData` object
4. Include an `additional` property for household sizes > 8 (SNAP and Medicaid)
5. Add a `note` if using specific county data or if there are state-specific considerations

## Data Quality Notes

- **Most Accurate:** HUD Section 8 income limits (official, county-specific)
- **Generally Accurate:** SNAP limits (federal standard with few state variations)
- **Most Variable:** Medicaid (highly state-dependent, complex rules)

When in doubt, use the most conservative (lowest) estimate to avoid false negatives in surrogacy screening.
