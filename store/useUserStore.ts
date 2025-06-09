import { addOcid, getCharOcid } from "@/lib/api/mainCharOcid";
import { create } from "zustand";

type UserStore = {
  userId: string;
  ocid: string;
  setUserIdAndOcid: (userId: string) => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  userId: "",
  ocid: "",

  setUserIdAndOcid: async (userId: string) => {
    try {
      await addOcid(userId);
      const ocid = await getCharOcid(userId);
      set({ userId, ocid });
    } catch (error) {
      console.error("유저 ID 및 OCID 설정 실패", error);
    }
  },
}));

export default useUserStore;
