import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { objectIsEmpty } from "../helpers/objectIsEmpty";
import { searchAPI } from "../api/search-api";
import {
	EarningSurpriseItemType,
	PlaylistItemDataType,
	CompanyDescriptionType,
	PlaylistExtendedDataItemType,
	PlaylistItemType,
	SearchResultsItemType,
	FinancialsItemType,
} from "../types/commonTypes";
import { updatePlaylistsInCategory } from "../helpers/object-helper";

const initialState = {
	searchResults: [] as Array<SearchResultsItemType>,
	companyDescription: null as CompanyDescriptionType | null,
	playlists: [] as PlaylistItemType[],
	playlistExtendedData: null as PlaylistExtendedDataItemType[] | null,
	playlistExtendedDescription: null as string | null,
	playlistExtendedTitle: null as string | null,
	playlistExtendedImage: null as string | null,
	playlistExtendedGradientBg: "" as string,
	financialStatement: [] as FinancialsItemType[],
	companyDescriptionPlaylists: null as PlaylistItemDataType[] | null,
	earningSurprise: [] as EarningSurpriseItemType[],
	isFetching: false,
	isSearchScreen: false,
	isOpenedSearch: false,
};

export type SearchState = typeof initialState;

export const searchSlice = createSlice({
	name: "SV/SEARCH",
	initialState,
	reducers: {
		setSearchResults: (state: SearchState, action: PayloadAction<SearchResultsItemType[]>) => {
			state.searchResults = action.payload;
		},
		setSearchResultsMore: (state: SearchState, action: PayloadAction<SearchResultsItemType[]>) => {
			state.searchResults = [...state.searchResults, ...action.payload];
		},
		setCompanyDescriptionAC: (
			state: SearchState,
			action: PayloadAction<CompanyDescriptionType>,
		) => {
			state.companyDescription = Object.assign(
				state.companyDescription ? state.companyDescription : {},
				action.payload,
			);
		},
		setEarningSurpriseAC: (
			state: SearchState,
			action: PayloadAction<EarningSurpriseItemType[]>,
		) => {
			state.earningSurprise = action.payload;
		},
		setIsFetchingAC: (state: SearchState, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		setPlaylists: (state: SearchState, action) => {
			state.playlists = action.payload;
		},
		setPlaylistsMore: (state, action) => {
			if (state.playlists) {
				state.playlists = [...state.playlists, ...action.payload];
			} else {
				state.playlists = action.payload;
			}
		},
		setPlaylistsToCategory: (state, action) => {
			if (state.playlists) {
				state.playlists = updatePlaylistsInCategory(
					state,
					action.payload.response.playlists,
					action.payload.id,
					action.payload.response.currentPage,
				);
			}
		},
		setPlaylistExtendedDataAC: (
			state: SearchState,
			action: PayloadAction<PlaylistExtendedDataItemType[]>,
		) => {
			state.playlistExtendedData = action.payload;
		},
		setPlaylistExtendedDescriptionAC: (state: SearchState, action: PayloadAction<string>) => {
			state.playlistExtendedDescription = action.payload;
		},
		setIsSearchScreen: (state: SearchState, action) => {
			state.isSearchScreen = action.payload;
		},
		setPlaylistExtendedInfoAC: (
			state: SearchState,
			action: PayloadAction<{
				playlistExtendedTitle: string;
				playlistExtendedImage: string;
			}>,
		) => {
			state.playlistExtendedImage = action.payload.playlistExtendedImage;
			state.playlistExtendedTitle = action.payload.playlistExtendedTitle;
		},
		setFinancialStatementAC: (state: SearchState, action: PayloadAction<FinancialsItemType[]>) => {
			state.financialStatement = action.payload;
		},
		companyDescriptionPlaylistsAC: (
			state: SearchState,
			action: PayloadAction<PlaylistItemDataType[]>,
		) => {
			state.companyDescriptionPlaylists = action.payload;
		},
	},
});

export const {
	setSearchResults,
	setSearchResultsMore,
	setCompanyDescriptionAC,
	setEarningSurpriseAC,
	setIsFetchingAC,
	setPlaylists,
	setPlaylistsMore,
	setPlaylistsToCategory,
	setPlaylistExtendedDataAC,
	setPlaylistExtendedDescriptionAC,
	setPlaylistExtendedInfoAC,
	setFinancialStatementAC,
	setIsSearchScreen,
	companyDescriptionPlaylistsAC,
} = searchSlice.actions;

// thunks

export const getSearchResults = createAsyncThunk(
	"SV/SEARCH/getSearchResults",
	async (payload: TickerI, { dispatch, rejectWithValue }) => {
		const { isLoadMore } = payload;

		try {
			if (!isLoadMore) {
				dispatch(setIsFetchingAC(true));
			}
			const res = await searchAPI.getSearchResultsCall(payload);

			if (res.searchTickerResponseList) {
				if (isLoadMore) {
					dispatch(setSearchResultsMore(res.searchTickerResponseList));

					return !isLoadMore && dispatch(setIsFetchingAC(false));
				} else {
					dispatch(setSearchResults(res.searchTickerResponseList));

					return !isLoadMore && dispatch(setIsFetchingAC(false));
				}
			} else {
				dispatch(setIsFetchingAC(false));

				return console.log("Ops...");
			}
		} catch (err) {
			dispatch(setIsFetchingAC(false));

			return rejectWithValue(err.payload);
		}
	},
);

export const setCompanyDescriptionTC = createAsyncThunk(
	"SV/SEARCH/setCompanyDescriptionTC",
	async (payload: TickerI, { dispatch, rejectWithValue }) => {
		dispatch(setIsFetchingAC(true));
		try {
			const { ticker } = payload;

			const resFirst = await searchAPI.getFirstDescriptionElement(ticker);

			dispatch(setCompanyDescriptionAC(resFirst.companyDescription));

			const resLast = await searchAPI.getLastDescriptionElement(ticker);

			dispatch(setCompanyDescriptionAC(resLast.companyDescription));
			dispatch(setFinancialStatementAC(resLast.financialStatement));
			dispatch(setEarningSurpriseAC(resLast.earningSurprise));
			await dispatch(companyDescriptionPlaylistsAC(resLast.companyDescriptionPlaylists));
		} catch (err) {
			console.log("Error setCompanyDescriptionTC");

			return rejectWithValue(err.payload);
		}
		dispatch(setIsFetchingAC(false));
	},
);

export const getPlaylists = createAsyncThunk(
	"SV/SEARCH/getPlaylists",
	async (
		payload: { page: number; pageLimit: number; playlistLimit: number; isLoadMore?: boolean },
		{ dispatch, rejectWithValue },
	) => {
		try {
			dispatch(setIsFetchingAC(true));
			const { page, pageLimit, playlistLimit, isLoadMore } = payload;
			const response = await searchAPI.getPlaylists({ page, pageLimit, playlistLimit });

			if (isLoadMore) {
				dispatch(setPlaylistsMore(response.categories));
			} else {
				dispatch(setPlaylists(response.categories));
			}
			dispatch(setIsFetchingAC(false));
		} catch (e) {
			dispatch(setIsFetchingAC(false));
			console.log("Error " + e);

			return rejectWithValue(e.payload);
		}
	},
);
export const getPlaylistsById = createAsyncThunk(
	"SV/SEARCH/getPlaylistsById",
	async (
		payload: { id: number; pageLimit: number; page: number },
		{ dispatch, rejectWithValue },
	) => {
		try {
			const { id, page, pageLimit } = payload;
			const response = await searchAPI.getPlaylistsById({ page, pageLimit, id });

			dispatch(setPlaylistsToCategory({ response, id }));
		} catch (e) {
			dispatch(setIsFetchingAC(false));
			console.log("Error " + e.data, e.response);

			return rejectWithValue(e.payload);
		}
	},
);

export const getPlaylistExtendedDataTC = createAsyncThunk(
	"SV/SEARCH/getPlaylistExtendedDataTC",
	async (payload: PlaylistExtendedDataI, { dispatch, rejectWithValue }) => {
		try {
			const { playlistId, playlistExtendedTitle, playlistExtendedImage } = payload;

			dispatch(setIsFetchingAC(true));
			const response = await searchAPI.getPlaylistsItems(playlistId);

			dispatch(
				setPlaylistExtendedInfoAC({
					playlistExtendedTitle,
					playlistExtendedImage,
				}),
			);
			dispatch(setPlaylistExtendedDataAC(response.tickers));
			dispatch(setPlaylistExtendedDescriptionAC(response.description));
		} catch (err) {
			console.log("Error:", err);

			return rejectWithValue(err.payload);
		} finally {
			dispatch(setIsFetchingAC(false));
		}
	},
);

interface TickerI {
	ticker: string;
	page?: number;
	pageLimit?: number;
	isLoadMore?: boolean;
}

interface PlaylistExtendedDataI {
	playlistId: number;
	playlistExtendedTitle: string;
	playlistExtendedImage: string;
}
