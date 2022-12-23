import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const ReadOnlyRichText = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default ReadOnlyRichText;
