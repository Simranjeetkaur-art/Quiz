# RAG Assessment Quiz

A modern, customizable RAG (Red-Amber-Green) assessment quiz application built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive evaluation tool with 40 questions across 4 sections, delivering instant results with personalized insights and downloadable PDF reports.

## Features

- **40 Question Assessment**: Organized into 4 focused sections covering key business areas
- **RAG Scoring System**: Red (needs improvement), Amber (adequate), Green (strong performance)
- **Real-time Progress Tracking**: Visual progress bars for both section and overall completion
- **Instant Results**: Detailed scoring breakdown with section-specific insights
- **Personalized Recommendations**: 40 custom tips based on user responses
- **PDF Report Generation**: Downloadable professional reports with complete results
- **WordPress Embeddable**: Standalone embed page for iframe integration
- **Mobile-First Design**: Fully responsive and accessible UI
- **Easy Customization**: Edit questions and content via JSON file

## Live Demo

🔗 **Development Server**: [http://localhost:3000](http://localhost:3000)
🔗 **WordPress Embed**: [http://localhost:3000/embed](http://localhost:3000/embed)

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **PDF Generation**: @react-pdf/renderer
- **State Management**: React Context API
- **Icons**: Lucide React

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Simranjeetkaur-art/Quiz.git
cd rag-assessment-quiz

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Project Structure

```
rag-assessment-quiz/
├── public/
│   └── quiz-data.json          # All quiz content (EDIT THIS FILE)
├── src/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── quiz/page.tsx       # Quiz interface
│   │   ├── results/page.tsx    # Results display
│   │   ├── embed/page.tsx      # WordPress embed version
│   │   ├── layout.tsx          # Root layout with QuizProvider
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Quiz/               # Quiz-specific components
│   │   ├── Results/            # Results display components
│   │   └── Navigation/         # Navigation components
│   ├── context/
│   │   └── QuizContext.tsx     # Global state management
│   ├── lib/
│   │   ├── scoring.ts          # Scoring calculation logic
│   │   ├── reportBuilder.tsx   # PDF generation
│   │   └── utils.ts            # Helper utilities
│   └── types/
│       └── quiz.types.ts       # TypeScript type definitions
├── README.md                    # This file
├── QUESTION_TEMPLATE.md         # Template for adding questions
└── CUSTOMIZATION_GUIDE.md       # Detailed customization guide
```

## Editing Quiz Content

### Quick Edit Guide

All quiz content is stored in **`public/quiz-data.json`**. This file contains:
- Brand colors
- All 40 questions (10 per section)
- Answer options with tips
- Scoring values
- Insight statements

#### 1. Update Brand Colors

```json
{
  "brandColors": {
    "primary": "#2563eb",      ← Change to your primary brand color
    "secondary": "#7c3aed",    ← Change to your secondary brand color
    "red": "#E74C3C",
    "amber": "#F39C12",
    "green": "#27AE60"
  }
}
```

#### 2. Edit a Question

Find the question in `quiz-data.json` and modify the `text` field:

```json
{
  "id": 1,
  "text": "Your question text here?",  ← Edit this
  "answers": [...]
}
```

#### 3. Update Tips

Each answer has a `tip` field that appears in the results:

```json
{
  "option": "Red",
  "score": 0,
  "tip": "Your personalized tip here."  ← Edit this
}
```

#### 4. Change Scoring

Modify the `score` value for each answer (default: Red=0, Amber=5, Green=10):

```json
{
  "option": "Green",
  "score": 10  ← Change to adjust scoring weight
}
```

### After Making Changes

1. Save the `quiz-data.json` file
2. Refresh your browser (the changes will load automatically)
3. Test the quiz with the new content
4. Redeploy to Vercel (if in production)

For detailed editing instructions, see [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md).

## Assessment Sections

The quiz is divided into 4 sections, each containing 10 questions:

1. **Strategic Planning** (Questions 1-10)
   - Vision and goal setting
   - Strategic review processes
   - Goal alignment across organization

2. **Operational Excellence** (Questions 11-20)
   - Process documentation
   - Efficiency improvements
   - Technology and automation

3. **Team & Leadership** (Questions 21-30)
   - Leadership development
   - Team collaboration
   - Employee engagement

4. **Performance & Growth** (Questions 31-40)
   - KPI tracking
   - Growth opportunities
   - Performance management

## WordPress Integration

### Embedding the Quiz

1. Use the embed page: `/embed`
2. Add to WordPress using an iframe:

```html
<iframe
  src="https://your-domain.vercel.app/embed"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; min-height: 800px;"
></iframe>
```

### Responsive Iframe Code

For better mobile experience, use this responsive code:

```html
<div style="position: relative; width: 100%; padding-bottom: 100%; min-height: 600px;">
  <iframe
    src="https://your-domain.vercel.app/embed"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
  ></iframe>
</div>
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already configured):
   ```bash
   git add .
   git commit -m "feat: initial quiz application"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure build settings
   - Click "Deploy"

3. **Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Environment Variables

This application doesn't require environment variables for basic functionality. If you add external integrations (analytics, etc.), add them in Vercel's dashboard:

- Project Settings → Environment Variables

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Lint code
npm run lint

# Run E2E tests (after setting up Playwright)
npm run test
```

## Customization

### Changing Colors

Edit `public/quiz-data.json`:
```json
{
  "brandColors": {
    "primary": "#YOUR_COLOR",
    "secondary": "#YOUR_COLOR"
  }
}
```

### Adding More Questions

See [QUESTION_TEMPLATE.md](./QUESTION_TEMPLATE.md) for the exact format.

### Modifying Scoring Logic

Edit `src/lib/scoring.ts` to customize:
- Score calculations
- Insight selection logic
- Progress calculations

### Customizing UI

- **Colors**: Edit `src/app/globals.css` and `tailwind.config.ts`
- **Components**: Modify files in `src/components/`
- **Layout**: Update `src/app/layout.tsx`

## PDF Reports

The application generates professional PDF reports with:
- Overall score and insights
- Section-by-section breakdown
- All 40 personalized recommendations
- Professional formatting with brand colors

### Adding a Logo to PDFs

1. Open `src/lib/reportBuilder.tsx`
2. Find the comment `// Add your logo here`
3. Add an Image component from `@react-pdf/renderer`:

```tsx
import { Image } from '@react-pdf/renderer';

// In your PDF component:
<Image src="/path/to/logo.png" style={{ width: 100 }} />
```

## Troubleshooting

### Quiz Data Not Loading

**Issue**: Error message "Failed to load quiz data"

**Solution**:
1. Check that `public/quiz-data.json` exists
2. Validate JSON syntax using a JSON validator
3. Ensure all required fields are present
4. Check browser console for specific errors

### PDF Generation Fails

**Issue**: Error when clicking "Download PDF"

**Solution**:
1. Check browser console for errors
2. Ensure `@react-pdf/renderer` is installed: `npm install @react-pdf/renderer`
3. Try a different browser (some ad blockers interfere with downloads)

### Styling Issues

**Issue**: Colors or layout don't look right

**Solution**:
1. Run `npm run dev` to ensure development server is running
2. Clear browser cache
3. Check that Tailwind CSS is compiling: `npm run build`

### Embed Not Working in WordPress

**Issue**: Iframe doesn't display quiz

**Solution**:
1. Ensure CORS is configured (Next.js handles this automatically)
2. Check iframe height - set to `min-height: 800px`
3. Test embed page directly: `/embed`
4. Some WordPress themes block iframes - contact your theme developer

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast
- Focus indicators
- Semantic HTML

## Performance

- Optimized bundle size with code splitting
- Lazy loading for PDF generation
- Server-side rendering (SSR) with Next.js
- Fast page loads (<2s on average connection)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

MIT License - feel free to use this project for commercial or personal purposes.

## Support

For issues or questions:
- Open an issue on GitHub
- Check [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for detailed help
- Review [QUESTION_TEMPLATE.md](./QUESTION_TEMPLATE.md) for content formatting

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [@react-pdf/renderer](https://react-pdf.org/)

## Repository

🔗 [https://github.com/Simranjeetkaur-art/Quiz](https://github.com/Simranjeetkaur-art/Quiz)

---

**Made with ❤️ using Next.js and TypeScript**
