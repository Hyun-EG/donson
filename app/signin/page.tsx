import Link from "next/link";
import LoginForm from "./_components/LoginForm";

const SignIn = () => {
  return (
    <section className="w-full min-h-screen py-8 px-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full">
        <LoginForm />
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
