import { AxiosInstance, AxiosRequestConfig } from "axios";
import SInfo from "react-native-sensitive-info";

import { navigate } from "../../routes/RootNavigation";

export async function linkInterceptorsHelper (instance: AxiosInstance, updateToken: any) {
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
					const { token, type, refreshToken } = response;

					await SInfo.setItem("token", token, {});
					await SInfo.setItem("tokenType", type, {});
					await SInfo.setItem("refreshToken", refreshToken, {});

					return await instance.request(originalRequest);
				} catch (e: any) {
					if (e.response.data === "JWT is expired") {
						navigate("LoginScreen", { screen: "LoginScreen" });
					}
					console.log("Error interceptor response");
				}
			}
		},
	);
}

export async function interceptorRequestHelper (config: AxiosRequestConfig) {
	const tokenType = await SInfo.getItem("tokenType", {});
	const token = await SInfo.getItem("token", {});

	config.headers.Authorization = `${tokenType} ${token}`;

	return config;
}
