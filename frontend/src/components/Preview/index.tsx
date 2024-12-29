import DesktopPreview from './Desktop';
import MobilePreview from './Mobile';

const Preview = ({ type }: { type: 'interviews' | 'applications' }) => {
  return (
    <>
      <DesktopPreview type={type} />
      <MobilePreview type={type} />
    </>
  );
};

export default Preview;
