import Link from "next/link";

const SignUp = () => {
  return (
    <section className="w-full min-h-screen py-8 px-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full">
        <form
          className="flex flex-col gap-2"
          action="/api/signup"
          method="POST"
        >
          <input
            name="userName"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="text"
            placeholder="성함을 입력해주세요."
          />
          <input
            name="userEmail"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <input
            name="userId"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="text"
            placeholder="새로운 아이디를 입력해주세요."
          />
          <input
            name="userPassword"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <input
            name="confirmUserPassword"
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
          />
          <button
            className="w-full h-10 bg-sky-500 text-white rounded-xl"
            type="submit"
          >
            회원가입
          </button>
        </form>
        <article className="py-4">
          <p className="text-center">
            이미 회원이신가요?
            <Link href="/signin">
              <span className="text-sky-500"> 로그인 하러가기</span>
            </Link>
          </p>
        </article>
      </main>
    </section>
  );
};

export default SignUp;
