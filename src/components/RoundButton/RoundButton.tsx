import React, { FC } from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";

type Align = "flex-start" | "flex-end" | "center";

interface Props {
	title: string;
	size?: number;
	backgroundColor?: string;
	color?: string;
	onPress?: () => any;
	icon?: any;
	isVerified?: boolean;
	children?: any;
	childrenAlign?: Align;
}

export const RoundButton: FC<Props> = ({
	title,
	isVerified,
	size = 48,
	color = "#03061d",
	backgroundColor = "rgba(17, 3, 32, 0.05)",
	icon,
	onPress = () => {},
	childrenAlign = "flex-end",
	children,
}) => (
	<>
		{isVerified ? (
			<ButtonWrapperNotPress>
				<ButtonIcon { ...{ size, backgroundColor } }>{icon}</ButtonIcon>
				<ButtonTitle { ...{ color } }>{title}</ButtonTitle>
				<ButtonChildren { ...{ childrenAlign } }>{children}</ButtonChildren>
			</ButtonWrapperNotPress>
		) : (
			<ButtonWrapper onPress={ onPress }>
				<ButtonIcon { ...{ size, backgroundColor } }>{icon}</ButtonIcon>
				<ButtonTitle { ...{ color } }>{title}</ButtonTitle>
				<ButtonChildren { ...{ childrenAlign } }>{children}</ButtonChildren>
			</ButtonWrapper>
		)}
	</>
);

const ButtonIcon = styled.View<{ size: number; backgroundColor: string }>`
	width: ${({ size }) => scale(size)}px;
	height: ${({ size }) => scale(size)}px;
	justify-content: center;
	align-items: center;
	border-radius: ${({ size }) => scale(size / 2)}px;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ButtonChildren = styled.View<{ childrenAlign: Align }>`
	flex: 1;
	flex-direction: row;
	justify-content: ${({ childrenAlign }) => childrenAlign};
	align-items: center;
`;

const ButtonWrapper = styled.TouchableOpacity`
	width: 100%;
	flex-direction: row;
	align-items: center;
	padding-bottom: ${verticalScale(24)}px;
`;
const ButtonWrapperNotPress = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	padding-bottom: ${verticalScale(24)}px;
`;
const ButtonTitle = styled.Text<{ color: string }>`
	font-family: ProximaNova-Semibold;
	margin-left: ${scale(16)}px;
	font-size: ${scale(17)}px;
	color: ${({ color }) => color};
`;
