# Deployment Documentation

## Steps I Followed to Deploy to Vercel

### 1. Prepared the Project
- Made sure all my code was working locally
- Created `vercel.json` file for configuration
- Updated `package.json` with dependencies

### 2. Created Vercel Account
- Went to https://vercel.com/
- Signed up with my GitHub account
- Connected my GitHub repository

### 3. Deployed the Project
- Clicked "New Project" on Vercel
- Selected my GitHub repository
- Vercel automatically detected it was a Node.js project
- Clicked "Deploy"

### 4. Configuration Settings
- Framework Preset: Other
- Root Directory: ./
- Build Command: (left empty)
- Output Directory: (left empty)  
- Install Command: npm install

## Issues I Encountered

### Issue 1: API Routes Not Working
**Problem**: My API endpoints returned 404 errors after deployment.

**Solution**: I had to create a `vercel.json` file to tell Vercel how to route requests to my server file.

**What I learned**: Vercel needs specific configuration for Node.js apps.

### Issue 2: Static Files Not Loading
**Problem**: My CSS and JavaScript files weren't loading.

**Solution**: Added routes in `vercel.json` to serve files from the `front_end` directory.

### Issue 3: Package.json Format
**Problem**: My package.json only had employee data, no npm configuration.

**Solution**: Added the required npm fields while keeping the employee data.

## Resources I Used

1. **Vercel Documentation**: https://vercel.com/docs
   - Learned about serverless functions
   - Found examples of vercel.json configuration

2. **YouTube Tutorial**: "Deploy Node.js to Vercel"
   - Showed me step-by-step deployment process

3. **Stack Overflow**: 
   - Searched for "vercel node.js routing" 
   - Found solutions for static file serving

4. **Class Notes**:
   - Used what we learned about Express.js
   - Applied Bootstrap knowledge from assignments

## Final Result

✅ **Deployment successful!**

- **Live URL**: https://cus1172grantp4f.vercel.app/
- **Frontend**: https://cus1172grantp4f.vercel.app/demo
- **API**: https://cus1172grantp4f.vercel.app/api

## What I Learned

- How to deploy Node.js applications to cloud platforms
- How serverless functions work differently from regular servers
- The importance of proper configuration files
- How to troubleshoot deployment issues using documentation

## Testing

I tested my deployed application by:
- Visiting the main page at /demo
- Trying all search functions
- Testing API endpoints directly
- Checking on mobile devices

## Problem

- During testing I had trouble with blank pages but that problem should be resolved.
