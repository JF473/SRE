@echo off

echo Installing dependencies...
call npm install

echo.
echo Building the project...
call npm run build

echo.
echo Starting preview server and opening browser...
start "" http://localhost:4173
call npm run dev

pause
