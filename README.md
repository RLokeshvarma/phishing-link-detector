# Phishing Link Detector

This is a simple, responsive web application built using Next.js (frontend) and Node.js (backend) that detects and previews metadata about any URL entered by the user. It determines whether a given link is safe, suspicious, or unauthorized using link preview analysis.

---

## Features

- Input any URL and get a preview with useful metadata
- Shows link status: Valid, Suspicious, Unauthorized
- Clean popup interface with optional image preview
- Light and Dark mode toggle
- Fully responsive layout
- Built-in loader for better UX
  
---

## Technologies Used

| Technology    | Purpose                         |
|---------------|----------------------------------|
| **Next.js**   | Frontend & backend framework     |
| **Node.js**   | Backend for API route handling   |
| **link-preview-js** | Link metadata extraction  |
| **JavaScript**| UI logic and interactivity       |
| **HTML/CSS**  | Styling, layout, and animations  |

---

## How to Run the Project Locally

1. Clone the repository

   ```bash
   git clone https://github.com/YOUR_USERNAME/phishing-link-detector.git
   cd phishing-link-detector

2. Install dependencies
   ```bash
   npm install

  3. Run the development server
     ```bash
     npm run dev

  4. Visit the application in your browser
     ```arduino
     http://localhost:3000

---

## Example Test URLs

- Valid: https://openai.com
- Suspicious: http://freemoney-now.fake-link.com
- Invalid: https://invalid-site.test

---

## Project Structure

phishing-link-detector/
├── pages/
│ ├── index.js # Main UI component
│ └── api/
│ └── check.js # API route that uses checkPhishing.js
├── utils/
│ └── checkPhishing.js # Core logic to fetch link metadata
├── styles/
│ └── globals.css
├── package.json 
├── .gitignore 
├── README.md

