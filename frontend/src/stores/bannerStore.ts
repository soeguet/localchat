import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { BannerObject, Hash } from "../utils/types/customTypes";

type useBannerStoreType = {
	banners: BannerObject[];
	setBanners: (banners: BannerObject[]) => void;

	bannerModalOpen: boolean;
	setBannerModalOpen: (bannerModalOpen: boolean) => void;
	hideBanner: (id: Hash) => void;
};

const useBannerStore: UseBoundStore<StoreApi<useBannerStoreType>> =
	create<useBannerStoreType>((set) => ({
		banners: [],
		setBanners: (banners: BannerObject[]) => set({ banners }),

		bannerModalOpen: false,
		setBannerModalOpen: (bannerModalOpen: boolean) =>
			set({ bannerModalOpen }),
		hideBanner: (id: Hash) =>
			set((state) => ({
				banners: state.banners.map((banner) =>
					banner.id === id
						? { ...banner, hidden: !banner.hidden }
						: banner,
				),
			})),
	}));

export { useBannerStore };