type DataField = string;
type NormalizedDataField = string;
type TransformFunction = (args: any) => void;

export const normalizeData = (
	data: any[],
	normalizedFields: [DataField, NormalizedDataField, TransformFunction][],
) => data.map((item) => normalizedFields.reduce((acc, currentValue) => {
	const [dataField, normalizedDataField, transform] = currentValue;

	return {
		...acc,
		[normalizedDataField]: transform ? transform(item[dataField]) : item[dataField],
	};
}, {}));
