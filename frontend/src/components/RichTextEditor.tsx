import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Undo from '../assets/undo.svg';
import Redo from '../assets/redo.svg';
import BulletList from '../assets/format-list-bulleted.svg';
import NumberList from '../assets/format-list-numbered.svg';
import Bold from '../assets/format-bold.svg';
import Italic from '../assets/format-italic.svg';

const RichTextEditor = ({
  initialContent,
  id,
  setContent,
}: {
  initialContent: JSONContent | string;
  id: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent ? initialContent : '',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent(JSON.stringify(json));
    },
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
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
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
      >
        <img
          src={Bold}
          width='24'
        />
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
      >
        <img
          src={Italic}
          width='24'
        />
      </button>

      <select
        name='textType'
        onChange={handleTextChange}
      >
        <option value='paragraph'>Paragraph</option>
        <option value='h1'>Header 1</option>
        <option value='h2'>Header 2</option>
        <option value='h3'>Header 3</option>
        <option value='h4'>Header 4</option>
        <option value='h5'>Header 5</option>
        <option value='h6'>Header 6</option>
      </select>

      <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
        <img
          src={BulletList}
          width='24'
        />
      </button>
      <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
        <img
          src={NumberList}
          width='24'
        />
      </button>
      <button
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().chain().focus().undo().run()}
      >
        <img
          src={Undo}
          width='24'
        />
      </button>
      <button
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().chain().focus().redo().run()}
      >
        <img
          src={Redo}
          width='24'
        />
      </button>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
