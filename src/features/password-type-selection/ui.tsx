import * as React from "react";
import styled from "styled-components/native";
import SInfo from "react-native-sensitive-info";
import BottomSheet from "@gorhom/bottom-sheet";

import { verticalScale } from "../../helpers/sizeConverter";
import { Button, ExplanationBox } from "../../shared/ui";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { WithBottomSheet } from "../../entity/bottom-sheet";

interface IProps {
	setIsOpenRestorePassword: (isOpenRestorePassword: boolean) => void;
	navigation: any;
}

function LightHandleComponent () {
	return (
		<HandleIconWrapper>
			<HandleIcon light/>
		</HandleIconWrapper>
	);
}

export const PasswordTypeSelection: React.FC<IProps> = (props) => {
	const { setIsOpenRestorePassword, navigation } = props;
	const bottomSheetRef = React.useRef<BottomSheet>(null);
	const snapPoints = React.useMemo(() => [1, verticalScale(210)], []);

	async function handleOnPressAppPassword () {
		await SInfo.setItem("securityPassword", "", {});
		navigation.push("LoginScreen", { isPushToUp: true });
		handleCloseSheet();
	}
	function handleOnPressAccountPassword () {
		navigation.push("RecoveryPasswordScreen");
		handleCloseSheet();
	}
	const handleCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
		setIsOpenRestorePassword(false);
	};

	return (
		<WithBottomSheet handleComponent={ LightHandleComponent } handleCloseSheet={ handleCloseSheet } bottomSheetRef={ bottomSheetRef } snapPoints={ snapPoints }>
			<Wrapper>
				<ExplanationBox
					title={ "Change a password" }
					description={ `
						You can change your app code
						for account password if you forgot this
					` }
				/>
				<ButtonsContainer>
					<Button
						size={ { width: 168, height: 48 } }
						colors={ { background: "rgba(235, 235, 237, 1)", text: "rgba(3, 6, 29, 1)" } }
						text={ "App code" }
						onPress={ handleOnPressAppPassword }
					/>
					<Button
						text={ "Password" }
						size={ { width: 168, height: 48 } }
						onPress={ handleOnPressAccountPassword }
					/>
				</ButtonsContainer>
			</Wrapper>
		</WithBottomSheet>
	);
};

const Wrapper = styled.View`
  margin: 32px 16px 0 16px;
`;

const ButtonsContainer = styled.View`
  margin-top: ${verticalScale(36)}px;
	flex-direction: row;
	justify-content: space-between;
`;

const HandleIconWrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-top: ${verticalScale(-10)}px;
`;
