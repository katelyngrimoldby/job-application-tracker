import { useState, useRef } from 'react';
import useFileConversion from '../hooks/useFileConversion';
import styles from '../styles/components/FileUploader.module.css';

const FileUploader = ({
  handleChange,
  initFiles,
}: {
  handleChange: (files: string[]) => void;
  initFiles: string[];
}) => {
  const { filesToBase64, filesToFile } = useFileConversion();
  const [files, setFiles] = useState<File[]>(filesToFile(initFiles));
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };

    setFiles([...files, ...Array.from(target.files || [])]);

    const base64Files = await filesToBase64(files);
    handleChange(base64Files);
  };

  return (
    <>
      <p>Files</p>
      <button
        type='button'
        className={styles.labelBtn}
        onClick={() => (fileInput.current ? fileInput.current.click() : null)}
      >
        Upload files
      </button>
      <input
        id='files'
        name='files'
        type='file'
        accept='application/pdf'
        multiple
        onChange={handleFileChange}
        className={styles.input}
        ref={fileInput}
      />
      <ul className={styles.fileList}>
        {files.map((file) => (
          <li key={file.name}>
            <button
              onClick={() =>
                setFiles(files.filter((curFile) => curFile.name != file.name))
              }
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FileUploader;
