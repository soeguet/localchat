import { useEffect, useRef } from "react";
import { generateSimpleId } from "../../../../utils/functionality";
import { BackButton } from "../../../svgs/ui/BackButton";
import {
	PayloadSubType,
	type BannerObject,
	type BannerPayload,
	type Priority, PayloadSubTypeEnum,
} from "../../../../utils/customTypes";
import { useWebsocketStore } from "../../../../stores/websocketStore";
import { useTranslation } from "react-i18next";

type AddNewBannerContainerProps = {
	setAddBannerMode: (addBannerMode: boolean) => void;
	bannerObject?: BannerObject;
	setBannerObject: (bannerObject: BannerObject | null) => void;
};

function AddNewBannerContainer(props: AddNewBannerContainerProps) {
	const { t } = useTranslation();
	const titleRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);
	const priorityRef = useRef<HTMLSelectElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (props.bannerObject) {
			if (titleRef.current !== null) {
				titleRef.current.value = props.bannerObject.title;
			}
			if (messageRef.current !== null) {
				messageRef.current.value = props.bannerObject.message;
			}
			if (priorityRef.current !== null) {
				priorityRef.current.value = props.bannerObject.priority.toString();
			}
		}
	}, []);

	function handleSave() {
		if (
			titleRef.current === null ||
			messageRef.current === null ||
			priorityRef.current === null
		) {
			throw new Error("Refs are null");
		}
		const title = titleRef.current.value;
		const message = messageRef.current.value;
		const priority = Number(priorityRef.current.value);

		if (title === "" || message === "" || Number.isNaN(priority)) {
			throw new Error("Title, message or priority is empty");
		}

		const bannerObject: BannerObject = {
			id: props.bannerObject?.id || generateSimpleId(),
			title: title,
			message: message,
			priority: priority as Priority,
			hidden: false,
		};
		const bannerPayload: BannerPayload = {
			payloadType: PayloadSubTypeEnum.enum.modifyBanner,
			banner: bannerObject,
			action: props.bannerObject ? "update" : "add",
		};

		const ws = useWebsocketStore.getState().ws;

		if (!ws) {
			throw new Error("Websocket connection is not available");
		}

		ws.send(JSON.stringify(bannerPayload));

		props.setBannerObject(null);
		props.setAddBannerMode(false);
	}

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: not yet */}
			<div
				className="absolute left-1 top-2 cursor-pointer select-none rounded-full bg-white p-2 px-3 hover:bg-zinc-100"
				onClick={(_e: React.MouseEvent) => {
					props.setAddBannerMode(false);
					props.setBannerObject(null);
				}}
			>
				<BackButton />
			</div>
			<div className="m-3 flex flex-col gap-4 rounded-xl pt-12">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-bold leading-6 text-gray-900"
					>
						{t("banner_add_modal_label_title")}
					</label>
					<div className="mt-2 flex rounded-md shadow-sm">
						<input
							ref={titleRef}
							type="text"
							name="title"
							id="title"
							className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Title"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-bold leading-6 text-gray-900"
					>
						{t("banner_add_modal_label_message")}
					</label>
					<div className="mt-2 flex rounded-md shadow-sm">
						<input
							ref={messageRef}
							type="text"
							name="message"
							id="message"
							className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Message"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="priority"
						className="block text-sm font-bold leading-6 text-gray-900"
					>
						{t("banner_add_modal_label_priority")}
						<p className="text-sm font-light text-gray-600">
							{t("banner_add_modal_label_priority_explanation")}
						</p>
					</label>
					<div className="mt-2 flex rounded-md shadow-sm">
						<select
							id="priority"
							ref={priorityRef}
							name="priority"
							className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="button"
						className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
						onClick={() => {
							props.setBannerObject(null);
							props.setAddBannerMode(false);
						}}
					>
						{t("banner_add_modal_button_cancel")}
					</button>
					<button
						type="button"
						className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						onClick={handleSave}
					>
						{t("banner_add_modal_button_save")}
					</button>
				</div>
			</div>
		</>
	);
}

export { AddNewBannerContainer };