import { verifyJWT } from "@/util/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignupForm from "./_components/SignupForm";

const SignUp = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (decoded) {
    redirect("/");
  }

  return (
    <section className="fixed top-0 left-0 w-full h-full p-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full">
        <SignupForm />
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
