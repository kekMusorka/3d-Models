var problems = [
	{	id: 'la-1',
		eqn_comp: function(x, y) {
			return x*x+Math.pow(y-1,2) ;
		},
		extr_points_max: {x: [], y: []},
		N_max: [0],
		extr_points_min: {x: [1], y: [0]},
		N_min: [1]
		
	},
	{	id: 'la-2',
		eqn_comp: function(x, y) {
			return x*x-Math.pow(y-1,2);
		},
		extr_points_max: {x: [], y: []},
		N_max: [0],
		extr_points_min: {x: [1], y: [0]},
		N_min: [1]
		
	},
	{	id: 'la-3',
		eqn_comp: function(x, y) {
			return Math.pow(x-y+1,2);
		},
		extr_min_graf: function(x, y) {
			return x - 1;
		}
		
	},
	{	id: 'la-4',
		eqn_comp: function(x, y) {
			return x*x-x*y+y*y-2*x+y
		},
		extr_points_max: {x: [], y: []},
		N_max: [0],
		extr_points_min: {x: [0], y: [1]},
		N_min: [1]
		
	},	
	{	id: 'la-5',
		eqn_comp: function(x, y) {
			return Math.pow(x,4)+Math.pow(y,4)-Math.pow(x,2)-Math.pow(y,2)-2*x*y;
		},
		extr_points_max: {x: [0], y: [0]},
		N_max: [1],
		extr_points_min: {x: [-1,1], y: [-1,1]},
		N_min: [2]
		
	},
	{	id: 'la-6',
		eqn_comp: function(x, y) {
			return 2* Math.pow(x,4)+Math.pow(y,4)-Math.pow(x,2)-2*Math.pow(y,2);
		},
		extr_points_max: {x: [0], y: [0]},
		N_max: [1],
		extr_points_min: {x: [-1,1,-1,1], y: [-1/2,-1/2,1/2,1/2]},
		N_min: [4]
		
	},
	{	id: 'la-7',
		eqn_comp: function(x, y) {
			return x*y/(1+Math.pow(x,2)*Math.pow(y,2));
		},
		extr_points_max: {x: [1.46902,0.818246], y: [0.680724,1.22213]},
		N_max: [2],
		extr_points_min: {x: [-1.09624,0.845649], y: [0.912209,-1.18252]},
		N_min: [2]
		
	},
	{	id: 'la-8',
		eqn_comp: function(x, y) {
			return Math.sin(x)+Math.cos(y)+Math.cos(x-y);
		},
		extr_points_max: {x: [Math.PI/3 - 0.6,7*Math.PI/3 - 0.6,Math.PI/3 - 0.6,Math.PI/3 - 0.6,7*Math.PI/3 - 0.6,7*Math.PI/3 - 0.6,-5*Math.PI/3 - 0.6,-5*Math.PI/3- 0.6,-5*Math.PI/3- 0.6], y: [Math.PI/6 + 0.562,-11*Math.PI/6 + 0.562,-11*Math.PI/6 + 0.562,13*Math.PI/6 + 0.562,Math.PI/6 + 0.562,13*Math.PI/6 + 0.562,Math.PI/6 + 0.562,-11*Math.PI/6 + 0.562,13*Math.PI/6 + 0.562]},
		N_max: [5],
		extr_points_min: {x: [-Math.PI/3 - 2.66,-Math.PI/3 - 2.66,-Math.PI/3 - 2.66,5*Math.PI/3 - 2.66,5*Math.PI/3 - 2.66,5*Math.PI/3 - 2.66,11*Math.PI/3 - 2.66,11*Math.PI/3 - 2.66,11*Math.PI/3 - 2.66], y: [-7*Math.PI/6 - 3.632,5*Math.PI/6 - 3.632,17*Math.PI/6 - 3.62,-7*Math.PI/6 - 3.62,5*Math.PI/6 - 3.62,17*Math.PI/6 - 3.62,-7*Math.PI/6 - 3.632,5*Math.PI/6 - 3.632,17*Math.PI/6 - 3.632]},
		N_min: [1]
		
	}
	/*{	id: 'la-2',
		eqn: 'z == x+y-(x^2+y^2)^{1/2}',
		eqn_comp: function(x, y) {
			return 2*x*x+2*y*y-x*x*x*x-y*y*y*y;
		},
		der_1: [
			function(x,y) {
				return 4*x-4*Math.pow(x,3);
			},
			function(x,y) {
				return 4*y-4*Math.pow(y,3);
			}
		],
		der_2:[
		function(x,y) {
				return 4-12*Math.pow(x,2);
			},
		
		function(x,y) {
				return 4-12*Math.pow(y,2);
			},
		function(x,y) {
				return 0; // смешаная производная
			}
		],
		extr_points_max: {x: [-1,1,-1,1], y: [-1,-1,1,1]},
		N_max: [4],
		extr_points_min: {x: [0], y: [0]},
		N_min: [1]
		
		*/
	]	
	