# Tech Context: Decision Tree for Issue Escalation

## Technologies Used

### Frontend
- **Next.js**: React framework for server-rendered applications
- **React**: UI component library
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form validation and management
- **SWR**: Data fetching and caching library
- **Framer Motion**: Animation library for smooth transitions

### Backend
- **Supabase**: Backend-as-a-Service platform
- **PostgreSQL**: Relational database
- **Supabase Auth**: Authentication and authorization
- **Supabase Storage**: File storage (if needed)
- **Supabase Functions**: Serverless functions (if needed)

### DevOps
- **Vercel**: Deployment and hosting platform
- **GitHub**: Version control and CI/CD
- **Jest**: Testing framework
- **Cypress**: End-to-end testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git
- Supabase account
- Vercel account

### Local Development Environment
1. **Clone repository**
   ```bash
   git clone [repository-url]
   cd decision-tree-escalation
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup
1. Create a new Supabase project
2. Run the SQL migrations to set up the schema
3. Seed the database with initial decision tree data

## Technical Constraints

### Performance
- Initial page load should be under 2 seconds
- Subsequent interactions should feel instantaneous
- Mobile performance must be optimized

### Security
- Authentication must use industry best practices
- Data must be protected with row-level security
- API endpoints must validate inputs
- CSRF protection must be implemented

### Accessibility
- Application must be WCAG 2.1 AA compliant
- Keyboard navigation must be fully supported
- Screen readers must be able to interpret all content
- Color contrast must meet accessibility standards

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- IE11 is not supported
- Mobile browsers (iOS Safari, Android Chrome)

### Deployment
- Continuous deployment via Vercel
- Preview deployments for pull requests
- Environment-specific configurations

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^12.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "typescript": "^4.5.4",
    "@supabase/supabase-js": "^1.28.0",
    "@supabase/auth-helpers-nextjs": "^0.2.0",
    "tailwindcss": "^3.0.0",
    "react-hook-form": "^7.22.0",
    "swr": "^1.1.0",
    "framer-motion": "^5.0.0"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/react": "^17.0.37",
    "@types/node": "^16.11.12",
    "eslint": "^8.4.1",
    "eslint-config-next": "^12.0.0",
    "prettier": "^2.5.1",
    "jest": "^27.4.3",
    "cypress": "^9.1.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.4"
  }
}
```

## Tool Usage Patterns

### State Management
- Use React Context for global state
- Use SWR for server state
- Use local state (useState) for component-specific state
- Minimize prop drilling through proper component composition

### API Calls
- Create a centralized API client using Supabase JS SDK
- Implement custom hooks for data fetching
- Handle loading and error states consistently
- Cache responses when appropriate

### Styling
- Use Tailwind utility classes for most styling
- Create custom components for repeated UI patterns
- Use CSS modules for complex component-specific styling
- Maintain a consistent design system

### Testing
- Unit tests for utility functions and hooks
- Component tests for UI elements
- Integration tests for complex workflows
- End-to-end tests for critical user journeys

### Code Organization
```
src/
├── components/       # Reusable UI components
│   ├── atoms/        # Basic building blocks
│   ├── molecules/    # Combinations of atoms
│   ├── organisms/    # Complex UI sections
│   └── templates/    # Page layouts
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and services
│   ├── supabase.ts   # Supabase client
│   └── api.ts        # API utilities
├── pages/            # Next.js pages
│   ├── api/          # API routes
│   └── _app.tsx      # App wrapper
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

### Version Control
- Feature branches for new functionality
- Pull requests for code review
- Semantic versioning for releases
- Conventional commits for clear history
