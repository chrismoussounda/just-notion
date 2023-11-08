import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import ThemeProvider from './components/providers/theme-provider';
import LandingPage from './pages/landing';
import DocumentsPage from './pages/documents';
import DocumentPage from './pages/document';
import Home from './pages/documents/components/home';
import DocumentPreviewPage from './pages/preview';
import Redirect from './components/redirect-to-landing';
// import { ModalProvider } from './components/providers/modal-provider';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={LandingPage} />
              <Route path="/documents" Component={DocumentsPage}>
                <Route index Component={Home} />
                <Route path=":documentId" Component={DocumentPage} />
              </Route>
              <Route path="preview/:documentId" Component={DocumentPreviewPage} />
              <Route path="*" Component={Redirect} />
            </Routes>
            <Toaster richColors />
          </BrowserRouter>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
