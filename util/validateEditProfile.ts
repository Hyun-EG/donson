export function validateEditProfileInput({
  userName,
  userEmail,
  charName,
}: {
  userName?: string;
  userEmail?: string;
  charName?: string;
}): string | null {
  if (!userName) {
    return "성함을 입력해주세요.";
  }

  if (!userEmail) {
    return "이메일을 입력해주세요.";
  }

  if (!charName) {
    return "캐릭터명을 입력해주세요.";
  }

  const nameRegex = /^(?:[가-힣]{1,20}|[a-zA-Z]{1,20})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(userName)) return "성함을 확인해주세요.";

  if (!emailRegex.test(userEmail)) return "유효한 이메일 형식이 아닙니다.";

  return null;
}
