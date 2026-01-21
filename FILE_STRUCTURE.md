# CarryCalc File Structure

## Project Root
```
econ-assist-747bf789/
├── src/                          # Source code
├── dist/                         # Build output (generated)
├── node_modules/                 # Dependencies (generated)
├── public/                       # Static assets
├── package.json                  # Project dependencies and scripts
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint linting rules
├── components.json              # Shadcn UI components config
├── jsconfig.json                # JavaScript configuration
├── index.html                   # Entry HTML file
├── .gitignore                   # Git ignore rules
├── README.md                    # Project overview
├── OPTIMIZATION_SUMMARY.md      # Optimization details
├── FEATURES_COVERAGE.md         # State coverage information
└── VISUAL_COMPARISON.md         # Before/after comparison
```

---

## Source Directory (`src/`)

### Entry Points
```
src/
├── main.jsx                     # Application entry point (mounts React)
├── App.jsx                      # Root App component
├── App.css                      # App-specific styles
└── index.css                    # Global styles (Tailwind imports)
```

### Pages (`src/pages/`)
Main application views/routes:
```
src/pages/
├── index.jsx                    # Page exports (routing setup)
├── Layout.jsx                   # Main layout wrapper with navigation
├── Portal.jsx                   # Landing/home page
├── Dashboard.jsx                # Dashboard view
├── EconomicAnalysis.jsx         # 🎯 MAIN FEATURE - Financial analysis form & results
├── History.jsx                  # Analysis history view
├── HowToUse.jsx                 # User instructions page
└── MethodAndReliability.jsx     # Documentation on methodology
```

**Key Page:** `EconomicAnalysis.jsx` - This is where the magic happens! Handles:
- User input form
- Analysis logic (ZIP lookup, thresholds, cost of living)
- Results display

### Components (`src/components/`)

#### Analysis Components (`src/components/analysis/`)
Components specific to the economic analysis feature:
```
src/components/analysis/
├── AnalysisForm.jsx            # Input form (name, ZIP, household size, income)
├── EconomicResults.jsx         # Results display (stability badge, thresholds, notes)
└── CostBreakdown.jsx           # Cost of living breakdown with charts
```

#### Data Files (`src/components/data/`)
Static data sources for accurate lookups:
```
src/components/data/
├── BenefitThresholds.jsx       # 🎯 Section 8, SNAP, Medicaid income limits by state
└── DATA_SOURCES.md             # Documentation on where to find official data
```

**Key File:** `BenefitThresholds.jsx` - Contains official FY 2025 benefit eligibility thresholds for 6 states (NY, CA, TX, FL, IL, CO)

#### Layout Components (`src/components/layout/`)
```
src/components/layout/
└── Sidebar.jsx                 # Navigation sidebar
```

