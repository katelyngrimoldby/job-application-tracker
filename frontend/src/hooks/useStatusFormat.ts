const useStatusFormat = (status: string) => {
  return status.charAt(0).toUpperCase() + status.substring(1);
};

export default useStatusFormat;
