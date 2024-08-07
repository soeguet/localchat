import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { BannerObject, Hash } from "../utils/customTypes";

type useBannerStoreType = {
	banners: BannerObject[];
	setBanners: (banners: BannerObject[]) => void;
	countBanners: (banners: BannerObject[]) => number;
	addBanner: (banner: BannerObject) => void;
	removeBanner: (id: Hash) => void;
	bannerModalOpen: boolean;
	setBannerModalOpen: (bannerModalOpen: boolean) => void;
	hideBanner: (id: Hash) => void;
};

const useBannerStore: UseBoundStore<StoreApi<useBannerStoreType>> =
	create<useBannerStoreType>((set) => ({
		banners: [
			{
				id: "1",
				title: "localchat v1",
				message: "join our local chat!",
				priority: 1,
				hidden: false,
			},
			{
				id: "2",
				title: "localchat v2",
				message: "join our prio 2 local chat!",
				priority: 2,
				hidden: false,
			},
		],
		setBanners: (banners: BannerObject[]) => set({ banners }),
		countBanners: (banners: BannerObject[]) => {
			return banners.length;
		},
		addBanner: (banner: BannerObject) =>
			set((state) => {
				const banners = state.banners;
				if (banners.find((b) => b.id === banner.id)) {
					// replace existing banner
					const index = banners.findIndex((b) => b.id === banner.id);
					banners[index] = banner;
				} else {
					banners.push(banner);
				}
				return { banners };
			}),
		removeBanner: (id: Hash) => {
			set((state) => ({
				banners: state.banners.filter((banner) => banner.id !== id),
			}));
		},
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
