# Question Template Guide

This guide shows you exactly how to add new questions to the RAG Assessment Quiz.

## Location

All questions are stored in: **`public/quiz-data.json`**

## Question Structure

Each question follows this exact format:

```json
{
  "id": 1,
  "text": "Your question text here?",
  "answers": [
    {
      "option": "Red",
      "score": 0,
      "tip": "Tip for selecting Red answer"
    },
    {
      "option": "Amber",
      "score": 5,
      "tip": "Tip for selecting Amber answer"
    },
    {
      "option": "Green",
      "score": 10,
      "tip": "Tip for selecting Green answer"
    }
  ]
}
```

## Field Explanations

### `id` (number)
- **Required**: Yes
- **Must be unique**: Each question needs a different ID
- **Range**: 1-40 (for a 40-question quiz)
- **Example**: `"id": 1`

### `text` (string)
- **Required**: Yes
- **The actual question**: What users will see and answer
- **Best practices**:
  - Keep it clear and concise
  - Use professional language
  - End with a question mark
  - Aim for 10-20 words
- **Example**: `"text": "Does your organization have a clearly defined strategic vision?"`

### `answers` (array)
- **Required**: Yes
- **Must have exactly 3 answers**: Red, Amber, Green (in that order)

#### Answer Object Fields

##### `option` (string)
- **Required**: Yes
- **Must be**: "Red", "Amber", or "Green" (exact spelling, capitalized)
- **Order matters**: Always list in Red → Amber → Green order

##### `score` (number)
- **Required**: Yes
- **Default values**:
  - Red: `0`
  - Amber: `5`
  - Green: `10`
- **Customizable**: You can change these for weighted questions
- **Example**: For more important questions, use 0/10/20

##### `tip` (string)
- **Required**: Yes
- **Personalized recommendation**: Shows in results based on user's answer
- **Best practices**:
  - Be specific and actionable
  - Start with an action verb (Implement, Create, Establish, etc.)
  - Provide clear next steps
  - Aim for 15-30 words
- **Example**: `"tip": "Establish a quarterly strategic review process. Create a calendar of regular leadership meetings focused on strategic priorities."`

## Complete Question Example

Here's a fully formed question with all best practices:

```json
{
  "id": 5,
  "text": "How effectively does your team communicate across departments?",
  "answers": [
    {
      "option": "Red",
      "score": 0,
      "tip": "Implement regular cross-departmental meetings and create shared communication channels. Consider using collaboration tools like Slack or Microsoft Teams to break down silos."
    },
    {
      "option": "Amber",
      "score": 5,
      "tip": "Enhance communication by establishing formal collaboration protocols. Create cross-functional project teams and implement shared goals that require inter-departmental cooperation."
    },
    {
      "option": "Green",
      "score": 10,
      "tip": "Excellent communication! Maintain this by documenting and sharing communication best practices. Consider creating a communication playbook for new employees."
    }
  ]
}
```

## Adding a New Question

### Step 1: Find the Right Section

Open `public/quiz-data.json` and locate the section where you want to add the question:

```json
{
  "sections": [
    {
      "id": 1,
      "title": "Strategic Planning",
      "questions": [
        // Questions 1-10 go here
      ]
    },
    {
      "id": 2,
      "title": "Operational Excellence",
      "questions": [
        // Questions 11-20 go here
      ]
    }
    // ... more sections
  ]
}
```

### Step 2: Copy the Template

Use this template as your starting point:

```json
{
  "id": XX,
  "text": "Your question here?",
  "answers": [
    {
      "option": "Red",
      "score": 0,
      "tip": "Red answer tip here."
    },
    {
      "option": "Amber",
      "score": 5,
      "tip": "Amber answer tip here."
    },
    {
      "option": "Green",
      "score": 10,
      "tip": "Green answer tip here."
    }
  ]
}
```

### Step 3: Fill in the Details

1. **Set the ID**: Use the next available number
2. **Write the question**: Clear, specific, relevant to the section
3. **Write tips for each answer**:
   - Red: What to do if this area needs significant improvement
   - Amber: How to move from adequate to excellent
   - Green: How to maintain excellence

### Step 4: Add to JSON File

Add your question to the appropriate section's `questions` array:

```json
{
  "id": 2,
  "title": "Operational Excellence",
  "questions": [
    {
      "id": 11,
      "text": "Existing question..."
    },
    {
      "id": 12,
      "text": "Another existing question..."
    },
    {
      "id": 13,
      "text": "Your new question here?",  ← NEW QUESTION
      "answers": [
        // Your answers here
      ]
    }
  ]
}
```

### Step 5: Validate JSON

