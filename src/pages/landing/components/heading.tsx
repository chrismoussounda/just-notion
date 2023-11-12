import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        {t('heading')}
        <span className="underline">{t('j')}</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        {t('subHeading1')}
        <br />
        {t('subHeading2')}
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link to="/documents">
            {t('accessJ')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            {t('getJfree')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
