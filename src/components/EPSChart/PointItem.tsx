import React from "react";
import { Svg, Rect } from "react-native-svg";

const POINT_WIDTH = 7;

type PropTypes = {
	x: number;
	y1: number;
	y2: number;
	beginYPosition: number;
	estimateColor: string;
	reportedColor: string;
};

export const PointItem = (props: PropTypes) => {
	const { x, y1, y2, beginYPosition } = props;

	return (
		<>
			<Svg width="100%" height="100%">
				<Rect
					x={ x - 10 }
					y={ y2 - beginYPosition > 0 ? beginYPosition : y2 }
					width={ POINT_WIDTH }
					height={ y2 - beginYPosition > 0 ? y2 - beginYPosition : beginYPosition - y2 }
					fill={ props.reportedColor }
				/>
				<Rect
					x={ x }
					y={ y1 - beginYPosition > 0 ? beginYPosition : y1 }
					width={ POINT_WIDTH }
					height={ y1 - beginYPosition > 0 ? y1 - beginYPosition : beginYPosition - y1 }
					fill={ props.estimateColor }
				/>
			</Svg>
		</>
	);
};
