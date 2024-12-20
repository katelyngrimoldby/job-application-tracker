import {
  useStateValue,
  updateApplicationFile,
  removeApplicationFile,
  addApplicationFile,
} from '../state';
import { removeAF, addNewAF, editAF } from '../services/files';
import { ApplicationFile, BasicFile } from '../types';

const useApplicationFileManagement = () => {
  const [{}, dispatch] = useStateValue();

  const sortApplicationFiles = (
    initFiles: ApplicationFile[],
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

  const deleteApplicationFiles = (
    files: ApplicationFile[],
    token: string,
    userId: number
  ) => {
    files.forEach(async (file) => {
      await removeAF(token, userId, file.id);
      dispatch(removeApplicationFile(file.id));
    });
  };

  const addApplicationFiles = (
    files: BasicFile[],
    token: string,
    userId: number,
    applicationId: number
  ) => {
    files.forEach(async (file) => {
      const newFile = await addNewAF(token, userId, {
        ...file,
        applicationId,
      });
      dispatch(addApplicationFile(newFile));
    });
  };

  const updateApplicationFiles = (
    files: ApplicationFile[],
    newFiles: BasicFile[],
    token: string,
    userId: number,
    applicationId: number
  ) => {
    files.forEach(async (file) => {
      const newData = newFiles.find(
        (newFile) => newFile.filename === file.filename
      );
      if (!newData) return;
      const updatedFile = await editAF(
        token,
        userId,
        { ...newData, applicationId },
        file.id
      );
      dispatch(updateApplicationFile(updatedFile));
    });
  };

  return {
    sortApplicationFiles,
    deleteApplicationFiles,
    addApplicationFiles,
    updateApplicationFiles,
  };
};

export default useApplicationFileManagement;
