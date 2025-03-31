#!/bin/bash

# Initialize Git repository
echo "Initializing Git repository..."
git init

# Add all files
echo "Adding files to Git..."
git add .

# Make initial commit
echo "Making initial commit..."
git commit -m "Initial commit: Decision Tree for Issue Escalation"

# Instructions for GitHub
echo ""
echo "Repository initialized successfully!"
echo ""
echo "To push to GitHub:"
echo "1. Create a new repository on GitHub"
echo "2. Run the following commands:"
echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Replace 'yourusername' and 'your-repo-name' with your GitHub username and repository name."
