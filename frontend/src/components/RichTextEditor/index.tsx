import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Dropdown from '../Dropdown';
import UndoIcon from '../icons/UndoIcon';
import RedoIcon from '../icons/RedoIcon';
import BulletListIcon from '../icons/BulletListIcon';
import NumberListIcon from '../icons/NumberListIcon';
import BoldIcon from '../icons/BoldIcon';
import ItalicIcon from '../icons/ItalicIcon';
import styles from '../../styles/components/RichTextEditor.module.css';

const selectValues = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Header 1', value: 'h1' },
  { label: 'Header 2', value: 'h2' },
  { label: 'Header 3', value: 'h3' },
  { label: 'Header 4', value: 'h4' },
  { label: 'Header 5', value: 'h5' },
  { label: 'Header 6', value: 'h6' },
];

const RichTextEditor = ({
  initialContent,
  id,
  setContent,
}: {
  initialContent: string;
  id: string;
  setContent: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent ? initialContent : '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setContent(content);
    },
  });

  useEffect(() => {
    if (initialContent === '') {
      editor?.commands.clearContent();
    }
  }, [initialContent]);

  const handleTextChange = (value: string) => {
    switch (value) {
      case 'paragraph':
        editor?.chain().focus().setParagraph().run();
        break;
      case 'h1':
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'h4':
        editor?.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case 'h5':
        editor?.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case 'h6':
        editor?.chain().focus().toggleHeading({ level: 6 }).run();
        break;
      default:
        editor?.chain().focus().setParagraph().run();
    }
  };

  return (
    <div id={id}>
      <div className={styles.menu}>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          type='button'
          className={editor?.isActive('bold') ? styles.active : styles.button}
          aria-label='Toggle Bold'
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          type='button'
          className={editor?.isActive('italic') ? styles.active : styles.button}
          aria-label='Toggle Italic'
        >
          <ItalicIcon />
        </button>
        <Dropdown
          values={selectValues}
          handleChange={handleTextChange}
        />
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          type='button'
          className={
            editor?.isActive('bulletList') ? styles.active : styles.button
          }
          aria-label='Toggle Bulleted List'
        >
          <BulletListIcon />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          type='button'
          className={
            editor?.isActive('orderedList') ? styles.active : styles.button
          }
          aria-label='Toggle Ordered List'
        >
          <NumberListIcon />
        </button>
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          type='button'
          aria-label='Undo'
          className={styles.button}
        >
          <UndoIcon />
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          type='button'
          aria-label='Redo'
          className={styles.button}
        >
          <RedoIcon />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
