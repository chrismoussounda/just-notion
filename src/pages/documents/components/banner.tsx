import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import { Id } from '@/../convex/_generated/dataModel';
import { api } from '@/../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BannerProps {
  documentId: Id<'documents'>;
}

export const Banner = ({ documentId }: BannerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: t('deletingNote'),
      success: t('noteDeleted'),
      error: t('failedDeleteNote.'),
    });
    navigate('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: t('restoringNote'),
      success: t('noteRestored'),
      error: t('failedRestoreNote.'),
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>{t('inTrash')}</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        {t('restorePage')}
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          {t('deleteForever')}
        </Button>
      </ConfirmModal>
    </div>
  );
};
