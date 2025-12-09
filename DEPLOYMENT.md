# Deployment Guide

Complete guide to deploying your RAG Assessment Quiz to Vercel.

## Prerequisites

- GitHub account (✅ Already connected)
- Vercel account ([Sign up free](https://vercel.com/signup))
- Your code pushed to GitHub (✅ Complete)

## Quick Deployment to Vercel

### Option 1: Import from GitHub (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find `Simranjeetkaur-art/Quiz` from the list
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `rag-assessment-quiz` (or your preferred name)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll see "Congratulations!" when done

5. **Get Your URL**
   - Your app will be live at: `https://your-project-name.vercel.app`
   - Example: `https://rag-assessment-quiz.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd "d:\Tools\cursor_ai\Quiz app\rag-assessment-quiz"
vercel --prod
```

## Post-Deployment Steps

### 1. Test Your Deployment

Visit these URLs and test:

```
https://your-app.vercel.app           ← Landing page
https://your-app.vercel.app/quiz      ← Quiz interface
https://your-app.vercel.app/results   ← Results (after completing quiz)
https://your-app.vercel.app/embed     ← WordPress embed version
```

### 2. Add Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `quiz.yourdomain.com`)
3. Update DNS records with your domain provider:

**CNAME Record**:
- Type: `CNAME`
- Name: `quiz` (or your subdomain)
- Value: `cname.vercel-dns.com`

4. Wait for DNS propagation (5-60 minutes)

### 3. Configure Environment Variables (If Needed)

If you add analytics or external services:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_GA_ID` (Google Analytics)
   - `NEXT_PUBLIC_API_URL` (if using external API)

## WordPress Embedding

### After Deployment

Use your Vercel URL in WordPress:

```html
<iframe
  src="https://your-app.vercel.app/embed"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; min-height: 800px;"
></iframe>
```

### Responsive Embed Code

```html
<div style="position: relative; width: 100%; padding-bottom: 100%; min-height: 600px;">
  <iframe
    src="https://your-app.vercel.app/embed"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
  ></iframe>
</div>
```

## Updating Your Deployment

### Making Changes

1. **Edit locally**:
   - Update `public/quiz-data.json` for content changes
   - Modify components for design changes

2. **Test locally**:
   ```bash
   npm run dev
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: update quiz questions"
   git push origin master
   ```

4. **Auto-deploy**:
   - Vercel automatically rebuilds when you push to GitHub
   - Takes 2-3 minutes
   - Check deployment status in Vercel Dashboard

## Monitoring Your Deployment

### Vercel Analytics (Built-in)

1. Vercel Dashboard → Your Project → Analytics
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Adding Google Analytics

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md#adding-analytics)

## Performance Optimization

Your app is already optimized with:
- ✅ Server-side rendering (SSR)
- ✅ Code splitting
- ✅ Lazy loading for PDF generation
- ✅ Image optimization (Next.js)
- ✅ Automatic compression

### Additional Optimizations

1. **Enable Edge Functions** (Faster worldwide):
   - Vercel Dashboard → Settings → Functions
   - Set Region to "Global" or nearest to users

2. **Caching**:
   - Static assets cached automatically
   - JSON data cached by Next.js

## Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Ensure all dependencies in `package.json`
- Run `npm install` locally to verify

**Error**: "Type errors"
- **Solution**: Run `npm run build` locally first
- Fix TypeScript errors before deploying

### 404 Errors After Deployment

**Issue**: Pages not found
- **Solution**: Ensure routes are correct in Next.js App Router
- Check file structure: `src/app/[route]/page.tsx`

### PDF Generation Fails in Production

**Issue**: PDF download doesn't work
- **Solution**: Verify `@react-pdf/renderer` is in `dependencies` (not `devDependencies`)
- Check browser console for errors

### Embed Not Working

**Issue**: Iframe blocked or not loading
- **Solution**: Check CORS settings (Next.js handles automatically)
- Verify iframe src URL is correct
- Test embed page directly first

## Deployment Checklist

Before considering deployment complete:

- [ ] Site loads at Vercel URL
- [ ] Landing page displays correctly
- [ ] All 40 questions are accessible
- [ ] Can complete full quiz flow
- [ ] Results page shows with correct calculations
- [ ] PDF download works
- [ ] Embed page loads independently
- [ ] Mobile responsive on all pages
- [ ] Brand colors display correctly
- [ ] No console errors

## Rollback

If you need to rollback to a previous version:

1. Vercel Dashboard → Your Project → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Advanced Configuration

### vercel.json (Optional)

Create `vercel.json` for advanced settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/quiz-data.json",
      "destination": "/api/quiz-data"
    }
  ],
  "headers": [
    {
      "source": "/embed",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        }
      ]
    }
  ]
}
```

### Preview Deployments

Every push to a branch creates a preview:
- URL: `https://your-app-git-[branch]-[user].vercel.app`
- Test changes before merging to main
- Share preview links with team

## Cost

- **Hobby Plan**: FREE
  - Unlimited deployments
  - 100GB bandwidth/month
  - Perfect for this project

- **Pro Plan**: $20/month
  - Custom domains
  - More bandwidth
  - Team features

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Community**: [vercel.com/community](https://vercel.com/community)

## Next Steps

After deployment:

1. ✅ Share your quiz URL with users
2. ✅ Embed in WordPress site
3. ✅ Add to email signatures
4. ✅ Track analytics
5. ✅ Gather feedback
6. ✅ Iterate and improve

---

## Quick Reference

**GitHub Repo**: [https://github.com/Simranjeetkaur-art/Quiz](https://github.com/Simranjeetkaur-art/Quiz)

**Deployment Command**: `vercel --prod`

**Build Command**: `npm run build`

**Local Dev**: `npm run dev`

**Test Build**: `npm run build && npm run start`

---

**Ready to deploy? Visit [vercel.com/new](https://vercel.com/new) and import your repository!**
