import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	beginPosition: 0 as number,
	offsetY: 0 as number,
};

type ScrollableState = typeof initialState;

export const scrollableSlice = createSlice({
	name: "scrollable",
	initialState,
	reducers: {
		setBeginPosition: (state: ScrollableState, { payload }) => {
			state.beginPosition = payload;
		},
		setOffsetY: (state: ScrollableState, { payload }) => {
			state.offsetY = payload;
		},
	},
});

export const { setBeginPosition, setOffsetY } = scrollableSlice.actions;
