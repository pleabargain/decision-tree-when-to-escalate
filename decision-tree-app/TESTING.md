# Testing the Decision Tree Application

This guide provides instructions for testing the Issue Escalation Decision Tree application locally.

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Setup and Installation

1. **Navigate to the project directory**

```bash
cd decision-tree-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

For local testing without Supabase, you can leave these values empty as the application uses a mock decision tree by default.

## Running the Application

1. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

2. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing the Decision Tree Flow

1. **Start at the first question**
   - You'll see the first question about severity level
   - A progress indicator shows your position in the flow

2. **Select an answer**
   - Click on one of the options
   - The application will navigate to the next question based on your selection

3. **Continue through the flow**
   - Answer each question
   - Your path history will be displayed at the bottom of the screen

4. **View the recommendation**
   - After answering all questions in a path, you'll receive a recommendation
   - The recommendation includes:
     - Whether to escalate or handle the issue
     - Explanation of the recommendation
     - Next steps to take

5. **Start over**
   - Click the "Start Over" button to begin a new decision path

## Testing Different Paths

Try different combinations of answers to see how the decision tree branches:

1. **Critical severity path**
   - Select "Critical - Severe impact on business operations"
   - Then select "Yes" for "Is the issue affecting multiple departments or teams?"
   - This should lead to an "Escalate to Management" recommendation

2. **Low severity path**
   - Select "Low - Minimal impact, mostly inconvenience"
   - Then select "No" for "Is this issue part of a pattern of similar issues?"
   - This should lead to a "Handle at Current Level" recommendation

## Testing Without Supabase

The application is configured to use a mock decision tree for development and testing purposes. This allows you to test the application without setting up a Supabase project.

The mock decision tree is defined in `src/pages/index.tsx` and includes multiple questions and paths to test the application's functionality.

## Testing with Supabase (Optional)

If you want to test with a real Supabase backend:

1. Follow the Supabase setup instructions in the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Update your `.env.local` file with your Supabase URL and anon key
3. Modify the code in `src/pages/index.tsx` to fetch the decision tree from Supabase instead of using the mock data

## Troubleshooting

### Application doesn't start

- Verify that all dependencies are installed
- Check for any errors in the terminal
- Ensure you're using a compatible Node.js version

### Changes not reflecting

- Make sure you're saving your files
- Check the terminal for any compilation errors
- Try restarting the development server

### Browser issues

- Try clearing your browser cache
- Test in a different browser
- Check the browser console for any JavaScript errors
