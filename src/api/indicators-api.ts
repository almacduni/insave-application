import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { updateToken } from "./auth-api";

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

const guestInstance = axios.create({
	baseURL: baseUrl,
});

linkInterceptorsHelper(instance, updateToken);

export const IndicatorsAPI: {
	[key: string]: any;
} = {
	getRSI: async (ticker: string, timeFrame: string) => {
		const { data } = await guestInstance.get("/market/indicators/rsi", {
			params: { ticker, timeFrame },
		});

		return data;
	},
	getEMA: async (ticker: string, timeFrame: string) => {
		const { data } = await guestInstance.get("market/indicators/ema", {
			params: { ticker, timeFrame },
		});

		return data;
	},
	getMACD: async (ticker: string, timeFrame: string) => {
		const { data } = await guestInstance.get("market/indicators/macd", {
			params: { ticker, timeFrame },
		});

		return data;
	},
	getBB: async (ticker: string, timeFrame: string) => {
		const { data } = await guestInstance.get("market/indicators/bb", {
			params: { ticker, timeFrame },
		});

		return data;
	},
};
