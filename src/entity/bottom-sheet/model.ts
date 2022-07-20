import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpenTerminal: false,
	isOpenChartConfiguration: false,
	isOpenPostSettings: false,
	isOpenWorkInProgress: false,
	isOpenLogOut: false,
	isOpenSharePost: false,
};

export const bottomSheetSlice = createSlice({
	name: "bottom-sheet",
	initialState,
	reducers: {
		setIsOpenTerminal: (state, { payload }) => {
			state.isOpenTerminal = payload;
		},
		setIsOpenChartConfiguration: (state, { payload }) => {
			state.isOpenChartConfiguration = payload;
		},
		setIsOpenPostSettings: (state, { payload }) => {
			state.isOpenPostSettings = payload;
		},
		setIsOpenWorkInProgress: (state, { payload }) => {
			state.isOpenWorkInProgress = payload;
		},
		setIsOpenLogOut: (state, { payload }) => {
			state.isOpenLogOut = payload;
		},
		setIsOpenSharePost: (state, { payload }) => {
			state.isOpenSharePost = payload;
		}
	},
});

export const {
	setIsOpenTerminal,
	setIsOpenChartConfiguration,
	setIsOpenPostSettings,
	setIsOpenWorkInProgress,
	setIsOpenLogOut,
	setIsOpenSharePost
} = bottomSheetSlice.actions;
