import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {Auth0Provider} from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK
      }}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      scope="openid profile email"
    >
       <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
        <App />
      </MantineProvider>
    
    </Auth0Provider>
    
  </StrictMode>
)
