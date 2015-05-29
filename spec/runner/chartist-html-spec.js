describe('ChartistHtml', function() {
	it('exists as global', function() {
		(!!ChartistHtml).should.equal(true);
	});
});


describe('ChartistHtml.config', function() {
	it('has a config object', function() {
		(!!ChartistHtml.config).should.equal(true);
	});
});
describe('ChartistHtml', function() {

	describe('getBaseClass', function() {
		it('detects base class', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getBaseClass()).should.equal('ct-html');
		});
	});

	describe('getLabelsClass', function() {
		it('detects labels class', function() {
			ChartistHtml.config.baseClass = 'ctz';
			ChartistHtml.config.elementClassFragment = '___';
			(ChartistHtml.getLabelsClass()).should.equal('ctz___labels');
			ChartistHtml.config.elementClassFragment = '__';
		});
	});

	describe('getSeriesClass', function() {
		it('detects series class', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getSeriesClass()).should.equal('ct-html__series');
		});
	});

	describe('splitString', function() {
		it('splits by a comma if only a comma is specified in the separator array', function() {
			ChartistHtml.config.seriesSeparators = [ ',' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1');
		});
		it('splits by a comma if other characters are also specified in the separator array', function() {
			ChartistHtml.config.seriesSeparators = [ '|', ',' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1');
		});
		it('does not split by a comma if it is not specified in the separator array. wraps string in an array instead', function() {
			ChartistHtml.config.seriesSeparators = [ '|' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1,2,3');
		});
	});

	describe('toSentenceCase', function() {
		it('converts to sentence case', function() {
			(ChartistHtml.toSentenceCase('apples')).should.equal('Apples');
		});
	});
});
xdescribe('ChartistHtml.renderChart', function() {
	var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
		    $el = $(html);
		beforeEach(function() {
			ChartistHtml.config.baseClass = 'cts';
		});

	it('names chart container using base class and id', function() {
		(ChartistHtml.renderChart($el, 1).container).should.equal('div.ct-chart.ct-perfect-forth.ct-chart-1');
	});
});
describe('ChartistHtml.getOptions', function() {
	var chartOptions = {
		bar: {
			options: {
				base: {'a': "b"}, 
				stacked: {'c': "d"}, 
				horizontal: {'d': "f"}
			}
		}
	};

	it('builds up the base options object based on specific chart subtypes', function() {
		(ChartistHtml.getOptions( 'bar', [ 'stacked' ], chartOptions)).should.equal({'a': "b", 'c': "d"});
	});
});
describe('ChartistHtml.ChartManager', function() {

	describe('isFillChart', function() {
		describe('for bar charts - not fill charts', function () {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects chart type and assigns fill or stroke', function() {
				(chart.isFillChart(html, 'bar')).should.equal(false);
			});
		});
	});

	describe('isStrokeChart', function() {
		describe('for bar charts - stroke charts', function () {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects chart type and assigns fill or stroke', function() {
				(chart.isStrokeChart(html, 'bar')).should.equal(true);
			});
		});
	});

	describe('innerHtmlToJson', function() {
		describe('for bar charts', function() {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects and separates chart labels', function() {
				(chart.innerHtmlToJson(html, 'bar').labels[0]).should.equal('May');
			});
			it('detects and separates chart series - array of array', function() {
				(chart.innerHtmlToJson(html, 'bar').series[0][0]).should.equal(1);
			});
		});

		describe('for pie charts', function() {
			var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'cts';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects and separates chart labels', function() {
				(chart.innerHtmlToJson(html, 'pie').labels[0]).should.equal('Federal');
			});
			it('detects and separates chart series - simple array', function() {
				(chart.innerHtmlToJson(html, 'pie').series[0]).should.equal(25);
			});
		});
	});

	describe('setData', function() {
		var html = '<div class="cts" data-type="pie" data-title="This is a title"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
			chart;
		beforeEach(function() {
			ChartistHtml.config.baseClass = 'cts';
			chart = new ChartistHtml.ChartManager($(html), 1);
		});
		it('detects chart title', function() {
			(chart.setData(html).title).should.equal('This is a title');
		});
		it('detects chart type', function() {
			(chart.setData(html).type).should.equal('pie');
		});
	});

	describe('render', function() {
		var html = '<div class="cts" data-type="pie" data-title="This is a title"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
			chart;
		beforeEach(function() {
			ChartistHtml.config.baseClass = 'cts';
			chart = new ChartistHtml.ChartManager($(html), 1);
		});
		it('detects and capitalizes chart type', function() {
			(chart.render(html).type).should.equal('Pie');
		});
	});

});
