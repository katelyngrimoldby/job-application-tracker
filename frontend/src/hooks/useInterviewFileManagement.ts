import {
  useStateValue,
  updateInterviewFile,
  removeInterviewFile,
  addInterviewFile,
} from '../state';
import { removeIF, addNewIF, editIF } from '../services/files';
import { InterviewFile, BasicFile } from '../types';

const useInterviewFileManagement = () => {
  const [{}, dispatch] = useStateValue();

  const sortInterviewFiles = (
    initFiles: InterviewFile[],
    newFiles: BasicFile[]
  ) => {
    const toDelete = initFiles.filter(
      (file) => !newFiles.some((newFile) => newFile.filename === file.filename)
    );
    const toUpdate = initFiles.filter((file) =>
      newFiles.some((newFile) => newFile.filename === file.filename)
    );
    const toAdd = newFiles.filter(
      (newFile) => !initFiles.some((file) => file.filename === newFile.filename)
    );

    return { toDelete, toUpdate, toAdd };
  };

  const deleteInterviewFiles = (
    files: InterviewFile[],
    token: string,
    userId: number
  ) => {
    files.forEach(async (file) => {
      await removeIF(token, userId, file.id);
      dispatch(removeInterviewFile(file.id));
    });
  };

  const addInterviewFiles = (
    files: BasicFile[],
    token: string,
    userId: number,
    interviewId: number
  ) => {
    files.forEach(async (file) => {
      const newFile = await addNewIF(token, userId, {
        ...file,
        interviewId,
      });
      dispatch(addInterviewFile(newFile));
    });
  };

  const updateInterviewFiles = (
    files: InterviewFile[],
    newFiles: BasicFile[],
    token: string,
    userId: number,
    interviewId: number
  ) => {
    files.forEach(async (file) => {
      const newData = newFiles.find(
        (newFile) => newFile.filename === file.filename
      );
      if (!newData) return;
      const updatedFile = await editIF(
        token,
        userId,
        { ...newData, interviewId },
        file.id
      );
      dispatch(updateInterviewFile(updatedFile));
    });
  };

  return {
    sortInterviewFiles,
    deleteInterviewFiles,
    addInterviewFiles,
    updateInterviewFiles,
  };
};

export default useInterviewFileManagement;
