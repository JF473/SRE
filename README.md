# AR Surgery Visualizer Prototype

This is a code bundle for the AR Surgery Visualizer Prototype. The original project is available at [Figma](https://www.figma.com/design/pu0WFN1mNt5dAxPtzv0B8v/AR-Surgery-Visualizer-Prototype).

## Features
- AR-based patient-doctor communication
- Realistic, interactive surgery visualization
- Recovery tracking and post-op timeline
- PWA: Installable on mobile devices

## Quick Start

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd SRE
   ```
2. **Run the all-in-one script (Windows)**
   ```sh
   .\start-app.bat
   ```
   This will install dependencies, build the project, and open the preview in your browser.

3. **Manual steps (if needed)**
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

## License
MIT
