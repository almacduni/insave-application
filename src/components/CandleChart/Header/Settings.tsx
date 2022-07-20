import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

import SettingsIcon from "../../../assets/TuningIcon.svg";
import { setIsOpenChartConfiguration } from "../../../features/bottom-sheets";
import { useAppDispatch } from "../../../hooks/useRedux";

export function Settings (): JSX.Element {
	const dispatch = useAppDispatch();

	function handlePress () {
		dispatch(setIsOpenChartConfiguration(true));
	}

	return (
		<Wrapper onPress={ handlePress }>
			<SettingsIcon/>
		</Wrapper>
	);
}

const Wrapper = styled.TouchableOpacity`
  margin-left: auto;
`;
