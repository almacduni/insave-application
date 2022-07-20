import React, { useEffect, useRef } from "react";
import ContentLoader, { Rect, } from "react-content-loader/native";
import styled from "styled-components/native";
import { Animated } from "react-native";

import { sc, scale, verticalScale } from "../helpers/sizeConverter";
import { SearchBarComponent } from "../components/SearchBarComponent/SearchBarComponent";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonSearchScreen = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Wrapper>
			<SearchBarComponent
				placeholder="Enter ticker or company name"
				search={ "" }
			/>
			<WrapperRows>
				<Row>
					<RowTitle>Top</RowTitle>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ scale(375) }
							height={ verticalScale(172) }
							viewBox={ `0 0 ${scale(375)} ${verticalScale(172)}` }
							backgroundColor="#E6E6E8"
							foregroundColor="#F7F7F8"
							animate={ false }
						>
							<Rect
								x={ scale(0) }
								y={ verticalScale(0) }
								width={ scale(150) }
								height={ verticalScale(150) }
								fill="#E0E0E0"
								rx={ scale(6) }
								ry={ verticalScale(6) }
							/>
							<Rect
								x={ scale(0) }
								y={ verticalScale(200) }
								rx={ scale(5) }
								ry={ verticalScale(5) }
								width={ scale(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(166) }
								y={ verticalScale(0) }
								rx={ scale(6) }
								ry={ verticalScale(6) }
								width={ scale(150) }
								height={ verticalScale(150) }
							/>
							<Rect
								x={ scale(332) }
								y={ verticalScale(0) }
								rx={ scale(6) }
								ry={ verticalScale(6) }
								width={ scale(150) }
								height={ verticalScale(150) }
							/>
							<Rect
								x={ scale(0) }
								y={ verticalScale(162) }
								rx={ scale(5) }
								ry={ verticalScale(5) }
								width={ scale(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(166) }
								y={ verticalScale(162) }
								rx={ scale(5) }
								ry={ verticalScale(5) }
								width={ scale(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(332) }
								y={ verticalScale(162) }
								rx={ scale(5) }
								ry={ verticalScale(5) }
								width={ scale(150) }
								height={ verticalScale(10) }
							/>
						</ContentLoader>
					</Animated.View>
				</Row>
				<Row>
					<RowTitle>For you</RowTitle>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ scale(375) }
							height={ verticalScale(172) }
							viewBox={ `0 0 ${scale(375)} ${verticalScale(172)}` }
							animate={ false }
							backgroundColor="#E6E6E8"
							foregroundColor="#F7F7F8"
						>
							<Rect
								x={ scale(0) }
								y={ verticalScale(0) }
								width={ scale(150) }
								height={ verticalScale(150) }
								fill="#E0E0E0"
								rx={ scale(6) }
								ry={ verticalScale(6) }
							/>
							<Rect
								x={ scale(0) }
								y={ verticalScale(200) }
								rx={ verticalScale(5) }
								ry={ verticalScale(5) }
								width={ sc(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(166) }
								y={ verticalScale(0) }
								rx={ sc(6) }
								ry={ verticalScale(6) }
								width={ sc(150) }
								height={ verticalScale(150) }
							/>
							<Rect
								x={ scale(332) }
								y={ verticalScale(0) }
								rx={ sc(6) }
								ry={ verticalScale(6) }
								width={ sc(150) }
								height={ verticalScale(150) }
							/>
							<Rect
								x={ scale(0) }
								y={ verticalScale(162) }
								rx={ sc(5) }
								ry={ verticalScale(5) }
								width={ sc(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(166) }
								y={ verticalScale(162) }
								rx={ sc(5) }
								ry={ verticalScale(5) }
								width={ sc(150) }
								height={ verticalScale(10) }
							/>
							<Rect
								x={ scale(332) }
								y={ verticalScale(162) }
								rx={ sc(5) }
								ry={ verticalScale(5) }
								width={ sc(150) }
								height={ verticalScale(10) }
							/>
						</ContentLoader>
					</Animated.View>
				</Row>
				<Row>
					<RowTitle>Recommended</RowTitle>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ sc(359) }
							height={ sc(172) }
							animate={ false }
							viewBox={ `0 0 ${sc(359)} ${sc(172)}` }
							backgroundColor="#E6E6E8"
							foregroundColor="#F7F7F8"
						>
							<Rect
								x={ sc(0) }
								y={ sc(0) }
								width={ sc(150) }
								height={ sc(150) }
								fill="#E0E0E0"
								rx={ sc(6) }
								ry={ sc(6) }
							/>
							<Rect x={ sc(0) } y={ sc(200) } rx={ sc(5) } ry={ sc(5) } width={ sc(150) } height={ sc(10) } />
							<Rect x={ sc(166) } y={ sc(0) } rx={ sc(6) } ry={ sc(6) } width={ sc(150) } height={ sc(150) } />
							<Rect x={ sc(332) } y={ sc(0) } rx={ sc(6) } ry={ sc(6) } width={ sc(150) } height={ sc(150) } />
							<Rect x={ sc(0) } y={ sc(162) } rx={ sc(5) } ry={ sc(5) } width={ sc(150) } height={ sc(10) } />
							<Rect x={ sc(166) } y={ sc(162) } rx={ sc(5) } ry={ sc(5) } width={ sc(150) } height={ sc(10) } />
							<Rect x={ sc(332) } y={ sc(162) } rx={ sc(5) } ry={ sc(5) } width={ sc(150) } height={ sc(10) } />
						</ContentLoader>
					</Animated.View>
				</Row>
			</WrapperRows>
		</Wrapper>
	);
};

const Wrapper = styled.View``;

const Row = styled.View``;

const RowTitle = styled.Text`
	margin-top: ${verticalScale(8)}px;
	margin-bottom: ${verticalScale(16)}px;
	font-family: Proxima Nova;
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;

const WrapperRows = styled.View`
	padding-left: 16px;
`;
