import { type StoreApi, type UseBoundStore, create } from "zustand";

type Priority = 1 | 2 | 3 | 4 | 5;

type BannerObject = {
	title: string;
	message: string;
	priority: Priority;
};

type useBannerStoreType = {
	banners: BannerObject[];
	setBanners: (banners: BannerObject[]) => void;
	countBanners: (banners: BannerObject[]) => number;
	addBanner: (banner: BannerObject) => void;
	removeBanner: (banner: BannerObject) => void;
	bannerModalOpen: boolean;
	setBannerModalOpen: (bannerModalOpen: boolean) => void;
};

const useBannerStore: UseBoundStore<StoreApi<useBannerStoreType>> =
	create<useBannerStoreType>((set) => ({
		banners: [
			{
				title: "localchat v1",
				message: "join our local chat!",
				priority: 1,
			},
			{
				title: "localchat v2",
				message: "join our prio 2 local chat!",
				priority: 2,
			},
		],
		setBanners: (banners: BannerObject[]) => set({ banners }),
		countBanners: (banners: BannerObject[]) => {
			return banners.length;
		},
		addBanner: (banner: BannerObject) =>
			set((state) => ({ banners: [...state.banners, banner] })),
		removeBanner: (banner: BannerObject) =>
			set((state) => ({
				banners: state.banners.filter((b) => b !== banner),
			})),
		bannerModalOpen: false,
		setBannerModalOpen: (bannerModalOpen: boolean) =>
			set({ bannerModalOpen }),
	}));

export { useBannerStore };
