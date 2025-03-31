# repo
https://github.com/pleabargain/decision-tree-when-to-escalate


# Issue Escalation Decision Tree

A web application that guides users through a series of questions to determine whether an issue should be escalated to management. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Interactive decision tree interface
- Step-by-step question flow
- Clear recommendations with next steps
- Mobile-responsive design
- Progress tracking
- Path history display

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, API)
- **Deployment**: Vercel

## Getting Started

For detailed testing instructions, see [TESTING.md](./TESTING.md).

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**

```bash
git clone [repository-url]
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

4. **Set up Supabase**

- Create a new Supabase project
- Run the SQL script in `supabase/schema.sql` to set up the database schema
- This will create the necessary tables and insert a sample decision tree

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

6. **Open the application**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

For detailed deployment instructions, see:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Comprehensive deployment guide
- [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) - Step-by-step checklist for deployment

### Quick Deployment Steps

#### Local Testing
1. Update the `.env.local` file with your Supabase credentials
2. Run the test script:
   - For Windows: `test-local.bat`
   - For Unix/Linux/Mac: `./test-local.sh` (make executable with `chmod +x test-local.sh` first)
3. Verify the application works correctly at http://localhost:3000

#### Supabase
1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the database schema
3. Get your Supabase URL and anon key from the API settings

#### GitHub
1. Create a new GitHub repository
2. Push your local repository to GitHub using the commands provided after running the init-git script

#### Vercel
1. Import your GitHub repository in Vercel
2. Set the root directory to `decision-tree-app`
3. Set the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy

## Project Structure

```
decision-tree-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions and services
│   │   └── supabase.ts   # Supabase client
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Home page with decision tree
│   │   └── _app.tsx      # App wrapper
│   └── styles/           # Global styles
├── supabase/
│   └── schema.sql        # Database schema
├── public/               # Static assets
├── .env.local            # Environment variables for local development
├── .env.local.example    # Example environment variables
├── DEPLOYMENT.md         # Comprehensive deployment guide
├── DEPLOYMENT_STEPS.md   # Step-by-step deployment checklist
├── TESTING.md            # Testing instructions
├── init-git.sh           # Git initialization script for Unix/Linux/Mac
├── init-git.bat          # Git initialization script for Windows
├── test-local.sh         # Local testing script for Unix/Linux/Mac
├── test-local.bat        # Local testing script for Windows
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Decision Tree Structure

The decision tree is stored as a JSON object in the Supabase database. Each node in the tree represents either a question or a result:

- **Question nodes** contain the question text, optional help text, and an array of options
- **Result nodes** contain the recommendation, explanation, and next steps

The tree is traversed by following the `next_node_id` specified in each option.

## Customizing the Decision Tree

To customize the decision tree:

1. Modify the JSON structure in `supabase/schema.sql`
2. Run the SQL script in your Supabase project
3. Alternatively, create a new decision tree through the Supabase dashboard

## GitHub Repository Setup

This project is ready to be published to GitHub. To initialize the Git repository and make the first commit, you can use the provided scripts:

### For Unix/Linux/Mac:
```bash
# Make the script executable
chmod +x init-git.sh
# Run the script
./init-git.sh
```

### For Windows:
```bash
# Run the batch file
init-git.bat
```

These scripts will:
1. Initialize a Git repository
2. Add all files to Git
3. Make an initial commit
4. Provide instructions for pushing to GitHub

## License

[MIT](LICENSE)
