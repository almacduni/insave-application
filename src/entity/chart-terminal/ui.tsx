import BottomSheet from "@gorhom/bottom-sheet";
import	React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import styled from "styled-components/native";

import { SwitcherTerminal } from "../../features";
import { setIsOpenTerminal } from "../../features/bottom-sheets";
import { TerminalOrder } from "../../features/terminal-order/ui";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch } from "../../hooks/useRedux";
import { WithBottomSheet } from "../bottom-sheet";

export const ChartTerminal: React.FC = () => {
	const dispatch = useAppDispatch();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isOpenMarket, setIsOpenMarket] = useState(true);
	const isOpenMarketShared = useSharedValue(1);

	const snapPoints = React.useMemo(() => [10, "50%"], []);

	const animateWrapperStyle = useAnimatedStyle(() => ({
		borderTopRightRadius: isOpenMarketShared.value ? 30 : 0,
		borderTopLeftRadius: isOpenMarketShared.value ? 0 : 30
	}));

	function handleCloseSheet () {
		dispatch(setIsOpenTerminal(false));
		bottomSheetRef.current?.forceClose();
	}

	function 	handleElement () {
		return <WandContainer />;
	}

	return (
		<WithBottomSheet bottomSheetRef={ bottomSheetRef } snapPoints={ snapPoints }handleElement={ handleElement } handleCloseSheet={ handleCloseSheet }>
			<Container>
				<SwitcherTerminal
					setIsOpenMarket={ setIsOpenMarket }
					isOpenMarketShared={ isOpenMarketShared } />
				<Wrapper>
					<Animated.View style={ [animateWrapperStyle, styles.wrapperContent] }>
						<TerminalOrder
							isOpenMarket={ isOpenMarket }/>
					</Animated.View>
				</Wrapper>
			</Container>
		</WithBottomSheet>

	);
};

const styles = StyleSheet.create({
	wrapperContent: {
		flex: 1,
		backgroundColor: "#ffffff"
	}
});

const WandContainer = styled.View`
	width: ${scale(51)}px;
	height: ${verticalScale(4)}px;
	background: #FFFFFF;
	margin: 0 auto;
	transform: translateY(-16px);
	border-radius: 3px;
	z-index: 101;
`;

const Container = styled.View`
	flex: 1;
	overflow: hidden;
	background: #F3F2F4;
	borderTopLeftRadius: 10px;
	borderTopRightRadius: 10px;
`;

const Wrapper = styled.View`
	flex: 1;
	background-color: #F3F2F4;

`;
