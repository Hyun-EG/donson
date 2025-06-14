import Link from "next/link";
import ResetPasswordBox from "./_components/ResetPasswordBox";
import { cookies } from "next/headers";
import { verifyJWT } from "@/util/jwt";
import { redirect } from "next/navigation";

const ResetPassword = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (decoded) {
    redirect("/");
  }

  return (
    <section className="w-full h-full py-8 px-8 flex flex-col items-center">
      <header className="py-4">
        <span className="text-3xl font-bold">DONSON</span>
      </header>
      <main className="w-full flex flex-col gap-4">
        <h1 className="text-center text-xl font-bold">비밀번호 재설정</h1>
        <ResetPasswordBox />
      </main>
      <footer className="mt-4">
        <p className="text-sky-500 cursor-pointer">
          <Link href="/signin">로그인 하러가기</Link>
        </p>
      </footer>
    </section>
  );
};

export default ResetPassword;
