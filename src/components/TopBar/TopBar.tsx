import React, { FC } from "react";
import styled from "styled-components/native";

import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import ArrowLeft from "../../assets/back.svg";
import { ButtonBack } from "../../shared/ui";

interface TopBarProps {
	backButtonTitle?: string;
	title?: string;
	children?: any;
	beforeTitle?: any;
	navigation: any;
	paddingByY?: number;
	paddingLeft?: number;
	paddingRight?: number;
	goBack?: () => any;
	borderBottom?: boolean;
	background?: string;
}

export const TopBar: FC<TopBarProps> = ({
	backButtonTitle,
	title = "Screen",
	children,
	navigation,
	paddingByY = 12,
	paddingLeft = 24,
	paddingRight = 24,
	borderBottom = true,
	background = "#fff",
	beforeTitle,
	goBack,
}) => {

	function renderButton () {
		const onPress = goBack ? goBack : navigation.goBack;

		if (backButtonTitle) {
			return <ButtonBack title={ backButtonTitle } onPress={ onPress }/>;
		}

		return <></>;
	}

	return (
		<Wrapper { ...{ paddingByY, paddingLeft, paddingRight, borderBottom, background } }>
			<ButtonBackWrapper>
				{renderButton()}
			</ButtonBackWrapper>
			<TitleWrapper>
				{beforeTitle}
				<BarTitle>{title}</BarTitle>
			</TitleWrapper>
			<ChildrenContainer>{children}</ChildrenContainer>
		</Wrapper>

	);
};

const Wrapper = styled.View<{
	paddingByY: number;
	paddingLeft: number;
	paddingRight: number;
	borderBottom: boolean;
	background: string;
}>`
	display: flex;
	flex-direction: row;
	padding-top: ${({ paddingByY }) => paddingByY}px;
	padding-bottom: ${({ paddingByY }) => paddingByY}px;
	padding-left: ${({ paddingLeft }) => paddingLeft}px;
	padding-right: ${({ paddingRight }) => paddingRight}px;
	${({ borderBottom }) =>
		borderBottom &&
		`
			border-bottom-width: 1px;
			border-bottom-color: rgba(0, 0, 0, 0.05);
		`}
	background-color: ${({ background }) => background};
`;

const TitleWrapper = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const ButtonBackWrapper = styled.View`
	flex: 1;
`;

const BarTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	max-height: ${sc(20)}px;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	color: rgba(3, 6, 29, 1);
	letter-spacing: ${sc(0.15)};
	text-align: center;
`;

const ChildrenContainer = styled.View`
	flex-direction: row;
	align-items: center;
	flex: 1;
`;
