var Utils = function() {

	var parseValueToFloat = function(str) {
		if (!str) return 0;
		return parseFloat(str.replace(".", "").replace(",", "."));
	};

	var parseValueToString = function(value) {
		var parts = value.toString().split(".");

		var integerPart = parts[0].split("").reverse().join("").match(/.{1,3}/g).join(".").split("").reverse().join("");
		return integerPart + "," + parts[1];
	};

	// Public
	return {
		parseValueToFloat: parseValueToFloat,
		parseValueToString: parseValueToString
	};
};