Before saving, validate your JSON:
1. Check for missing commas
2. Ensure all quotes are matching
3. Verify all brackets are closed
4. Use a JSON validator: [jsonlint.com](https://jsonlint.com)

### Step 6: Test

1. Save the file
2. Refresh your browser
3. Navigate to the quiz
4. Test your new question
5. Verify tips appear correctly in results

## Question Writing Tips

### Good Question Examples ✅

```
"Does your organization have a clearly defined strategic vision for the next 3-5 years?"
"How frequently does your leadership team review and adjust strategic priorities?"
"Are your core business processes documented and standardized?"
```

### Poor Question Examples ❌

```
"Is your strategy good?" (too vague)
"Do you have processes?" (not specific enough)
"What about your leadership team's approach to strategic planning initiatives?" (too long/complex)
```

### Good Tip Examples ✅

```
"Establish a quarterly strategic review process with clear agendas and decision-making frameworks."
"Document your top 5 critical processes using flowcharts and assign process owners to each."
"Implement an employee engagement survey with quarterly pulse checks and action planning."
```

### Poor Tip Examples ❌

```
"Do better." (not actionable)
"You need to improve your strategy." (vague)
"Everything is perfect, keep it up!" (not helpful)
```

## Section Guidelines

### Section 1: Strategic Planning (IDs 1-10)
**Focus**: Vision, goals, long-term planning, strategic alignment
**Question types**: Planning processes, goal setting, strategic reviews

### Section 2: Operational Excellence (IDs 11-20)
**Focus**: Processes, efficiency, systems, automation
**Question types**: Process documentation, optimization, technology adoption

### Section 3: Team & Leadership (IDs 21-30)
**Focus**: People, culture, development, collaboration
**Question types**: Leadership programs, engagement, team dynamics

### Section 4: Performance & Growth (IDs 31-40)
**Focus**: Metrics, KPIs, performance management, growth
**Question types**: Tracking systems, growth strategies, performance reviews

## Scoring Strategies

### Standard Scoring (Most Common)
```json
"Red": { "score": 0 },
"Amber": { "score": 5 },
"Green": { "score": 10 }
```
Use when all questions are equally important.

### Weighted Scoring (High Priority)
```json
"Red": { "score": 0 },
"Amber": { "score": 10 },
"Green": { "score": 20 }
```
Use for critical strategic questions.

### Light Scoring (Lower Priority)
```json
"Red": { "score": 0 },
"Amber": { "score": 2 },
"Green": { "score": 5 }
```
Use for nice-to-have capabilities.

## Common Mistakes to Avoid

### ❌ Missing Comma
```json
{
  "id": 1,
  "text": "Question?"
  "answers": []  ← ERROR: Missing comma after "?"
}
```

### ✅ Correct
```json
{
  "id": 1,
  "text": "Question?",  ← Comma added
  "answers": []
}
```

### ❌ Wrong Answer Option Name
```json
{
  "option": "yellow"  ← ERROR: Must be "Red", "Amber", or "Green"
}
```

### ❌ Duplicate IDs
```json
{
  "id": 5,  ← Used here
  "text": "First question?"
},
{
  "id": 5,  ← ERROR: Used again
  "text": "Second question?"
}
```

### ❌ Missing Answer
```json
"answers": [
  { "option": "Red", "score": 0, "tip": "..." },
  { "option": "Amber", "score": 5, "tip": "..." }
  // ERROR: Missing Green option
]
```

## Bulk Adding Questions

If adding multiple questions at once:

1. **Plan your IDs**: List out all IDs you'll use (e.g., 11-15)
2. **Draft questions first**: Write all question texts before formatting
3. **Write tips separately**: Create tips document, then copy into JSON
4. **Add one at a time**: Add and test each question individually
5. **Validate often**: Check JSON validity after each addition

## Testing Checklist

After adding questions, verify:

- [ ] JSON file has no syntax errors
- [ ] All IDs are unique (no duplicates)
- [ ] Each question has exactly 3 answers (Red, Amber, Green)
- [ ] All tips are clear and actionable
- [ ] Scores are consistent with your strategy
- [ ] Question fits within the section theme
- [ ] Question text is clear and concise
- [ ] Tips appear correctly in results
- [ ] PDF generation still works
- [ ] Mobile view displays properly

## Need Help?

- **JSON Validation**: [jsonlint.com](https://jsonlint.com)
- **Character Counter**: [wordcounter.net](https://wordcounter.net)
- **Markdown Preview**: Your IDE or [dillinger.io](https://dillinger.io)

## Example: Adding Question 41 (Extra Credit)

If you want to add a 41st question to any section:

```json
{
  "id": 41,
  "text": "How mature is your organization's data analytics capability?",
  "answers": [
    {
      "option": "Red",
      "score": 0,
      "tip": "Start by identifying key data sources and implementing a basic analytics platform. Focus on reporting before advancing to predictive analytics."
    },
    {
      "option": "Amber",
      "score": 5,
      "tip": "Enhance your analytics by adding visualization dashboards and training teams on data interpretation. Consider hiring a data analyst to build capability."
    },
    {
      "option": "Green",
      "score": 10,
      "tip": "Excellent analytics maturity! Continue evolving by exploring AI/ML applications and ensuring data democratization across the organization."
    }
  ]
}
```

**Note**: Adding extra questions requires updating the total question count in the application code (`QuizContext.tsx` and scoring functions).

---

## Quick Reference

**File**: `public/quiz-data.json`

**Structure**:
```
Quiz Data
 └─ Sections (4)
     └─ Questions (10 each)
         └─ Answers (3: Red, Amber, Green)
             ├─ Option
             ├─ Score
             └─ Tip
```

**Field Requirements**:
- `id`: Unique number, 1-40
- `text`: Question string, 10-20 words
- `answers`: Array of 3 answer objects
- `option`: "Red", "Amber", or "Green"
- `score`: Number (default: 0, 5, 10)
- `tip`: Actionable recommendation, 15-30 words

---

**Ready to add questions? Start editing `public/quiz-data.json` now!**
