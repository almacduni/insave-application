import { Dimensions } from "react-native";

import { scale, verticalScale } from "../helpers/sizeConverter";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CONTENT_WIDTH = SCREEN_WIDTH - 32;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_HORIZONTAL_PADDING = scale(16);
export const CHART_HEIGHT = scale(250);
export const CANDLE_WIDTH = scale(6.39);
export const VIEWPORT_WIDTH = WIDTH - scale(32);
export const PADDING = scale(16);
export const REAL_CANDLE_WIDTH = scale(3.75);
export const LABEL_WIDTH = scale(100);
export const ROUND_CANDLE_WIDTH = scale(1.39);
export const KEYBOARD_VERTICAL_OFFSET = 40;
export const OUTER_INDICATOR_HEIGHT = verticalScale(70);
export const CHART_BORDER_WIDTH = 200;
