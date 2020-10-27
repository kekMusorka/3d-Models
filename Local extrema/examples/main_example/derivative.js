(function() {
		grafar.config.debug = false;
        function getProblemById(id) {
            return problems.filter(function(pr) {
                return pr.id === id;
            })[0];
        };
		
	var panelMainDiv = document.getElementById('plot3d_main');
		panelMainDiv.addEventListener('mouseover', eulerface.lockScroll);
		panelMainDiv.addEventListener('mouseout', eulerface.unlockScroll);
		
	var pan3d_main = new grafar.Panel(document.getElementById('plot3d_main'));
		
    var main_graf = new grafar.Object().pin(pan3d_main),
		ex_1_point_max=[],
		global_extr = new grafar.Object().pin(pan3d_main),
		ex_1_point_min=[],
		problem;
		
	for (var i = 0; i < 20; i++) {
			ex_1_point_max.push(new grafar.Object().pin(pan3d_main));
			ex_1_point_min.push(new grafar.Object().pin(pan3d_main));
		}
	
	pan3d_main.camera.position.set(2, 2, 10);
		
	function updateProblem() 
		{
			
			problem = getProblemById(sel1.container.getAttribute('value'));
			var problemId = sel1.container.getAttribute('value');
		
		for (var i = 0; i < 20; i++) 
		{
		ex_1_point_max[i].hide(true);
		ex_1_point_min[i].hide(true);
		}
		
			//Plotting Main function----------------------------------------------------------------------
			main_graf.reset()
					.constrain({what: 'x', maxlen: 150, as: grafar.seq(-10, 10, 'x')})
					.constrain({what: 'y', maxlen: 150, as: grafar.seq(-10, 10, 'y')})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {

							data.z[i] = problem.eqn_comp(x[i], y[i]);
						}
					 }})
                     .colorize({using: '', as: grafar.Style.constantColor(170 / 255.0, 255 / 255.0, 180 / 255.0)})
					 .refresh();
			
			//---------------------------------------------------------------------------------------------
			
		if (problem.id=='la-1' || problem.id=='la-2'||problem.id=='la-4'||problem.id=='la-5'||problem.id=='la-6'||problem.id=='la-7'|| problem.id=='la-8'){
			global_extr.hide(true);
			for (var i = 0; i < problem.N_max; i++)
			{
			
			ex_1_point_max[i].hide(false);
			ex_1_point_max[i].constrain({what: 'x, y', maxlen: 9, as: function(data, l) {
								var x = data.x, y = data.y;
								for (var i = 0; i < l; i++) {
									x[i] = problem.extr_points_max.x[i];
									y[i] = problem.extr_points_max.y[i];
								}
							}})
							.constrain({what: 'z', using: 'x, y', as: function (data, l) {
								var x = data.x, y = data.y;
								for (var j = 0; j < l; j++) {
									data.z[j] = problem.eqn_comp(x[j], y[j]);
									if (problem.id=='la-6') {
										data.z[j] = 0;
									}
									if (problem.id=='la-8') {
										// data.z[j] = problem.eqn_comp(x[j], y[j]);
										data.z[j] += 0.88;
									}
								}
							}})
							.refresh();
			ex_1_point_max[i].glinstances[0].object.children[0].visible = true;
			ex_1_point_max[i].glinstances[0].object.children[1].visible = false;
			ex_1_point_max[i].glinstances[0].object.children[0].material.transparent = false;
			ex_1_point_max[i].glinstances[0].object.children[0].material.size = 20;
			ex_1_point_max[i].glinstances[0].object.children[0].material.color.r = 255/255;
		    ex_1_point_max[i].glinstances[0].object.children[0].material.color.g = 128/255;
			ex_1_point_max[i].glinstances[0].object.children[0].material.color.b = 0;
			
		
			}
            for (var i = 0; i < problem.N_min; i++) 	
			{	
		     ex_1_point_min[i].hide(false);
			 ex_1_point_min[i].constrain({what: 'x, y', maxlen: 9, as: function(data, l) {
								var x = data.x, y = data.y;
								for (var i = 0; i < l; i++) {
									x[i] = problem.extr_points_min.x[i];
									y[i] = problem.extr_points_min.y[i];
								}
							}})
							.constrain({what: 'z', using: 'x, y', as: function (data, l) {
								var x = data.x, y = data.y;
								for (var j = 0; j < l; j++) {
									data.z[j] = problem.eqn_comp(x[j], y[j]);
									if (problem.id=='la-1') {
										data.z[j] = 0;
									}
									if (problem.id=='la-4') {
										data.z[j] = -1;
									}
									if (problem.id=='la-6') {
										data.z[j] = -1.05;
									}
									if (problem.id=='la-8') {
										// data.z[j] = problem.eqn_comp(x[j], y[j]);
										data.z[j] -= 2.78;
									}
								}
							}})
							.refresh();
			ex_1_point_min[i].glinstances[0].object.children[0].visible = true;
			ex_1_point_min[i].glinstances[0].object.children[1].visible = false;
			ex_1_point_min[i].glinstances[0].object.children[0].material.transparent = false;
			ex_1_point_min[i].glinstances[0].object.children[0].material.size = 20;
			ex_1_point_min[i].glinstances[0].object.children[0].material.color.r = 255/255;
		    ex_1_point_min[i].glinstances[0].object.children[0].material.color.g = 0/255;
			ex_1_point_min[i].glinstances[0].object.children[0].material.color.b = 0;
			
			
			
			}			
		
		}
		else
		{
			global_extr.hide(false);
			global_extr.reset()
					.constrain({what: 'x', maxlen: 500, as: grafar.seq(-10, 10, 'x')})
					.constrain({what: 'y', using: 'x', as: function (data, l) {
						var x = data.x;
						for (var i = 0; i < l; i++) {

							data.y[i] = problem.extr_min_graf(x[i]);
						}
					 }})
					 .constrain({what: 'z', using: 'x,y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = problem.eqn_comp(x[i], y[i]);
							if (problem.id=='la-3') {
										data.z[i] = 0;
									}
						}
					 }})
					  .refresh();
                    global_extr.glinstances[0].object.children[0].visible = true;
					global_extr.glinstances[0].object.children[0].material.size = 10;
					global_extr.glinstances[0].object.children[0].material.color.r = 255/255;
					global_extr.glinstances[0].object.children[0].material.color.g = 0/255;
					global_extr.glinstances[0].object.children[0].material.color.b =   0/255;
					global_extr.glinstances[0].object.children[0].material.transparent = false;
					
			
			
			
		}
		}	
			
			
			
		
		
	
        
		
		sel1 = new eulerface.Select(document.getElementById('sel1')),
		
        sel1.container.addEventListener('change', updateProblem);
		
		for (var k = 1; k <= problems.length; k++) {
			if (k != 7) {
			sel1.addOption(document.getElementById('opt-la-' + k), 'la-' + k);
			}
		}
		
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}());