import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FoundUser } from "./types";

const initialState = {
	searchLine: "",
	foundUsersList: [] as FoundUser[],
	selectedUser: null as FoundUser | null,
	isFetchUsersList: false,
	total: 0,
};

type UserSearchState = typeof initialState;

export const userSearchSlice = createSlice({
	name: "user/search/slice",
	initialState,
	reducers: {
		setSearchLine: (state: UserSearchState, action: PayloadAction<string>) => {
			state.searchLine = action.payload;
		},
		setFoundUsersList: (state: UserSearchState, action: PayloadAction<FoundUser[]>) => {
			state.foundUsersList = action.payload;
		},
		setToEndFoundUsersList: (state: UserSearchState, action: PayloadAction<FoundUser[]>) => {
			state.foundUsersList = [...state.foundUsersList, ...action.payload];
		},
		setIsFetchUsersList: (state: UserSearchState, action: PayloadAction<boolean>) => {
			state.isFetchUsersList = action.payload;
		},
		setSelectedUser: (state: UserSearchState, action: PayloadAction<{ index: number }>) => {
			state.selectedUser = state.foundUsersList[action.payload.index];
		},
		removeSelectedUser: (state: UserSearchState) => {
			state.selectedUser = null;
		},
		setTotal: (state: UserSearchState, action: PayloadAction<number>) => {
			state.total = action.payload;
		},
	},
});

export const {
	setFoundUsersList,
	setToEndFoundUsersList,
	setIsFetchUsersList,
	setSelectedUser,
	setTotal,
	setSearchLine,
	removeSelectedUser,
} = userSearchSlice.actions;
