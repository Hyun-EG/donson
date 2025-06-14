import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import { cookies } from "next/headers";
import { verifyJWT } from "@/util/jwt";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (decoded) {
    redirect("/");
  }

  return (
    <section className="fixed top-0 left-0 w-full h-full py-8 px-8 flex flex-col items-center bg-ren-pattern sm500:bg-none bg-center bg-cover">
      <header className="py-4">
        <span className="text-3xl text-white sm500:text-black font-bold">
          DONSON
        </span>
      </header>
      <main className="w-full">
        <LoginForm />
        <article className="py-4 flex flex-col gap-2">
          <p className="text-center text-white sm500:text-black ">
            회원이 아니신가요?
            <Link
              href="/signup"
              className="p-1 text-sky-500 bg-black rounded-lg"
            >
              {" "}
              회원가입 하러가기
            </Link>
          </p>
          <p className="text-center">
            <span className="p-1 text-sky-500 bg-black rounded-lg">
              <Link href="/find/id">아이디 찾기</Link>
            </span>{" "}
            |{" "}
            <span className="p-1 text-sky-500 bg-black rounded-lg ">
              <Link href="/find/password">비밀번호 찾기</Link>
            </span>
          </p>
        </article>
      </main>
    </section>
  );
};

export default SignIn;
