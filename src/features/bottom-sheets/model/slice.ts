import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpenTerminal: false,
	isOpenChartConfiguration: false
};

export const bottomSheetsSlice = createSlice({
	name: "bottom-sheet",
	initialState,
	reducers: {
		setIsOpenTerminal: (state, { payload }) => {
			state.isOpenTerminal = payload;
		},
		setIsOpenChartConfiguration: (state, { payload }) => {
			state.isOpenChartConfiguration = payload;
		}
	},
});

export const {
	setIsOpenTerminal,
	setIsOpenChartConfiguration
} = bottomSheetsSlice.actions;
