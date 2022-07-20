import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

import { TabRouting } from "./TabRouting";
import { AuthenticationStack } from "../screens/AuthenticationStack/AuthenticationStack";
import { ModalScreen } from "../screens/ModalScreen/ModalScreen";
import { ModalReport } from "../screens/ModalReport/ModalReport";
import { ArticleExtended } from "../components/ArticleExtended/ArticleExtended";
import { WriteScreen } from "../screens/WriteScreen/WriteScreen";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { authMe } from "../redux/userSlice";
import { TokenWallet } from "../screens/TokenWallet/TokenWallet";
import { ScreenLock } from "../screens/ScreenLock/ScreenLock";
import { GifScreen } from "../screens/GifScreen/GifScreen";
import { HistoryScreen } from "../screens/HistoryScreen/HistoryScreen";
import { ScreenLockEnter } from "../screens/ScreenLock/ScreenLockEnter";
import { SuccessVerificationScreen } from "../screens/SuccessVerificationScreen/SuccessVerificationScreen";
import { DepositScreen } from "../screens/DepositScreen/DepositScreen";
import { SecurityScreen } from "../screens/SecurityScreen/SecurityScreen";
import { AccountEdit } from "../screens/AcconuntEdit/AccountEdit";
import { CryptoSelectorScreen } from "../screens/CryptoSelectorScreen/CryptoSelectorScreen";
import { CryptoWithdrawScreen } from "../screens/CryptoWithdrawScreen/CryptoWithdrawScreen";
import { Account } from "../components/Account/Account";
import { SecurityCodeOnTransactionScreen } from "../screens/SecurityCodeOnTransactionScreen/SecurityCodeOnTransactionScreen";
import { SuccessWithdrawScreen } from "../screens/SuccessWithdrawScreen/SuccessWithdrawScreen";
import { UserSearchScreen } from "../screens/UserSearchScreen/UserSearchScreen";
import { TransferScreen } from "../screens/TransferScreen/TransferScreen";
import { SuccessTransferScreen } from "../screens/SuccessTransferScreen/SuccessTransferScreen";
import { ErrorTransferScreen } from "../screens/ErrorTransferScreen/ErrorTransferScreen";
import { VerificationScreen } from "../screens/VerificationScreen/VerificationScreen";
import { ChatScreen } from "../screens/ChatScreen/ChatScreen";
import { AccessTypeSelection } from "../screens/AccessTypeSelection/AccessTypeSelection";

const Stack = createStackNavigator();

export type RootStackParamList = {
	Home: undefined;
	Wallet: undefined;
	Portfolio: undefined;
	AuthenticationStack: undefined;
	TabRouting: undefined;
	ResetPassword: undefined;
	Registration: undefined;
	ArticleExtended: undefined;
	SearchScreen: undefined;
	RegistrationScreen: undefined;
	ResetPasswordScreen: undefined;
	FeedScreen: undefined;
	PlaylistExtended: undefined;
	WriteScreen: {
		userId: number | null;
	};
};

export const Routing = () => {
	const dispatch = useAppDispatch();
	const isLogged = useAppSelector((state) => state.user.isLogin);

	useEffect(() => {
		dispatch(authMe());
	}, [dispatch]);

	useEffect(() => {
		if (isLogged) {
			// dispatch(getCryptoCurrencyRate({ currency: NameCryptoRate.BTC }));
			// dispatch(getCryptoCurrencyRate({ currency: NameCryptoRate.ETH }));

		}
	}, [isLogged]);

	return (
		<Container>
			<Stack.Navigator
				screenOptions={ {
					headerShown: false,
					cardStyle: { backgroundColor: "transparent" },
					cardOverlayEnabled: true,
					cardStyleInterpolator: ({ current: { progress } }) => ({
						overlayStyle: {
							opacity: progress.interpolate({
								inputRange: [0, 0],
								outputRange: [0, 0],
								extrapolate: "clamp",
							}),
						},
					}),
				} }
				initialRouteName={ "ScreenLockEnter" }
			>
				<Stack.Screen name="TabRouting" component={ TabRouting } />
				<Stack.Screen name="AuthenticationStack" component={ AuthenticationStack } />
				<Stack.Screen name="AccessTypeSelection" component={ AccessTypeSelection } />
				<Stack.Screen name="HistoryScreen" component={ HistoryScreen } />
				<Stack.Screen name="WriteScreen" component={ WriteScreen } />
				<Stack.Screen name="ModalScreen" component={ ModalScreen } />
				<Stack.Screen name="ModalReport" component={ ModalReport } />
				<Stack.Screen name="ArticleExtended" component={ ArticleExtended } />
				<Stack.Screen name="GifScreen" component={ GifScreen } />
				<Stack.Screen name="Account" component={ Account } />
				<Stack.Screen name="ChatScreen" component={ ChatScreen } />
				<Stack.Screen name="TokenWallet" component={ TokenWallet } />
				<Stack.Screen name="ScreenLockEnter" component={ ScreenLockEnter } />
				<Stack.Screen name="ScreenLock" component={ ScreenLock } />
				<Stack.Screen name="VerificationScreen"	component={ VerificationScreen } />
				<Stack.Screen name="SuccessVerificationScreen" component={ SuccessVerificationScreen } />
				<Stack.Screen name="DepositScreen" component={ DepositScreen } />
				<Stack.Screen name="WithdrawScreen" component={ CryptoWithdrawScreen } />
				<Stack.Screen name="SecurityScreen" component={ SecurityScreen } />
				<Stack.Screen name="AccountEdit" component={ AccountEdit } />
				<Stack.Screen name="CryptoSelector" component={ CryptoSelectorScreen } />
				<Stack.Screen
					name="SecurityCodeOnTransactionScreen"
					component={ SecurityCodeOnTransactionScreen }
				/>
				<Stack.Screen name="SuccessWithdrawScreen" component={ SuccessWithdrawScreen } />
				<Stack.Screen name="UserSearchScreen" component={ UserSearchScreen } />
				<Stack.Screen name="TransferScreen" component={ TransferScreen } />
				<Stack.Screen name="SuccessTransferScreen" component={ SuccessTransferScreen } />
				<Stack.Screen name="ErrorTransferScreen" component={ ErrorTransferScreen } />
			</Stack.Navigator>
			{/* {isOpenChartConfiguration && (
				<ChartConfiguration />
			)}
			{isOpenTerminal && (
				<ChartTerminal />
			)}
			{isOpenWorkInProgress && (
				<WorkInProgress />
			)}
			{isOpenPostSettings && (
				<PostSettings />
			)}
			{isOpenSharePost && (
				<SharePost />
			)} */}
		</Container>
	);
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;
