import React from "react";
import { Path, Svg } from "react-native-svg";
import styled from "styled-components/native";

export const ModalScreen = ({ navigation }: any) => (
	<Container>
		<ModalWrapper>
			<Title>Sorry, we’re still working on this</Title>
			<ActionWrapper>
				<ButtonWrapper isLeftAlign onPress={ () => navigation.goBack() }>
					<Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
						<Path d="M1 1L22 22" stroke="#252525" stroke-linecap="round" />
						<Path d="M1 22L22 1" stroke="#252525" stroke-linecap="round" />
					</Svg>
				</ButtonWrapper>
				<ButtonWrapper onPress={ () => navigation.goBack() }>
					<Svg width="25" height="17" viewBox="0 0 25 17" fill="none">
						<Path
							d="M1 8.25806L8.82979 16L24 1"
							stroke="#252525"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</Svg>
				</ButtonWrapper>
			</ActionWrapper>
		</ModalWrapper>
	</Container>
);

const Container = styled.View`
	flex: 1;
	padding: 0 16px;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWrapper = styled.View`
	width: 100%;
	background-color: #ffffff;
	border-radius: 10px;
`;
const Title = styled.Text`
	font-family: Monserrat-SemiBold;
	font-size: 17px;
	letter-spacing: -0.408px;
	margin: 20px 0;
	text-align: center;
`;
const ActionWrapper = styled.View`
	flex-direction: row;
`;

const ButtonWrapper = styled.TouchableOpacity<{ isLeftAlign?: boolean }>`
	flex: 1;
	padding: 16px 0;
	justify-content: center;
	align-items: center;
	border-top-color: #252525;
	border-top-width: 0.1px;
	${({ isLeftAlign }) =>
		isLeftAlign
			? "border-right-color: #252525; border-right-width: 0.05px"
			: "border-left-color: #252525; border-left-width: 0.05px"}
`;
