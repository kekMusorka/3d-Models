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
		eqn_comp:[ function(x,y) {
				return x*x/4+y*y/4;
		}],
		C_par : [0.2,1.2,2.2,3.2,4.2]
	},
	{
		id: 'la-2',
		eqn_comp:
	[
		function(x,y) {
				return x*x/4-y*y/4;
		}],
		C_par : [-1.5,-0.5,0,0.5,1.5]
	},
	{
		id: 'la-3',
		eqn_comp:
	[
		function(x,y) {
				return x*Math.abs(y)+y*Math.abs(x);
		}],
		C_par : [-1.7,-0.7,0.7,1.7, 2.7]
	},
	{
		id: 'la-4',
		eqn_comp:
	[
		function(x,y) {
				 return  2*Math.pow(x,4)+Math.pow(y,4)-Math.pow(x,2)-2*Math.pow(y,2);
		}],
		C_par : [-1.1,-0.3,1,2.5,4.5]
	},
	{
		id: 'la-5',
		eqn_comp:
	[
		function(x,y) {
				return x * Math.log(Math.pow(y, 2) + 1) + x / 2;
		}]
		,C_par : [-2.1,-1,0,1,2.1]
	},
	{
		id: 'la-6',
		eqn_comp:
	[
		function(x,y) {
				return Math.abs(x)+Math.abs(y)+Math.abs(x+y);
		}],
		C_par : [1,2,3,4,5]
	},
	{
		id: 'la-7',
		eqn_comp:
	[
		function(x,y) {
				if (x<y) return x;
				else return y;
					}],
					C_par : [-2,-1,0,1,2]
	},
	{
		id: 'la-8',
		eqn_comp:
	[
		function(x,y) {
				return Math.pow(x,y);
					}],
		C_par : [1,2,3,4,5]
	}
	
];