const FindIdBox = () => {
  return (
    <form className="w-full flex flex-col gap-2">
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="성함을 입력해주세요."
      />
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="이메일을 입력해주세요."
      />
      <button className="w-full h-10 bg-sky-500 text-white rounded-xl">
        아이디 찾기
      </button>
    </form>
  );
};

export default FindIdBox;
