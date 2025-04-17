import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BudgetsProvider } from './contexts/BudgetsContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const clerk_key = import.meta.env.VITE_CLERK_KEY

if (!clerk_key) {
  throw new Error("Key was not found")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk_key}>
    <BudgetsProvider>
    <App />
    </BudgetsProvider>
    </ClerkProvider>
  </StrictMode>
)
