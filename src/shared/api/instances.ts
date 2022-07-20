import axios from "axios";

import { authAPI } from "../../api/auth-api";
import { linkInterceptorsHelper } from "./interceptors";

export const BASE_URL = "https://application.insave.io/";
export const MARKET_DATA_URL = "in-10-fbzvu.ondigitalocean.app/api";

export const basicInstance = axios.create({
	baseURL: BASE_URL,
});

const authorizedInstance = axios.create({ baseURL: BASE_URL });

console.log("check: ", authAPI.updateToken);
// linkInterceptorsHelper(authorizedInstance, authAPI.updateToken);

export { authorizedInstance };

export const marketData = {
	v1: { instance: axios.create({ baseURL: `${MARKET_DATA_URL}/v1` }) },
};
