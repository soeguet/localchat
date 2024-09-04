import {BannerListPayloadSchema, type BannerObject} from "../types/customTypes";
import {useBannerStore} from "../../stores/bannerStore";
import {errorLogger} from "../../logger/errorLogger";

export function fetchAllBannersHandler(event: MessageEvent) {

    const bannerListValidation = BannerListPayloadSchema.safeParse(JSON.parse(event.data));

    if (bannerListValidation.success) {

        if (bannerListValidation.data.banners === undefined) {
            throw new Error("Banners are undefined");
        }

        const banners: BannerObject[] = bannerListValidation.data.banners;
        // TODO maybe check for updating the banners
        useBannerStore.getState().setBanners(banners);

    } else {

        console.error("Failed to parse fetch all banners payload");
        errorLogger.logError(new Error("Failed to parse fetch all banners payload"));
        throw new Error("Failed to parse fetch all banners payload");

    }
}