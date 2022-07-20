import React from "react";
import {
	FlatList,
} from "react-native";
import styled from "styled-components/native";

import PassportIcon from "../../assets/PassportIcon.svg";
import GrayArrowIcon from "../../assets/GrayArrowIcon.svg";
import IdCardIcon from "../../assets/IdCardIcon.svg";
import DriverLicenseIcon from "../../assets/DriverLicenseIcon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { CONTENT_WIDTH } from "../../constants/sizes";

interface IProps {
	setVerificationType: (type: string) => void;
	handlePressBtn: () => void;
}

const documentTypeList = [
	{ title: "Passport", icon: <PassportIcon /> },
	{ title: "ID card", icon: <IdCardIcon /> },
	{ title: "Driver's License", icon: <DriverLicenseIcon /> },
];

export const VerificationStep4: React.FC<IProps> = (props) => {
	const { setVerificationType, handlePressBtn } = props;

	const onChoiceTypeVerification = (type: string) => {
		setVerificationType(type);
		handlePressBtn();
	};

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>What verification document will you use?</StepTitle>
			<VerificationList>
				<FlatList
					data={ documentTypeList }
					renderItem={ ({ item }) => (
						<VerificationItem onPress={ () => onChoiceTypeVerification(item.title) }>
							{item.icon}
							<VerificationName>{item.title}</VerificationName>
							<GrayArrowIcon />
						</VerificationItem>
					) }
				/>
			</VerificationList>
		</Container>
	);
};

const Container = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`}
`;
const VerificationList = styled.View``;

const VerificationItem = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-bottom: ${verticalScale(24)}px;
`;

const VerificationName = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	margin-left: ${scale(16)}px;
	margin-right: auto;
	line-height: ${verticalScale(20)}px;
	color: #03061d;
`;

const StepTitle = styled.Text`
	margin-top: ${verticalScale(32)}px;
	margin-bottom: ${verticalScale(24)}px;
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;
