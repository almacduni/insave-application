import axios from "axios";
import { Moment } from "moment";

import { Currency as CryptoCurrency } from "../types/commonTypes";
import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { updateToken } from "./auth-api";

export type TokenType = {
	token: string;
};

type Payload = { address: string; amount: string; userId: number | null };

export enum Currency {
	BTC = "btcAddress",
	ETH = "ethAddress",
}

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

linkInterceptorsHelper(instance, updateToken);

//api

export const userAPI = {
	async getInfoByToken (token: string) {
		const response = await instance.get(`user/get-info-by-token?token=${token}`);

		return response.data;
	},

	async sendKYC (
		city: string,
		postcode: string,
		streetAddress: string,
		date: string | Moment,
		firstName: string,
		lastName: string,
		pictures: string[],
		documentType: string,
	) {
		try {
			const response = await instance.post(`user/personal-data?documentType=${documentType}`, {
				city,
				postcode,
				streetAddress,
				date,
				firstName,
				lastName,
				pictures,
			});

			return response.data;
		} catch (e) {
			console.log("Error sendKYC");
		}
	},
	async checkUserNameInput (username: string) {

		const response = await instance.post("/api/auth/username/check", { username });

		return response.data;

	},
	async checkEmailInput (email: string) {
		try {
			const response = await instance.post("api/auth/email/check", { email });

			return response.data;
		} catch (e) {

			return e.response.data;
		}
	},
	async getWallet (id: number) {
		const response = await instance.get(`finance/wallet?id=${id}`);

		return response.data;
	},

	async getCryptoBalance (userId: number, cryptoCurrency: "ETH" | "BTC") {
		const response = await instance.get(
			`crypto/balance?userId=${userId}&cryptoCurrency=${cryptoCurrency}`,
		);

		return response.data;
	},

	async getCryptoSecurityCode (payload: Payload, currency: CryptoCurrency) {
		if (!payload.userId) throw new Error(`User with id ${payload.userId} not valid`);

		await instance.post(`crypto/securityCode?currency=${currency}`, payload);
	},

	async withdrawEthereum (payload: Payload, code: string) {
		if (!payload.userId) throw new Error(`User with id ${payload.userId} not valid`);

		const response = await instance.post(`crypto/eth/withdraw?code=${code}`, payload);

		return response.data;
	},
	async updateUserInfo (payload: { userId: number | null; bio?: string; username?: string }) {
		const { userId, bio, username } = payload;
		let body;

		if (username && bio) {
			body = {
				bio,
				username,
			};
		} else if (bio) {
			body = {
				bio,
			};
		} else {
			body = { username };
		}
		try {
			const response = await instance.post(`user/${userId}/bio`, body);

			return response.data;
		} catch (error) {
			console.log("Error updateUserInfo", error);
		}
	},
	async updateUserAvatar (data: {data: FormData; userId: number}) {

		try {
			const response = await instance.post(`user/${data.userId}/avatar`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "*/*",
				},
			});

			return response;
		} catch (err) {
			console.log("Error updateUserAvatar ", err);
		}
	},
	async withdrawBitcoin (payload: Payload, code: string) {
		if (!payload.userId) throw new Error(`User with id ${payload.userId} not valid`);

		const response = await instance.post(`crypto/btc/withdraw?code=${code}`, payload);

		return response.data;
	},

	async getPortfolio () {
		const response = await instance.get(`finance/portfolio`);

		return response.data;
	},

	async getHistory (id: number) {
		const response = await instance.get(`finance/orderHistory?userId=${id}`);

		return response.data;
	},

	async foundAccountMock (userId: number) {
		const response = await instance.post(`finance/resetBalance?userId=${userId}`, {});

		return response.data;
	},

	async getCryptoAddress (userId: number, currency: Currency.BTC | Currency.ETH) {
		const response = await instance.get(`crypto/${currency}?userId=${userId}`);

		return response.data;
	},

	async checkReferralCode (code: string) {
		const response = await instance.get(`referralLink/check?referralLink=${code}`);

		return response.data;
	},
};
