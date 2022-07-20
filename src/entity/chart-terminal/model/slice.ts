import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFetching: false
};

export const userFinanceSlice = createSlice({
	name: "user/finance",
	initialState,
	reducers: {
		setIsFetching: (state, { payload }) => {
			state.isFetching = payload;
		}
	},
});

export const {
	setIsFetching
} = userFinanceSlice.actions;
