import React, { FC } from "react";
import * as SvgContainer from "react-native-svg";

type PropsType = {
	isOpen: boolean;
};

export const TerminalArrow: FC<PropsType> = ({ isOpen }) => {
	const { Rect, Svg, Path } = SvgContainer;

	return (
		// <Svg
		// 	width="14"
		// 	height="6"
		// 	viewBox="0 0 14 6"
		// 	fill="none"
		// 	style={isOpen ? { transform: [{ rotate: "180deg" }] } : null}>
		// 	<Path
		// 		d="M1 1L7 5L13 1"
		// 		stroke={isOpen ? "#344CD3" : "#252525"}
		// 		stroke-width="1.4"
		// 		stroke-linecap="round"
		// 		stroke-linejoin="round"
		// 	/>
		// </Svg>
		<Svg
			style={ isOpen ? { transform: [{ rotate: "180deg" }] } : null }
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<Rect width="24" height="24" transform="matrix(1 0 0 -1 0 24)" />
			<Path
				d="M6 10L12 14L18 10"
				stroke="#252525"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
