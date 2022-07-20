import React, { useState } from "react";
import {
	StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";

import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import { FillingLine } from "../../components/FillingLine/FillingLine";
import { sendKYC } from "../../redux/userSlice";
import { SendKYC } from "../../api/auth-api";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { CONTENT_WIDTH, SCREEN_WIDTH } from "../../constants/sizes";
import { VerificationStep1 } from "./verification-step-1";
import { VerificationStep2 } from "./verification-step-2";
import { VerificationStep3 } from "./verification-step-3";
import { VerificationStep4 } from "./verification-step-4";
import { VerificationStep5 } from "./verification-step-5";
import { ButtonBack } from "../../shared/ui";

export type UriImage = {
	uri: string;
};

export const VerificationScreen: React.FC = ({ navigation }: any) => {
	const MAX_STEPS = 6;
	const userId = useAppSelector((state) => state.user.userId);
	const [step, setStep] = useState(1);
	const dispatch = useAppDispatch();
	const [verificationType, setVerificationType] = useState("");
	const { control, getValues } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const sharedTranslateX = useSharedValue(0);

	const [imageList, setImageList] = useState<UriImage[]>([]);

	function handleSetStep (page: number) {
		setStep(page);
	}

	const handleChangePage = (page: number) => {
		setStep(page);
		sharedTranslateX.value = withTiming(-SCREEN_WIDTH * (page - 1), {
			duration: 500,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}, (status) => {
			if (status) {
				runOnJS(handleSetStep)(page);
			}
		});
	};

	const buildPictures = (values: Array<UriImage>) => values.map((item) => item.uri);
	const handlePressBtn = async () => {
		if (step === 5) {
			onSubmitInput();

			return;
		}
		handleChangePage(step + 1);

	};

	const checkIsDisabled = (): boolean | undefined => {
		const valuesInputs = getValues();

		if (valuesInputs.firstName) {
			switch (step) {
			case 1:
				return valuesInputs.firstName.length === 0 || valuesInputs.lastName.length === 0;
			case 2:
				return false;
			case 3:
				return (
					valuesInputs.streetAddress.length === 0 ||
						valuesInputs.postalCode.length === 0 ||
						valuesInputs.city.length === 0
				);
			case 4:
				return true;
			case 5:
				return imageList.length === 0;
			default:
				return true;
			}
		}

		return true;
	};

	function handlePressBack () {
		if (step === 1) {
			navigation.goBack();

			return;
		}

		handleChangePage(step - 1);
	}
	const onSubmitInput = () => {
		const values = getValues();
		const pictures = buildPictures(imageList);
		const address = `${values.city}  ${values.streetAddress}  ${values.postalCode}`;
		let documentType;

		if (verificationType === "Driver's License") {
			documentType = "DRIVER_LICENSE";
		} else if (verificationType === "Passport") {
			documentType = "PASSPORT";
		} else {
			documentType = "CARD_ID";
		}
		const KYC: SendKYC = {
			address,
			city: values.city,
			streetAddress: values.streetAddress,
			postcode: values.postalCode,
			date: values.date,
			firstName: values.firstName,
			lastName: values.lastName,
			pictures,
			documentType,
		};

		dispatch(sendKYC(KYC));
		navigation.navigate("SuccessVerificationScreen");
	};

	function checkSubmitTitle () {
		if (step === 5 && imageList.length !== 0) {
			return "Send for verification";
		}

		return "Next";
	}

	function renderSubmitButton () {
		const isDisabled = checkIsDisabled();

		return (
			<>
				{step !== 4 && (
					<SubmitBtn
						primary={ !isDisabled }
						onPress={ handlePressBtn }
					>
						<SubmitTitle primary>
							{checkSubmitTitle()}
						</SubmitTitle>
					</SubmitBtn>
				)}
			</>
		);
	}

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sharedTranslateX.value }]
	}), []);

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
		<KeyboardAvoid style={ styles.keyboardAvoid }>
			<HeaderBlock>
				<ButtonBack onPress={ handlePressBack } title="Back" />
			</HeaderBlock>

			<FillingLine step={ step } totalSteps={ MAX_STEPS } />
			<Wrapper>

				<Animated.View style={ [styles.viewPager, animatedStyle] }>
					<ScreenView width={ SCREEN_WIDTH }>
						<VerificationStep1 control={ control } currentStep={ step }/>
					</ScreenView>
					<ScreenView width={ SCREEN_WIDTH }>
						<VerificationStep2 control={ control } currentStep={ step }/>
					</ScreenView>
					<ScreenView width={ SCREEN_WIDTH }>
						<VerificationStep3 control={ control } currentStep={ step }/>
					</ScreenView>
					<ScreenView width={ SCREEN_WIDTH }>
						<VerificationStep4 handlePressBtn={ handlePressBtn } setVerificationType={ setVerificationType } />
					</ScreenView>
					<ScreenView width={ SCREEN_WIDTH }>
						<VerificationStep5 verificationType={ verificationType } imageList={ imageList } setImageList={ setImageList }/>
					</ScreenView>
				</Animated.View>

				<ContainerBtn contentWidth={ CONTENT_WIDTH }>{renderSubmitButton()}</ContainerBtn>
			</Wrapper>
		</KeyboardAvoid>
	);
};

const Wrapper = styled.View`
	flex: 1;
	justify-content: space-between;
`;
const ContainerBtn = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`};
`;

const HeaderBlock = styled.TouchableOpacity`
	align-self: flex-start;
	margin-bottom: ${verticalScale(10)}px;
`;

const ScreenView = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`};
`;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	letter-spacing: ${sc(0.25)}px;
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
	margin-top: auto;
	background-color: ${({ primary }) => {
		if (primary) {
			return "#566AEC";
		}

		return "rgba(86, 106, 236, 0.5)";
	}};
	margin-bottom: ${verticalScale(16)}px;
`;

const SubmitTitle = styled(ButtonWrapper)<{
	primary?: boolean;
	secondary?: boolean;
}>`
	color: #FFFFFF;
`;
