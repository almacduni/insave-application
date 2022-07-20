import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Currency, WalletData } from "../types/commonTypes";
import { FinanceAPI } from "../shared/api";
import { searchAPI, NameCryptoRate } from "../api/search-api";

const initialState = {
	wallets: [] as WalletData[],
	selectedWallet: null as WalletData | null,
	rates: {} as { [key in Currency]: number },
	isFetchingWallets: false,
	isFetchingRate: false,
};

type WalletStateType = typeof initialState;

export const walletSlice = createSlice({
	name: "wallet/slice",
	initialState,
	reducers: {
		setWallets: (state: WalletStateType, action: PayloadAction<WalletData[]>) => {
			state.wallets = action.payload;
		},
		setFetchingWallets: (state: WalletStateType, action: PayloadAction<boolean>) => {
			state.isFetchingWallets = action.payload;
		},
		setSelectedWallet: (state: WalletStateType, action: PayloadAction<string>) => {
			state.selectedWallet = state.wallets.find((wallet) => wallet.id === action.payload) || null;
		},
		setRate: (state: WalletStateType, action: PayloadAction<{ name: Currency; rate: number }>) => {
			state.rates[action.payload.name] = action.payload.rate;
		},
		setFetchingRate: (state: WalletStateType, action: PayloadAction<boolean>) => {
			state.isFetchingRate = action.payload;
		},
		removeRates: (state: WalletStateType) => {
			state.rates = {} as { [key in Currency]: number };
		},
	},
});

export const {
	setWallets,
	setFetchingWallets,
	setSelectedWallet,
	setFetchingRate,
	setRate,
	removeRates,
} = walletSlice.actions;

export const getWallets = createAsyncThunk(
	"wallet/slice/getWallets",
	async ({ userId }: { userId: number }, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setFetchingWallets(true));
			const wallets = await FinanceAPI.getCryptoBalances(userId);

			dispatch(setWallets(wallets));
			dispatch(setFetchingWallets(false));
		} catch (e) {
			dispatch(setFetchingWallets(false));

			return rejectWithValue(e);
		}
	},
);

export const getRate = createAsyncThunk(
	"wallet/slice/getRate",
	async ({ currency }: { currency: Currency }, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setFetchingRate(true));
			const rate = await searchAPI.getCryptoRate(NameCryptoRate[currency]);

			dispatch(setRate({ name: currency, rate }));
			dispatch(setFetchingRate(false));
		} catch (e) {
			dispatch(setFetchingRate(false));

			return rejectWithValue(e);
		}
	},
);