#### UI Components (`src/components/ui/`)
Reusable Shadcn UI components (auto-generated, don't modify directly):
```
src/components/ui/
├── button.jsx                  # Button component
├── card.jsx                    # Card component
├── input.jsx                   # Input field component
├── badge.jsx                   # Badge component
├── progress.jsx                # Progress bar component
├── form.jsx                    # Form component
├── select.jsx                  # Select dropdown component
├── toast.jsx                   # Toast notification component
└── [50+ other UI components]   # Complete Shadcn UI library
```

### Utilities (`src/utils/`)
Helper functions and data utilities:
```
src/utils/
├── locationLookup.js           # 🎯 ZIP code → State/City/County lookup (uses 'zipcodes' package)
└── costOfLivingData.js         # 🎯 Cost of living estimates by state & household size
```

**Key Files:**
- `locationLookup.js` - Replaces AI call #1, instant ZIP code lookups
- `costOfLivingData.js` - Replaces AI call #3, pre-loaded cost data

### API Integration (`src/api/`)
Base44 platform integration:
```
src/api/
├── base44Client.js             # Base44 SDK client configuration
├── entities.js                 # Data models (Analysis entity)
└── integrations.js             # External integrations (was used for AI calls)
```

**Note:** `integrations.js` contains `InvokeLLM` which is NO LONGER USED after optimization

### Hooks (`src/hooks/`)
Custom React hooks:
```
src/hooks/
└── use-mobile.jsx              # Hook for detecting mobile devices
```

### Lib (`src/lib/`)
Library utilities:
```
src/lib/
└── utils.js                    # General utility functions (cn for classNames, etc.)
```

---

## Data Flow

### Before Optimization (Old Flow)
```
User Input (ZIP, Income, Size)
    ↓
EconomicAnalysis.jsx
    ↓
InvokeLLM Call #1 → Get location from ZIP (AI)
    ↓
InvokeLLM Call #2 → Get benefit thresholds (AI + web search)
    ↓
InvokeLLM Call #3 → Get cost of living (AI + web search)
    ↓
Calculate financial stability
    ↓
Save to Analysis entity
    ↓
Display Results (EconomicResults + CostBreakdown)
```

**Time:** 10-30 seconds | **Cost:** $0.02-0.10 per analysis

### After Optimization (New Flow)
```
User Input (ZIP, Income, Size)
    ↓
EconomicAnalysis.jsx
    ↓
locationLookup.js → Get location from ZIP (instant, local)
    ↓
BenefitThresholds.jsx → Get benefit thresholds (instant, local)
    ↓
costOfLivingData.js → Get cost of living (instant, local)
    ↓
Calculate financial stability
    ↓
Save to Analysis entity
    ↓
Display Results (EconomicResults + CostBreakdown)
```

**Time:** <1 second | **Cost:** $0.00 per analysis

---

## Key Files to Understand

### 1. Main Analysis Logic
**File:** `src/pages/EconomicAnalysis.jsx`
- Main feature implementation
- Orchestrates data lookups
- Contains financial stability calculation logic

### 2. Benefit Threshold Data
**File:** `src/components/data/BenefitThresholds.jsx`
- Official government benefit eligibility limits
- Section 8 (Very Low Income - 50% AMI)
- SNAP gross income limits
- Medicaid adult income limits
- Currently covers: NY, CA, TX, FL, IL, CO
- Easy to expand with more states

### 3. Cost of Living Data
**File:** `src/utils/costOfLivingData.js`
- Monthly expense estimates by state and household size
- Categories: Housing, Food, Transportation, Healthcare, Other
- Based on MIT Living Wage Calculator and BLS data
- Falls back to national averages for unsupported states

### 4. ZIP Code Lookup
**File:** `src/utils/locationLookup.js`
- Uses 'zipcodes' npm package
- 100% accurate local database
- Returns state, city, county

### 5. Results Display
**Files:**
- `src/components/analysis/EconomicResults.jsx` - Main results card
- `src/components/analysis/CostBreakdown.jsx` - Cost breakdown card

---

## Configuration Files

### package.json
- Project dependencies
- npm scripts: `dev`, `build`, `preview`, `lint`
- Uses Vite as bundler, React as framework

### vite.config.js
- Vite bundler configuration
- Path aliases (@/ → src/)
- Build optimizations

### tailwind.config.js
- Tailwind CSS theme configuration
- Custom colors for CarryCalc brand
- Component styles

### components.json
- Shadcn UI configuration
- Component styling preferences
- Import paths

---

## Documentation Files (Root)

### README.md
- Basic project setup instructions
- How to run the app (`npm install`, `npm run dev`)
- Created by Base44

### OPTIMIZATION_SUMMARY.md
- Detailed explanation of optimizations
- Cost savings breakdown
- Performance improvements
- Maintenance schedule

### FEATURES_COVERAGE.md
- State-by-state coverage information
- Which states have complete data
- Population coverage statistics
- Roadmap for expansion

### VISUAL_COMPARISON.md
- Before/after visual comparison
- User experience changes
- Testing checklist

### FILE_STRUCTURE.md (this file)
- Complete project structure documentation
- File descriptions and purposes
- Data flow diagrams

---

## Adding New States

To expand coverage to more states:

1. **Benefit Thresholds:** Edit `src/components/data/BenefitThresholds.jsx`
   - Add new state entry to `benefitData` object
   - Include Section 8, SNAP, Medicaid limits for household sizes 1-8
   - See `DATA_SOURCES.md` for where to find official data

2. **Cost of Living:** Edit `src/utils/costOfLivingData.js`
   - Add new state entry to `costOfLivingData` object
   - Include monthly costs for housing, food, transportation, healthcare, other
   - Use MIT Living Wage Calculator as reference

3. **Test:** Run analysis with ZIP codes from the new state

---

## Development Workflow

### Running Locally
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build
```

### Making Changes

**To modify analysis logic:**
- Edit `src/pages/EconomicAnalysis.jsx`

**To add states:**
- Edit `src/components/data/BenefitThresholds.jsx` (benefit limits)
- Edit `src/utils/costOfLivingData.js` (cost estimates)

**To modify result display:**
- Edit `src/components/analysis/EconomicResults.jsx` (main results)
- Edit `src/components/analysis/CostBreakdown.jsx` (cost breakdown)

**To modify input form:**
- Edit `src/components/analysis/AnalysisForm.jsx`

**To modify styling:**
- Edit component styles inline or in component files
- Edit `src/index.css` for global styles
- Edit `tailwind.config.js` for theme changes

---

## Dependencies

### Key Dependencies (package.json)
- **react** - UI framework
- **react-router-dom** - Routing
- **@base44/sdk** - Base44 platform integration
- **zipcodes** - ZIP code database (NEW - for optimization)
- **lucide-react** - Icon library
- **recharts** - Charting library
- **@radix-ui/*** - Shadcn UI component primitives
- **tailwindcss** - CSS framework

---

## Build Output

### Production Build (`npm run build`)
```
dist/
├── index.html                  # Entry HTML
├── assets/
    ├── index-[hash].css       # Bundled CSS (~65KB)
    └── index-[hash].js        # Bundled JS (~5MB)
```

**Note:** Large bundle size due to comprehensive UI component library. Can be optimized with code-splitting if needed.

---

## Summary

This is a **React + Vite** application with:
- 🎯 Core feature in `EconomicAnalysis.jsx`
- 📊 Static data in `BenefitThresholds.jsx` and `costOfLivingData.js`
- 🎨 UI components from Shadcn UI
- 🚀 Optimized for speed and cost (no AI calls)
- 📱 Responsive design with Tailwind CSS
- 💾 Data persistence via Base44 platform

The app is well-organized, easy to maintain, and ready to expand to more states!
