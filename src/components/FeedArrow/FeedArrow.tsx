import React, { FC } from "react";
import * as SvgContainer from "react-native-svg";

type PropsType = {
	isOpen: boolean;
};

export const FeedArrow: FC<PropsType> = ({ isOpen }) => {
	const { Path, Svg } = SvgContainer;

	return (
		<Svg
			width="11"
			height="6"
			viewBox="0 0 11 6"
			fill="none"
			style={ isOpen ? { transform: [{ rotate: "180deg" }] } : null }
		>
			<Path
				d="M10 1L5.5 5L1 1"
				stroke="#252525"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
};
