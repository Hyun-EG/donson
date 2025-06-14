export const getCharOcid = async (charName: string) => {
  const res = await fetch("/api/signup/check-char", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: charName }),
  });
  return res;
};

export const getCharInfo = async (ocid: string) => {
  const res = await fetch("/api/signup/get-char-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ocid }),
  });
  return res;
};
