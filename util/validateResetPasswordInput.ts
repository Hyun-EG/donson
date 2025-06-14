export function validateResetPasswordInput({
  userPassword,
  confirmUserPassword,
}: {
  userPassword?: string;
  confirmUserPassword?: string;
}): string | null {
  if (!userPassword) return "비밀번호를 입력해주세요.";
  if (!confirmUserPassword) return "비밀번호를 다시 한번 입력해주세요.";
  if (userPassword !== confirmUserPassword)
    return "비밀번호가 일치하지 않습니다.";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,20}$/;

  if (!passwordRegex.test(userPassword))
    return "비밀번호는 소문자, 숫자, 특수문자를 포함해 8~20자여야 합니다.";

  return null;
}
