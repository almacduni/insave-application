import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import SInfo from "react-native-sensitive-info";
import styled from "styled-components/native";

import { CustomKeyboard } from "../../components/CustomKeyboard/CustomKeyBoard";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TopBar } from "../../components/TopBar/TopBar";
import { WithSafeArea } from "../../shared/ui";

type ScreenLock = {
	navigation: any;
	route: any;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isAllInputReady = (password: string[]) =>
	password.every((pass) => typeof pass === "number");

const checkPassword = async (
	password: string[],
	secondPassword: string[] | string,
	setShowSecondPass?: (showSecondPass: boolean) => void,
): Promise<boolean> => {
	const arrayToString = password.join("");
	const secondArrayToString =
		typeof secondPassword === "string" ? secondPassword : secondPassword.join("");

	if (setShowSecondPass) setShowSecondPass(true);

	return secondArrayToString === arrayToString;
};

const PasswordItems: FC<{
	password?: string[];
	secondPassword?: string[];
	enterPassword?: string[];
}> = ({ password, secondPassword, enterPassword }) => {
	const BooleanArrayPassword: boolean[] | undefined = password?.map((item: string | number) => {
		if (item === 0) return true;
		else return !!item;
	});
	const BooleanSecArrayPassword: boolean[] | undefined = secondPassword?.map(
		(item: string | number) => {
			if (item === 0) return true;
			else return !!item;
		},
	);
	const BooleanEnterArrayPassword: boolean[] | undefined = enterPassword?.map(
		(item: string | number) => {
			if (item === 0) return true;
			else return !!item;
		},
	);

	return (
		<Wrapper>
			{password && BooleanArrayPassword?.map((item: boolean, index) => <PasswordDot key={ index } hasValue={ item } />)}
			{secondPassword &&
				BooleanSecArrayPassword?.map((item: boolean, index) => <PasswordDot key={ index } hasValue={ !!item } />)}
			{enterPassword &&
				BooleanEnterArrayPassword?.map((item: boolean, index) => <PasswordDot key={ index } hasValue={ item } />)}
		</Wrapper>
	);
};

export const SecurityPasswordScreen: FC<ScreenLock> = ({ navigation }) => {
	const [password, setPassword] = useState<string[]>(["", "", "", ""]);
	const [secondPassword, setSecondPassword] = useState<string[]>(["", "", "", ""]);
	const [step, setStep] = useState(0);
	const [secStep, setSecStep] = useState<number>(0);
	const [showSecondPass, setShowSecondPass] = useState(false);
	const [securityPassword, setSecurityPassword] = useState<string>("");
	const getPassword = async () => {
		const passwordUser = await SInfo.getItem("securityPassword", {});

		console.log("security", passwordUser);
		setSecurityPassword(passwordUser);
	};

	getPassword();
	console.log("PASSWORD  SECURITY", securityPassword, typeof securityPassword);
	const onEnter = (value: string) => {
		if (step === password.length) return;

		const clonedPassword = [...password];

		clonedPassword[step] = value;
		setPassword([...clonedPassword]);
		setStep(step + 1);
	};
	const onEnterRepeat = (value: string) => {
		if (secStep === secondPassword.length) return;

		const clonedPasswordSec = [...secondPassword];

		clonedPasswordSec[secStep] = value;
		setSecondPassword([...clonedPasswordSec]);
		setSecStep(secStep + 1);
	};
	const onDelete = () => {
		if (step === 0) return setStep(0);

		const clonedPassword = [...password];

		clonedPassword[step - 1] = "";
		setPassword([...clonedPassword]);
		setStep(step - 1);
	};
	const onDeleteSec = () => {
		if (secStep === 0) return setSecStep(0);

		const clonedPassword = [...secondPassword];

		clonedPassword[secStep - 1] = "";
		setSecondPassword([...clonedPassword]);
		setSecStep(secStep - 1);
	};
	const translate = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translate.value }],
	}));

	useEffect(() => {
		const passwordChecker = async () => {
			if (isAllInputReady(password)) {
				if (await checkPassword(password, secondPassword, setShowSecondPass)) {
					const resultPassword = password.join("");

					await SInfo.setItem("securityPassword", resultPassword, {});
					navigation.navigate("SuccessChangeScreen");
				}

				if (showSecondPass)
					if (secStep === 4) {
						translate.value = withSequence(
							withTiming(0, { duration: 500 }),
							withTiming(-10, { duration: 50 }),
							withRepeat(withTiming(0, { duration: 100 }), 3, true),
							withTiming(0, { duration: 50 }),
						);
						setSecStep(0);
						await delay(500);
						setSecondPassword((prev) => prev.map(() => ""));
					}
			}
		};

		passwordChecker();
	}, [navigation, password, secStep, secondPassword, showSecondPass, translate]);

	return (
		<WithSafeArea>
			<Container>
				<TopBar
					navigation={ navigation }
					title={ "Passcode Lock" }
					backButtonTitle={ "Cancel" }
					goBack={ () => {
						navigation.goBack();
					} }
				/>
				{!showSecondPass && (
					<>
						<ScreenTitle>Set a password</ScreenTitle>
						<Animated.View style={ [styles.view, animatedStyle] }>
							<PasswordItems { ...{ password } } />
						</Animated.View>
						<CustomKeyboard onConfirmationCodeChange={ onEnter } onConfirmationCodeDelete={ onDelete } />
					</>
				)}
				{showSecondPass && (
					<>
						<ScreenTitle>Repeat a password</ScreenTitle>
						<Animated.View style={ [styles.view, animatedStyle] }>
							<PasswordItems { ...{ secondPassword } } />
						</Animated.View>
						<CustomKeyboard
							onConfirmationCodeChange={ onEnterRepeat }
							onConfirmationCodeDelete={ onDeleteSec }
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
	padding: ${verticalScale(0)}px 0 40px;
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
	margin-top: ${verticalScale(180)}px;
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
