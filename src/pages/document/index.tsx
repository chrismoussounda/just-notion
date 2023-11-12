import { useMutation, useQuery } from 'convex/react';

import Editor from '@/components/editor';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import { ModalProvider } from '@/components/providers/modal-provider';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const DocumentPage = () => {
  const { documentId } = useParams() as { documentId: Id<'documents'> };
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });
  const { t } = useTranslation();

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>{t('notFound')}</div>;
  }

  return (
    <>
      <ModalProvider />
      <div className={cn('pb-40', document.isArchived ? 'mt-20' : 'mt-12')}>
        <Cover url={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={document} />
          <Editor onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </>
  );
};

export default DocumentPage;
