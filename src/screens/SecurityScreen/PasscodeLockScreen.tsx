import React, { FC, useState } from "react";
import SInfo from "react-native-sensitive-info";
import styled from "styled-components/native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { StyleSheet } from "react-native";

import LockIcon from "../../assets/lockIcon.svg";
import ArrowRight from "../../assets/ArrowRight.svg";
import { TopBar } from "../../components/TopBar/TopBar";
import { SwitchBox } from "../../components/SwitchBox/SwitchBox";
import { RoundButton } from "../../components/RoundButton/RoundButton";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { DisablePasscode } from "../../features/disable-passcode/ui";
import { WithSafeArea } from "../../shared/ui";
import { SecurityScreens } from "../../shared/model";

interface IPasscodeLockScreen {
	navigation: any;
	route: any;
}

export const PasscodeLockScreen: FC<IPasscodeLockScreen> = ({ navigation, route }) => {
	const isOn = useSharedValue(route.params.isPassCode);
	const text = useDerivedValue(() => isOn.value ? "on" : "off");
	const [isOpenSheet, setIsOpenSheet] = useState(false);
	const handleSwitchPassword = () => {
		if (isOn.value) {
			setIsOpenSheet(true);
		}	else
			navigation.navigate("SecurityPasswordScreen", {
				nextScreen: SecurityScreens.SUCCESS_CHANGE,
			});
	};

	const handleDisableCode = async () => {
		await SInfo.setItem("securityPassword", "", {});
		isOn.value = false;
	};

	return (
		<WithSafeArea>
			<TopBar
				navigation={ navigation }
				title={ "Passcode Lock" }
				backButtonTitle={ "Cancel" }
				goBack={ () => {
					navigation.push("SecurityScreen");
				} }
			/>
			<Wrapper>
				<Row>
					<Title>App password is</Title>
					<ReText style={ style.title } text={ text } />
					<SwitchBox isActive={ isOn } onPress={ handleSwitchPassword } />
				</Row>
				<RoundButton
					title={ "Change passcode" }
					icon={ <LockIcon /> }
					onPress={ () =>
						navigation.navigate("SecurityPasswordScreen", {
							nextScreen: SecurityScreens.SUCCESS_CHANGE,
							changeIsOn: () => (isOn.value = false),
						})
					}
				>
					<ArrowRight />
				</RoundButton>
			</Wrapper>
			{isOpenSheet && (
				<DisablePasscode setIsOpenSheet={ setIsOpenSheet } handleDisableCode={ handleDisableCode } />
			)}
		</WithSafeArea>
	);
};

const Wrapper = styled.View`
	padding: 16px;
	padding-top: 20px;
`;

const style = StyleSheet.create({
	title: {
		fontFamily: "Proxima Nova",
		fontSize: scale(16),
		marginLeft: 4,
		color: "rgba(3, 6, 29, 1)",
		marginRight: "auto",
	},
});
const Title = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	color: rgba(3, 6, 29, 1);
`;

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	padding-bottom: 20px;
	border-bottom-width: 1;
	border-bottom-color: rgba(3, 6, 29, 0.1);
	margin-bottom: ${verticalScale(24)}px;
`;
