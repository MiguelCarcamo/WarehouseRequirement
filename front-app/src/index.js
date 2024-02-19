import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './Config';

const msalInstance = new PublicClientApplication(msalConfig);

const root = createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={msalInstance}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </MsalProvider>
);