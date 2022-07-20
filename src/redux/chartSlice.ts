import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import SInfo from "react-native-sensitive-info";

import { SearchResultsItemType, WatchListType, CandleType } from "../types/commonTypes";
import { searchAPI } from "../api/search-api";
import { chartAPI, watchlist } from "../api/chart-api";
import { Exchanges } from "../shared/model";
import { NameTimeFrame } from "../components/CandleChart/helpers/dateHelpers";
import { getMarketData } from "../shared/api/marketData";

const initialState = {
	currentInfo: {
		name: null as string | null,
		ticker: null as string | null,
		livePrice: null as number | null,
		exchange: null as Exchanges | null,
	},
	chartData: null as CandleType[] | null,
	isFetchingChartData: false,
	watchListData: null as WatchListType | null,
	isFetchingWatchListData: true,
	activeIndicator: "" as string | null,
	searchResults: null as SearchResultsItemType[] | null,
	timeFrame: null as string | null,
};

export const WATCH_LIST_FIELD = "WATCH_LIST";
export type ChartStateType = typeof initialState;

type CurrentInfoType = typeof initialState.currentInfo;

export const chartSlice = createSlice({
	name: "SV/CHART",
	initialState,
	reducers: {
		setCurrentInfo: (state: ChartStateType, action: PayloadAction<CurrentInfoType>) => {
			state.currentInfo = action.payload;
		},
		setIsFetchingChartData: (state: ChartStateType, action: PayloadAction<boolean>) => {
			state.isFetchingChartData = action.payload;
		},
		setChartData: (state: ChartStateType, action: PayloadAction<CandleType[]>) => {
			state.chartData = action.payload;
		},
		setIsFetchingWatchListData: (state: ChartStateType, action: PayloadAction<boolean>) => {
			state.isFetchingWatchListData = action.payload;
		},
		setWatchListData: (state: ChartStateType, action: PayloadAction<WatchListType>) => {
			state.watchListData = action.payload;
		},
		setActiveIndicator: (state: ChartStateType, action: PayloadAction<string>) => {
			state.activeIndicator = action.payload;
		},
		setSearchResults: (
			state: ChartStateType,
			action: PayloadAction<SearchResultsItemType[] | null>,
		) => {
			state.searchResults = action.payload;
		},
		setTimeFrame: (state: ChartStateType, action: PayloadAction<string>) => {
			state.timeFrame = action.payload;
		},
	},
});

export const {
	setCurrentInfo,
	setIsFetchingChartData,
	setChartData,
	setIsFetchingWatchListData,
	setWatchListData,
	setActiveIndicator,
	setSearchResults,
	setTimeFrame,
} = chartSlice.actions;

interface GetChartCandlesDataPayload {
	ticker: string;
	name: string;
	timeFrame?: string;
	exchange: Exchanges;
}

export const getChartCandlesData = createAsyncThunk(
	"SV/CHART/GET-CHART-CANDLE-DATA",
	async (payload: GetChartCandlesDataPayload, { dispatch, rejectWithValue }) => {
		dispatch(setIsFetchingChartData(true));
		const { ticker, name, timeFrame = "ONE_DAY", exchange } = payload;

		try {
			if (timeFrame === NameTimeFrame.FIVE_MINUTES) {
				const to = new Date().getTime() - 1000;
				const response = await getMarketData({ ticker, timeFrame, to });

				dispatch(setChartData(response));

				dispatch(
					setCurrentInfo({
						name: name,
						ticker: ticker,
						livePrice: response[response.length - 1].close,
						exchange
					}),
				);

				return;
			}
			const response = await chartAPI.getCandlesDateByTimeFrame(ticker, timeFrame);

			dispatch(setChartData(response.data));

			dispatch(
				setCurrentInfo({
					name: name,
					ticker: ticker,
					livePrice: response.current.price,
					exchange
				}),
			);
		} catch (e) {
			console.warn("getChartCandlesData: ", e);

			return rejectWithValue(e);
		}
		dispatch(setIsFetchingChartData(false));
	},
);

