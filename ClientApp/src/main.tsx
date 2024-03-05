import React from 'react'
import './index.scss'
import { App } from './App'
//import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);

