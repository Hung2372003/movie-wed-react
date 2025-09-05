import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './assets/css/plugins.scss';
import './assets/css/style.scss';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
   <BrowserRouter>
     <QueryClientProvider client={queryClient}>
       <App />
     </QueryClientProvider>
   </BrowserRouter>
 </React.StrictMode>,
)

