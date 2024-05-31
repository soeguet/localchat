import { StoryFn } from "@storybook/react/*";
import { useClientStore } from "../../../stores/clientStore";
import { ForceModal } from "./ForceModal";
import { useUserStore } from "../../../stores/userStore";

export default {
    component: ForceModal,
    decorators: [
        (Story: StoryFn) => {
            useUserStore.getState().setMyId("AAA");
            useClientStore.getState().setClients([
                {
                    clientDbId: "AAA",
                    clientUsername: "TestUser",
                    clientColor: "#cd2a1a",
                },
                {
                    clientDbId: "BBB",
                    clientUsername: "TestUser2",
                    clientColor: "#003000",
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
