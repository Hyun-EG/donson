export async function charStatInfo(ocid: string) {
  if (!ocid) {
    throw new Error("ocid가 없습니다.");
  }
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_API_KEY!,
      },
    }
  );
  if (!res.ok) {
    throw new Error(
      "캐릭터 식별자 또는 요청 경로가 틀렸거나 존재하지 않는 API-KEY입니다."
    );
  }

  return res.json();
}
