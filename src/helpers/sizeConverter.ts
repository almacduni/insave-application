import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Dimensions, PixelRatio } from "react-native";

const VIEWPORT_WIDTH = 375;
const PERCENT = 100;

export const sc = (px: number | string) => {
	const value = wp(`${((Number(px) * PERCENT) / VIEWPORT_WIDTH).toFixed(2)}%`);

	return Number(value.toFixed(2));
};

export const sizeConverter = (px: number | string) => {
	const value = wp(`${((Number(px) * PERCENT) / VIEWPORT_WIDTH).toFixed(2)}%`);

	return Number(value.toFixed(2));
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const scale = (size: number) => Math.floor( width / baseWidth * size);
// const verticalScale = (size: number) => Math.floor(height / baseHeight * size);
// export {scale, verticalScale};

// Good size converter, but can better

//////////////////////////////////////////////////////////////////////////////////////////////

const { width, height } = Dimensions.get("window");

const baseWidth = 375;
const baseHeight = 812;

const scaleW = width / baseWidth;
const scaleH = height / baseHeight;

export const normalizeSize = (prevSize: number, dir?: "w" | "h") => {
	const newSize = prevSize * (dir === "h" ? scaleH : scaleW);

	return Math.floor(PixelRatio.roundToNearestPixel(newSize));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////

export const scale = (prevSize: number) => {
	const newSize = prevSize * scaleW;

	return Math.floor(PixelRatio.roundToNearestPixel(newSize));
};

export const verticalScale = (prevSize: number) => {
	const newSize = prevSize * scaleH;

	return Math.floor(PixelRatio.roundToNearestPixel(newSize));
};
