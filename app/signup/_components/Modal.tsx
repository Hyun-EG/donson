import { CharInfo } from "@/app/_components/types";
import React from "react";

const Modal = ({
  setIsShowModal,
  charInfo,
}: {
  setIsShowModal: (value: boolean) => void;
  charInfo: null | CharInfo;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section className="w-[80%] max-w-md h-64 bg-white rounded-lg shadow-lg p-4">
        <header className="w-full flex justify-end">
          <button
            onClick={() => {
              setIsShowModal(false);
            }}
            className="w-10 h-10 flex justify-center items-center border border-[#bebebe] rounded-full text-xl font-bold"
          >
            ✕
          </button>
        </header>
        <main className="w-full flex flex-col justify-center items-center text-xl">
          <article>
            <p>
              서버: <span className="font-bold">{charInfo?.world_name}</span>
            </p>
            <p>
              레벨:{" "}
              <span className="font-bold">{charInfo?.character_level}</span>
            </p>
            <p>
              길드:{" "}
              <span className="font-bold">
                {charInfo?.character_guild_name}
              </span>
            </p>
            <p>
              <span className="font-bold">{charInfo?.character_name}</span>{" "}
              용사님
            </p>
          </article>
          <button
            onClick={() => {
              setIsShowModal(false);
            }}
            className="px-2 py-1 mt-4 bg-sky-500 rounded-lg text-white shadow-lg"
          >
            우리 애기가 맞습니다
          </button>
        </main>
      </section>
    </div>
  );
};

export default Modal;
