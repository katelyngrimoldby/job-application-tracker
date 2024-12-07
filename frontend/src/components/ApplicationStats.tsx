const ApplicationStats = ({ data }: { data: Number[] }) => {
  return (
    <>
      <span>{String(data[0])} Applications</span>
      <span>{String(data[1])} Assessments</span>
      <span>{String(data[2])} Interviews</span>
      <span>{String(data[3])} Offers</span>
    </>
  );
};

export default ApplicationStats;
