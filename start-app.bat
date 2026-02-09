@echo off

echo Installing dependencies...
npm install

echo.
echo Building the project...
npm run build

echo.
echo Starting preview server and opening browser...
start "" http://localhost:4173
npm run dev

pause
