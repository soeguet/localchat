import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {ClientEntity} from "../utils/customTypes";

export type UserStore = {
    myId: string;
    setMyId: (id: string) => void;
    myUsername: string;
    setMyUsername: (username: string) => void;
    myColor: string;
    setMyColor: (color: string) => void;
    myProfilePhoto: string;
    setMyProfilePhoto: (photo: string) => void;
    userMap: Map<string, ClientEntity>;
    setUserMap: (userMap: Map<string, ClientEntity>) => void;
    socketIp: string;
    socketPort: string;
    clientOs: string;
    setSocketIp: (newIp: string) => void;
    setSocketPort: (newPort: string) => void;
    setClientOs: (newOs: string) => void;
};

const useUserStore: UseBoundStore<StoreApi<UserStore>> = create((set) => ({
    myId: "",
    setMyId: (id: string) => set({myId: id}),
    myUsername: "",
    setMyUsername: (username: string) => set({myUsername: username}),
    myColor: "",
    setMyColor: (color: string) => set({myColor: color}),
    myProfilePhoto: "",
    setMyProfilePhoto: (photo: string) => set({myProfilePhoto: photo}),
    userMap: new Map<string, ClientEntity>(),
    setUserMap: (users: Map<string, ClientEntity>) => set({userMap: users}),
    socketIp: "",
    socketPort: "",
    clientOs: "",
    setSocketIp: (newIp: string) => set({socketIp: newIp}),
    setSocketPort: (newPort: string) => set({socketPort: newPort}),
    setClientOs: (newOs: string) => set({clientOs: newOs}),
}));

export {useUserStore};