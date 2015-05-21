ChartistHtml.formatters = {
	currency: function(v) {
		var formatter = (v > 999) ? '($0.0a)' : '($0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	number: function(v) {
		var formatter = (v > 999) ? '(0.0a)' : '(0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	year: function(v) {
		return (v > 999) ? ("'" + v.substring(2, 4)) : v;
	},
	state: function(v) {
		return v;
	},
	month: function(v) {
		
		//console.log(ChartistHtml.months);
		
		$.each(ChartistHtml.months, function(i, v) {
			if (v === ChartistHtml.months[i].name) {
				v = ChartistHtml.months[i].abbreviation;
			} else {
				v = v;
			}
		});

		return v;
	}
};