export function validateSignupInput({
  userName,
  userEmail,
  certifyNo,
  matchCertifyDisabled,
  userId,
  charName,
  userPassword,
  confirmUserPassword,
}: {
  userName?: string;
  userEmail?: string;
  certifyNo?: string;
  matchCertifyDisabled?: boolean;
  userId?: string;
  charName?: string;
  userPassword?: string;
  confirmUserPassword?: string;
}): string | null {
  if (!userName?.trim()) {
    return "성함을 입력해주세요.";
  }

  if (!userEmail?.trim()) {
    return "이메일을 입력해주세요.";
  }
  if (!certifyNo?.trim()) {
    return "인증번호를 입력해주세요.";
  }
  if (matchCertifyDisabled === false) {
    return "인증번호 확인을 진행해주세요.";
  }
  if (!userId?.trim()) {
    return "아이디를 입력해주세요.";
  }
  if (!charName?.trim()) {
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

  const nameRegex = /^(?:[가-힣]{1,20}|[a-zA-Z]{1,20})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userIdRegex = /^[a-z0-9]{6,12}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,20}$/;

  if (!nameRegex.test(userName)) return "성함을 확인해주세요.";

  if (!emailRegex.test(userEmail)) return "유효한 이메일 형식이 아닙니다.";

  if (!userIdRegex.test(userId))
    return "아이디는 영어 소문자, 숫자만 사용하며 6~12자여야 합니다.";

  if (!passwordRegex.test(userPassword))
    return "비밀번호는 소문자, 숫자, 특수문자를 포함해 8~20자여야 합니다.";

  return null;
}
