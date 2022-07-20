import React, { FC, useCallback, useEffect, useState } from "react";
import { Linking, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import SInfo from "react-native-sensitive-info";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { CustomKeyboard } from "../../components/CustomKeyboard/CustomKeyBoard";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TopBar } from "../../components/TopBar/TopBar";
import { IsFirstEntranceEnum } from "../../redux/userSlice";
import { RESTORE_PASSWORD_URL } from "../../constants/urls";
import { WithSafeArea } from "../../shared/ui";

type ScreenLock = {
	navigation: any;
	route: any;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isAllInputReady = (password: string[]) => password.every((item) => typeof item === "number");

const checkPassword = async (
	password: string[],
	secondPassword: string[] | string,
	showSecondPass?: boolean,
	setShowSecondPass?: (showSecondPass: boolean) => void,
): Promise<boolean> => {
	const arrayToString = password.join("");
	const secondArrayToString =
		typeof secondPassword === "string" ? secondPassword : secondPassword.join("");

	if (setShowSecondPass) setShowSecondPass(true);

	return secondArrayToString === arrayToString;
};

const PasswordItems: FC<{
	enterPassword?: string[];
}> = ({ enterPassword }) => {
	const BooleanEnterArrayPassword: boolean[] | undefined = enterPassword?.map(
		(item: string | number) => {
			if (item === 0) return true;
			else return !!item;
		},
	);

	return (
		<Wrapper>
			{enterPassword &&
				BooleanEnterArrayPassword?.map((item: boolean, index) => <PasswordDot key={ index } hasValue={ item } />)}
		</Wrapper>
	);
};

export const ScreenLockEnter: FC<ScreenLock> = ({ route }) => {
	const getPasswordSecur = useCallback(async () => {
		const passwordSecurity = await SInfo.getItem("securityPassword", {});
		const isFirstEntrance = await SInfo.getItem("isFirstEntrance", {});
		const initialUrl = await Linking.getInitialURL();

		if (!passwordSecurity && initialUrl && initialUrl.includes(RESTORE_PASSWORD_URL)) {
			navigation.navigate("AuthenticationStack", { screen: "LoginScreen" });

			return;
		}

		if (isFirstEntrance === IsFirstEntranceEnum.true) {
			if (!passwordSecurity && !isEditing) {
				navigation.navigate("TabRouting");
			}
		} else {
			navigation.navigate("AccessTypeSelection");
		}
	}, []);

	getPasswordSecur();
	const [enterPassword, setEnterPassword] = useState<string[]>(["", "", "", ""]);

	console.log("ENter password", enterPassword);
	const navigation = useNavigation();
	const [enterStep, setEnterStep] = useState<number>(0);
	const [securityPassword, setSecurityPassword] = useState<string>("");
	const [isEditing, setIsEditing] = useState(false);
	const getPassword = async () => {
		const passwordUser = await SInfo.getItem("securityPassword", {});

		console.log("security", passwordUser);
		setSecurityPassword(passwordUser);
	};

	getPassword();
	const onEnterSecPass = (value: string) => {
		if (enterStep === enterPassword.length) return;

		const clonedPasswordSecur = [...enterPassword];

		clonedPasswordSecur[enterStep] = value;
		setIsEditing(true);
		setEnterPassword([...clonedPasswordSecur]);
		setEnterStep(enterStep + 1);
	};

	const onDeleteSecurityPass = () => {
		if (enterStep === 0) return setEnterStep(0);

		const clonedPassword = [...enterPassword];

		clonedPassword[enterStep - 1] = "";
		setIsEditing(true);
		setEnterPassword([...clonedPassword]);
		setEnterStep(enterStep - 1);
	};
	const translate = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translate.value }],
	}));

	useEffect(() => {
		const passwordChecker = async () => {
			if (isAllInputReady(enterPassword)) {
				if (await checkPassword(enterPassword, securityPassword)) {
					if (route?.params?.nextScreen) {
						navigation.navigate("SecurityScreen", {
							screen: route?.params?.nextScreen,
							params: { isPassCode: route?.params?.isPassCode },
						});
					} else {
						navigation.navigate("TabRouting");
					}

					setEnterPassword((prev) => prev.map(() => ""));
					setEnterStep(0);

					return;
				}
				translate.value = withSequence(
					withTiming(0, { duration: 500 }),
					withTiming(-10, { duration: 50 }),
					withRepeat(withTiming(0, { duration: 100 }), 3, true),
					withTiming(0, { duration: 50 }),
				);
				setEnterStep(0);
				await delay(500);
				setEnterPassword((prev) => prev.map(() => ""));
			}
		};

		passwordChecker();
	}, [enterPassword, route]);

	return (
		<WithSafeArea>
			{route?.params?.nextScreen ? (
				<TopBar
					title={ "Passcode Lock" }
					backButtonTitle={ "Cancel" }
					navigation={ navigation }
					goBack={ () => navigation.navigate("SecurityScreen") }
				/>
			) : (
				<></>
			)}
			<Container>
				{!!securityPassword && (
					<>
						<ScreenTitle>Enter a password</ScreenTitle>
						<Animated.View style={ [styles.view, animatedStyle] }>
							<PasswordItems { ...{ enterPassword } } />
						</Animated.View>
						<CustomKeyboard
							onConfirmationCodeChange={ onEnterSecPass }
							onConfirmationCodeDelete={ onDeleteSecurityPass }
						/>
					</>
				)}
			</Container>
		</WithSafeArea>
	);
};

const styles = StyleSheet.create({
	view: {
		marginBottom: "auto",
		marginLeft: "auto",
		marginRight: "auto",
	},
});

const Container = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 12px 0 ${verticalScale(30)}px;
`;

const Wrapper = styled.View`
	flex-direction: row;
	margin-bottom: auto;
	width: ${scale(112)}px;
	justify-content: space-between;
	align-items: center;
`;

const ScreenTitle = styled(Animated.Text)`
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	margin-top: 180px;
	text-align: center;
	margin-bottom: ${verticalScale(24)}px;
`;

const PasswordDot = styled.View<{ hasValue?: boolean }>`
	width: ${scale(16)}px;
	height: ${scale(16)}px;
	border: ${scale(1)}px solid #03061d;
	border-radius: ${scale(8)}px;
	background-color: ${({ hasValue }) => (hasValue ? "#03061d" : "transparent")};
`;
