import {useVersionStore} from "../../../stores/versionStore";
import {useTranslation} from "react-i18next";

function UpdateBanner() {

	const {t} = useTranslation();
    const updateAvailable = useVersionStore()

	return (
		<>
            {updateAvailable.needsUpdate &&
            <div className="absolute top-0 right-0 text-white text-sm bg-red-500 p-2 opacity-80">
				{t("update_available")}:
                `{updateAvailable.major}.{updateAvailable.minor}.{updateAvailable.patch}`
            </div>}
		</>
	);
}

export { UpdateBanner };