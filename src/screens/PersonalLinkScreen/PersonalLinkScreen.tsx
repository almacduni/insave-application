import React, { useState, useEffect } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import styled from "styled-components/native";
import SInfo from "react-native-sensitive-info";
import Clipboard from "@react-native-clipboard/clipboard";
import PushNotification from "@react-native-community/push-notification-ios";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

import OkItemIcon from "../../assets/OkItemIcon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppSelector } from "../../hooks/useRedux";

export const PersonalLinkScreen = ({ navigation }: any) => {
	const personalLink = useAppSelector((state) => state.user.referralLink);
	const [securityPassword, setSecurityPassword] = useState<string>("");
	const sharedOpacityBtn = useSharedValue(0);
	const getPassword = async () => {
		const passwordUser = await SInfo.getItem("securityPassword", {});

		setSecurityPassword(passwordUser);
	};

	getPassword();

	const animatedStyles = useAnimatedStyle(() => ({
		opacity: sharedOpacityBtn.value,
	}));

	const handleShareBtn = () => {
		Clipboard.setString(`https://www.insave.io/${personalLink}`);
		sharedOpacityBtn.value = withTiming(
			1,
			{
				duration: 1000,
			},
			(status) => {
				if (status) {
					sharedOpacityBtn.value = withDelay(
						700,
						withTiming(0, { duration: 1000 })
					);
				}
			}
		);
	};

	const requestPermissionAndroid = async () => {
	};
	const requestPermissionIOS = () => {
		PushNotification.requestPermissions().catch((err) => {
			console.log("Error requestPermissionIOS");
		});
	};

	useEffect(() => {
		if (Platform.OS === "ios") {
			requestPermissionIOS();

			return;
		}
		requestPermissionAndroid();
	}, []);

	return (
		<Container>
			<HeaderWrapper>
				<TouchWrapper
					onPress={ () =>
						securityPassword
							? navigation.navigate("ScreenLockEnter")
							: navigation.navigate("ScreenLock")
					}
				>
					<ButtonWrapper>Skip</ButtonWrapper>
				</TouchWrapper>
			</HeaderWrapper>
			<TextTokenWrapper>
				<TitleToken>You get tokens</TitleToken>
				<SubTitleToken>for</SubTitleToken>
			</TextTokenWrapper>
			<TokenListWrapper>
				<TokenListItem>
					<TokenListText>
						<TokenListIcon>
							<OkItemIcon />
						</TokenListIcon>
						Friends invited
					</TokenListText>
				</TokenListItem>
				<TokenListItem>
					<TokenListText>
						<TokenListIcon>
							<OkItemIcon />
						</TokenListIcon>
						Posts published
					</TokenListText>
				</TokenListItem>
				<TokenListItem>
					<TokenListText>
						<TokenListIcon>
							<OkItemIcon />
						</TokenListIcon>
						Likes and comments received
					</TokenListText>
				</TokenListItem>
				<TokenListItem>
					<TokenListText>
						<TokenListIcon>
							<OkItemIcon />
						</TokenListIcon>
						And many, many other actions
					</TokenListText>
				</TokenListItem>
			</TokenListWrapper>
			<TokenLinkWrapper>
				<TokenLinkTitle>This is your personal invitation link:</TokenLinkTitle>
				<TokenPersonalLink onPress={ handleShareBtn }>
					https://www.insave.io/{personalLink}
				</TokenPersonalLink>
			</TokenLinkWrapper>
			<Animated.View style={ animatedStyles }>
				<MessageCoppied>
					<MessageText>Copied</MessageText>
				</MessageCoppied>
			</Animated.View>
			<ShareLinkBtn onPress={ handleShareBtn }>
				<SubmitTitle>Share invites</SubmitTitle>
			</ShareLinkBtn>
		</Container>
	);
};

const Container = styled.View`
	height: 100%;
	padding: 0 16px;
`;
const HeaderWrapper = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: ${verticalScale(12)}px;
	margin-bottom: ${verticalScale(50)}px;
`;
const TouchWrapper = styled.TouchableOpacity``;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(3, 6, 29, 0.4);
`;

const TitleToken = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(36)}px;
	line-height: ${verticalScale(48)}px;
`;
const SubTitleToken = styled.Text`
	margin-top: ${verticalScale(8)}px;
	color: #03061d;
	font-size: ${scale(25)}px;
	line-height: ${verticalScale(36)}px;
	text-align: center;
`;
const TextTokenWrapper = styled.View`
	margin: 0 auto;
	margin-bottom: ${verticalScale(60)}px;
`;
const TokenListIcon = styled.View`
	padding-right: ${scale(8)}px;
`;
const TokenListWrapper = styled.View``;
const TokenListItem = styled.View`
	margin-bottom: ${verticalScale(15)}px;
`;
const TokenListText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;
const TokenLinkWrapper = styled.View`
	margin-top: ${verticalScale(70)}px;
`;
const TokenLinkTitle = styled.Text`
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	font-family: ProximaNova-Semibold;
	text-align: center;
	color: #03061d;
`;
const TokenPersonalLink = styled.Text`
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: 0.15px;
	color: #566aec;
	margin-top: ${verticalScale(15)}px;
	text-align: center;
`;

const MessageCoppied = styled.View`
	padding: 7px 15px;
	background: #03061d;
	border-radius: 6px;
	max-width: ${scale(80)}px;
	display: flex;
	align-items: center;
	margin: 0 auto;
	margin-top: ${verticalScale(20)}px;
`;

const MessageText = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)};
	letter-spacing: 0.25px;
	color: #ffffff;
`;

const ShareLinkBtn = styled.TouchableOpacity`
	height: ${verticalScale(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: #566aec;
	margin-top: auto;
	margin-bottom: ${verticalScale(15)}px;
`;

const SubmitTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #ffffff;
`;
