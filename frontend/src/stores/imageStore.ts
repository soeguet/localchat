import { type StoreApi, type UseBoundStore, create } from "zustand";

type useImageStoreType = {
	selectedImage: File | null;
	setSelectedImage: (image: File | null) => void;

	droppedImage: string | null;
	setDroppedImage: (image: string | null) => void;
};

const useImageStore: UseBoundStore<StoreApi<useImageStoreType>> =
	create<useImageStoreType>((set) => ({
		selectedImage: null,
		setSelectedImage: (image: File | null) => set({ selectedImage: image }),

		droppedImage: null,
		setDroppedImage: (image: string | null) => set({ droppedImage: image }),
	}));

export { useImageStore };