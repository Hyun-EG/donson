export const sendCertifyNumber = async (email: string) => {
  const res = await fetch("/api/send-certify-number", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: email }),
  });
  return res;
};

export const matchCertifyNumber = async (
  userEmail: string,
  certifyNo: string
) => {
  const res = await fetch("/api/match-certify-number", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail, certifyNo }),
  });
  return res;
};
