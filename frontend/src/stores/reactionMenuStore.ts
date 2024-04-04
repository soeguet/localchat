import { StoreApi, UseBoundStore, create } from "zustand";

type useReactionMenuStoreType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    originId: string | null;
    setOriginId: (originId: string) => void;
    position: { x: number; y: number };
    setPosition: (position: { x: number; y: number }) => void;
};

const useReactionMenuStore: UseBoundStore<StoreApi<useReactionMenuStoreType>> =
    create<useReactionMenuStoreType>((set) => ({
        isOpen: false,
        setIsOpen: (isOpen: boolean) => set({ isOpen }),
        originId: null,
        setOriginId: (originId: string) => set({ originId }),
        position: { x: 0, y: 0 },
        setPosition: (position: { x: number; y: number }) => set({ position }),
    }));

export default useReactionMenuStore;
