import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ImagePickerResponse } from "react-native-image-picker";
import SInfo from "react-native-sensitive-info";

import {
	authAPI,
	AuthParamsType,
	ChangeEmailType,
	CheckUsernameType,
	SendActivationCodeType,
	SendKYC,
	SendSecurityCredsType,
	SendSecurityEmailType,
} from "../api/auth-api";
import { userAPI } from "../api/user-api";
import {
	HistoryType,
	RegistrationFormType,
	PerformanceType,
	FinancialAssetsType,
} from "../types/commonTypes";
import { WATCH_LIST_FIELD } from "./chartSlice";

export enum IsFirstEntranceEnum {
	true = "YES",
	false = "NO",
}

export const initialState = {
	userId: null as number | null,
	username: null as string | null,
	userBalance: null as number | null,
	referralLink: null as string | null,
	isFirstEntrance: IsFirstEntranceEnum.false,
	email: null as string | null,
	portfolio: {
		performance: null as PerformanceType | null,
		financialAssets: null as FinancialAssetsType | null,
	},
	history: [] as HistoryType[],
	isLogin: false,
	isFetching: false,
	errorMessage: null as string | null,
	isLoginSuccessfully: null as string | null,
	bio: null as string | null,
	avatar: null as string | null,
	statusVerification: "NOT_VERIFIED",
};

type UserState = typeof initialState;

export const fetchUserBalance = createAsyncThunk(
	"user/fetchUserBalance",
	async (userId: UserState["userId"]) => {
		if (userId) {
			await userAPI.getWallet(userId);
		}
	},
);

export const fetchHistory = createAsyncThunk(
	"user/fetchHistory",
	async (userId: UserState["userId"]) => {
		if (userId) {
			await userAPI.getHistory(userId);
		}
	},
);
export const fetchPortfolio = createAsyncThunk(
	"user/fetchPortfolio",
	async (userId: UserState["userId"]) => {
		if (userId) {
			await userAPI.getPortfolio(userId);
		}
	},
);
export const fetchFoundAccountMock = createAsyncThunk(
	"user/fetchFoundAccountMock",
	async (userId: UserState["userId"]) => {
		if (userId) {
			const foundAccountMock = await userAPI.foundAccountMock(userId);

			return foundAccountMock.userBalance;
		}
	},
);
export const sendActivationCode = createAsyncThunk(
	"user/sendActivationCode",
	async (user: SendActivationCodeType, { dispatch }) => {
		try {
			setIsFetching(true);
			await authAPI.sendActivationCode(user);
		} catch (e) {
			console.log("Error sendActivationCode", e);
		} finally {
			dispatch(setIsFetching(false));

		}
	},
);

