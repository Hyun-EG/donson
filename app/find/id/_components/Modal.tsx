"use client";

const Modal = ({
  idValue,
  setIsShowModal,
}: {
  idValue: string;
  setIsShowModal: (value: boolean) => void;
}) => {
  return (
    <section className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center bg-black/50 z-50">
      <main className="relative h-72 px-6 py-4 flex flex-col justify-center items-center gap-3 bg-white rounded-xl shadow-xl z-50">
        <button
          type="button"
          onClick={() => {
            setIsShowModal(false);
          }}
          className="absolute top-[10px] right-[10px] w-10 h-10 border border-[#bebebe] rounded-full font-bold cursor-pointer"
        >
          ✕
        </button>
        <p className="text-lg">
          찾으신 아이디는 <span className="font-bold">{idValue}</span> 입니다.
        </p>
        <p className="text-2xl text-sky-500 font-bold">{idValue}</p>
      </main>
    </section>
  );
};

export default Modal;
