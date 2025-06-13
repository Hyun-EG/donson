// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCharOcid } from "@/lib/api/mainCharOcid";

type UserStore = {
  userId: string;
  ocid: string;
  setUserIdAndOcid: (userId: string) => Promise<void>;
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: "",
      ocid: "",
      setUserIdAndOcid: async (userId: string) => {
        try {
          const ocid = await getCharOcid(userId);
          set({ userId, ocid });
        } catch (err) {
          console.error("유저 ID 및 OCID 설정 실패", err);
        }
      },
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
