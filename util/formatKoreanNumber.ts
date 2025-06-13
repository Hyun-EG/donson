export const formatKoreanNumber = (num: number): string => {
  const hundredMillion = Math.floor(num / 100000000);
  const tenThousand = Math.floor((num % 100000000) / 10000);
  const remainder = num % 10000;

  let result = "";
  if (hundredMillion > 0) result += `${hundredMillion}억`;
  if (tenThousand > 0 || hundredMillion > 0)
    result += `${tenThousand.toString().padStart(4, "0")}만`;
  result += `${remainder.toString().padStart(4, "0")}`;

  return result;
};
