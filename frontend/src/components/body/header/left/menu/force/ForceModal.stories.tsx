import type { StoryFn } from "@storybook/react/*";
import { useClientStore } from "../../../../../../stores/clientStore";
import { ForceModal } from "./ForceModal";
import { useUserStore } from "../../../../../../stores/userStore";

export default {
	component: ForceModal,
	decorators: [
		(Story: StoryFn) => {
			useUserStore.getState().setMyId("AAA");
			useUserStore.getState().setMyColor("#cd2a1a");

			useClientStore.getState().setClients([
				{
					clientDbId: "AAA",
					clientUsername: "TestUser",
					clientColor: "#cd2a1a",
					availability: true,
				},
				{
					clientDbId: "BBB",
					clientUsername: "TestUser2",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "CCC",
					clientUsername: "TestUser3",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "DDD",
					clientUsername: "TestUser4",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "EEE",
					clientUsername: "TestUser5",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "FFF",
					clientUsername: "TestUser6",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "GGG",
					clientUsername: "TestUser7",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "HHH",
					clientUsername: "TestUser8",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "III",
					clientUsername: "TestUser9",
					clientColor: "#003000",
					availability: true,
				},
				{
					clientDbId: "JJJ",
					clientUsername: "TestUser10",
					clientColor: "#003000",
					availability: true,
				},
			]);
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