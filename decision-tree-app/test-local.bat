@echo off
echo Testing local development environment for Decision Tree Application

echo Checking for Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed or not in PATH. Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo Checking for npm installation...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed or not in PATH. Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo Installing dependencies...
npm install

echo Starting development server...
echo.
echo NOTE: Make sure you have updated the .env.local file with your Supabase credentials
echo before testing the connection to Supabase.
echo.
echo The application will be available at http://localhost:3000
echo Press Ctrl+C to stop the server when you're done testing.
echo.
npm run dev
