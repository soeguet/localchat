import { StoreApi, UseBoundStore, create } from "zustand";
import { RegisteredUser } from "../utils/customTypes";

type UserStore = {
    userMap: Map<string, RegisteredUser>;
    setUserMap: (userMap: Map<string, RegisteredUser>) => void;
}

const userStore:UseBoundStore<StoreApi<UserStore>> = create((set) => ({
    userMap: new Map<string, RegisteredUser>(),
    setUserMap: (users: Map<string, RegisteredUser>) => set({ userMap: users }),
}));

export default userStore;
