import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { api } from '@/../convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: t('untitled') }).then((documentId) =>
      navigate(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: t('creatingNote'),
      success: t('noteCreated'),
      error: t('failedCreateNote.'),
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img src="/empty.png" height="300" width="300" alt="Empty" className="dark:hidden" />
      <img
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s JustNotion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        {t('createNote')}
      </Button>
    </div>
  );
};

export default Home;
