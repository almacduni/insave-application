import * as React from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../../helpers/sizeConverter";
import BackIcon from "../../../assets/back.svg";

interface IButtonBack {
	title?: string;
	icon?: JSX.Element;
	onPress: () => void;
}

export function ButtonBack (props: IButtonBack): JSX.Element {
	const { title, icon, onPress } = props;

	function renderIcon () {
		if (icon) {
			return icon;
		}

		return <BackIcon />;
	}

	return (
		<Wrapper onPress={ onPress }>
			{renderIcon()}
			{title && <Title>{title}</Title>}
		</Wrapper>
	);
}

const Wrapper = styled.TouchableOpacity`
	background-color: "#000000";
	flex-direction: row;
	align-items: center;
	align-self: flex-start;
`;

const Title = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	color: #252525;
	letter-spacing: ${scale(0.5)}px;
	padding-left: ${scale(4)}px;
`;

