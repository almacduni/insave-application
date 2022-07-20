import { store } from "../redux/redux-store";

type AuthenticationCheckType = (
	authenticatedFlow: () => any | void,
	titleAlert: string | null,
	navigation: any,
	screen?: string,
	parameters?: object,
) => any;

export const authenticationCheck: AuthenticationCheckType = (
	authenticatedFlow,
	titleAlert,
	navigation,
	screen = "",
	parameters,
) => {
	let isLogged = store.getState().user.isLogin;

	store.subscribe(() => {
		isLogged = store.getState().user.isLogin;
	});

	if (!isLogged) {
		return navigation.navigate("AuthenticationStack", { screen, ...parameters });
	}

	return authenticatedFlow
		&& authenticatedFlow();
};
