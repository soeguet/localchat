import { BannerObject } from "../../../utils/types/customTypes";
import { BannerHideSvg } from "../../svgs/banner/BannerHideSvg";
import { BannerUnhideSvg } from "../../svgs/banner/BannerUnhideSvg";

type BannerVisibilityIconProps = {
	banner: BannerObject;
};
function BannerVisibilityIcon(props: BannerVisibilityIconProps) {
	if (!props.banner.hidden) {
		return <BannerUnhideSvg />;
	}

	return (
		<>
			<BannerHideSvg />
		</>
	);
}

export { BannerVisibilityIcon };