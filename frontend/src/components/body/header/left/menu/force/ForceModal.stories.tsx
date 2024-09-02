import type { StoryFn } from "@storybook/react/*";
import { useClientStore } from "../../../../../../stores/clientStore";
import { useUserStore } from "../../../../../../stores/userStore";
import type { ClientEntity } from "../../../../../../utils/types/customTypes";
import { ForceModal } from "./ForceModal";

const map = new Map<string, ClientEntity>();
map.set("AAA", {
	clientDbId: "AAA",
	clientUsername: "TestUser",
	clientColor: "#cd2a1a",
	availability: true,
});
map.set("BBB", {
	clientDbId: "BBB",
	clientUsername: "TestUser2",
	clientColor: "#003000",
	availability: true,
});
map.set("CCC", {
	clientDbId: "CCC",
	clientUsername: "TestUser3",
	clientColor: "#003000",
	availability: true,
});
map.set("DDD", {
	clientDbId: "DDD",
	clientUsername: "TestUser4",
	clientColor: "#003000",
	availability: true,
});
map.set("EEE", {
	clientDbId: "EEE",
	clientUsername: "TestUser5",
	clientColor: "#003000",
	availability: true,
});
map.set("FFF", {
	clientDbId: "FFF",
	clientUsername: "TestUser6",
	clientColor: "#003000",
	availability: true,
});
map.set("GGG", {
	clientDbId: "GGG",
	clientUsername: "TestUser7",
	clientColor: "#003000",
	availability: true,
});
map.set("HHH", {
	clientDbId: "HHH",
	clientUsername: "TestUser8",
	clientColor: "#003000",
	availability: true,
});
map.set("III", {
	clientDbId: "III",
	clientUsername: "TestUser9",
	clientColor: "#003000",
	availability: true,
});
map.set("JJJ", {
	clientDbId: "JJJ",
	clientUsername: "TestUser10",
	clientColor: "#003000",
	availability: true,
});

export default {
	component: ForceModal,
	decorators: [
		(Story: StoryFn) => {
			useUserStore.getState().setMyId("AAA");
			useUserStore.getState().setMyColor("#cd2a1a");

			useClientStore.getState().setClientMap(map);
			return <Story />;
		},
	],
};

export const Default = {
	args: {
		label: "ForceModal",
		primary: true,
	},
};