import React, { FC } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { sc } from "../../helpers/sizeConverter";
import DarkPlusIcon from "../../shared/assets/icons/DarkPlus.svg";
import DarkTerminalIcon from "../../shared/assets/icons/DarkTerminal.svg";
import { useAppDispatch } from "../../hooks/useRedux";
import { setIsOpenTerminal } from "../../features/bottom-sheets";

interface Props {
	onPress: () => void;
}

export const WatchListHeader: FC<Props> = (props) => {
	const { onPress } = props;
	const dispatch = useAppDispatch();

	function handleOpenTerminal () {
		dispatch(setIsOpenTerminal(true));
	}

	return (
		<WatchListContainerHeader>
			<Title>Watchlist</Title>

			<Wrapper>
				<TouchableOpacity onPress={ onPress }>
					<DarkPlusIcon />
				</TouchableOpacity>
				<TouchableOpacity onPress={ handleOpenTerminal } style={ { marginLeft: 10 } }>
					<DarkTerminalIcon />
				</TouchableOpacity>
			</Wrapper>
		</WatchListContainerHeader>
	);
};

const WatchListContainerHeader = styled.View`
	padding: ${sc(22)}px ${sc(14)}px ${sc(16)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${sc(21)}px;
	line-height: ${sc(28)}px;
	letter-spacing: ${sc(0.15)}px;
	font-variant: lining-nums;
	color: rgba(3, 6, 29, 1);
`;

const Wrapper = styled.Text``;
