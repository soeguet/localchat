import { StoreApi, UseBoundStore, create } from "zustand";

type useImageStoreType = {
    selectedImage: File | null;
    setSelectedImage: (image: File | null) => void;
};

const useImageStore: UseBoundStore<StoreApi<useImageStoreType>> =
    create<useImageStoreType>((set) => ({
        selectedImage: null,
        setSelectedImage: (image: File | null) => set({ selectedImage: image }),
    }));

export { useImageStore };
