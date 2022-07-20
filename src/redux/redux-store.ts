import { configureStore, Middleware } from "@reduxjs/toolkit";

import { counterSlice } from "./counterSlice";
import { userSlice } from "./userSlice";
import { searchSlice } from "./searchSlice";
import { chartSlice } from "./chartSlice";
import { feedSlice } from "./feedSlice";
import { scrollableSlice } from "./scrollableSlice";
import { walletSlice } from "./walletSlice";
import { walletSlice as walletSliceNew } from "./walletSliceNew";
import { userSearchSlice } from "../entity/user-search";
import { chatSlice } from "./chatSlice";
import { userFinanceSlice } from "../entity/chart-terminal/model";
import { bottomSheetSlice } from "../entity/bottom-sheet";

const middlewareList: Middleware[] = [];

if (__DEV__) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const createFlipperDebugger = require("redux-flipper").default;

	middlewareList.push(createFlipperDebugger());
}

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		chart: chartSlice.reducer,
		SearchScreenR: searchSlice.reducer,
		counterSlice: counterSlice.reducer,
		feed: feedSlice.reducer,
		scrollable: scrollableSlice.reducer,
		wallet: walletSlice.reducer,
		finance: userFinanceSlice.reducer,
		walletNew: walletSliceNew.reducer,
		userSearch: userSearchSlice.reducer,
		chat: chatSlice.reducer,
		bottomSheet: bottomSheetSlice.reducer
	},
	middleware: (getDefaultMiddleware) => middlewareList.length ? getDefaultMiddleware().concat(middlewareList) : getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