export const sendSecurityCode = createAsyncThunk(
	"user/sendSecurityCode",
	async (user: SendSecurityCredsType, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsFetching(true));
			const resp = await authAPI.sendSecurityCode(user);

			if (!resp) return rejectWithValue(false);

			return true;
		} catch (e) {
			console.log("response error sendSecurityCode");

			return rejectWithValue(false);
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const sendSecurityCodeEmail = createAsyncThunk(
	"user/sendSecurityCodeEmail",
	async (user: SendSecurityEmailType, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			await authAPI.sendSecurityCodeEmail(user);

		} catch (e) {
			if (e.response) {
				console.log("Error sendSecurityCodeEmail");

				return e.response.data;
			}
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const getEmail = createAsyncThunk(
	"user/getEmail",
	async ({ username }: { username: string }, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsFetching(true));
			const response = await authAPI.getEmail({ username });

			if (!response) return rejectWithValue(false);

			return response;
		} catch (e) {
			console.log("Error getEmail");

			return rejectWithValue(false);
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const changePassword = createAsyncThunk(
	"user/changePassword",
	async (payload: { userId: number; password: string }, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const { userId, password } = payload;

			await authAPI.changePassword(userId, password);
		} catch (e) {
			console.log("Error:", e);
		}
	},
);
export const checkEmail = createAsyncThunk(
	"user/checkEmail",
	async (email: string, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const response = await authAPI.checkEmail(email);

			return response;
		} catch (e) {
			console.log("Error checkEmail", e);

			return e.response.data;
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const changeEmail = createAsyncThunk(
	"user/changeEmail",
	async (changeEmailData: ChangeEmailType, { dispatch }) => {
		try {
			console.log("payload", changeEmailData);
			dispatch(setIsFetching(true));
			await authAPI.changeEmail(changeEmailData);
		} catch (e) {
			console.log("ERROR: ", JSON.stringify(e.response.data, null, 2));
			dispatch(setErrorMessage(e.response.data));

			return e.response.data;
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const checkReferralCode = createAsyncThunk(
	"user/checkReferralCode",
	async (code: string, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));

			const res = await userAPI.checkReferralCode(code);

			if (!res) {
				return await Promise.reject(false);
			}

			return await Promise.resolve(true);
		} catch (e: any) {
			console.log("ERROR: checkReferralCode");
			dispatch(setErrorMessage(e.response.data));

			return e.response.data;
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const sendKYC = createAsyncThunk("feed/sendKYC", async (payload: SendKYC, { dispatch }) => {
	try {
		dispatch(setIsFetching(true));
		const {
			city,
			postcode,
			streetAddress,
			date,
			firstName,
			lastName,
			pictures,
			documentType,
		} = payload;

		await userAPI.sendKYC(
			city,
			postcode,
			streetAddress,
			date,
			firstName,
			lastName,
			pictures,
			documentType,
		);
		dispatch(setStatusVerification("PENDING"));
		await SInfo.setItem("stateVerification", "PENDING", {});

	} catch (err) {
		console.error(err);
	} finally {
		dispatch(setIsFetching(false));
	}
});

export const checkUsername = createAsyncThunk(
	"user/checkUsername",
	async (username: CheckUsernameType, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const response = await authAPI.checkUsername(username);

			return response;
		} catch (e) {
			return e.response.data;
		} finally {
			dispatch(setIsFetching(false));
		}
	},
);

export const setStateBio = createAsyncThunk(
	"user/setStateBio",
	async ({ bio, userId }: { bio: string; userId: number }) => {
		try {
			await authAPI.setBio({ bio, userId });
		} catch (e) {
			console.log(e);
		}
	},
);

export const authMe = createAsyncThunk("user/auth", async (_, { dispatch }) => {
	try {
		dispatch(setIsFetching(true));
		const username = await SInfo.getItem("username", {});
		const token = await SInfo.getItem("token", {});
		const tokenType = await SInfo.getItem("tokenType", {});
		const userId = await SInfo.getItem("userId", {});
		const referralLink = await SInfo.getItem("referralLink", {});
		const securityPassword = await SInfo.getItem("securityPassword", {});
		const statusVerification = await SInfo.getItem("stateVerification", {});
		const bio = await SInfo.getItem("bio", {});
		const avatar = await SInfo.getItem("avatar", {});
		const email = await SInfo.getItem("email", {});
		const isFirstEntrance = await SInfo.getItem("isFirstEntrance", {});

		console.log("username: ", username);
		console.log("token: ", token);
		console.log("type: ", tokenType);
		console.log("userId: ", userId);
		console.log("referralLink: ", referralLink);
		console.log("securityPassword", securityPassword);
		console.log("statusVerification", statusVerification);
		console.log("bio", bio);
		console.log("email", email);
		console.log("isFirstEntrance", isFirstEntrance);
		if (!!token && !!tokenType && !!username && !!userId && !!referralLink) {
			dispatch(setStatusLogin(true));
			dispatch(setUserId(+userId));
			dispatch(setBio({ bio }));
			dispatch(setUsername({ username }));
			dispatch(setReferralLink(referralLink));
			dispatch(setEmail({ email }));
			dispatch(setAvatar({ avatar }));
			dispatch(setStatusVerification(statusVerification));
		}
		dispatch(setIsFirstEntrance(isFirstEntrance));
		dispatch(setIsFetching(false));
	} catch (e) {
		console.log("Error " + e);
		dispatch(setIsFetching(false));
	}
});

export const login = createAsyncThunk(
	"user/login",
	async ({ user, activationCode, onResetForm }: ILogin, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const res = await authAPI.auth({ ...user }, activationCode);

			if (res) {
				const { token, type, refreshToken } = res;

				await SInfo.setItem("token", token, {});
				await SInfo.setItem("tokenType", type, {});
				await SInfo.setItem("isFirstEntrance", IsFirstEntranceEnum.true, {});
				await SInfo.setItem("refreshToken", refreshToken, {});

				dispatch(setErrorMessage(null));
				dispatch(setStatusLogin(true));
				onResetForm();

				return { token, tokenType: type };
			}
		} catch (e) {
			dispatch(setIsLoginSuccessfully("Unauthorized"));
			dispatch(setErrorMessage("Username or password is incorrect"));
			console.log("Error user/login");
		} finally {
			dispatch(setIsFetching(false));
		}
	}
);

export const getCurrentUserInfo = createAsyncThunk(
	"user/getCurrentUserInfo",
	async ({ userToken, tokenType }: GetInfoUserData, { dispatch }) => {
		try {
			const response = await authAPI.getUserInformation({ token: userToken, tokenType });
			const { username, id, referralLink, email, bio, verified, avatarLink } = response;

			if (avatarLink) {
				await SInfo.setItem("avatar", avatarLink, {});
				dispatch(setAvatar({ avatar: avatarLink }));

			}
			await SInfo.setItem("username", username, {});
			await SInfo.setItem("email", email, {});
			await SInfo.setItem("userId", `${id}`, {});
			await SInfo.setItem("referralLink", referralLink, {});
			await SInfo.setItem("isFirstEntrance", IsFirstEntranceEnum.true, {});
			await SInfo.setItem("stateVerification", verified, {});
			if (avatarLink) {
				await SInfo.setItem("avatar", avatarLink, {});
				dispatch(setAvatar({ avatar: avatarLink }));

			}
			if (bio) {
				await SInfo.setItem("bio", bio, {});
				dispatch(setBio({ bio }));
			}
			dispatch(setStatusLogin(true));
			dispatch(setIsFetching(false));
			dispatch(setStatusVerification(verified));
			dispatch(setUserId(id));
			dispatch(
				setUsername({
					username,
				}),
			);
			dispatch(setEmail({ email }));
			dispatch(setReferralLink(referralLink));

		} catch (e) {
			console.log("Error getCurrentUserInfo", e);
		}
	},
);
export const signUp = createAsyncThunk(
	"user/signUp",
	async ({ data, activationCode, navigation, setIsFailed, onResetForm }: ISignUp, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const res = await authAPI.signUp(data, activationCode);

			if (res) {
				const { refreshToken, token, type } = res;

				await SInfo.setItem("token", token, {});
				await SInfo.setItem("tokenType", type, {});
				await SInfo.setItem("isFirstEntrance", IsFirstEntranceEnum.true, {});
				await SInfo.setItem("refreshToken", refreshToken, {});

				dispatch(setErrorMessage(null));
				dispatch(setStatusLogin(true));
				dispatch(setIsFetching(false));
				onResetForm();

				return { token, tokenType: type };
			}

		} catch (e) {
			dispatch(setIsFetching(false));
			console.log("Error signUpTC");
			setIsFailed(true);
		}
	},
);

export const resetPassword = createAsyncThunk(
	"user/resetPassword",
	async (payload: { email: string }, { dispatch }) => {
		dispatch(setIsFetching(true));
		try {
			await authAPI.resetPassword(payload);

			dispatch(setIsFetching(false));

		} catch (err) {
			console.log("Error resetPassword", err);
			dispatch(setIsFetching(false));

		}
	},
);

interface IUpdateBio {
	username: string;
	bio: string;
	image: ImagePickerResponse;
	userId: null | number;
}

export const updateBio = createAsyncThunk(
	"user/updateBio",
	async ({ username, image, bio, userId }: IUpdateBio, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			await userAPI.updateUserInfo({ username, bio, userId });
			await SInfo.setItem("username", username, {});
			await SInfo.setItem("bio", bio, {});
			dispatch(setUsername({ username }));
			dispatch(setBio({ bio }));
			dispatch(setIsFetching(false));
		} catch (e) {
			dispatch(setIsFetching(false));
			console.log(e);
		}
	},
);

export const updateAvatar = createAsyncThunk(
	"user/updateAvatar",
	async (payload: any, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			// await userAPI.updateUserAvatar(payload);
			if (payload?.data?.assets[0]?.uri) {
				dispatch(setAvatar({ avatar: payload.data.assets[0].uri }));
				await SInfo.setItem("avatar", payload.data.assets[0].uri, {});
			}
			dispatch(setIsFetching(false));
		} catch (e) {
			dispatch(setIsFetching(false));
			console.log("Error updateAvatar", e);
		}
	},
);

export const logOut = createAsyncThunk("user/logout", async (_, { dispatch }) => {
	await SInfo.setItem("username", "", {});
	await SInfo.setItem("token", "", {});
	await SInfo.setItem("tokenType", "", {});
	await SInfo.setItem("userId", "", {});
	await SInfo.setItem("email", "", {});
	await SInfo.setItem("bio", "", {});
	await SInfo.setItem("avatar", "", {});
	await SInfo.setItem("referralLink", "", {});
	// await SInfo.setItem("securityPassword", "", {});
	await SInfo.setItem("stateVerification", "", {});

	await SInfo.deleteItem(WATCH_LIST_FIELD, {});
	dispatch(setStatusLogin(false));
});

export const getPortfolio = createAsyncThunk(
	"user/portfolio",
	async (_, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const portfolio = await userAPI.getPortfolio();

			dispatch(setPortfolio(portfolio));

			dispatch(setIsFetching(false));
		} catch (e) {
			console.error("Protfolio error: ", e);
			dispatch(setIsFetching(false));
		}
	},
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserId: (state, { payload }) => {
			state.userId = payload;
		},

		setBio: (state, { payload }) => {
			state.bio = payload.bio;
		},

		setAvatar: (state, { payload }) => {
			state.avatar = payload.avatar;
		},

		setEmail: (state, { payload }) => {
			state.email = payload.email;
		},

		setUsername: (state, { payload }) => {
			state.username = payload.username;
		},
		setIsFetching: (state, { payload }) => {
			state.isFetching = payload;
		},
		setStatusVerification: (state, { payload }) => {
			state.statusVerification = payload;
		},
		setIsLoginSuccessfully: (state, { payload }) => {
			state.isLoginSuccessfully = payload;
		},
		setStatusLogin: (state, { payload }) => {
			state.isLogin = payload;
		},
		setErrorMessage: (state, { payload }) => {
			state.errorMessage = payload;
		},
		setIsFirstEntrance: (state, { payload }) => {
			state.isFirstEntrance = payload;
		},

		setReferralLink: (state, { payload }) => {
			state.referralLink = payload;
		},

		setPortfolio: (state, { payload }) => {
			state.portfolio = payload;
		},
	},
	extraReducers: (builder) => {
		// USER HISTORY
		builder.addCase(fetchUserBalance.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(fetchUserBalance.fulfilled, (state, { payload }: any) => {
			state.userBalance = payload;
			state.isFetching = false;
		});
		builder.addCase(fetchUserBalance.rejected, (state, { payload }: any) => {
			console.log("Error in FETCH_USER_BALANCE: ", payload.message);
			state.isFetching = false;
		});

		//USER HISTORY
		builder.addCase(fetchHistory.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(fetchHistory.fulfilled, (state, { payload }: any) => {
			state.history = [...payload];
			state.isFetching = false;
		});
		builder.addCase(fetchHistory.rejected, (state, { payload }: any) => {
			console.log("Error FETCH_HISTORY: ", payload.message);
			state.isFetching = false;
		});

		// FETCH PORTFOLIO
		builder.addCase(fetchPortfolio.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(fetchPortfolio.fulfilled, (state, { payload }: any) => {
			state.portfolio.performance = { ...payload.performance };
			state.portfolio.financialAssets = [...payload.financialAssets];
			state.isFetching = false;
		});
		builder.addCase(fetchPortfolio.rejected, (state, { payload }: any) => {
			console.log("Error FETCH_PORTFOLIO: ", payload.message);
			state.isFetching = false;
		});

		// FETCH PORTFOLIO
		builder.addCase(fetchFoundAccountMock.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(fetchFoundAccountMock.fulfilled, (state, { payload }) => {
			state.userBalance = payload;
			state.isFetching = false;
		});
		builder.addCase(fetchFoundAccountMock.rejected, (state, { payload }) => {
			console.log("Error FETCH_FUND_ACCOUNT: ", payload);
			state.isFetching = false;
		});

		// SEND ACTIVATION CODE
		builder.addCase(sendActivationCode.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(sendActivationCode.rejected, (state, { payload }) => {
			console.log("Error SEND_ACTIVATION_CODE: ", payload);
			state.isFetching = false;
		});

		// LOG OUT
		builder.addCase(logOut.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(logOut.fulfilled, (state) => {
			state.isLogin = false;
			state.userId = null;
			state.username = null;
			state.userBalance = 0;
			state.referralLink = "";
			state.history = [];
			state.portfolio.performance = null;
			state.portfolio.financialAssets = null;
		});
		builder.addCase(logOut.rejected, (state, { payload }) => {
			console.log("Error LOG_OUT: ", payload);
			state.isFetching = false;
		});
	},
});

interface ILogin {
	user: AuthParamsType;
	activationCode: string;
	onResetForm: () => void;
}

interface ISignUp {
	data: RegistrationFormType;
	activationCode: string;
	navigation: any;
	setIsFailed: (isFailed: boolean) => void;
	onResetForm: () => void;
}
interface GetInfoUserData {
	userToken: string;
	tokenType: string;
}

export const {
	setBio,
	setAvatar,
	setEmail,
	setUserId,
	setStatusVerification,
	setUsername,
	setStatusLogin,
	setIsFetching,
	setIsLoginSuccessfully,
	setErrorMessage,
	setIsFirstEntrance,
	setReferralLink,
	setPortfolio,
} = userSlice.actions;
