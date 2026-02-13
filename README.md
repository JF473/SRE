# AR Surgery Visualizer Prototype

This is a code bundle for the AR Surgery Visualizer Prototype. The original project is available at [Figma](https://www.figma.com/design/pu0WFN1mNt5dAxPtzv0B8v/AR-Surgery-Visualizer-Prototype).

## Features
- AR-based patient-doctor communication
- Realistic, interactive surgery visualization
- Recovery tracking and post-op timeline
- PWA: Installable on mobile devices

## Quick Start

1. **Run the all-in-one script (Windows)**
   ```sh
   .\start-app.bat
   ```
   This will install dependencies, build the project, and open the preview in your browser.

2. **Manual steps (if needed)**
   ```sh
   npm install
   npm run build
   npx vite preview  
   ```
   Then open [http://localhost:4173](http://localhost:4173) in your browser.

## PWA (Progressive Web App)
- This app can be installed on your phone or desktop.
- On mobile, use "Add to Home Screen" from your browser menu.

## Deployment
- You can deploy this app to Azure Static Web Apps, Vercel, Netlify, or any static host.

## Building the Windows Executable (.exe)
To generate the standalone `.exe` file on your machine:

1. **Open Terminal as Administrator**
   - Right-click your terminal (PowerShell or Command Prompt) and select **Run as Administrator**.
   - *This is crucial for permission to create symbolic links.*

2. **Run the Build Command**
   ```sh
   npm run electron:build
   ```
   *Note: This process may take a few minutes to complete.*

3. **Find the Executable**
   - After the command finishes, navigate to the `dist-electron` folder in the project directory.
   - You will find the installer file there (e.g., `AR Surgery Visualizer Setup 0.0.1.exe`).

## License
MIT
## Disclaimer & Testing Instructions

### Allergy Use Case
You can test the **Allergy 1** use case by entering an allergy (Allergy 1) in the Medical History form when prompted. This will simulate a patient with an allergy and allow you to see how the app responds to allergy information when you click on "Cheek Filler".

### Adjusting Luminance Level
If the luminance (lighting) requirement is too high for your environment, you can change the minimum luminance threshold in the code:

1. Open the file: `src/app/components/FacialCapture.tsx`
2. Find the line:
   ```ts
   const MIN_LUMINANCE = 150; // 150 lux minimum as per requirements
   ```
3. Change the value `150` to a lower number (e.g., `100`) to make the luminance check less strict.
4. Save the file and restart the app if needed.

This will allow the facial capture step to proceed in lower light conditions.
