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
			(chart.render(html).chartType).should.equal('Pie');
		});
	});

});