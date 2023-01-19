import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Dropdown from '../Dropdown';
import Undo from '../../assets/undo.svg';
import Redo from '../../assets/redo.svg';
import BulletList from '../../assets/format-list-bulleted.svg';
import NumberList from '../../assets/format-list-numbered.svg';
import Bold from '../../assets/format-bold.svg';
import Italic from '../../assets/format-italic.svg';
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
          className={editor?.isActive('bold') ? styles.active : undefined}
          aria-label='Toggle Bold'
        >
          <img
            src={Bold}
            width='24'
          />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          type='button'
          className={editor?.isActive('italic') ? styles.active : undefined}
          aria-label='Toggle Italic'
        >
          <img
            src={Italic}
            width='24'
          />
        </button>
        <Dropdown
          values={selectValues}
          id='Text type select'
          handleChange={handleTextChange}
        />
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          type='button'
          className={editor?.isActive('bulletList') ? styles.active : undefined}
          aria-label='Toggle Bulleted List'
        >
          <img
            src={BulletList}
            width='24'
          />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          type='button'
          className={
            editor?.isActive('orderedList') ? styles.active : undefined
          }
          aria-label='Toggle Ordered List'
        >
          <img
            src={NumberList}
            width='24'
          />
        </button>
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          type='button'
          aria-label='Undo'
        >
          <img
            src={Undo}
            width='24'
          />
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          type='button'
          aria-label='Redo'
        >
          <img
            src={Redo}
            width='24'
          />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
