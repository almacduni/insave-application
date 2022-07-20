import axios from "axios";

import { UsersSearchResult } from "../types/commonTypes";
import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { updateToken } from "./auth-api";

export enum NameCryptoRate {
	BTC = "X:BTCUSD",
	ETH = "X:ETHUSD",
}

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

//api

//Get candles for end of day
export const searchAPI = {
	async getSearchResultsCall ({
		ticker,
		page = 1,
		pageLimit = 1,
	}: {
		ticker: string;
		page?: number;
		pageLimit?: number;
	}) {
		const response = await guestInstance.get(
			`/companies/search?ticker=${ticker}&page=${page}&pageLimit=${pageLimit}`,
		);

		return response.data;
	},
	async getFirstDescriptionElement (ticker: string) {
		const response = await guestInstance.get(`/companies/${ticker}`);

		return response.data;
	},
	async getLastDescriptionElement (ticker: string) {
		const response = await guestInstance.get(`/companies/${ticker}/description`);

		return response.data;
	},
	async getPlaylists ({
		page,
		pageLimit,
		playlistLimit,
	}: {
		page: number;
		pageLimit: number;
		playlistLimit: number;
	}) {
		try {
			const response = await guestInstance.get(
				`playlists/categories?page=${page}&pageLimit=${pageLimit}&playlistLimit=${playlistLimit}`,
			);

			return response.data;
		} catch (err) {
			console.log("Error getPlaylists", err);
		}
	},
	async getPlaylistsById ({ page, pageLimit, id }: { page: number; pageLimit: number; id: number }) {
		try {
			const response = await guestInstance.get(
				`playlists/category?page=${page}&pageLimit=${pageLimit}&categoryId=${id}`,
			);

			return response.data;
		} catch (err) {
			return err;
		}
	},
	async getPlaylistsItems (playlistId: number) {
		const response = await guestInstance.get(`playlists/${playlistId}`);

		return response.data;
	},
	getStockInfo: (ticker: string) => instance.get(`stocks/info?ticker=${ticker}`),
	async getCryptoRate (rateName: NameCryptoRate) {
		const response = await instance.get(`/crypto/prev/close/${rateName}`);

		return response.data.results[0].c;
	},
	async searchUsersByUsernameOrEmail (
		searchString: string,
		offset: number,
		limit: number,
	): Promise<{ foundUsers: UsersSearchResult[]; total: number }> {
		const { data } = await instance.get(`/user/search/${searchString}/${offset}/${limit}`);

		return data;
	},
};
