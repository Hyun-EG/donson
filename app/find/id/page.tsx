import Link from "next/link";
import FindIdBox from "./_components/FindIdBox";

const FindId = () => {
  return (
    <section className="w-full min-h-screen py-8 px-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full flex flex-col gap-4">
        <h1 className="text-center text-xl font-bold">아이디 찾기</h1>
        <FindIdBox />
      </main>
      <footer className="mt-4">
        <p className="text-sky-500 cursor-pointer">
          <Link href="/signin">로그인 하러가기</Link>
        </p>
      </footer>
    </section>
  );
};

export default FindId;
