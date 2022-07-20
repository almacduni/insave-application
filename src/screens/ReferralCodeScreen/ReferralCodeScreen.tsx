import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";

import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { checkReferralCode } from "../../redux/userSlice";

interface IReferralCodeForm {
	code: string;
}

interface IProps {
	navigation: any;
}

export const ReferralCodeScreen: React.FC<IProps> = ({ navigation }) => {
	const { control, errors, getValues, setError } = useForm<IReferralCodeForm>({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const dispatch = useAppDispatch();
	const isFetching = useAppSelector((state) => state.user.isFetching);

	function onSubmit () {
		const { code } = getValues();

		dispatch(checkReferralCode(code)).then((response) => {
			if (response.payload) {
				navigation.navigate("TabRouting");
			} else {
				setError("code", {
					message: "Invalid code",
					type: "code",
				});
			}
		});
	}

	function onSkip () {
		navigation.navigate("TabRouting");
	}

	return (
		<Container>
			<HeaderWrapper>
				<TouchWrapper onPress={ onSkip }>
					<ButtonWrapper>Skip</ButtonWrapper>
				</TouchWrapper>
			</HeaderWrapper>
			<ReferralCodeWrapper>
				<Title>Please input you referral code</Title>
				<Controller
					control={ control }
					name="code"
					render={ ({ onChange, onBlur, value }) => (
						<TextInputField
							handleChange={ onChange }
							handleBlur={ onBlur }
							value={ value }
							autoFocus={ true }
							placeholder="Code"
							secureTextEntry={ true }
							error={ errors.code }
						/>
					) }
					defaultValue=""
				/>
				{errors.code && (
					<ErrorMessageContainer>
						<ErrorMessageTitle>{errors.code.message}</ErrorMessageTitle>
					</ErrorMessageContainer>
				)}
				<SubmitButton title={ isFetching ? "Loading" : "Send" } onPress={ onSubmit } />
			</ReferralCodeWrapper>
		</Container>
	);
};

const Container = styled.View`
	height: 100%;
	padding: 0 16px;
`;

const ReferralCodeWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-self: center;
	width: 80%;
`;

const Title = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	margin-bottom: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;

const HeaderWrapper = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: ${verticalScale(12)}px;
	margin-bottom: ${verticalScale(50)}px;
`;

const TouchWrapper = styled.TouchableOpacity``;

const ErrorMessageContainer = styled.View`
	background: rgba(227, 31, 90, 0.1);
	padding: ${scale(8)}px;
	border-radius: ${scale(10)}px;
	margin: ${verticalScale(8)}px 0;
`;

const ErrorMessageTitle = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(14)}px;
	/* line-height: ${verticalScale(20)}px; */
	letter-spacing: ${scale(0.25)}px;
	color: #e31f5a;
`;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(3, 6, 29, 0.4);
`;
