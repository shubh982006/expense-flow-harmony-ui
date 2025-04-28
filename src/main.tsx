import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

console.log("Starting application...");

try {
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Error rendering application:", error);
}
