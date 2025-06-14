export function validateSignupInput({
  userName,
  userEmail,
  certifyNo,
  userId,
  charName,
  userPassword,
  confirmUserPassword,
}: {
  userName: string;
  userEmail: string;
  certifyNo: string;
  userId: string;
  charName: string;
  userPassword: string;
  confirmUserPassword: string;
}): string | null {
  if (!userName) {
    return "성함을 입력해주세요.";
  }

  if (!userEmail) {
    return "이메일을 입력해주세요.";
  }
  if (!certifyNo) {
    return "인증번호를 입력해주세요.";
  }
  if (!userId) {
    return "아이디를 입력해주세요.";
  }
  if (!charName) {
    return "캐릭터명을 입력해주세요.";
  }
  if (!userPassword) {
    return "비밀번호를 입력해주세요.";
  }
  if (!confirmUserPassword) {
    return "비밀번호를 다시 한번 입력해주세요.";
  }

  if (userPassword !== confirmUserPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return null;
}
