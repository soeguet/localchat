import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useClientStore } from "../../../stores/clientStore";
import { useMessageMapStore } from "../../../stores/messageMapStore";
import {
	type MessagePayload,
	PayloadSubTypeEnum,
} from "../../../utils/types/customTypes";
import { MessageRenderMap } from "./MessageRenderMap";

describe("pictureMessages", () => {
	beforeEach(() => {
		useClientStore.getState().setClients([
			{
				clientDbId: "1",
				clientUsername: "TestUser",
				clientColor: "#cd2a1a",
				availability: true,
			},
			{
				clientDbId: "2",
				clientUsername: "TestUser2",
				clientColor: "#003000",
				availability: true,
			},
		]);
	});
	test("render normal message", async () => {
		const messageMap = new Map<string, MessagePayload>();
		messageMap.set("1", {
			clientType: {
				clientDbId: "1",
			},
			payloadType: PayloadSubTypeEnum.enum.message,
			messageType: {
				messageDbId: "1",
				messageTime: "12:00",
				messageContext: "aGVubG8=",
				messageDate: "2021-10-10",
				deleted: false,
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "111",
				quoteClientId: "111",
			},
			reactionType: [],
		});

		useMessageMapStore.getState().setMessageMap(messageMap);

		render(<MessageRenderMap />);

		const text = await screen.findByText("12:00");
		expect(text).toBeInTheDocument();
	});

	test("render message with picture", async () => {
		const messageMap = new Map<string, MessagePayload>();
		messageMap.set("1", {
			clientType: {
				clientDbId: "1",
			},
			payloadType: PayloadSubTypeEnum.enum.message,
			messageType: {
				messageDbId: "1",
				messageTime: "12:00",
				messageContext: "aGVubG8=",
				messageDate: "2021-10-10",
				deleted: false,
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "111",
				quoteClientId: "111",
			},
			imageType: {
				imageDbId: "1",
				type: "image/jpeg",
				data: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiUlEQVQ4jY2STUsbURTHf+fs4ML2TBSnIhu2pFFJiUlwsLBUigpJCEVGVkYogkJGaOgmSiSghEQojXxAiipKSImIZaWEkCKLNhIWyhbB4c65+5p7QFFpaJ7+y5n5uOb/3PmfnmeBoVGpm2pYoEevNANRqs6MqO7KpkGZTzPh8/M1sbz2rH4YZ2KmpqmoLMr4BgFTN0rSOQip0FEW4+kjF4zbrRWSmTBRkTbnYgJvn7Gwi+QZikMIshRhF6a2fEx8TsTpzSHY0pH4OZw9s8B5aCm1bGvjUbRlW/TyCDiyMNxuoLY7FkPZBb6ZGDzvJQwCrOhn8DYa1PXuKNlg9ZaAagYyaAbDZUKrI5nIHNVuz1ZbYGzQ8MgoaePM4BZNYxI1YUNABXOWYC2UCRGdMxij1sAy2AO7CkwRNmSgnT1sS1QSCdRnONtwqx0HktFOk9Y0IPehQ14PqPfI/W7h8GTdhe/Gmc+5zn8M76AYV4BfLLFLyzjVSf+r5ImWou2gjJ5gcE4V6//f4EnrBrD+Z3EG4iLSyBDp+gJDZszXvX9n9ANVFC5hd7cEkAAAAASUVORK5CYII=",
			},
			reactionType: [],
		});

		useMessageMapStore.getState().setMessageMap(messageMap);

		render(<MessageRenderMap />);

		const pic = await screen.findByRole("img");
		expect(pic).toBeInTheDocument();
	});
	test("render message with picture but with no text content", async () => {
		const messageMap = new Map<string, MessagePayload>();
		messageMap.set("1", {
			clientType: {
				clientDbId: "1",
			},
			payloadType: PayloadSubTypeEnum.enum.message,
			messageType: {
				messageDbId: "1",
				messageTime: "12:00",
				messageContext: "",
				messageDate: "2021-10-10",
				deleted: false,
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "111",
				quoteClientId: "111",
			},
			imageType: {
				imageDbId: "1",
				type: "image/jpeg",
				data: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiUlEQVQ4jY2STUsbURTHf+fs4ML2TBSnIhu2pFFJiUlwsLBUigpJCEVGVkYogkJGaOgmSiSghEQojXxAiipKSImIZaWEkCKLNhIWyhbB4c65+5p7QFFpaJ7+y5n5uOb/3PmfnmeBoVGpm2pYoEevNANRqs6MqO7KpkGZTzPh8/M1sbz2rH4YZ2KmpqmoLMr4BgFTN0rSOQip0FEW4+kjF4zbrRWSmTBRkTbnYgJvn7Gwi+QZikMIshRhF6a2fEx8TsTpzSHY0pH4OZw9s8B5aCm1bGvjUbRlW/TyCDiyMNxuoLY7FkPZBb6ZGDzvJQwCrOhn8DYa1PXuKNlg9ZaAagYyaAbDZUKrI5nIHNVuz1ZbYGzQ8MgoaePM4BZNYxI1YUNABXOWYC2UCRGdMxij1sAy2AO7CkwRNmSgnT1sS1QSCdRnONtwqx0HktFOk9Y0IPehQ14PqPfI/W7h8GTdhe/Gmc+5zn8M76AYV4BfLLFLyzjVSf+r5ImWou2gjJ5gcE4V6//f4EnrBrD+Z3EG4iLSyBDp+gJDZszXvX9n9ANVFC5hd7cEkAAAAASUVORK5CYII=",
			},
			reactionType: [],
		});

		useMessageMapStore.getState().setMessageMap(messageMap);

		render(<MessageRenderMap />);

		const pic = await screen.findByRole("img");
		expect(pic).toBeInTheDocument();
	});
});