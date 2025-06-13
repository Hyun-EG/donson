export const getCharOcid = async (userId: string): Promise<string> => {
  const res = await fetch("/api/get-char-ocid", {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`OCID 불러오기 실패: ${res.status}`);
  }

  const data = await res.json();
  return data.ocid;
};
