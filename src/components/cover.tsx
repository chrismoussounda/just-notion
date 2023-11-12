import { ImageIcon, X } from 'lucide-react';
// import { useMutation } from 'convex/react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { deleteFile } from '@/service/file-upload';
import { useParams } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { useTranslation } from 'react-i18next';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { documentId = '' } = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { t } = useTranslation();

  const onRemove = async () => {
    if (url) {
      await deleteFile(url);
    }
    removeCoverImage({
      id: documentId as Id<'documents'>,
    });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group flex justify-center',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && <img src={url} alt="Cover" className="object-fill h-full w-fit" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {t('changeCover')}
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            {t('remove')}
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
