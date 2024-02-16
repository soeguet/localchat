import { StoreApi, UseBoundStore, create } from "zustand";
import { RegisteredUser } from "../utils/customTypes";

export type UserStore = {
    myId: string;
    setMyId: (id: string) => void;
    myUsername: string;
    setMyUsername: (username: string) => void;
    myColor: string;
    setMyColor: (color: string) => void;
    myProfilePhoto: string;
    setMyProfilePhoto: (photo: string) => void;
    userMap: Map<string, RegisteredUser>;
    setUserMap: (userMap: Map<string, RegisteredUser>) => void;
}

const userStore:UseBoundStore<StoreApi<UserStore>> = create((set) => ({
    myId: "",
    setMyId: (id: string) => set( {myId: id} ),
    myUsername: "",
    setMyUsername: (username: string) => set( {myUsername: username} ),
    myColor: "",
    setMyColor: (color: string) => set( {myColor: color} ),
    myProfilePhoto: "",
    setMyProfilePhoto: (photo: string) => set( {myProfilePhoto: photo} ),
    userMap: new Map<string, RegisteredUser>(),
    setUserMap: (users: Map<string, RegisteredUser>) => set({ userMap: users }),
}));

export default userStore;
