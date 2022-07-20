import React, { FC } from "react";
import styled from "styled-components/native";

interface LabeledBlockProps {
	marker: any;
	markerWidth: number;
	topLeft?: boolean;
	topRight?: boolean;
	bottomLeft?: boolean;
	bottomRight?: boolean;
	children?: any;
}

export const LabeledBlock: FC<LabeledBlockProps> = ({
	topLeft = false,
	topRight = false,
	bottomLeft = false,
	bottomRight = false,
	marker,
	markerWidth,
	children,
}) => (
	<Wrapper>
		{children}
		<Marker { ...{ topLeft, topRight, bottomLeft, bottomRight, markerWidth } }>{marker}</Marker>
	</Wrapper>
);

const Wrapper = styled.View`
	position: relative;
`;

const Marker = styled.View<{
	topLeft?: boolean;
	topRight?: boolean;
	bottomLeft?: boolean;
	bottomRight?: boolean;
	markerWidth: number;
}>`
	position: absolute;
	${({ topLeft, topRight, bottomLeft, bottomRight, markerWidth }) => {
		switch (true) {
		case topLeft:
			return `
          left: ${-markerWidth}px;
          top: 0;
        `;
		case topRight:
			return `
          right: ${-markerWidth}px;
          top: 0;
        `;
		case bottomLeft:
			return `
          left: ${-markerWidth}px;
          bottom: 0;
        `;
		case bottomRight:
			return `
          right: ${-markerWidth}px;
          bottom: 0;
        `;
		}
	}}
`;
