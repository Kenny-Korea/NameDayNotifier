import { Data } from "../types/model";

const Table = (props: { nameDayData: Data[] }) => {
  const { nameDayData } = props;
  return (
    <div>
      {nameDayData.map((data) => (
        <p key={data.id}>{data.Name}</p>
      ))}
    </div>
  );
};

export default Table;
