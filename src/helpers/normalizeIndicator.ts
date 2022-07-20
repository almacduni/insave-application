export const normalizeIndicator = (indicator: number, isIncrease?: boolean) => {
	const whole = Math.trunc(indicator);
	const rest = indicator.toFixed(2).slice(-2);
	const full = `${whole}.${rest}`;

	return {
		whole,
		wholeCurrency: `$${whole}`,
		rest,
		full,
		fullSign: isIncrease ? `+${full}` : `-${Math.abs(+full)}`,
	};
};
