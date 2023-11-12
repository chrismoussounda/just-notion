import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

import { useTheme } from '@/hooks/use-theme';
import { uploadFile } from '@/service/file-upload';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { theme } = useTheme();

  const handleUpload = async (file: File) => {
    return await uploadFile(file);
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  const getTheme = () => {
    if (theme === 'system')
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return theme;
  };

  return (
    <div>
      <BlockNoteView lang="fr" editor={editor} theme={getTheme()} />
    </div>
  );
};

export default Editor;
