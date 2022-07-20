import React, { FC, useState } from "react";
import {
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Col } from "react-native-easy-grid";
import styled from "styled-components/native";

import { PlaylistExtendedDataItemType } from "../../types/commonTypes";
import { sizeConverter, scale } from "../../helpers/sizeConverter";
import { GradientText, GradientDirection } from "../GradientText/GradientText";

type PropsType = {
	togglePressItem: (company: string, ticker: string) => void;
	item: PlaylistExtendedDataItemType | any;
};

export const PlaylistExtendedCol: FC<PropsType> = ({ togglePressItem, item }) => {
	const [isVisible, setIsVisible] = useState(false);

	const longPress = () => {
		setIsVisible(!isVisible);
	};

	const clickHandler = () => {
		setIsVisible(!isVisible);
	};

	return (
		<Col
			size={ 50 }
			style={ {
				alignContent: "center",
				position: "relative",
			} }
		>
			{isVisible && (
				<TouchableOpacity
					onPress={ clickHandler }
					style={ [
						styles.wrapper,
						{
							shadowOffset: {
								width: 5,
								height: 5,
							},
							shadowRadius: 14,
							shadowOpacity: 0.1,
						},
					] }
				>
					<TableCollFullNameText>{item.company}</TableCollFullNameText>
				</TouchableOpacity>
			)}
			<TableColText
				onPress={ () => togglePressItem(item.company, item.ticker) }
				onLongPress={ longPress }
			>
				<GradientText
					text={ item.company }
					width={ sizeConverter(160) }
					height={ 20 }
					fontSize={ scale(16) }
					gradientDirection={ GradientDirection.HORIZONTAL }
					gradientColors={ [
						{
							color: "#252525",
							offset: "90%",
						},
						{
							color: "#fff",
							offset: "100%",
						},
					] }
				/>
			</TableColText>
		</Col>
	);
};

const TableColText = styled.Pressable``;

const TableCollFullNameText = styled.Text`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	font-size: ${sizeConverter(12)}px;
	line-height: ${sizeConverter(14)}px;
	font-variant: lining-nums;
`;

const styles = StyleSheet.create({
	wrapper: {
		shadowColor: "#000000",
		position: "absolute",
		top: -sizeConverter(12),
		left: sizeConverter(16),
		maxWidth: sizeConverter(162),
		borderRadius: sizeConverter(6),
		backgroundColor: "#ffffff",
		zIndex: 10,
		padding: sizeConverter(8),
		borderWidth: 1,
		borderColor: "#000",
		elevation: 1,
	},
});
