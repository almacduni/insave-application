import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { ChatType, Message } from "../types/commonTypes";
import { updateToken } from "./auth-api";

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

linkInterceptorsHelper(instance, updateToken);

export const ChatAPI = {
	getUserChats: async ({
		userId,
		offset,
		limit,
	}: {
		userId: number;
		offset: number;
		limit: number;
	}): Promise<{ chatsList: ChatType[]; total: number }> => {
		const { data } = await instance.get(`/chat/get/${userId}/${offset || 0}/${limit || 1}`);

		return data;
	},
	sendMessage: async (messageData: FormData): Promise<Message> => {
		const { data } = await instance.post(`/chat/sendMessage`, messageData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "*/*",
			},
		});

		return data;
	},
	getChatMessages: async ({
		chatId,
		offset,
		limit,
	}: {
		chatId: number;
		offset: number;
		limit: number;
	}): Promise<{ messages: Message[]; total: number }> => {
		const { data } = await instance.get(`/messages/${chatId}/${offset}/${limit}`);

		return data;
	},
	getSupportChats: async ({
		userId,
		offset,
		limit,
	}: {
		userId: number;
		offset: number;
		limit: number;
	}): Promise<{ chatsList: ChatType[]; total: number }> => {
		const { data } = await instance.get(`/chat/support/${userId}/${offset || 0}/${limit || 1}`);

		return data;
	},
	getCommonChat: async (): Promise<ChatType> => {
		const { data } = await instance.get("/chat/common");

		return data;
	},
};
