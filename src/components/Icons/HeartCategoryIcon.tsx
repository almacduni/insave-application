import React, { FC } from "react";
import { Path, Svg } from "react-native-svg";

import { scale } from "../../helpers/sizeConverter";

type IconProps = {
	isActive: boolean;
};

export const HeartCategoryIcon: FC<IconProps> = ({ isActive }) => (
	<Svg width={ scale(24) } height={ scale(24) } viewBox="0 0 24 17" fill="none">
		<Path
			d="M10 3.62842C7.75 -0.738164 1 0.71781 1 5.81189C1 8.61634 1 10.0701 9.05081 15.3802C9.62475 15.7587 10.3753 15.7587 10.9492 15.3802C19 10.0701 19 8.61634 19 5.81189C19 0.572265 12.25 -0.738103 10 3.62842Z"
			stroke={ isActive ? "#344CD3" : "#252525" }
			strokeWidth="2"
			strokeLinejoin="round"
		/>
	</Svg>
);
