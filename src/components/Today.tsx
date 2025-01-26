import pigeon from "/pigeon.png";

const Today = () => {
  return (
    <div className="w-full h-60 flex items-center gap-4 layout-card bg-blue-50">
      <div className="flex flex-col items-center justify-center">
        <img src={pigeon} alt="pigeon" className="w-fit" />
        <p className="text-[0.6rem]">오늘의 축일자</p>
      </div>
      <div className="flex flex-col justify-center">
        <p></p>
        <p>오늘은 축일자가 없습니다.</p>
      </div>
    </div>
  );
};

export default Today;
