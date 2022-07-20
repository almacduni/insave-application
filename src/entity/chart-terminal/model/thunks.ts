import { createAsyncThunk } from "@reduxjs/toolkit";

import { createCryptoOrder } from "../../../shared/api/finance";
import { CryptoOrder } from "../../../shared/model";
import { setIsFetching } from "./slice";

export const createOrder = createAsyncThunk(
	"user/search/searchUsers",
	async (
		payload: CryptoOrder,
		{ dispatch },
	) => {
		try {
			dispatch(setIsFetching(true));
			await createCryptoOrder(payload);

			dispatch(setIsFetching(false));
		} catch (e) {
			dispatch(setIsFetching(false));
			console.log("Error createOrder", e);
		}
	},
);
