# AI Robotics Lab — Xavier University of Louisiana

Website for the AI for Robotics, Autonomous Systems, Computational Biology, and Climate Computing Research Laboratory at XULA.

**Live site**: https://shafiqulislamrobotics.github.io/ai-robotics-lab/

## Pages
- Home
- About
- Research
- Publications
- Team
- Teaching
- News
- Gallery
- Join
- Contact

## Deployment to GitHub Pages

### Option 1: Automatic (GitHub Actions — Recommended)

1. Create a new GitHub repository named **`ai-robotics-lab`** at https://github.com/new
2. Open a terminal, go into the unzipped `website` folder, then run:
   ```bash
   git init
   git add .
   git commit -m "Initial website commit"
   git branch -M main
   git remote add origin https://github.com/shafiqulislamrobotics/ai-robotics-lab.git
   git push -u origin main
   ```
3. Go to **https://github.com/shafiqulislamrobotics/ai-robotics-lab/settings/pages**
4. Under **Source**, select **GitHub Actions**
5. The site will automatically deploy at:
   👉 **https://shafiqulislamrobotics.github.io/ai-robotics-lab/**

### Option 2: gh-pages branch (Classic)

1. Push repo to GitHub as in step 2 above
2. Go to **https://github.com/shafiqulislamrobotics/ai-robotics-lab/settings/pages**
3. Under **Source** → select **Deploy from branch** → `main` → `/ (root)`
4. Click **Save** — site will be live in ~1 minute at:
   👉 **https://shafiqulislamrobotics.github.io/ai-robotics-lab/**

## Local Development

No build step needed — open `index.html` directly in a browser, or use:
```bash
npx serve .
# or
python3 -m http.server 8080
```
Then visit http://localhost:8080

## Contact
Dr. Shafiqul Islam — sislam3@xula.edu
