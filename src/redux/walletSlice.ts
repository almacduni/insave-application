import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import SInfo from "react-native-sensitive-info";

import { searchAPI, NameCryptoRate } from "../api/search-api";
import { Currency, userAPI } from "../api/user-api";
import { isJSON, isObject } from "../helpers/object-helper";

export enum CryptoBalance {
	ETH = "ethBalance",
	BTC = "btcBalance",
}

const initialState = {
	btcAddress: "",
	ethAddress: "",
	ethRate: 0,
	btcRate: 0,
	btcBalance: {
		accountBalance: 0,
		availableBalance: 0,
	},
	ethBalance: {
		accountBalance: 0,
		availableBalance: 0,
	},
	rateIsFetch: false,
	balanceIsFetch: false,
	addressIsFetch: false,
};

export const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setRateIsFetch: (state, { payload }) => {
			state.rateIsFetch = payload;
		},

		setEthRate: (state, { payload }) => {
			state.ethRate = payload;
		},

		setBtcRate: (state, { payload }) => {
			state.btcRate = payload;
		},

		setBtcAddress: (state, { payload }) => {
			state.btcAddress = payload;
		},

		setEthAddress: (state, { payload }) => {
			state.ethAddress = payload;
		},

		setBtcBalance: (state, { payload }) => {
			state.btcBalance = payload;
		},

		setEthBalance: (state, { payload }) => {
			state.ethBalance = payload;
		},

		setBalanceIsFetch: (state, { payload }) => {
			state.balanceIsFetch = payload;
		},

		setAddressIsFetch: (state, { payload }) => {
			state.addressIsFetch = payload;
		},
	},
});

export const {
	setRateIsFetch,
	setBtcRate,
	setEthRate,
	setBtcAddress,
	setEthAddress,
	setBtcBalance,
	setEthBalance,
	setBalanceIsFetch,
	setAddressIsFetch,
} = walletSlice.actions;

interface DataItem {
	localField: string;
	shouldUpdate?: boolean;
	actionCreator: (args: any) => any;
	apiRequest: (...args: any) => Promise<any>;
	getRequestArgs: (localField: string, localInfo: any) => any[];
}

interface DataHelperArgs {
	dispatch: Dispatch;
	rejectWithValue: (args: any) => any;
	setIsFetch: (isFetch: boolean) => any;
	data: DataItem[];
}

const setDataHelper = ({ dispatch, rejectWithValue, setIsFetch, data }: DataHelperArgs) => {
	try {
		dispatch(setIsFetch(true));
		data?.forEach(
			async ({ localField, shouldUpdate = false, actionCreator, apiRequest, getRequestArgs }) => {
				const localInfo = await SInfo.getItem(localField, {});

				if (localInfo && !shouldUpdate)
					dispatch(actionCreator(isJSON(localInfo) ? JSON.parse(localInfo) : localInfo));

				if (!localInfo || shouldUpdate) {
					const info = await apiRequest(...getRequestArgs(localField, localInfo));
					const dataForLocalSaving = isObject(info) ? JSON.stringify(info) : info;

					await SInfo.setItem(localField, dataForLocalSaving, {});
					dispatch(actionCreator(info));
				}
			},
		);
		dispatch(setIsFetch(false));
	} catch (e) {
		dispatch(setIsFetch(false));

		return rejectWithValue(e);
	}
};

interface CryptoArgs {
	userId: number | null;
	update?: boolean;
}

export const getCryptoAddresses = createAsyncThunk(
	"wallet/cryptoAddress",
	async ({ userId, update = false }: CryptoArgs, { dispatch, rejectWithValue }) => {
		setDataHelper({
			dispatch,
			rejectWithValue,
			setIsFetch: setAddressIsFetch,
			data: [
				{
					localField: Currency.ETH,
					actionCreator: setEthAddress,
					getRequestArgs: () => [userId, Currency.ETH],
					apiRequest: userAPI.getCryptoAddress,
					shouldUpdate: update,
				},
				{
					localField: Currency.BTC,
					actionCreator: setBtcAddress,
					getRequestArgs: () => [userId, Currency.BTC],
					apiRequest: userAPI.getCryptoAddress,
					shouldUpdate: update,
				},
			],
		});
	},
);

export const getCryptoBalances = createAsyncThunk(
	"wallet/cryptoBalance",
	async ({ userId, update = false }: CryptoArgs, { dispatch, rejectWithValue }) => {
		setDataHelper({
			dispatch,
			rejectWithValue,
			setIsFetch: setBalanceIsFetch,
			data: [
				{
					localField: CryptoBalance.ETH,
					actionCreator: setEthBalance,
					getRequestArgs: () => [userId, "ETH"],
					apiRequest: userAPI.getCryptoBalance,
					shouldUpdate: update,
				},
				{
					localField: CryptoBalance.BTC,
					actionCreator: setBtcBalance,
					getRequestArgs: () => [userId, "BTC"],
					apiRequest: userAPI.getCryptoBalance,
					shouldUpdate: update,
				},
			],
		});
	},
);

interface RateI {
	currency: NameCryptoRate.BTC | NameCryptoRate.ETH;
}

export const getCryptoCurrencyRate = createAsyncThunk(
	"wallet/cryptoRate",
	async ({ currency }: RateI, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setRateIsFetch(true));
			switch (currency) {
			case NameCryptoRate.BTC:
				const btcRate = await searchAPI.getCryptoRate(currency);

				dispatch(setBtcRate(btcRate));
				break;
			case NameCryptoRate.ETH:
				const ethRate = await searchAPI.getCryptoRate(currency);

				dispatch(setEthRate(ethRate));
				break;
			default:
				throw new Error(`Ticker ${currency} not found`);
			}
			dispatch(setRateIsFetch(false));
		} catch (e) {
			dispatch(setRateIsFetch(false));

			// return rejectWithValue(e);
		}
	},
);
