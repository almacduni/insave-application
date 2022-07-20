import { createAsyncThunk } from "@reduxjs/toolkit";

import { setIsFetchUsersList, setFoundUsersList, setToEndFoundUsersList, setTotal } from "./slice";
import { searchAPI } from "../../../api/search-api";

export const searchUsers = createAsyncThunk(
	"user/search/searchUsers",
	async (
		{ searchLine, offset, limit }: { searchLine: string; offset: number; limit: number },
		{ dispatch, rejectWithValue },
	) => {
		try {
			dispatch(setIsFetchUsersList(true));
			const users = await searchAPI.searchUsersByUsernameOrEmail(searchLine, offset, limit);

			if (offset === 0) {
				dispatch(setFoundUsersList(users.foundUsers));
				dispatch(setTotal(users.total));
			} else {
				dispatch(setToEndFoundUsersList(users.foundUsers));
			}
			dispatch(setIsFetchUsersList(false));
		} catch (e) {
			dispatch(setIsFetchUsersList(false));

			return rejectWithValue(e);
		}
	},
);
