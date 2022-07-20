import React, { useState, useEffect } from "react";
import SInfo from "react-native-sensitive-info";
import styled from "styled-components/native";

import VerificationIcon from "../../assets/VerificationIcon.svg";
import LockIcon from "../../assets/lockIcon.svg";
import MailIcon from "../../assets/MailIcon.svg";
import PasswordIcon from "../../assets/PasswordIcon.svg";
import ArrowRight from "../../assets/ArrowRight.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TopBar } from "../../components/TopBar/TopBar";
import { RoundButton } from "../../components/RoundButton/RoundButton";
import { ShortcutEmail } from "../../components/ShortcutEmail/ShortcutEmail";
import { useAppSelector } from "../../hooks/useRedux";
import { SecurityScreens } from "../../shared/model";
import { WithSafeArea } from "../../shared/ui/WithSafeArea";

export const SecurityScreenMenu = ({ navigation }: any) => {
	const email = useAppSelector((state) => state.user.email);
	const [withPasscode, setWithPasscode] = useState(false);

	useEffect(() => {
		SInfo.getItem("securityPassword", {}).then((code) => {
			setWithPasscode(!!code);
		});
	}, []);

	return (
		<WithSafeArea>
			<TopBar
				navigation={ navigation }
				title={ "Security" }
				backButtonTitle={ "Back" }
				goBack={ () => {
					navigation.navigate("Account");
				} }
			/>
			<MenuWrapper>
				<RoundButton
					title={ "Email" }
					icon={ <MailIcon /> }
					onPress={ () => {
						navigation.navigate(SecurityScreens.EMAIL);
					} }
				>
					<ShortcutEmail { ...{ email } } />
					<ArrowRight />
				</RoundButton>
				<RoundButton
					title={ "Password" }
					icon={ <PasswordIcon /> }
					onPress={ () => {
						navigation.navigate(SecurityScreens.OLD_PASSWORD);
					} }
				>
					<ArrowRight />
				</RoundButton>
				<RoundButton title={ "2-step verification" } icon={ <VerificationIcon /> } onPress={ () => {} }>
					<Label>on</Label>
					<ArrowRight />
				</RoundButton>
				<RoundButton
					title={ "App password" }
					icon={ <LockIcon /> }
					onPress={ () => {
						if (withPasscode) {
							navigation.navigate("ScreenLockEnter", {
								nextScreen: SecurityScreens.PASSCODE_LOCK,
								isPassCode: withPasscode,
							});
						} else {
							navigation.navigate(SecurityScreens.PASSCODE_LOCK, { isPassCode: withPasscode });
						}
					} }
				>
					<Label>{withPasscode ? "on" : "off"}</Label>
					<ArrowRight />
				</RoundButton>
			</MenuWrapper>
		</WithSafeArea>
	);
};

const MenuWrapper = styled.View`
	padding: 32px 16px;
`;

const Label = styled.Text`
	margin-right: ${scale(18)}px;
	font-size: ${scale(16)}px;
	font-family: ProximaNova-Regular;
	color: rgba(154, 155, 165, 1);
	letter-spacing: ${scale(0.5)}px;
	line-height: ${verticalScale(20)}px;
`;
