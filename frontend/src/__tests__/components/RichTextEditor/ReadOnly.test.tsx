import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ReadOnlyRichText from '../../../components/RichTextEditor/ReadOnly';

describe('RichTextEditor component', () => {
  describe('Content rendering', () => {
    it('Renders all allowed elements', () => {
      const allowedTags =
        '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6><p><strong>Bold</strong></p><p><em>Italic</em></p><ul><li><p>Bulleted List</p></li></ul><ol><li><p>Ordered List</p></li></ol>';

      render(<ReadOnlyRichText content={allowedTags} />);

      const editor = document.querySelector('.ProseMirror');

      expect(editor).toBeInTheDocument();

      if (editor) {
        expect(editor.innerHTML).toBe(allowedTags);
      }
    });

    it('Omits disallowed elements', () => {
      const disallowedTags = '<p><script>alert("test")</script></p>';
      const sanitizedResult = '<p><br class="ProseMirror-trailingBreak"></p>';

      render(<ReadOnlyRichText content={disallowedTags} />);

      const editor = document.querySelector('.ProseMirror');

      expect(editor).toBeInTheDocument();

      if (editor) {
        expect(editor.innerHTML).toBe(sanitizedResult);
      }
    });
  });
});
