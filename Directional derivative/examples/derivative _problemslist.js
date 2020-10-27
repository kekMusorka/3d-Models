function nthroot(x, n) {
	if (x >= 0)
		return Math.pow(x, 1/n);
	else if (n % 2)
		return -Math.pow(-x, 1/n);
	else 
		return NaN;
}
var problems = [
	{	id: 'la-1',
		eqn: 'z == (x^2+y^2)^{1/2}',
		eqn_comp: function(x, y) {
			return Math.pow(Math.pow(x,2) + Math.pow(y,2),0.5);
		},
		grad_n: [
			function(x,y) {
				return x/(Math.pow(Math.pow(x,2) + Math.pow(y,2),0.5));
			},
			function(x,y) {
				return y/(Math.pow(Math.pow(x,2) + Math.pow(y,2),0.5));
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	},
	{	id: 'la-2',
		eqn: 'z == exp(-1/(x^2+y^2)))',
		eqn_comp: function(x, y) {
			return Math.pow(Math.E,-1/(Math.pow(x,2) + Math.pow(y,2)));
		},
		grad_n: [
			function(x,y) {
				return (2*x)*Math.pow(Math.E,-1/(Math.pow(x,2) + Math.pow(y,2)))/(Math.pow(Math.pow(x,2) + Math.pow(y,2),2));
			},
			function(x,y) {
				return (2*y)*Math.pow(Math.E,-1/(Math.pow(x,2) + Math.pow(y,2)))/(Math.pow(Math.pow(x,2) + Math.pow(y,2),2))
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	},
	{	id: 'la-3',
		eqn: 'z == x*sin(y) + y*cos(x)',
		eqn_comp: function(x, y) {
			return 0.33*x * Math.sin(y) + 0.33*y * Math.cos(x);
		},
		grad_n: [
			function(x,y) {
				return 0.33*Math.sin(y)-0.33*y*Math.sin(x);
			},
			function(x,y) {
				return 0.33*x*Math.cos(y) + 0.33*Math.cos(x);
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	},
	{	id: 'la-4',
		eqn: 'z == x*x + (y-1)*(y-1)',
		eqn_comp: function(x, y) {
			return x*x+Math.pow(y-1,2);
		},
		grad_n: [
			function(x,y) {
				return 2*x;
			},
			function(x,y) {
				return 2*(y-1);
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	},
	{	id: 'la-5',
		eqn: 'z == (x*x*y)/(y*y+x*x*x*x)',
		eqn_comp: function(x, y) {
			return (x*x*y)/(y*y+x*x*x*x);
		},
		grad_n: [
			function(x,y) {
				return (2*x*y*(Math.pow(y,2)-Math.pow(x,4)))/(Math.pow(Math.pow(y,2)+Math.pow(x,4),2));
				
			},
			function(x,y) {
				return (Math.pow(x,2)*(-Math.pow(y,2)+Math.pow(x,4)))/(Math.pow(Math.pow(y,2)+Math.pow(x,4),2));
				
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	},
	{	id: 'la-6',
		eqn: 'z == x*sin(y) + y*cos(x)',
		eqn_comp: function(x, y) {
			return  x*y*Math.log(x*x+y*y);
		},
		grad_n: [
			function(x,y) {
			 return y*(2*Math.pow(x,2)/(Math.pow(x,2)+Math.pow(y,2))+ Math.log(x*x+y*y));
				
			},
			function(x,y) {
				return x*(2*Math.pow(y,2)/(Math.pow(x,2)+Math.pow(y,2))+ Math.log(x*x+y*y));
				
			}
		],
		info:
		'<strong> Number </strong> \
		<br />Find local extremums in following conditions: \
		$$ x + y - 2 = 0 $$'
	}
];