import { useConvexAuth } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './spinner';

const Redirect = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  setTimeout(() => {
    if (!isLoading && isAuthenticated) navigate('/documents');
    if (!isLoading && !isAuthenticated) navigate('/');
  }, 500);

  return null;
};

export default Redirect;
