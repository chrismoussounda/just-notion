import { useConvexAuth } from 'convex/react';

import { Spinner } from '@/components/spinner';
import { SearchCommand } from '@/components/search-command';

import { Navigation } from './components/navigation';
import { Outlet } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import RedirectToLanding from '@/components/redirect-to-landing';

const DocumentsPage = () => {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <div className="h-full flex dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="flex-1 h-full overflow-y-auto">
            <SearchCommand />
            <Outlet />
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToLanding />
      </SignedOut>
    </>
  );
};

export default DocumentsPage;
