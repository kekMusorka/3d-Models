(function() {
		grafar.config.debug = false;
        function getProblemById(id) {
            return problems.filter(function(pr) {
                return pr.id === id;
            })[0];
        };
		
		// var infoDiv = document.getElementById('info');
		// problems.forEach(function(pr) {
			// pr.div = document.createElement('div');
			// pr.div.innerHTML = pr.info;
		// });
		
		var panelMainDiv = document.getElementById('plot3d_main');
		panelMainDiv.addEventListener('mouseover', eulerface.lockScroll);
		panelMainDiv.addEventListener('mouseout', eulerface.unlockScroll);
		
		var panelCondDiv = document.getElementById('plot3d_cond');
		panelCondDiv.addEventListener('mouseover', eulerface.lockScroll);
		panelCondDiv.addEventListener('mouseout', eulerface.unlockScroll);
		
		var maxConditions = Math.max.apply(null, problems.map(function(p) {return p.conditions.length;})),
			maxLambda = Math.max.apply(null, problems.map(function(p) {return p.lambda.length;}));
			
		grafar.ui([
			{type: 'checkbox', id: 'show_cond', bind: animate},
			{type: 'label', init: 'Анимация'}
		], {container: 'options'});
		
		var pan3d_main = new grafar.Panel(document.getElementById('plot3d_main')),
			pan3d_anim = new grafar.Panel(document.getElementById('plot3d_cond'));
		
		var main_graf = new grafar.Object().pin(pan3d_main),
			main_cond = new grafar.Object().pin(pan3d_main),
			extrema_points_main = new grafar.Object().pin(pan3d_main),
			extrema_points_anim = new grafar.Object().pin(pan3d_anim),
			intersect = new grafar.Object().pin(pan3d_main),
			intersect2 = new grafar.Object().pin(pan3d_anim),
			cond_graf_1 = new grafar.Object().pin(pan3d_anim),
			cond_graf_2 = new grafar.Object().pin(pan3d_anim).hide(true);
		
		var problem,
			animate_forward = true;
			
		//updateProblem();
		
		function updateProblem() {
			problem = getProblemById(sel1.container.getAttribute('value'));
			var problemId = sel1.container.getAttribute('value');
			animate_forward = true;
			cond_graf_2.hide(true);
			
			hideAllBut(
                document.getElementById('solution1'), 
                document.getElementById('solution-' + problemId));
						
			pan3d_main.camera.position.set(-8, 8, 8);
			pan3d_anim.camera.position.set(-8, 8, 8);
						
			//Plotting Main function
			main_graf.reset()
					.constrain({what: 'x', maxlen: 50, as: grafar.seq(-5, 5, 'x')})
					.constrain({what: 'y', maxlen: 50, as: grafar.seq(-5, 5, 'y')})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = problem.eqn_comp(y[i], x[i]);
						}
					 }})
					 .refresh();
			main_graf.glinstances[0].object.children[0].material.color.r = 160/255;
			main_graf.glinstances[0].object.children[0].material.color.g = 255/255;
			main_graf.glinstances[0].object.children[0].material.color.b = 255/255;
			
			//Plotting starting graph for animated panel
			//cond_graf_2.reset();
			cond_graf_1.reset()
					.constrain({what: 'x', maxlen: 50, as: grafar.seq(-5, 5, 'x')})
					.constrain({what: 'y', maxlen: 50, as: grafar.seq(-5, 5, 'y')})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = problem.eqn_comp(y[i], x[i]);
						}
					 }})
					 .hide(false)
					 .refresh();
			cond_graf_1.glinstances[0].object.children[0].material.color.r = 160/255;
			cond_graf_1.glinstances[0].object.children[0].material.color.g = 255/255;
			cond_graf_1.glinstances[0].object.children[0].material.color.b = 255/255;
			
			cond_graf_2.reset()
					.constrain({what: 'x', maxlen: 50, as: grafar.seq(-5, 5, 'x')})
					.constrain({what: 'y', maxlen: 50, as: grafar.seq(-5, 5, 'y')})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = problem.eqn_comp(y[i], x[i]);
						}
					 }})
					 .refresh();
			cond_graf_2.glinstances[0].object.children[0].material.color.r = 0/255;
			cond_graf_2.glinstances[0].object.children[0].material.color.g = 204/255;
			cond_graf_2.glinstances[0].object.children[0].material.color.b = 0/255;
			
			//Plotting condition's graph
			var cond_f = problem.conditions_comp;
			main_cond.reset();
			main_cond.constrain({what: 'z', maxlen: 50, as: grafar.seq(-10, 10, 'z')});
			main_cond.constrain({what: 't', maxlen: 70, as: grafar.seq(0, 2 * Math.PI, 't')})
			if (problem.cond_type == 'explicit') {
				main_cond.constrain({what: 'x, y', using: 't', as: function(data, l) {
				var t = data.t;
				for (var i = 0; i < l; i++) {
					data.x[i] = cond_f[1](5 * t[i] / Math.PI - 5);
					data.y[i] = cond_f[0](5 * t[i] / Math.PI - 5);
				}
			}})
			} else if (problem.cond_type == 'polar') {
				main_cond.constrain({what: 'x, y', using: 't', as: function(data, l) {
				var t = data.t;
				for (var i = 0; i < l; i++) {
					data.x[i] = cond_f[1](t[i]);
					data.y[i] = cond_f[0](t[i]);
				}
			}})
			}
			main_cond.refresh();
			main_cond.glinstances[0].object.children[0].material.color.r = 155/255;
			main_cond.glinstances[0].object.children[0].material.color.g = 153/255;
			main_cond.glinstances[0].object.children[0].material.color.b = 153/255;
			
			//Plotting intersection 1
			var inter_f = problem.intersection;
			intersect.reset();
			intersect.constrain({what: 't', maxlen: 5000, as: grafar.seq(0, 2 * Math.PI, 't', false, true)});
			if (problem.intersect_type == 'explicit') {
				intersect.constrain({what: 'x, y', using: 't', as: function(data, l) {
					var t = data.t;
					for (var i = 0; i < l; i++) {
						data.x[i] = inter_f[2](5 * t[i] / Math.PI - 5);
						data.y[i] = inter_f[0](5 * t[i] / Math.PI - 5);
					}
				}})
			} else if (problem.intersect_type == 'polar') {
				intersect.constrain({what: 'x, y', using: 't', as: function(data, l) {
					var t = data.t;
					for (var i = 0; i < l; i++) {
						data.x[i] = inter_f[2](t[i]);
						data.y[i] = inter_f[0](t[i]);
					}
				}})
			}
			intersect.constrain({what: 'z', using: 'x, y', as: function(data, l) {
				var x = data.x, y = data.y;
				for (var i = 0; i < l; i++) {
					data.z[i] = inter_f[1](x[i], y[i]);
				}
			}})
			.refresh();
			intersect.glinstances[0].object.children[0].visible = true;
			intersect.glinstances[0].object.children[0].material.size = 5;
			intersect.glinstances[0].object.children[0].material.color.r = 255/255;
			intersect.glinstances[0].object.children[0].material.color.g = 140/255;
			intersect.glinstances[0].object.children[0].material.color.b = 0;
			intersect.glinstances[0].object.children[0].material.transparent = false;
			
			
			//Plotting intersection 2
			intersect2.reset();
			intersect2.constrain({what: 't', maxlen: 5000, as: grafar.seq(0, 2*Math.PI, 't', false, true)})
			if (problem.intersect_type == 'explicit') {
				intersect2.constrain({what: 'x, y', using: 't', as: function(data, l) {
					var t = data.t;
					for (var i = 0; i < l; i++) {
						data.x[i] = inter_f[2](5 * t[i] / Math.PI - 5);
						data.y[i] = inter_f[0](5 * t[i] / Math.PI - 5);
					}
				}})
			} else if (problem.intersect_type == 'polar') {
				intersect2.constrain({what: 'x, y', using: 't', as: function(data, l) {
					var t = data.t;
					for (var i = 0; i < l; i++) {
						data.x[i] = inter_f[2](t[i]);
						data.y[i] = inter_f[0](t[i]);
					}
				}})
			}
			intersect2.constrain({what: 'z', using: 'x, y', as: function(data, l) {
				var x = data.x, y = data.y;
				for (var i = 0; i < l; i++) {
					data.z[i] = inter_f[1](x[i], y[i]);
				}
			}})
			.refresh();
			intersect2.glinstances[0].object.children[0].visible = true;
			intersect2.glinstances[0].object.children[0].material.size = 5;
			intersect2.glinstances[0].object.children[0].material.color.r = 255/255;
			intersect2.glinstances[0].object.children[0].material.color.g = 140/255;
			intersect2.glinstances[0].object.children[0].material.color.b = 0;
			intersect2.glinstances[0].object.children[0].material.transparent = false;
			
			//Plotting Extrema points on main graph
			extrema_points_main.reset();
			var points = problem.extr_points;
			extrema_points_main.constrain({what: 'x, y', maxlen: 4, as: function(data, l) {
								var x = data.x, y = data.y;
								for (var i = 0; i < l; i++) {
									x[i] = points.x[i];
									y[i] = points.y[i];
								}
							}})
							.constrain({what: 'z', using: 'x, y', as: function (data, l) {
								var x = data.x, y = data.y;
								for (var j = 0; j < l; j++) {
									data.z[j] = problem.eqn_comp(x[j], y[j]);
								}
							}})
							.refresh();
			extrema_points_main.glinstances[0].object.children[0].visible = true;
			extrema_points_main.glinstances[0].object.children[1].visible = false;
			extrema_points_main.glinstances[0].object.children[0].material.transparent = false;
			extrema_points_main.glinstances[0].object.children[0].material.size = 20;
			extrema_points_main.glinstances[0].object.children[0].material.color.r = 255/255;
			extrema_points_main.glinstances[0].object.children[0].material.color.g = 69/255;
			extrema_points_main.glinstances[0].object.children[0].material.color.b = 0;
				
			//Plotting Extrema points on animated graph
			extrema_points_anim.reset();
			var points = problem.extr_points;
			extrema_points_anim.constrain({what: 'x, y', maxlen: 4, as: function(data, l) {
								var x = data.x, y = data.y;
								for (var i = 0; i < l; i++) {
									x[i] = points.x[i];
									y[i] = points.y[i];
								}
							}})
							.constrain({what: 'z', using: 'x, y', as: function (data, l) {
								var x = data.x, y = data.y;
								for (var j = 0; j < l; j++) {
									data.z[j] = problem.eqn_comp(x[j], y[j]);
								}
							}})
							.refresh();
			extrema_points_anim.glinstances[0].object.children[0].visible = true;
			extrema_points_anim.glinstances[0].object.children[1].visible = false;
			extrema_points_anim.glinstances[0].object.children[0].material.transparent = false;
			extrema_points_anim.glinstances[0].object.children[0].material.size = 20;
			extrema_points_anim.glinstances[0].object.children[0].material.color.r = 255/255;
			extrema_points_anim.glinstances[0].object.children[0].material.color.g = 69/255;
			extrema_points_anim.glinstances[0].object.children[0].material.color.b = 0;
		}
		
		function animate() {
			lam = problem.lambda;
			frame_rate = 20;
			var maxLam = problem.lambda.length;
			
			if (maxLam == 2)
				cond_graf_2.hide(false);
			else
				cond_graf_2.hide(true);
			
			var i = 0;
				f = problem.eqn_comp;
			function frame() {
				cur_lmbd = lam[0];
				cond_graf_1.constrain({what: 'x', maxlen: 50, as: grafar.seq(-5, 5, 'x')})
							.constrain({what: 'y', maxlen: 50, as: grafar.seq(-5, 5, 'y')})
				cond_graf_1.constrain({what: 'z', using: 'x, y', as:
					function(data, l) {
						if (animate_forward == true) {
							for (var k = 0; k < l; k++) {
								data.z[k] = f(data.y[k], data.x[k]) + (cur_lmbd * i / frame_rate) * problem.conditions_form[0](data.y[k], data.x[k]);
							}
						} else {
							for (var k = 0; k < l; k++) {
								data.z[k] = f(data.y[k], data.x[k]) + (cur_lmbd * (frame_rate - i) / frame_rate) * problem.conditions_form[0](data.y[k], data.x[k]);
							}
						}
					}})
					.refresh();
				
				if (maxLam == 2) {
					cur_lmbd = lam[1];
					cond_graf_2.constrain({what: 'x', maxlen: 50, as: grafar.seq(-5, 5, 'x')})
								.constrain({what: 'y', maxlen: 50, as: grafar.seq(-5, 5, 'y')})
					cond_graf_2.constrain({what: 'z', using: 'x, y', as:
						function(data, l) {
							if (animate_forward == true) {
								for (var k = 0; k < l; k++) {
									data.z[k] = f(data.y[k], data.x[k]) + (cur_lmbd * i / frame_rate) * problem.conditions_form[0](data.y[k], data.x[k]);
								}
							} else {
								for (var k = 0; k < l; k++) {
									data.z[k] = f(data.y[k], data.x[k]) + (cur_lmbd * (frame_rate - i) / frame_rate) * problem.conditions_form[0](data.y[k], data.x[k]);
								}
							}
						}})
						.refresh();
				}
				
				i++;
				if (i <= frame_rate)
					window.requestAnimationFrame(frame);
				else {
					if (!animate_forward)
						cond_graf_2.hide(true)
					animate_forward = !animate_forward;
				}
			}
			frame();
		}
		
		hideAllBut = function(container, visible) {
            var children = container.children;
            for (var i = 0; i < children.length; i++)
              children[i].style.display = 'none';
          visible.style.display = 'block';
        };
		
		sel1 = new eulerface.Select(document.getElementById('sel1')),
		
        sel1.container.addEventListener('change', updateProblem);
		
        sel1.addOption(document.getElementById('opt-la-1'), 'la-1');
        sel1.addOption(document.getElementById('opt-la-2'), 'la-2');
		// sel1.addOption(document.getElementById('opt-la-3'), 'la-3');
		// sel1.addOption(document.getElementById('opt-la-4'), 'la-4');
		sel1.addOption(document.getElementById('opt-la-5'), 'la-5');
		sel1.addOption(document.getElementById('opt-la-6'), 'la-6');
		// sel1.addOption(document.getElementById('opt-la-7'), 'la-7');
		// sel1.addOption(document.getElementById('opt-la-8'), 'la-8');
		// sel1.addOption(document.getElementById('opt-la-9'), 'la-9');
		sel1.addOption(document.getElementById('opt-la-10'), 'la-10');
	
        
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}());