export async function charHyperStat(ocid: string) {
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_API_KEY!,
      },
    }
  );
  if (!res.ok) {
    throw new Error("응답값이 존재하지 않습니다.");
  }

  const data = await res.json();
  return data;
}
