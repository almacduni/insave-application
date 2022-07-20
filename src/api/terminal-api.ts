import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { TerminalFinancialRequestItem } from "../types/commonTypes";
import { updateToken } from "./auth-api";

export type TokenType = {
	token: string;
};

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

linkInterceptorsHelper(instance, updateToken);

//api

export const terminalAPI = {
	async updateTerminalItem (ticker: string) {
		const response = await instance.get(`/up-to-date/get-info?ticker=${ticker}`);

		return response.data;
	},
	async sendFinancialRequest (userId: number, item: TerminalFinancialRequestItem) {
		const response = await instance.post(`/finance/createOrder?userId=${userId}`, {
			...item,
		});

		return response.data;
	},
};