interface GetSearchResultsWatchListPayload {
	searchPhrase: string;
	page: number;
	pageLimit: number;
}

export const getSearchResultsWatchList = createAsyncThunk(
	"SV/CHART/GET-SEARCH-RESULTS-WATCH-LIST",
	async (payload: GetSearchResultsWatchListPayload, { dispatch }) => {
		dispatch(setIsFetchingChartData(true));
		const { searchPhrase, page, pageLimit } = payload;

		try {
			const response = await searchAPI.getSearchResultsCall({
				ticker: searchPhrase,
				page,
				pageLimit,
			});

			dispatch(setSearchResults(response.searchTickerResponseList));
		} catch (e) {
			console.log("getSearchResultsWatchList: ", JSON.stringify(e, null, 2));
		}
		dispatch(setIsFetchingChartData(false));
	},
);

interface GetWatchListDataPayload {
	userId: number | null;
	withLoader?: boolean;
}

export const getWatchListData = createAsyncThunk(
	"SV/CHART/GET-WATCH-LIST-DATA",
	async (payload: GetWatchListDataPayload, { dispatch }) => {
		const { userId, withLoader = true } = payload;

		if (withLoader) {
			dispatch(setIsFetchingWatchListData(true));
		}
		try {
			const localWatchList = await SInfo.getItem(WATCH_LIST_FIELD, {});

			if (!userId)
				if (localWatchList) {
					dispatch(
						setWatchListData({
							watchListId: 0,
							tickers: JSON.parse(localWatchList),
						}),
					);
					dispatch(setIsFetchingWatchListData(false));

					return;
				}

			const response = await chartAPI.getWatchListData(userId);

			await SInfo.setItem(WATCH_LIST_FIELD, JSON.stringify(response.data.tickers), {});
			dispatch(setWatchListData(response.data));
		} catch (e) {
			console.log("getWatchListData: ", e);
		}
		if (withLoader) {
			dispatch(setIsFetchingWatchListData(false));
		}
	},
);

interface WrongWatchListType {
	tickers: string[];
	watchListId: number;
	withLoader?: boolean;
	isLogged?: boolean;
	userId?: number | null;
}

export const updateWatchListData = createAsyncThunk(
	"SV/CHART/GET-WATCH-LIST-DATA",
	async (payload: WrongWatchListType, { dispatch }) => {
		const { tickers, watchListId, withLoader = true, isLogged = true, userId = null } = payload;

		if (withLoader) dispatch(setIsFetchingWatchListData(true));

		try {
			if (isLogged) {
				const response = await chartAPI.updateWatchListData({
					tickers,
					watchListId,
				});

				console.log("WATCHLIST_RESPONSE", response.data);

				if (response.data) dispatch(setWatchListData(response.data));
				await dispatch(getWatchListData({ userId, withLoader }));
			} else {
				const localWatchList = JSON.parse(await SInfo.getItem(WATCH_LIST_FIELD, {}));
				const dummyCompany = null;

				if (tickers.length > localWatchList.length) {
					const addedTicker = tickers[tickers.length - 1];
					const company = await watchlist.getCompanyByTicker(addedTicker);

					localWatchList.push(company);
					dispatch(
						setWatchListData({
							watchListId: 0,
							tickers: localWatchList,
						}),
					);
					await SInfo.setItem(WATCH_LIST_FIELD, JSON.stringify(localWatchList), {});
				}
				const resultWatchList = tickers.map((ticker) => localWatchList.find((company: any) => company.symbol === ticker));
				let savedWatchlist = [...resultWatchList];

				if (dummyCompany) savedWatchlist = [...savedWatchlist, dummyCompany];

				await SInfo.setItem(
					WATCH_LIST_FIELD,
					JSON.stringify(savedWatchlist.filter((t) => !!t)),
					{},
				);
			}
		} catch (e) {
			console.log("updateWatchListData: ", e);
		}
		if (withLoader) {
			dispatch(setIsFetchingWatchListData(false));
		}
	},
);
