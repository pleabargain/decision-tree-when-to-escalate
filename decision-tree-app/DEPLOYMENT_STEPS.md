# Deployment Steps for Decision Tree Application

This document provides step-by-step instructions to complete the deployment of the Decision Tree for Issue Escalation application. Follow these steps in order to ensure a successful deployment.

## 1. GitHub Repository Setup

### 1.1 Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Enter a repository name (e.g., "decision-tree-escalation")
4. Add a description (optional): "A web application that guides users through a series of questions to determine whether an issue should be escalated to management"
5. Choose "Public" or "Private" visibility based on your requirements
6. Do NOT initialize the repository with a README, .gitignore, or license (we already have these files)
7. Click "Create repository"

### 1.2 Push the Local Repository to GitHub

After creating the GitHub repository, you'll see instructions for pushing an existing repository. Follow these steps:

1. Open a terminal in the project root directory (where the .git folder is located)
2. Run the following commands, replacing `yourusername` and `your-repo-name` with your GitHub username and the repository name you created:

```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

3. Verify that your code has been pushed to GitHub by refreshing the GitHub repository page

## 2. Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Click on "New Project"
3. Enter a project name (e.g., "issue-escalation-decision-tree")
4. Choose a database password (save this securely in a password manager)
5. Select a region closest to your users (for optimal performance)
6. Click "Create new project"
7. Wait for your project to be provisioned (this may take a few minutes)

### 2.2 Set Up the Database Schema

1. In your Supabase project dashboard, navigate to the "SQL Editor" section
2. Click "New Query"
3. Open the file `supabase/schema.sql` from this repository
4. Copy and paste the entire contents into the SQL Editor
5. Click "Run" to execute the SQL script
6. Verify that the tables have been created by checking the "Table Editor" section
7. Confirm that the following tables exist:
   - `decision_trees` (with sample data)
   - `decision_paths` (empty)

### 2.3 Get API Keys

1. Go to the "Settings" section in your Supabase dashboard
2. Click on "API" in the sidebar
3. You'll find your "Project URL" and "anon" public API key
4. Copy these values as you'll need them for the Vercel deployment

## 3. Vercel Deployment

### 3.1 Create a Vercel Project

1. Go to [Vercel](https://vercel.com/) and sign in or create an account
2. Click "Add New..." and select "Project"
3. Import your repository from GitHub
   - You may need to install the Vercel GitHub app if you haven't already
   - Select the repository you created in step 1
4. Configure project settings:
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `decision-tree-app` (important!)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### 3.2 Configure Environment Variables

1. Expand the "Environment Variables" section
2. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (from step 2.3)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (from step 2.3)
3. Click "Deploy"

### 3.3 Wait for Deployment

1. Vercel will build and deploy your application
2. This process usually takes a few minutes
3. Once complete, you'll see a success message and a link to your deployed application

## 4. Verify Deployment

### 4.1 Test the Application

1. Click on the deployment URL to open your application
2. Test the decision tree flow to ensure it's working correctly
3. Verify that it's connecting to your Supabase backend by checking the network requests
4. Test on different devices to ensure responsive design

### 4.2 Check for Issues

If you encounter any issues:

1. Check the Vercel deployment logs for errors
2. Verify that your environment variables are correctly set
3. Ensure that your Supabase project is properly configured
4. Test the database connection

## 5. Next Steps After Deployment

1. Set up a custom domain (optional)
2. Configure continuous deployment
3. Set up monitoring and analytics
4. Implement automated testing
5. Conduct an accessibility audit
6. Gather user feedback and make improvements

## Deployment Checklist

- [ ] Create GitHub repository
- [ ] Push local repository to GitHub
- [ ] Create Supabase project
- [ ] Run database schema script
- [ ] Get Supabase API keys
- [ ] Create Vercel project
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Verify deployment
- [ ] Test application functionality
