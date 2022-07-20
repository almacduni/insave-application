import React from "react";
import { ImageBackground, StatusBar } from "react-native";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import SInfo from "react-native-sensitive-info";
import { BlurView } from "@react-native-community/blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { RootStackParamList } from "../../routes/Routing";
import CompanyLogo from "../../assets/CompanyLogoLight.svg";
import { IsFirstEntranceEnum } from "../../redux/userSlice";
import { CustomStatusBar } from "../../processes";
import { WithSafeArea } from "../../shared/ui";

type ProfileScreenNavigationProp = StackNavigationProp<
RootStackParamList,
"AuthenticationStack"
>;

type LoginScreenPropsType = {
	navigation: ProfileScreenNavigationProp;
};

export const AccessTypeSelection: React.FC<LoginScreenPropsType> = ({ navigation }) => {
	const insets = useSafeAreaInsets();

	const onPressBackBtn = async () => {
		navigation.navigate("TabRouting");
		await SInfo.setItem("isFirstEntrance", IsFirstEntranceEnum.true, {});
	};
	const onPressSignUp = async () => {
		navigation.navigate("RegistrationScreen");
	};
	const onPressSignIn = async () => {
		navigation.navigate("AuthenticationStack");
	};

	return (
		<>
			<CustomStatusBar backgroundColor="transparent" barStyle="light-content" translucent />

			<ImageBackground
				source={ require("../../assets/backgroundLogScreen.jpg") }
				style={ {	flex: 1, paddingTop: insets.top } }
			>
				<Container keyboardShouldPersistTaps="handled">
					<HeaderWrapper>
						<TouchWrapper onPress={ onPressBackBtn }>
							<ButtonWrapper>Skip</ButtonWrapper>
						</TouchWrapper>
					</HeaderWrapper>
					<LogoWrapper>
						<CompanyLogo width={ scale(171) } height={ verticalScale(51) } />
					</LogoWrapper>
					<ButtonsContainer>
						<SubmitBtn primary onPress={ onPressSignUp }>
							<SubmitTitle>Sign up</SubmitTitle>
						</SubmitBtn>

						<SubmitBtn
							style={ { position: "relative", overflow: "hidden" } }
							onPress={ onPressSignIn }
						>
							<SubmitTitle>Log in</SubmitTitle>
							<BlurView
								blurType="light"
								blurAmount={ 25 }
								style={ {
									position: "absolute",
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
									zIndex: -12313,
								} }
								overlayColor=""
							/>
						</SubmitBtn>
					</ButtonsContainer>
				</Container>
			</ImageBackground>

		</>
	);
};

const Container = styled.View<{ keyboardShouldPersistTaps: string }>`
	height: 100%;
	z-index: 1000123;
	padding: 0 16px;
`;
const HeaderWrapper = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: ${verticalScale(12)}px;
	margin-bottom: ${verticalScale(110)}px;
	z-index: 123131;
`;
const TouchWrapper = styled.TouchableOpacity``;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(18)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(255, 255, 255, 0.5);
`;
const LogoWrapper = styled.View`
	align-items: center;
	margin-bottom: auto;
	z-index: 123131;
`;

const SubmitBtn = styled.TouchableOpacity<{
	primary?: boolean;
	secondary?: boolean;
}>`
	height: ${verticalScale(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ primary }) =>
		primary ? "#566AEC" : "rgba(17, 3, 32, 0.05)"};
	margin-bottom: ${({ primary }) =>
		primary ? `${verticalScale(16)}px` : `${verticalScale(36)}px`};
`;
const ButtonsContainer = styled.View``;
const SubmitTitle = styled(ButtonWrapper)`
	color: #FFF;
	z-index: 12313;
`;
