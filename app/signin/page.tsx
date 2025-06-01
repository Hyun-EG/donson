import Link from "next/link";

const SignIn = () => {
  return (
    <section className="w-full min-h-screen py-8 px-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full">
        <form
          className="flex flex-col gap-2"
          action="/api/signin"
          method="POST"
        >
          <input
            name="id"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="text"
            placeholder="아이디를 입력해주세요."
          />
          <input
            name="password"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <button
            className="w-full h-10 bg-sky-500 text-white rounded-xl"
            type="submit"
          >
            로그인
          </button>
        </form>
        <article className="py-4">
          <p className="text-center">
            아직 회원이 아니신가요?
            <Link href="/signup" className="text-sky-500">
              회원가입 하러가기
            </Link>
          </p>
        </article>
      </main>
    </section>
  );
};

export default SignIn;
