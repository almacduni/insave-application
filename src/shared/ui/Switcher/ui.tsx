import * as React from "react";
import styled from "styled-components/native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { WIDTH } from "../../../constants/sizes";
import { Fonts, FontStyles, FontProp } from "../../model";

const defaultColors: SwitcherColors = {
	main: "#f4f4f4",
	selectedBg: "#ffffff",
	text: {
		selected: "#000000",
		disabled: "#8e8e8e",
	}
};

const defaultFont: FontProp = {
	size: 16,
	style: FontStyles.REGULAR,
	family: Fonts.PROXIMA,
};

export const Switcher: React.FC<ISwitcherProps> = (props) => {
	const { items, selected, height = 32 } = props;
	const colors = { ...defaultColors, ...props.colors };
	const font = { ...defaultFont, ...props.font };
	const selectedItem = useSharedValue(selected);

	const style = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: withSpring((selectedItem.value / items.length) * (WIDTH - 32), {
					damping: 10,
					mass: 0.5,
				})
			},
		]
	}));

	return (
		<Wrapper height={ height }>
			<Animated.View style={
				[
					style,
					{
						maxWidth: (1 / items.length) * (WIDTH - 32 - 3 * items.length),
						width: `100%`,
						height: verticalScale(height) - 4,
						backgroundColor: colors.selectedBg,
						marginTop: 2,
						marginLeft: 2,
						borderRadius: scale(4),
						position: "absolute"
					}
				]
			}>
			</Animated.View>
			{
				items.map((item, index) => (
					<SwitchBox key={ item.title } onPress={ () => {
						selectedItem.value = index;
						item.onSelect();
					}	}>
						<SwitcherTitle
							index={ index }
							selectedItem={ selectedItem }
							text={ item.title }
							font={ font }
							selectColor={ item.colors?.selected || colors.text?.selected }
							disableColor={ item.colors?.disabled || colors.text?.disabled }
						/>
					</SwitchBox>
				))
			}
		</Wrapper>
	);
};

const SwitcherTitle: React.FC<ISwitcherTitleProps> = ({
	text,
	selectColor,
	disableColor,
	index,
	selectedItem,
	font = defaultFont
}) => {
	const style = useAnimatedStyle(() => ({
		color: index === selectedItem.value ? selectColor : disableColor,
	}));

	return (
		<Animated.Text style={
			[
				style,
				{
					fontSize: scale(font.size as number),
					fontFamily: `${font.family}-${font.style}`,
					textAlign: "center",
				}
			]
		}>
			{text}
		</Animated.Text>
	);
};

const Wrapper = styled.View<{ height: number }>`
  position: relative;
  height: ${({ height }) => verticalScale(height)}px;
  background-color: #f4f4f4;
  border-radius: ${scale(4)}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2px;
`;

const SwitchBox = styled.TouchableOpacity`
  flex: 1;
  margin: 2px 2px 0 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export type SwitcherItem = {
	title: string;
	colors?: {
		selected?: string;
		disabled?: string;
	};
	onSelect: () => void;
}

export type SwitcherColors = {
	main?: string;
	selectedBg?: string;
	text?: {
		disabled?: string;
		selected?: string;
	};
}

export interface ISwitcherProps {
	items: SwitcherItem[];
	selected: number;
	height?: number;
	fontSize?: number;
	fontStyle?: FontStyles;
	font?: FontProp,
	colors?: SwitcherColors;
}

export interface ISwitcherTitleProps {
	text: string,
	selectColor?: string,
	disableColor?: string,
	index: number,
	selectedItem: Animated.SharedValue<number>,
	font?: FontProp
}
