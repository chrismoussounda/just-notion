import { useMutation, useQuery } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import Editor from '@/components/editor';
import { useParams } from 'react-router-dom';
import Redirect from '@/components/redirect-to-landing';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const DocumentPreviewPage = () => {
  const { documentId } = useParams() as { documentId: Id<'documents'> };
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
    isPreview: true,
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

  if (document && !document.isPublished) {
    toast.error(t('Document not published'));
    return <Redirect />;
  }

  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <div className="pb-40">
        <Cover preview url={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar preview initialData={document} />
          <Editor editable={false} onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewPage;
