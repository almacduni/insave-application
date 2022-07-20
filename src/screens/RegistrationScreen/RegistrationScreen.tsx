import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ErrorOption, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { debounce } from "debounce";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";

import { checkEmail, getCurrentUserInfo, sendActivationCode, signUp } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { userAPI } from "../../api/user-api";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { FillingLine } from "../../components/FillingLine/FillingLine";
import { ILoginResponse, RegistrationFormType } from "../../types/commonTypes";
import { RegistrationStep1 } from "./registration-step-1";
import { RegistrationStep2 } from "./registration-step-2";
import { RegistrationStep3 } from "./registration-step-3";
import { CONTENT_WIDTH, SCREEN_WIDTH } from "../../constants/sizes";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import { ButtonBack, WithSafeArea } from "../../shared/ui";

type RegistrationScreenPropsType = {
	navigation: any;
};

//FIXME: fix types
export interface SignUpForm extends RegistrationFormType {
	password: string;
	passwordRepeat: string;
}

export const RegistrationScreen: React.FC<RegistrationScreenPropsType> = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const isFetching = useAppSelector((state) => state.user.isFetching);
	const MAX_STEPS = 4;
	const [step, setStep] = useState<number>(1);
	const sharedTranslateX = useSharedValue(0);
	const [isFailed, setIsFailed] = useState(false);
	const { control, errors, setError, reset, getValues, trigger, watch } = useForm<SignUpForm>({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const passwordValue = watch("password");
	const passwordRepeatValue = watch("passwordRepeat");
	const emailValue = watch("email");
	const [securityCode, setSecurityCode] = useState("");

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sharedTranslateX.value }]
	}), []);

	const handleSetStep = (page: number) => {
		setStep(page);
	};

	function handleChangePage (page: number) {
		sharedTranslateX.value = withTiming(-SCREEN_WIDTH * (page - 1), {
			duration: 500,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}, (status) => {
			if (status) {
				runOnJS(handleSetStep)(page);
			}
		});

	}

	async function checkForNextStep (
		values: SignUpForm,
		setFieldError: (name: keyof SignUpForm, error: ErrorOption) => void,
	) {
		switch (step) {
		case 1:
			const isEmailExist = await dispatch(checkEmail(values.email));

			if (isEmailExist.payload) {
				setFieldError("email", {
					type: "manual",
					message: "Email is already in use",
				});

				return false;
			}

			return true;
		case 2:
			const user = {
				email: values.email,
				password: values.password,
			};

			await	dispatch(sendActivationCode(user));

			return true;
		case 3:
			return true;
		default:
			return true;
		}
	}

	async function handlerOnSubmitBtn () {
		const isNextStepAllowed = await checkForNextStep(getValues(), setError);

		if (isNextStepAllowed) {
			if (step === 3) {
				handleSubmitInput();
			} else {
				handleChangePage(step + 1);
			}
		}
	}

	function checkIsDisabled (): boolean | undefined {
		const valuesInputs = getValues();

		if (valuesInputs.email) {
			switch (step) {
			case 1:
				return !/\S+@\S+\.\S+/.test(valuesInputs.email) || Boolean(errors.email?.message);

			case 2:
				return (
					(!valuesInputs.password.length && !valuesInputs.passwordRepeat.length) ||
						valuesInputs.password !== valuesInputs.passwordRepeat
				);
			case 3:
				return securityCode.length !== 6;
			default:
				return true;
			}
		}

		return true;
	}

	async	function handleSubmitInput () {
		try {
			const registrationResponse = await dispatch(
				signUp({
					data: getValues(),
					activationCode: securityCode,
					navigation,
					setIsFailed,
					onResetForm,
				}),
			);

			if (registrationResponse.payload) {
				const { token, tokenType } = registrationResponse.payload as ILoginResponse;

				dispatch(getCurrentUserInfo({ userToken: token, tokenType: tokenType }));
				navigation.navigate("TabRouting");
			} else {
				setIsFailed(true);
			}
		} catch (error) {
			setIsFailed(true);
		}

	}

	function onResetForm () {
		setStep(1);
		reset({ password: "" });
		setSecurityCode("");
	}

	//TODO: Move to slice
	const onEmailChange = debounce(async () => {

		const result = await trigger("email");

		if (result) {
			try {
				const error: string | undefined = await userAPI.checkEmailInput(getValues("email"));

				if (error) {
					return setError("email", { message: "Email is already in use", type: "email" });
				}
			} catch (error) {
				console.log("onEmailChange error in registration screen", error);
			}
		}
	}, 500);

	function onHandleBack () {
		if (step === 1) {
			navigation.goBack();

			return;
		}

		handleChangePage(step - 1);
	}
	function checkSubmitTitle () {
		if (step !== 1 && isFetching) {
			return "Loading";
		}

		return "Continue";
	}

	function renderSubmitButton () {
		const isDisabled = checkIsDisabled();

		return (
			<SubmitBtn primary={ !isDisabled } disabled={ isDisabled } onPress={ handlerOnSubmitBtn }>
				<SubmitTitle primary>
					{checkSubmitTitle()}
				</SubmitTitle>
			</SubmitBtn>
		);
	}

	const styles = StyleSheet.create({
		viewPager: {
			width: SCREEN_WIDTH * MAX_STEPS,
			flexDirection: "row",
		},
		keyboardAvoid: {
			paddingTop: verticalScale(12)
		},
	});

	return (
		<WithSafeArea>
			<KeyboardAvoid style={ styles.keyboardAvoid }>
				<HeaderBlock>
					<ButtonBack onPress={ onHandleBack } title="Back" />
				</HeaderBlock>
				<FillingLine step={ step } totalSteps={ MAX_STEPS } />
				<Wrapper>
					<Animated.View style={ [styles.viewPager, animatedStyle] }>
						<ScreenView width={ SCREEN_WIDTH }>
							<RegistrationStep1
								control={ control }
								currentStep={ step }
								error={ errors.email }
								errorMessage={ errors.email?.message }
								onChangeInput={ onEmailChange }
								handleSubmit={ handlerOnSubmitBtn }
							/>
						</ScreenView>
						<ScreenView width={ SCREEN_WIDTH }>
							<RegistrationStep2
								control={ control }
								currentStep={ step }
								error={ errors.password }
								password={ passwordValue }
								passwordRepeat={ passwordRepeatValue }
							/>
						</ScreenView>
						<ScreenView width={ SCREEN_WIDTH }>
							<RegistrationStep3
								currentStep={ step }
								email={ emailValue }
								password={ passwordValue }
								securityCode={ securityCode }
								setSecurityCode={ setSecurityCode }
								isFailed={ isFailed }
								setIsFailed={ setIsFailed }
							/>
						</ScreenView>
					</Animated.View>
					<ContainerBtn contentWidth={ CONTENT_WIDTH }>{renderSubmitButton()}</ContainerBtn>
				</Wrapper>
			</KeyboardAvoid>
		</WithSafeArea>

	);
};

const Wrapper = styled.View`
	flex: 1;
	justify-content: space-between;
`;

const ScreenView = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`};
`;

const ContainerBtn = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`};
`;

const HeaderBlock = styled.TouchableOpacity`
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
	color: rgba(3, 6, 29, 0.4);
`;

const SubmitBtn = styled.TouchableOpacity<{
	primary?: boolean;
	secondary?: boolean;
	disabled?: boolean;
}>`
	height: ${verticalScale(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ primary }) => primary ? "#566AEC" : "rgba(86, 106, 236, 0.5)"};
	margin-bottom: ${verticalScale(16)}px;
`;

const SubmitTitle = styled(ButtonWrapper)<{
	primary?: boolean;
	secondary?: boolean;
}>`
	color: #FFF;
`;
