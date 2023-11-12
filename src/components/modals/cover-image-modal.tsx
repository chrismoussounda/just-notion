import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useCoverImage } from '@/hooks/use-cover-image';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { useParams } from 'react-router-dom';
import { deleteFile, uploadFile } from '@/service/file-upload';
import { useTranslation } from 'react-i18next';

export const CoverImageModal = () => {
  const { documentId } = useParams() as { documentId: Id<'documents'> };
  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, { documentId });
  const coverImage = useCoverImage();
  const { t } = useTranslation();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const url = await uploadFile(file);

      if (document?.coverImage) deleteFile(document.coverImage);

      await update({
        id: documentId,
        coverImage: url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">{t('coverImage')}</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
