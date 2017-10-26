var tape = require("tape");
d3 = Object.assign({}, require("d3"), require("../"));

tape("sliderHorizontal() has the expected defaults", function(test) {
  var a = d3.sliderHorizontal();
  test.equal(a.tickFormat(), null);
  test.end();
});
