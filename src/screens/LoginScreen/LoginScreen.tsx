import React, { useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ErrorOption, useForm } from "react-hook-form";
import SInfo from "react-native-sensitive-info";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
	login,
	sendSecurityCode,
	getEmail,
	IsFirstEntranceEnum,
	getCurrentUserInfo,
} from "../../redux/userSlice";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { CONTENT_WIDTH, SCREEN_WIDTH } from "../../constants/sizes";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import { LoginStep1 } from "./login-step-1";
import { LoginStep2 } from "./login-step-2";
import { ILoginResponse } from "../../types/commonTypes";
import { ButtonBack, WithSafeArea } from "../../shared/ui";
import { PasswordTypeSelection } from "../../features/password-type-selection";

type RegistrationScreenPropsType = {
	navigation: any;
	route: any;
};

export type SignInForm = {
	usernameOrEmail: string;
	password: string;
};

export type ConfirmationCodeType = {
	id: number;
	value: number | string;
	active: boolean;
};

export const LoginScreen: React.FC<RegistrationScreenPropsType> = ({
	navigation,
	route,
}: RegistrationScreenPropsType) => {
	const MAX_STEPS = 2;
	const dispatch = useAppDispatch();
	const isFetching = useAppSelector((state) => state.user.isFetching);
	const [step, setStep] = useState(0);
	const [isFailed, setIsFailed] = useState(false);
	const [isOpenRestorePassword, setIsOpenRestorePassword] = useState(false);
	const [emailUser, setEmailUser] = useState("");
	const [securityCode, setSecurityCode] = useState("");
	const sharedTranslateX = useSharedValue(0);
	const { control, errors, setError, getValues, reset } = useForm<SignInForm>({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	async function isUserLogged () {
		const result = await SInfo.getItem("isFirstEntrance", {});

		if (result === IsFirstEntranceEnum.true) {
			return true;
		}

		return false;
	}

	function handleSetStep (page: number) {
		setStep(page);
	}

	function handleChangePage (page: number) {
		sharedTranslateX.value = withTiming(-SCREEN_WIDTH * page, {
			duration: 500,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}, (status) => {
			if (status) {
				runOnJS(handleSetStep)(page);
			}
		});

	}

	async function checkForNextStep (
		values: SignInForm,
		setFieldError: (name: keyof SignInForm, error: ErrorOption) => void
	) {
		switch (step) {
		case 0:
			let user;

			if (/\S+@\S+\.\S+/.test(values.usernameOrEmail)) {
				user = {
					email: values.usernameOrEmail,
					password: values.password,
				};

				setEmailUser(values.usernameOrEmail);
			} else {
				const username = values.usernameOrEmail;

				user = {
					username,
					password: values.password,
				};

				try {
					const email = await dispatch(getEmail({ username: username }));

					if (!email.payload) {
						setFieldError("usernameOrEmail", {
							type: "manual",
							message: "Check username",
						});

						return false;
					} else {
						user = {
							...user,
							email: email.payload
						};
						setEmailUser(email.payload);
					}
				} catch (error) {
					setFieldError("usernameOrEmail", {
						type: "manual",
						message: "Check username",
					});

					return false;
				}
			}

			try {
				const securityCodeResponse = await dispatch(sendSecurityCode(user));

				if (securityCodeResponse.payload) {

					return true;
				}

				setFieldError("usernameOrEmail", {
					type: "manual",
					message: "Check the password or username",
				});
				setFieldError("password", {
					type: "manual",
					message: "",
				});

				return false;
			} catch (e) {
				console.log("error response code");
				setFieldError("usernameOrEmail", {
					type: "manual",
					message: "Check the password or username",
				});
				setFieldError("password", {
					type: "manual",
					message: "",
				});

				return false;
			}
		case 1:
			return true;
		}
	}

	async function handleOnPressSubmitBtn () {
		const isNextStepAllowed = await checkForNextStep(getValues(), setError);

		if (isNextStepAllowed) {
			if (step === 1) {
				handleSubmit();
			} else {
				handleChangePage(step + 1);

			}
		}
	}

	function checkIsDisabled (): boolean {
		const valuesInputs = getValues();

		if (valuesInputs.usernameOrEmail) {
			switch (step) {
			case 0:
				return !valuesInputs.password.length || !valuesInputs.usernameOrEmail.length;
			case 1:
				return securityCode.length !== 6;
			}
		}

		return true;
	}

	async function handleSubmit () {
		const values = getValues();
		let user;

		if (/\S+@\S+\.\S+/.test(values.usernameOrEmail)) {
			user = {
				email: values.usernameOrEmail,
				password: values.password,
			};
		} else {
			user = {
				username: values.usernameOrEmail,
				password: values.password,
			};
		}
		try {
			const loginResponse = await dispatch(
				login({
					user: user,
					activationCode: securityCode,
					onResetForm,
				})
			);

			if (loginResponse.payload) {
				Keyboard.dismiss();
				navigation.navigate("ScreenLock");

				const { token, tokenType } = loginResponse.payload as ILoginResponse;

				dispatch(getCurrentUserInfo({ userToken: token, tokenType: tokenType }));
			} else {
				setIsFailed(true);
			}
		} catch (error) {
			setIsFailed(true);
		}

	}

	function onResetForm () {
		setStep(0);
		reset({ usernameOrEmail: "", password: "" });
		setSecurityCode("");
	}

	function checkerForBtnBack () {
		if (step === 0) {
			if (route.params?.isPushToUp) {
				navigation.navigate("TabRouting");

				return;
			}
			if (!!isUserLogged() && !route.params) {
				navigation.navigate("TabRouting");
			} else {
				navigation.goBack();
			}
		} else {
			handleChangePage(step - 1);
		}
	}
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sharedTranslateX.value }]
	}), []);

	const checkSubmitTitle = () => {
		if (isFetching) {
			return "Loading";
		}

		return "Log In";
	};

	function renderSubmitButton () {
		const isDisabled = checkIsDisabled();

		return (
			<>
				<SubmitBtn primary={ !isDisabled } disabled={ isDisabled } onPress={ handleOnPressSubmitBtn }>
					<SubmitTitle>
						{checkSubmitTitle()}
					</SubmitTitle>
				</SubmitBtn>
				{step === 0 && !!isUserLogged() && (
					<LinkToSignUpWrapper>
						<LinkText>Don`t have an account?</LinkText>
						<LinkToSignUp
							onPress={ () => navigation.navigate("RegistrationScreen") }
						>
							<LinkTextActive>Sign Up</LinkTextActive>
						</LinkToSignUp>
					</LinkToSignUpWrapper>
				)}
			</>
		);
	}
	const styles = StyleSheet.create({
		viewPager: {
			width: SCREEN_WIDTH * MAX_STEPS,
			flexDirection: "row",
		},
		keyboardAvoid: {
			paddingTop: verticalScale(12),

		},
	});

	return (
		<WithSafeArea>
			<KeyboardAvoid style={ styles.keyboardAvoid }>
				<HeaderBlock>
					<ButtonBack onPress={ checkerForBtnBack } title="Back"/>
				</HeaderBlock>

				<Wrapper>
					<Animated.View style={ [styles.viewPager, animatedStyle] }>

						<ScreenView width={ SCREEN_WIDTH }>
							<LoginStep1
								control={ control }
								navigation={ navigation }
								currentStep={ step }
								usernameOrEmailError={ errors.usernameOrEmail }
								passwordError={ errors.password }
								usernameErrorMessage={ errors.usernameOrEmail?.message }
								passwordErrorMessage={ errors.password?.message }
								handleSubmit={ handleOnPressSubmitBtn }
								setIsOpenRestorePassword={ setIsOpenRestorePassword }
							/>
						</ScreenView>
						<ScreenView width={ SCREEN_WIDTH }>
							<LoginStep2
								currentStep={ step }
								securityCode={ securityCode }
								isFailed={ isFailed }
								emailUser={ emailUser }
								setIsFailed={ setIsFailed }
								setSecurityCode={ setSecurityCode }
								getValues={ getValues }
								handleSubmit={ handleOnPressSubmitBtn }
							/>
						</ScreenView>
					</Animated.View>
				</Wrapper>
				<Container width={ CONTENT_WIDTH }>{renderSubmitButton()}</Container>
			</KeyboardAvoid>
			{isOpenRestorePassword && (
				<PasswordTypeSelection setIsOpenRestorePassword={ setIsOpenRestorePassword } navigation={ navigation } />
			)}
		</WithSafeArea>
	);
};

const Container = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`};
`;

const ScreenView = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`};
`;

const Wrapper = styled.View`
	flex: 1;
	justify-content: space-between;
`;

const HeaderBlock = styled.View`
	margin-bottom: ${verticalScale(10)}px;
	align-self: flex-start;
`;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #fff;
`;

const SubmitBtn = styled.TouchableOpacity<{
	primary?: boolean;
	disabled?: boolean;
}>`
	height: ${verticalScale(48)}px;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ primary, disabled }) => {
		if (primary) {
			return "#566AEC";
		}
		if (disabled) {
			return "rgba(86, 106, 236, 0.5)";
		}
	}};
	margin-bottom: ${verticalScale(16)}px;
`;

const SubmitTitle = styled(ButtonWrapper)``;

const LinkToSignUpWrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: auto;
	margin-bottom: ${verticalScale(15)}px;
	z-index: 0;
`;

const LinkText = styled.Text`
	font-size: ${scale(17)}px;
	letter-spacing: 0.5px;
	color: #03061d;
`;

const LinkToSignUp = styled.TouchableOpacity`
	justify-content: flex-end;
	margin-left: 6px;
`;

const LinkTextActive = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	letter-spacing: 0.25px;
	color: #566aec;
`;
