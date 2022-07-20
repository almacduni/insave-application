import * as React from "react";
import styled from "styled-components/native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";

import { Text } from "../Text";
import { scale } from "../../../helpers/sizeConverter";

export type SetOpenType = (value: boolean) => void;
export interface IDropDownProps {
	renderButton?: (open: boolean) => JSX.Element;
	render?: (setOpen: SetOpenType) => JSX.Element;
	background?: string;
	borderRadius?: number;
}

export const DropDown: React.FC<IDropDownProps> = (props) => {
	const { children, renderButton, render, background = "#f5f5f5", borderRadius = 4 } = props;
	const [open, setOpen] = React.useState(false);
	const height = useSharedValue(0);

	const style = useAnimatedStyle(() => ({
		height: withTiming(height.value * +open),
	}));

	function onLayout (event: LayoutChangeEvent): void {
		height.value = event.nativeEvent.layout.height;
	}

	return (
		<Container background={ background } borderRadius={ borderRadius }>
			<Wrapper onPress={ () => setOpen((prev) => !prev) }>
				{renderButton ? renderButton(open) : (<Text>{open ? "Close" : "Open"}</Text>)}
			</Wrapper>
			<Animated.View style={ [{ overflow: "hidden" }, style] }>
				<ChildrenWrapper style={ { position: "absolute", width: "100%" } } onLayout={ onLayout }>
					{ render ? render(setOpen) : children }
				</ChildrenWrapper>
			</Animated.View>
		</Container>
	);
};

const Container = styled.View<{ background: string; borderRadius: number }>`
  background-color: ${({ background }) => background};
  border-radius: ${({ borderRadius }) => scale(borderRadius)}px;
  overflow: hidden;
`;

const Wrapper = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const ChildrenWrapper = styled.View``;

