import React from 'react';

import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { useTheme } from '@/hooks/use-theme';
import { dark, shadesOfPurple } from '@clerk/themes';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

interface ConvexProviderProps {
  children: React.ReactNode;
}

const ConvexProvider: React.FC<ConvexProviderProps> = ({ children }) => {
  const { theme: thm } = useTheme();
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : shadesOfPurple;

  const themeMap = {
    dark,
    light: undefined,
    system,
  };

  const theme = themeMap[thm];

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string}
      appearance={{
        baseTheme: theme,
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexProvider;
