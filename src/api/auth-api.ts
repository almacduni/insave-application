import { Moment } from "moment";
import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";

const guestInstance = axios.create({
	baseURL: baseUrl,
});

const instance = axios.create({
	baseURL: baseUrl,
});

if (linkInterceptorsHelper) {
	linkInterceptorsHelper(instance, updateToken);
}

//api
export async function auth (
	{ email, username, password }: AuthParamsType,
	securityCode: string
): Promise<{ token: string; refreshToken: string; type: string } | void> {
	try {
		const response = await guestInstance.post(`api/auth/sign-in?securityCode=${securityCode}`, {
			email,
			username,
			password,
		});

		return response.data;
	} catch (e) {
		console.log("Error auth");
	}
}

export async function updateToken ({ token, tokenType }: { token: string; tokenType: string }) {
	const response = await axios.post(`${baseUrl}api/auth/token/refresh`, null, {
		headers: {
			Authorization: `${tokenType} ${token}`,
		},
	});

	return response.data;
}

export async function getUserInformation ({ token, tokenType }: { token: string; tokenType: string }) {
	try {
		const response = await guestInstance.get(`user/current`, {
			headers: {
				Authorization: `${tokenType} ${token}`,
			},
		});

		return response.data;
	} catch (e) {
		console.log("Error getUserInformation");
	}
}

export async function checkCurrentPassword ({ userId, password }: { userId: number; password: string }) {
	try {
		const response = await instance.post(`user/${userId}/password/check`, {
			password,
		});

		return response.data;
	} catch (e) {
		console.log("Error checkCurrentPassword");

		return e;
	}
}

export async function changeEmail ({ userId, code }: ChangeEmailType) {
	try {
		const response = await instance.patch(
			`user/${userId}/${code}/email/change`
		);

		return response.data;
	} catch (e) {
		console.log("Error changeEmail");
	}
}

export async function getEmail ({ username }: { username: string }) {
	try {
		const response = await instance.get(`api/auth/${username}/email`);

		return response.data;
	} catch (e) {
		console.log("Error getEmail");
	}
}

export async function setBio ({ bio, userId }: { bio: string; userId: number }) {
	try {
		await instance.post(`user/${userId}/bio`, {
			bio,
		});
	} catch (e) {
		console.log("Error setBio");
	}
}

export async function sendActivationCode (user: SendActivationCodeType) {
	try {
		await guestInstance.post("api/auth/send-activation-code", user);
	} catch (e) {
		console.log("Error sendActivationCode");
	}
}

export async function sendSecurityCodeEmail ({
	userId,
	email,
}: {
	userId: number | null;
	email: string;
}) {
	try {
		return await instance.post(`user/${userId}/email/code`, {
			email,
		});
	} catch (e) {
		console.log("Error sendSecurityCodeEmail");
	}
}

export async function signUp (
	user: SendActivationCodeType,
	activationCode: string,
): Promise<{ token: string; refreshToken: string; type: string } | void> {
	try {
		const response = await guestInstance.post<{ token: string; refreshToken: string; type: string }>(
			`api/auth/sign-up?activationCode=${activationCode}`,
			{
				...user,
			},
		);

		return response.data;
	} catch (e) {
		console.log("Error signUp");
	}
}

export async function sendSecurityCode (user: AuthParamsType) {
	try {
		return await guestInstance.post("api/auth/send-security-code", {
			...user,
		});
	} catch (e) {
		console.log("Error sendSecurityCode");
	}
}

export async function changePassword (userId: number, password: string) {
	try {
		const response = await instance.patch(`user/${userId}/password/change`, {
			password,
		});

		return response.data;
	} catch (e) {
		console.error("Error changePassword");
	}
}

export async function resetPassword (payload: {email: string}) {
	const response = await instance.post("user/password/restore", payload);

	return response;
}

export async function checkEmail (email: string) {
	const response = await instance.post("api/auth/email/check", { email });

	return response.data;
}

export async function checkUsername (username: CheckUsernameType) {
	await instance.post("api/auth/check-username", { username });
}

export const authAPI = {
	auth,
	updateToken,
	getUserInformation,
	checkCurrentPassword,
	changeEmail,
	getEmail,
	setBio,
	sendActivationCode,
	sendSecurityCodeEmail,
	signUp,
	sendSecurityCode,
	changePassword,
	resetPassword,
	checkEmail,
	checkUsername
};

//types
export type AuthParamsType = {
	username?: string;
	email?: string;
	password: string;
};
export type TokenType = {
	token: string;
};

export type ChangeEmailType = {
	userId: number;
	code: number | string;
};

export type CheckUsernameType = {
	username: string;
};

export type SendKYC = {
	address: string;
	city: string;
	postcode: string;
	streetAddress: string;
	date: string | Moment;
	firstName: string;
	lastName: string;
	pictures: string[];
	documentType: string;
};

export type SendActivationCodeType = {
	email: string;
	password: string;
};

export type SendSecurityCredsType = {
	username?: string;
	email?: string;
	password: string;
};

export type SendSecurityEmailType = {
	userId: number | null;
	email: string;
};

export type SignUpCreds = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	username: string;
	id: string;
	token: string;
	tokenType: string;
};
