import { AxiosInstance, AxiosRequestConfig } from "axios";
import SInfo from "react-native-sensitive-info";

import { navigate } from "../routes/RootNavigation";

export const baseUrl = "https://application.insave.io/";
export const polygonUrlV2 = "https://api.polygon.io/v2/";

type UpdateTokenType = (argument: { token: string; tokenType: string }) => Promise<{token: string; type: string; refreshToken: string} | void>;

export const linkInterceptorsHelper = async (instance: AxiosInstance, updateToken: UpdateTokenType) => {

	instance.interceptors.request.use(interceptorRequestHelper);

	instance.interceptors.response.use(
		(config) => config,
		async (error) => {
			const originalRequest = error.config;

			if (error.response.status === 401 && error.config && !error.config._isRetry) {
				originalRequest._isRetry = true;
				try {
					const tokenType = await SInfo.getItem("tokenType", {});
					const refreshTokenUser = await SInfo.getItem("refreshToken", {});
					const response = await updateToken({ token: refreshTokenUser, tokenType });

					if (response) {
						const { token, type, refreshToken } = response;

						await SInfo.setItem("token", token, {});
						await SInfo.setItem("tokenType", type, {});
						await SInfo.setItem("refreshToken", refreshToken, {});

					}

					return await instance.request(originalRequest);

				} catch (e: any) {
					if (e.response.data.message === "JWT is expired") {
						navigate("AuthenticationStack", { screen: "LoginScreen" });
					}
					console.log("Error interceptor response");
				}
			}
		},
	);
};

export const interceptorRequestHelper = async (config: AxiosRequestConfig) => {
	const tokenType = await SInfo.getItem("tokenType", {});
	const token = await SInfo.getItem("token", {});

	if (token) {
		config.headers.Authorization = `${tokenType} ${token}`;

	}

	return config;

};
