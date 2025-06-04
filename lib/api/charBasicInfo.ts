export const charBasicInfo = async ({ ocid }: { ocid: string }) => {
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("캐릭터 정보가 불러와지지 않았습니다.");
  }
  const data = await res.json();
  return data;
};
