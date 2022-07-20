// import React from "react";
// import { ScrollView } from "react-native";
// import styled from "styled-components/native";

// import { sizeConverter as sc } from "../../helpers/sizeConverter";

// const sizes = [12, 14, 16, 18, 20, 24, 28, 32];
// const squareSizes = [20, 40, 50, 60, 70];
// const rects = [
// 	[50, 20],
// 	[55, 20],
// 	[65, 20],
// 	[80, 20],
// 	[100, 60],
// 	[100, 160],
// ];

// export const TestSizesScreen = () => (
// 	<Wrapper>
// 		<ScrollView>
// 			{/* <Row>
// 					<Text size={24} withSizeConverter>
// 						Without sc
// 					</Text>
// 					<Text size={24} withSizeConverter>
// 						With sc
// 					</Text>
// 				</Row>
// 				<Separator />
// 				{sizes.map((size) => (
// 					<Row>
// 						<Text size={size}>fs - {size}</Text>
// 						<Text size={size} withSizeConverter>
// 							fs - {size}
// 						</Text>
// 					</Row>
// 				))}
// 				<Separator />
// 				{squareSizes.map((size) => (
// 					<Row>
// 						<Square size={size}>
// 							<Text size={size * 0.3}>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 						<Square size={size} withSizeConverter>
// 							<Text size={size * 0.3} withSizeConverter>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					</Row>
// 				))}
// 				<Separator />
// 				{squareSizes.map((size) => (
// 					<Row>
// 						<Square size={size} round>
// 							<Text size={size * 0.3}>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 						<Square size={size} withSizeConverter round>
// 							<Text size={size * 0.3} withSizeConverter>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					</Row>
// 				))}
// 				<Separator />
// 				{rects.map((size) => (
// 					<Row>
// 						<Rect width={size[0]} height={size[1]}>
// 							<Text size={14}>
// 								{size[0]}x{size[1]}
// 							</Text>
// 						</Rect>
// 						<Rect width={size[0]} height={size[1]} withSizeConverter>
// 							<Text size={14} withSizeConverter>
// 								{size[0]}x{size[1]}
// 							</Text>
// 						</Rect>
// 					</Row>
// 				))} */}
// 			<Row>
// 				<Column>
// 					{sizes.map((size) => (
// 						<Text size={ size }>fs - {size}</Text>
// 					))}
// 					{squareSizes.map((size) => (
// 						<Square size={ size }>
// 							<Text size={ size * 0.3 }>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					))}
// 					{squareSizes.map((size) => (
// 						<Square size={ size } round>
// 							<Text size={ size * 0.3 }>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					))}
// 					{rects.map((size) => (
// 						<Rect width={ size[0] } height={ size[1] }>
// 							<Text size={ 14 }>
// 								{size[0]}x{size[1]}
// 							</Text>
// 						</Rect>
// 					))}
// 				</Column>
// 				<Column>
// 					{sizes.map((size) => (
// 						<Text size={ size } withSizeConverter>
// 							fs - {size}
// 						</Text>
// 					))}
// 					{squareSizes.map((size) => (
// 						<Square size={ size } withSizeConverter>
// 							<Text size={ size * 0.3 } withSizeConverter>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					))}
// 					{squareSizes.map((size) => (
// 						<Square size={ size } round withSizeConverter>
// 							<Text size={ size * 0.3 } withSizeConverter>
// 								{size}x{size}
// 							</Text>
// 						</Square>
// 					))}
// 					{rects.map((size) => (
// 						<Rect width={ size[0] } height={ size[1] } withSizeConverter>
// 							<Text size={ 14 } withSizeConverter>
// 								{size[0]}x{size[1]}
// 							</Text>
// 						</Rect>
// 					))}
// 				</Column>
// 			</Row>
// 		</ScrollView>
// 	</Wrapper>
// );

// type Size = { size: number; withSizeConverter?: boolean; round?: boolean };
// type RectSize = { width: number; height: number; withSizeConverter?: boolean };

// const Column = styled.View`
// 	flex-direction: column; ;
// `;

// const Row = styled.View`
// 	flex-direction: row;
// 	align-items: flex-start;
// 	justify-content: space-between;
// `;

// const Wrapper = styled.View`
// 	padding: ${sc(20)}px;
// `;

// const Text = styled.Text<Size>`
// 	font-size: ${({ size, withSizeConverter }) => (withSizeConverter ? sc(size) : size)}px;
// 	margin-bottom: ${({ withSizeConverter }) => (withSizeConverter ? sc(10) : 10)}px;
// `;

// const Square = styled.View<Size>`
// 	width: ${({ size, withSizeConverter }) => (withSizeConverter ? sc(size) : size)}px;
// 	height: ${({ size, withSizeConverter }) => (withSizeConverter ? sc(size) : size)}px;
// 	margin-bottom: ${({ withSizeConverter }) => (withSizeConverter ? sc(10) : 10)}px;
// 	background-color: #aaaaaa;
// 	justify-content: center;
// 	align-items: center;
// 	${({ round, size, withSizeConverter }) =>
// 		round
// 			? `
//     border-radius: ${withSizeConverter ? sc(size) : size}px;
//   `
// 			: ""};
// `;

// const Rect = styled.View<RectSize>`
// 	width: ${({ width, withSizeConverter }) => (withSizeConverter ? sc(width) : width)}px;
// 	height: ${({ height, withSizeConverter }) => (withSizeConverter ? sc(height) : height)}px;
// 	margin-bottom: ${({ withSizeConverter }) => (withSizeConverter ? sc(10) : 10)}px;
// 	background-color: #dcdcdc;
// 	justify-content: center;
// 	align-items: center;
// `;
