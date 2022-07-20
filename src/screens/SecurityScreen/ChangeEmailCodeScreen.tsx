import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	ScrollView,
	TextInput,
	View,
} from "react-native";
import { useTimer } from "react-timer-hook";
import styled from "styled-components/native";
import ViewPager from "@react-native-community/viewpager";

import { cutEmail } from "../../helpers/text";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { sendSecurityCodeEmail, changeEmail } from "../../redux/userSlice";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { ButtonBack } from "../../shared/ui";

const initTime = new Date();

initTime.setSeconds(initTime.getSeconds() + 59);

type ChangeEmailCodePropsType = {
	navigation: any;
	route: any;
};

export type ConfirmationCodeType = {
	id: number;
	value: number | string;
	active: boolean;
};

export const ChangeEmailCodeScreen: React.FC<ChangeEmailCodePropsType> = ({
	navigation,
	route,
}) => {
	const dispatch = useAppDispatch();
	const pagerRef = useRef(null);
	const [isResendCode, setIsResendCode] = useState(false);

	const [isFailed, setIsFailed] = useState(false);

	const { seconds, restart } = useTimer({
		expiryTimestamp: Number(initTime),
		onExpire: () => setIsResendCode(false),
	});
	const checkIsDisabled = (values: string): boolean | undefined => {
		if (values !== undefined) return values.length !== 6;
	};
	const { userId } = useAppSelector((state) => state.user);
	const resendCode = () => {
		const time = new Date();

		time.setSeconds(time.getSeconds() + 59);
		restart(Number(time));
		setIsResendCode(true);
		dispatch(sendSecurityCodeEmail({ userId, email: route.params.email }));
	};
	const onSubmitInput = () => {
		if (userId) {
			dispatch(changeEmail({ userId, code: internalVal }));

		}
	};

	const textInput = useRef<TextInput>(null as TextInput | null);
	const [internalVal, setInternalVal] = useState("");
	const onChangeSecurityCode = (val: string) => {
		if (val.length <= 6) {
			setInternalVal(val);
		}
		if (isFailed) {
			setIsFailed(false);
		}

	};
	const cutedEmail = useMemo(() => cutEmail(route.params.email), [route.params.email]);

	useEffect(() => {
		if (textInput.current) {
			textInput.current.focus();
		}
	}, []);

	return (
		<KeyboardAvoid>
			<Container>
				<HeaderBlock>
					<ButtonBack onPress={ () => navigation.goBack() } title="Back" />
				</HeaderBlock>
				<ScrollView showsVerticalScrollIndicator={ false } keyboardShouldPersistTaps="never">
					<ViewPager
						style={ {
							flex: 1,
							height: SCREEN_HEIGHT - 400,
						} }
						initialPage={ 0 }
						ref={ pagerRef }
						scrollEnabled={ false }
					>
						<View key="1">
							<StepTitle>Enter the code sent to: </StepTitle>
							<Email>{cutedEmail}</Email>
							<View>
								<TextInput
									ref={ textInput }
									onChangeText={ onChangeSecurityCode }
									style={ { width: 0, height: 0 } }
									value={ internalVal }
									autoFocus={ true }
									maxLength={ 6 }
									returnKeyType="done"
									keyboardType="numeric"
								/>
							</View>
							<ContainerInput>
								{["", "", "", "", "", ""]
									.map((data, index) => (
										<CellView
											onPress={ () => textInput.current?.focus() }
											key={ index }
											isActive={ index === internalVal.length }
											isFailed={ isFailed }
										>
											<CellText>
												{internalVal && internalVal.length > 0 ? internalVal[index] : ""}
											</CellText>
										</CellView>
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
									<ResendCodeBtn onPress={ () => resendCode() }>Resend code</ResendCodeBtn>
								</ResendCodeContainer>
							)}
							{isResendCode && (
								<ResendCodeContainer>
									<ResendCodeTitle>Resend in </ResendCodeTitle>
									<ResendCodeTimer>0:{seconds}</ResendCodeTimer>
								</ResendCodeContainer>
							)}
						</View>
					</ViewPager>
				</ScrollView>
				<SubmitBtn
					primary={ !checkIsDisabled(internalVal) }
					disabled={ checkIsDisabled(internalVal) }
					onPress={ onSubmitInput }
				>
					<SubmitTitle>Check</SubmitTitle>
				</SubmitBtn>
			</Container>
		</KeyboardAvoid>
	);
};

const Container = styled.View`
	background: #ffffff;
	height: 100%;
	padding: ${verticalScale(12)}px 16px 0;
`;

const HeaderBlock = styled.TouchableOpacity`
	align-self: flex-start;
	margin-bottom: ${verticalScale(10)}px;
`;

const ResendCodeBtn = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #566aec;
`;

const ResendCodeContainer = styled.View`
	margin-bottom: auto;
	margin-top: 16px;
	flex-direction: row;
`;

const ResendCodeTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${verticalScale(0.25)}px;
	color: rgba(3, 6, 29, 0.2);
`;
const ResendCodeTimer = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
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

const ErrorCodeWrapper = styled.View`
	margin-top: 16px;
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
	flex-direction: row;
	justify-content: center;
	border-radius: ${scale(10)}px;
	margin-top: auto;
	background-color: ${({ primary }) => {
		if (primary) {
			return "#566AEC";
		}

		return "rgba(86, 106, 236, 0.5)";
	}
};
	margin-bottom: ${verticalScale(16)}px;
`;

const SubmitTitle = styled(ButtonWrapper)`
	color: #FFFFFF;
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

const ContainerInput = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const CellView = styled.Pressable<{ isActive: boolean; isFailed: boolean }>`
	width: 50px;
	height: 48px;
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
	border-radius: 10px;
	margin-right: ${scale(10)}px;
	background: #ffffff;
`;

const CellText = styled.Text`
	text-align: center;
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
`;
