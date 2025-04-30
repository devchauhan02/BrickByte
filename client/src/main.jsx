import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {Auth0Provider} from '@auth0/auth0-react'

console.log("AUTH0 DOMAIN:", import.meta.env.VITE_AUTH0_DOMAIN)
console.log("AUTH0 CLIENT ID:", import.meta.env.VITE_AUTH0_CLIENT_ID)
console.log("AUTH0 CALLBACK:", import.meta.env.VITE_AUTH0_CALLBACK)
console.log("AUTH0 AUDIENCE:", import.meta.env.VITE_AUTH0_AUDIENCE)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK
      }}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      scope="open id profile email"
    >
      
    <App />
    
    </Auth0Provider>
    
  </StrictMode>,
)
