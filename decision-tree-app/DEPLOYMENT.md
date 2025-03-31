# Deployment Guide

This guide provides step-by-step instructions for deploying the Issue Escalation Decision Tree application using Vercel and Supabase. Follow these instructions carefully to ensure a successful deployment.

## Supabase Deployment

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Click on "New Project"
3. Enter a project name (e.g., "issue-escalation-decision-tree")
4. Choose a database password (save this securely in a password manager)
5. Select a region closest to your users (for optimal performance)
6. Click "Create new project"
7. Wait for your project to be provisioned (this may take a few minutes)
8. Once provisioned, you'll be taken to the project dashboard

### 2. Set Up the Database Schema

1. In your Supabase project dashboard, navigate to the "SQL Editor" section
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/schema.sql` from this repository
4. Click "Run" to execute the SQL script
5. Verify that the tables have been created by checking the "Table Editor" section
6. Confirm that the following tables exist:
   - `decision_trees` (with sample data)
   - `decision_paths` (empty)
7. Verify that the Row Level Security (RLS) policies have been applied

### 3. Configure Authentication (Optional)

If you want to enable authentication:

1. Go to the "Authentication" section in your Supabase dashboard
2. Under "Settings", configure your authentication providers
3. For email authentication, you can enable "Email Auth" and configure settings
4. For social providers, follow the provider-specific instructions to set up OAuth

### 4. Get API Keys

1. Go to the "Settings" section in your Supabase dashboard
2. Click on "API" in the sidebar
3. You'll find your "Project URL" and "anon" public API key
4. Copy these values as you'll need them for the Vercel deployment

### 5. Configure Row-Level Security (RLS)

The `schema.sql` file already includes RLS policies, but you should verify they're working:

1. Go to the "Table Editor" section
2. Select each table and click on the "Policies" tab
3. Verify that the policies match what's in the schema.sql file
4. Adjust if necessary based on your specific requirements

## Vercel Deployment

### 1. Prepare Your Repository

1. Initialize a Git repository using the provided scripts:
   - For Windows: Run `init-git.bat`
   - For Unix/Linux/Mac: Run `init-git.sh`
2. Create a new repository on GitHub, GitLab, or Bitbucket
3. Push your code to the remote repository
4. Make sure your repository includes all the files from this project

### 2. Create a Vercel Project

1. Go to [Vercel](https://vercel.com/) and sign in or create an account
2. Click "Add New..." and select "Project"
3. Import your repository from GitHub, GitLab, or Bitbucket
4. Select the repository containing your decision tree application

### 3. Configure Project Settings

1. Keep the default framework preset (Next.js)
2. Configure the build settings if needed (defaults should work)
3. Expand the "Environment Variables" section
4. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (from step 4 of Supabase setup)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (from step 4 of Supabase setup)
5. Under "Build and Output Settings", ensure:
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
6. Click "Deploy"

### 4. Wait for Deployment

1. Vercel will build and deploy your application
2. This process usually takes a few minutes
3. Once complete, you'll see a success message and a link to your deployed application

### 5. Verify Deployment

1. Click on the deployment URL to open your application
2. Test the decision tree flow to ensure it's working correctly
3. Verify that it's connecting to your Supabase backend by checking the network requests

## Custom Domain (Optional)

### 1. Add a Custom Domain in Vercel

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Enter your domain name and click "Add"
3. Follow the instructions to configure your DNS settings

### 2. Configure DNS

1. Go to your domain registrar's website
2. Update your DNS settings as instructed by Vercel
3. Wait for DNS propagation (can take up to 48 hours)

## Continuous Deployment

Vercel automatically sets up continuous deployment from your repository:

1. Any push to the main branch will trigger a new deployment
2. Pull request previews are automatically generated
3. You can configure specific branches for production/preview in Vercel settings

## Environment Management

### Development Environment

For local development:

1. Create a `.env.local` file based on `.env.local.example`
2. Use your Supabase development project credentials

### Production Environment

For production:

1. Use the environment variables configured in Vercel
2. Consider creating a separate Supabase project for production

## Troubleshooting

### Deployment Failures

If your Vercel deployment fails:

1. Check the build logs for errors
2. Verify that all dependencies are correctly specified in package.json
3. Ensure environment variables are correctly set
4. Try deploying with the "Override" option to force a clean build
5. Check for TypeScript errors that might be preventing compilation

### Database Connection Issues

If the application can't connect to Supabase:

1. Verify that your Supabase URL and anon key are correct
2. Check that your Supabase project is active
3. Ensure your IP is not blocked by any Supabase restrictions
4. Test the connection using the Supabase dashboard
5. Check browser console for CORS-related errors

### Authentication Problems

If authentication is not working:

1. Check your Supabase authentication settings
2. Verify that the correct redirect URLs are configured
3. Ensure your application is correctly handling authentication tokens
4. Check for JWT expiration issues
5. Verify that RLS policies are correctly configured

## Post-Deployment Checklist

After deploying your application, verify the following:

1. The application loads correctly at the deployed URL
2. The decision tree data is being fetched from Supabase
3. Users can navigate through the decision tree
4. The recommendations are displayed correctly
5. The application is responsive on different devices
6. Any authentication features work as expected

## Monitoring and Maintenance

1. Set up Vercel Analytics to monitor performance
2. Configure alerts for deployment failures
3. Regularly check Supabase logs for errors
4. Monitor database performance
5. Set up a regular backup schedule for your database
