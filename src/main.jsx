import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BudgetsProvider } from './contexts/BudgetsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BudgetsProvider>
    <App />
    </BudgetsProvider>
  </StrictMode>
)
