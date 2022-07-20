import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { updateToken } from "./auth-api";

export type TokenType = {
	token: string;
};

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

const guestInstance = axios.create({
	baseURL: baseUrl,
});

linkInterceptorsHelper(instance, updateToken);

export const candlesIntraday = {
	async getCandlesIntraday (ticker: string) {
		const response = await guestInstance.get(
			`/market/stock-candles-intraday-daily?ticker=${ticker}&timeFrame=ONE_DAY`,
		);

		return response.data;
	},
};

interface WrongWatchListType {
	tickers: string[];
	watchListId: number;
}

export const chartAPI = {
	async getCandlesDateByTimeFrame (ticker: string, timeFrame: string) {
		const response = await guestInstance.get(
			`/market/stock-candles-intraday-daily?ticker=${ticker}&timeFrame=${timeFrame}`,
		);

		return response.data;
	},
	getWatchListData: (userId: number | null) =>
		guestInstance.get(`/watchlist/getUserWatchlist${userId ? "?userId=" + userId : ""}`),
	updateWatchListData: (payload: WrongWatchListType) => instance.put("/watchlist/update", payload),
};

export const watchlist = {
	async getWatchList (watchListStorage: Array<string>) {
		const response = await guestInstance.get(`/user-watchlist/get/?tickers=${watchListStorage.join()}`);

		return response.data.data;
	},
	async getWatchListSingleItem (ticker: string) {
		const response = await guestInstance.get(`/watchlist/get?ticker=${ticker}`);

		return response.data;
	},
	async getCompanyByTicker (ticker: string) {
		const response = await guestInstance.get(`/watchlist/company?ticker=${ticker}`);

		return response.data;
	},
	get: (userId: number) =>
		instance.get(`/watchlist/getUserWatchlist${userId ? "?userId=" + userId : ""}`),
	update: (data: { tickers: string[]; watchlistId: number }) =>
		instance.put("/watchlist/update", data),
};
