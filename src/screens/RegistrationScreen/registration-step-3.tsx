import * as React from "react";
import { TextInput, View } from "react-native";
import { useTimer } from "react-timer-hook";
import styled from "styled-components/native";

import { HiddenInput } from "../../components/HiddenInput/HiddenInput";
import { CONTENT_WIDTH, SCREEN_WIDTH } from "../../constants/sizes";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch } from "../../hooks/useRedux";
import { sendActivationCode } from "../../redux/userSlice";

interface IProps {
	currentStep: number;
	email: string;
	password: string;
	securityCode: string;
	setSecurityCode: (code: string) => void;
	isFailed: boolean;
	setIsFailed: (isFailed: boolean) => void;
}

const initTime = new Date();

initTime.setSeconds(initTime.getSeconds() + 59);

export const RegistrationStep3: React.FC<IProps> = (props) => {
	const { currentStep, email, password, securityCode, setSecurityCode, isFailed, setIsFailed } =
		props;
	const activeStep = 3;
	const isFocused = currentStep === activeStep;
	const dispatch = useAppDispatch();
	const textInputRef = React.useRef<TextInput>(null as TextInput | null);
	const [isResendCode, setIsResendCode] = React.useState<boolean>(false);
	const { seconds, restart } = useTimer({
		expiryTimestamp: Number(initTime),
		autoStart: false,
		onExpire: () => setIsResendCode(false),
	});

	function handleResendCode (): void {
		const time = new Date();

		time.setSeconds(time.getSeconds() + 59);
		restart(Number(time));
		setIsResendCode(true);
		dispatch(
			sendActivationCode({
				password,
				email,
			}),
		);
	}
	const handleFocusInput = () => {
		textInputRef.current?.focus();
	};

	function onChangeSecurityCode (code: string): void {
		if (securityCode.length <= 6) {
			setSecurityCode(code);
		}
		if (isFailed) {
			setIsFailed(false);
		}

	}
	React.useEffect(() => {
		if (isFocused) {
			textInputRef.current?.focus();
		}
	}, [currentStep]);

	function renderCell (index: number) {
		return (
			<CellView
				windowWidth={ SCREEN_WIDTH }
				isLast={ index === 5 }
				onPress={ handleFocusInput }
				key={ index }
				isActive={ index === securityCode.length }
				isFailed={ isFailed }
			>
				<CellText>
					{securityCode && securityCode.length > 0 ? securityCode[index] : ""}
				</CellText>
			</CellView>

		);
	}

	return (
		<Container width={ CONTENT_WIDTH }>
			<StepTitle>Enter email security code</StepTitle>
			<Email>{email}</Email>
			<View>
				<HiddenInput
					inputRef={ textInputRef }
					onChangeText={ onChangeSecurityCode }
					value={ securityCode }
					maxLength={ 6 }
					returnKeyType="done"
					keyboardType="numeric"
				/>
			</View>
			<ContainerInput>
				{["", "", "", "", "", ""].map((_, index) => (
					<>
						{ renderCell(index) }
					</>
				))}
			</ContainerInput>
			{isFailed && (
				<ErrorCodeWrapper>
					<ErrorMessageContainer>
						<ErrorMessageTitle>Security code isn’t valid, try again</ErrorMessageTitle>
					</ErrorMessageContainer>
				</ErrorCodeWrapper>
			)}
			{!isResendCode && (
				<ResendCodeContainer>
					<ResendCodeBtn onPress={ handleResendCode }>Resend code</ResendCodeBtn>
				</ResendCodeContainer>
			)}
			{isResendCode && (
				<ResendCodeContainer>
					<ResendCodeTitle>Resend in </ResendCodeTitle>
					<ResendCodeTimer>0:{seconds}</ResendCodeTimer>
				</ResendCodeContainer>
			)}
		</Container>
	);
};

const Container = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`}
`;
const StepTitle = styled.Text`
	margin-top: ${verticalScale(32)}px;
	margin-bottom: ${verticalScale(24)}px;
	font-family: ProximaNova-Semibold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;

const Email = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	margin-bottom: ${verticalScale(16)}px;
	color: #03061d;
`;

const ContainerInput = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const CellText = styled.Text`
	text-align: center;
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
`;

const ResendCodeContainer = styled.View`
	flex-direction: row;
	margin-bottom: auto;
	margin-top: 16px;
`;

const ResendCodeBtn = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #566aec;
	margin-bottom: auto;
`;

const ResendCodeTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(3, 6, 29, 0.2);
`;

const ResendCodeTimer = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #03061d;
`;

const ErrorCodeWrapper = styled.View`
	margin-top: ${verticalScale(8)}px;
`;

const ErrorMessageContainer = styled.View`
	background: rgba(227, 31, 90, 0.1);
	padding: ${scale(8)}px;
	border-radius: ${scale(10)}px;
	margin-top: ${verticalScale(8)}px;
`;

const ErrorMessageTitle = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #e31f5a;
`;

const CellView = styled.Pressable<{
	isActive: boolean;
	isFailed: boolean;
	isLast: boolean;
	windowWidth: number;
}>`
	width: ${({ windowWidth }) =>
		windowWidth < 350 ? `${scale(47)}px` : `${scale(48)}px`};
	height: ${scale(48)}px;
	border-width: 1px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-color: ${({ isActive, isFailed }) => {
		if (isFailed) {
			return "#EB0046";
		}
		if (isActive) {
			return "#566aec";
		}

		return "rgba(3, 6, 29, 0.2)";
	}};
	border-radius: ${scale(10)}px;
	margin-right: ${({ isLast }) => (isLast ? `${scale(0)}px` : `${scale(10)}px`)};
	background: #ffffff;
`;
