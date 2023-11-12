import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import ThemeProvider from './components/providers/theme-provider';
import LandingPage from './pages/landing';
import DocumentsPage from './pages/documents';
import DocumentPage from './pages/document';
import Home from './pages/documents/components/home';
import DocumentPreviewPage from './pages/preview';
import Redirect from './components/redirect-to-landing';
import '@/lib/i18next';
import LanguageProvider from './components/providers/language-provider';
import ConvexProvider from './components/providers/convex-provider';

function App() {
  return (
    <ThemeProvider>
      <ConvexProvider>
        <LanguageProvider>
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
        </LanguageProvider>
      </ConvexProvider>
    </ThemeProvider>
  );
}

export default App;
