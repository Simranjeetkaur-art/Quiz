# Customization Guide

Complete guide to customizing the RAG Assessment Quiz for your specific needs.

## Table of Contents

1. [Changing Brand Colors](#changing-brand-colors)
2. [Editing Questions](#editing-questions)
3. [Modifying Scoring](#modifying-scoring)
4. [Customizing Insights](#customizing-insights)
5. [Adding a Logo to PDFs](#adding-a-logo-to-pdfs)
6. [Styling and Themes](#styling-and-themes)
7. [Adding Analytics](#adding-analytics)
8. [Custom Sections](#custom-sections)
9. [Deployment Configuration](#deployment-configuration)

---

## Changing Brand Colors

### Method 1: Edit JSON File (Easiest)

**File**: `public/quiz-data.json`

```json
{
  "brandColors": {
    "primary": "#2563eb",      ← Your primary brand color
    "secondary": "#7c3aed",    ← Your secondary brand color
    "red": "#E74C3C",          ← Keep standard or customize
    "amber": "#F39C12",        ← Keep standard or customize
    "green": "#27AE60"         ← Keep standard or customize
  }
}
```

**Steps**:
1. Open `public/quiz-data.json`
2. Find the `brandColors` section at the top
3. Replace hex codes with your colors
4. Save the file
5. Refresh your browser

**Finding Your Brand Colors**:
- Use your brand guidelines
- Extract from your logo using [imagecolorpicker.com](https://imagecolorpicker.com)
- Check your website's CSS

### Method 2: Edit CSS Variables (Advanced)

**File**: `src/app/globals.css`

Find the `:root` section and modify:

```css
:root {
  --color-primary: #2563eb;    ← Change this
  --color-secondary: #7c3aed;  ← Change this
}
```

### Method 3: Update Tailwind Config (Developer)

**File**: `tailwind.config.ts`

```typescript
colors: {
  brand: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
  },
  rag: {
    red: "#E74C3C",      ← Customize RAG colors
    amber: "#F39C12",
    green: "#27AE60",
  }
}
```

---

## Editing Questions

### Quick Edit

**File**: `public/quiz-data.json`

Find your question by ID and edit the `text` field:

```json
{
  "id": 1,
  "text": "Your new question text here?",  ← Edit this line
  "answers": [...]
}
```

### Editing Tips

Each answer has a `tip` that shows in results:

```json
{
  "option": "Red",
  "score": 0,
  "tip": "Your specific recommendation here."  ← Edit this
}
```

### Best Practices for Questions

**Good Question** ✅:
- Clear and specific
- Relevant to section theme
- 10-20 words
- Ends with question mark

**Good Tip** ✅:
- Actionable and specific
- Starts with action verb
- Provides clear next steps
- 15-30 words

See [QUESTION_TEMPLATE.md](./QUESTION_TEMPLATE.md) for complete guide.

---

## Modifying Scoring

### Standard Scoring

Default scoring: Red=0, Amber=5, Green=10

```json
{
  "answers": [
    { "option": "Red", "score": 0 },
    { "option": "Amber", "score": 5 },
    { "option": "Green", "score": 10 }
  ]
}
```

### Weighted Questions

Make certain questions more important:

```json
{
  "answers": [
    { "option": "Red", "score": 0 },
    { "option": "Amber", "score": 10 },   ← Double weight
    { "option": "Green", "score": 20 }    ← Double weight
  ]
}
```

**When to use**: Critical strategic questions that heavily impact results.

### Light-Weight Questions

Make questions less impactful:

```json
{
  "answers": [
    { "option": "Red", "score": 0 },
    { "option": "Amber", "score": 2 },    ← Half weight
    { "option": "Green", "score": 5 }     ← Half weight
  ]
}
```

**When to use**: "Nice to have" questions, exploratory questions.

### Custom Scoring Logic

To modify how scores are calculated:

**File**: `src/lib/scoring.ts`

Key functions:
```typescript
// Total section score
calculateSectionScore(sectionId, answers)

// Overall quiz score
calculateOverallScore(answers)

// Get insight based on score
getInsightForScore(score, insights)
```

Example modification - add bonus points:

```typescript
export function calculateOverallScore(answers: UserAnswer[]): number {
  const baseScore = answers.reduce((total, answer) => total + answer.score, 0);
  const bonusPoints = answers.length === 40 ? 10 : 0; // Completion bonus
  return baseScore + bonusPoints;
}
```

---

## Customizing Insights

### Section Insights

**File**: `public/quiz-data.json`

Each section has score-based insights:

```json
{
  "insightStatements": {
    "0-30": "Low score message",      ← 0-30 points
    "31-60": "Medium score message",  ← 31-60 points
    "61-100": "High score message"    ← 61-100 points
  }
}
```

### Overall Insights

At the bottom of `quiz-data.json`:

```json
{
  "overallInsights": {
    "0-100": "Significant improvement needed",
    "101-200": "Good foundation, room to grow",
    "201-300": "Strong performance overall",
    "301-400": "Excellent organizational capabilities"
  }
}
```

### Creating Custom Score Ranges

You can add more granular ranges:

```json
{
  "insightStatements": {
    "0-20": "Critical needs",
    "21-40": "Significant gaps",
    "41-60": "Basic capabilities",
    "61-80": "Good performance",
    "81-100": "Exceptional"
  }
}
```

**Note**: Ranges must be continuous and cover all possible scores.

---

## Adding a Logo to PDFs

### Step 1: Add Logo File

1. Place your logo in `public/` folder (e.g., `public/logo.png`)
2. Recommended: PNG format, transparent background, 200-400px wide

### Step 2: Import in PDF Builder

**File**: `src/lib/reportBuilder.tsx`

At the top, import Image component:

```typescript
import { Image } from '@react-pdf/renderer';
```

### Step 3: Add Logo to PDF

Find the `MyDocument` component and add logo:

```typescript
<Page size="A4" style={styles.page}>
  {/* Header with Logo */}
  <View style={styles.header}>
    <Image
      src="/logo.png"          ← Your logo path
      style={{
        width: 150,            ← Adjust size
        height: 50,
        marginBottom: 10
      }}
    />
    <Text style={styles.title}>RAG Assessment Results</Text>
  </View>
  {/* Rest of content */}
</Page>
```

### Step 4: Add Logo Styling

In the `styles` object:

```typescript
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 50,
    marginBottom: 15,
  },
  // ... other styles
});
```

### Using External Logo URL

If hosting logo externally:

```typescript
<Image
  src="https://your-domain.com/logo.png"
  style={styles.logo}
/>
```

---

## Styling and Themes

### Global Styles

**File**: `src/app/globals.css`

#### Change Font

```css
body {
  font-family: 'Your Font', sans-serif;  ← Change here
}
```

#### Adjust Spacing

```css
.quiz-container {
  max-width: 4xl;       ← Container width
  margin: 0 auto;
  padding: 2rem;        ← Padding
}
```

#### Button Styles

```css
.answer-button-red {
  @apply bg-rag-red hover:bg-rag-red/90 text-white;
  /* Add custom styles */
}
```

### Component Styling

**shadcn/ui components** are in `src/components/ui/`

Example - Customize Button:

**File**: `src/components/ui/button.tsx`

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add your custom variant:
        custom: "bg-purple-500 text-white hover:bg-purple-600"
      }
    }
  }
);
```

### Dark Mode (Optional)

The theme supports dark mode. To enable:

**File**: `tailwind.config.ts`

Dark mode is already configured! To activate:

```typescript
// In your layout or page component
<html className="dark">
```

---

## Adding Analytics

### Google Analytics

#### Step 1: Install Package

```bash
npm install @next/third-parties
```

#### Step 2: Add to Layout

**File**: `src/app/layout.tsx`

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />  ← Your GA ID
      </body>
    </html>
  )
}
```

### Custom Event Tracking

Track quiz completion:

**File**: `src/app/results/page.tsx`

```typescript
useEffect(() => {
  if (results) {
    // Track completion
    window.gtag?.('event', 'quiz_completed', {
      score: results.overallScore,
      percentage: calculatePercentage(results.overallScore, results.overallMaxScore)
    });
  }
}, [results]);
```

### Plausible Analytics (Privacy-Friendly)

**File**: `src/app/layout.tsx`

Add script to head:

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Custom Sections

### Changing Section Count

**Current**: 4 sections, 10 questions each (40 total)

To change to 5 sections of 8 questions (40 total):

#### Step 1: Update quiz-data.json

Add a 5th section:

```json
{
  "sections": [
    { "id": 1, "title": "Section 1", "questions": [...] },
    { "id": 2, "title": "Section 2", "questions": [...] },
    { "id": 3, "title": "Section 3", "questions": [...] },
    { "id": 4, "title": "Section 4", "questions": [...] },
    { "id": 5, "title": "Section 5", "questions": [...] }  ← NEW
  ]
}
```

#### Step 2: Update Context Validation

**File**: `src/context/QuizContext.tsx`

```typescript
// Change this:
if (!data.sections || data.sections.length !== 4) {
  throw new Error("Invalid quiz data: Must have exactly 4 sections");
}

// To this:
if (!data.sections || data.sections.length !== 5) {
  throw new Error("Invalid quiz data: Must have exactly 5 sections");
}
```

#### Step 3: Update Navigation Logic

**File**: `src/app/quiz/page.tsx`

```typescript
// Change this:
const isLastQuestion = currentSectionIndex === 3 && currentQuestionIndex === 9;

// To this:
const isLastQuestion = currentSectionIndex === 4 && currentQuestionIndex === 7;
```

### Changing Section Titles

**File**: `public/quiz-data.json`

Simply edit the `title` field:

```json
{
  "id": 1,
  "title": "Your New Section Title",  ← Edit here
  "description": "Your new description",
  "questions": [...]
}
```

---

## Deployment Configuration

### Vercel Environment Variables

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL` (if using external API)
   - `NEXT_PUBLIC_GA_ID` (Google Analytics ID)

**File**: Create `.env.local`

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Access in code**:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add domain: `quiz.yourdomain.com`
3. Update DNS records:
   - Type: `CNAME`
   - Name: `quiz`
   - Value: `cname.vercel-dns.com`

### Build Configuration

**File**: `next.config.js`

```javascript
const nextConfig = {
  output: 'standalone',        // For Docker deployment
  compress: true,              // Enable gzip compression
  poweredByHeader: false,      // Remove X-Powered-By header

  // Add custom headers
  async headers() {
    return [
      {
        source: '/embed',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};
```

---

## Advanced Customizations

### Custom Results Calculation

**File**: `src/lib/scoring.ts`

Add percentile ranking:

```typescript
export function getPercentileRank(score: number): string {
  if (score >= 360) return "Top 10%";
  if (score >= 320) return "Top 25%";
  if (score >= 280) return "Top 50%";
  return "Below Average";
}
```

Use in results:

```typescript
const percentile = getPercentileRank(results.overallScore);
```

### Email Results

Add email functionality:

```bash
npm install resend
```

**File**: `src/app/api/send-results/route.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, results } = await request.json();

  await resend.emails.send({
    from: 'quiz@yourdomain.com',
    to: email,
    subject: 'Your RAG Assessment Results',
    html: `<p>Your score: ${results.overallScore}/400</p>`
  });

  return Response.json({ success: true });
}
```

### Save Results to Database

Using Vercel Postgres:

```bash
npm install @vercel/postgres
```

**File**: `src/app/api/save-results/route.ts`

```typescript
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { results } = await request.json();

  await sql`
    INSERT INTO quiz_results (score, completed_at, data)
    VALUES (${results.overallScore}, NOW(), ${JSON.stringify(results)})
  `;

  return Response.json({ success: true });
}
```

---

## Testing Your Customizations

### Checklist

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Chrome Mobile)
- [ ] Verify all 40 questions load
- [ ] Complete full quiz flow
- [ ] Check results page displays correctly
- [ ] Test PDF download
- [ ] Verify embed page works
- [ ] Check brand colors appear throughout
- [ ] Test with invalid data (error handling)
- [ ] Verify responsive design at different sizes

### Common Issues

**Colors not updating**:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check developer console for errors

**PDF generation fails**:
- Ensure `@react-pdf/renderer` is installed
- Check for syntax errors in `reportBuilder.tsx`
- Try different browser

**Questions not appearing**:
- Validate JSON at [jsonlint.com](https://jsonlint.com)
- Check all required fields are present
- Verify question IDs are unique

---

## Getting Help

- **Documentation**: Check README.md for basics
- **Question Format**: See QUESTION_TEMPLATE.md
- **Issues**: Open issue on GitHub
- **JSON Validation**: [jsonlint.com](https://jsonlint.com)
- **Color Picker**: [htmlcolorcodes.com](https://htmlcolorcodes.com)

---

## Quick Reference

### Files to Edit for Common Changes

| What to Change | File to Edit | Section |
|----------------|-------------|---------|
| Brand colors | `public/quiz-data.json` | `brandColors` |
| Questions | `public/quiz-data.json` | `sections[].questions` |
| Tips | `public/quiz-data.json` | `answers[].tip` |
| Scoring | `public/quiz-data.json` | `answers[].score` |
| Insights | `public/quiz-data.json` | `insightStatements` |
| Section titles | `public/quiz-data.json` | `sections[].title` |
| PDF layout | `src/lib/reportBuilder.tsx` | `MyDocument` component |
| Global styles | `src/app/globals.css` | CSS rules |
| Button styles | `src/components/ui/button.tsx` | `buttonVariants` |

---

**Ready to customize? Start with simple changes first, then move to advanced customizations!**
