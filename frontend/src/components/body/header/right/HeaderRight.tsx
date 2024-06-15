import { FlagButton } from "./flag/FlagButton";
import { FontSizeButton } from "./font-size/font-size-button/FontSizeButton";
import { UnreadMessageButton } from "./unread/UnreadMessageButton";

function HeaderRight() {
	return (
		<div className="flex h-full items-center gap-1">
			<UnreadMessageButton />
			<FontSizeButton />
			<FlagButton />
		</div>
	);
}

export { HeaderRight };
