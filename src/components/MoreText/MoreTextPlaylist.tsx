import React, { FC, useState } from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { GradientText, GradientDirection } from "../GradientText/GradientText";

type PropsType = {
	line: string;
	charLimit: number;
	fontSize?: number;
	lineHeight?: number;
	widthOfLastLine?: number;
};

export const MoreTextPlaylist: FC<PropsType> = ({
	line,
	charLimit,
	fontSize = 14,
	lineHeight = 20,
	widthOfLastLine = 300,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [lines, setLines] = useState<Array<{text: string}>>([]);

	const onTextLayout = (e: any) => {
		setLines(e.nativeEvent.lines);
	};

	if (line.length >= charLimit && isCollapsed) {
		const limitedLine = line.slice(0, charLimit);

		return (
			<Wrapper>
				{lines.length ? (
					<>
						<CollapsedText fontSize={ fontSize } lineHeight={ verticalScale(lineHeight) }>
							{lines[0].text}
						</CollapsedText>
						<GradientText
							text={ limitedLine.slice(lines[0].text.length, charLimit) }
							gradientDirection={ GradientDirection.HORIZONTAL }
							fontSize={ scale(14) }
							height={ verticalScale(22) }
							width={ scale(widthOfLastLine) }
							gradientColors={ [
								{
									color: "#03061D",
									offset: "80%",
								},
								{
									color: "#fff",
									offset: "100%",
								},
							] }
						/>
					</>
				) : (
					<CollapsedText
						fontSize={ fontSize }
						lineHeight={ verticalScale(lineHeight) }
						numberOfLines={ 2 }
						onTextLayout={ onTextLayout }
					>
						{limitedLine}
					</CollapsedText>
				)}
				<MoreWrapper>
					<Title onPress={ () => setIsCollapsed(false) }>more</Title>
				</MoreWrapper>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Article fontSize={ fontSize } numberOfLines={ 0 }>
				{line}
			</Article>
		</Wrapper>
	);
};

const MoreWrapper = styled.View`
	position: absolute;
	bottom: ${verticalScale(3)}px;
	right: ${scale(8.5)}px;
`;

const CollapsedText = styled.Text<{
	fontSize?: number;
	lineHeight?: number;
}>`
	color: #03061D;
	line-height: ${verticalScale(20)}px;
	font-size: ${({ fontSize }) => fontSize ? `${scale(fontSize)}px` : `${scale(14)}px`};
`;

const Title = styled.Text`
	color: #9A9BA5;
	font-style: normal;
	font-weight: 500;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(19)}px;
`;

const Wrapper = styled.View`
	position: relative;
	max-width: ${scale(355)}px;
	padding-top: ${verticalScale(8)}px;
`;

const Article = styled.Text<{
	fontSize?: number;
}>`
	font-family: Proxima Nova;
	font-size: ${({ fontSize }) => fontSize ? `${scale(fontSize)}px` : `${scale(14)}px`};
	line-height: ${verticalScale(20)}px;
	font-style: normal;
	font-weight: normal;
	color: #03061D;
`;
