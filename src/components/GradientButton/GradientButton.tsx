import React from "react";
import RadialGradient from "react-native-radial-gradient";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { adjustHelper } from "../../helpers/adjustHelper";

export const GradientButton = ({ onPress, title, disabled }: any) => (
	<Wrapper onPress={ () => onPress() } disabled={ disabled }>
		<RadialGradient
			colors={ ["#344CD3", "#E30502"] }
			stops={ [0, 0.7, 1] }
			radius={ 420 }
			center={ [0, 20] }
		>
			<Title>{title}</Title>
		</RadialGradient>
	</Wrapper>
);
const Wrapper = styled.Pressable`
	border-radius: ${adjustHelper(6)}px;
	overflow: hidden;
`;
const Title = styled.Text`
	text-align: center;
	font-family: Raleway-Bold;
	color: #ffffff;
	font-size: ${wp("4.8")}px;
	line-height: ${wp("5.6%")}px;
	margin: ${wp("3.7%")}px 0;
`;
