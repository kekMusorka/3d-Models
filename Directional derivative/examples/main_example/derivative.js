(function() {

        function norm(a) {
		var aNorm2 = 0,
			l = a.length;
		for (var i = 0; i < l; i++)
			aNorm2 += a[i] * a[i];
		aNorm2 = Math.sqrt(aNorm2);
		return aNorm2;
	}
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
		
		var xInpDiv = document.getElementById('x_input'),
			yInpDiv = document.getElementById('y_input');
		xInpDiv.addEventListener('change', updateProblem);
		yInpDiv.addEventListener('change', updateProblem);
		
		var x1ptDiv = document.getElementById('x_pt1'),
			y1ptDiv = document.getElementById('y_pt1');
		x1ptDiv.addEventListener('change', updateProblem);
		y1ptDiv.addEventListener('change', updateProblem);
	
				
		
		var pan3d_main = new grafar.Panel(document.getElementById('plot3d_main'));
		
		var main_graf = new grafar.Object().pin(pan3d_main),
			tang_plane = new grafar.Object().pin(pan3d_main),
			intersec = new grafar.Object().pin(pan3d_main),
			tang_point_graf = new grafar.Object().pin(pan3d_main),
			vect_nap = new grafar.Object().pin(pan3d_main),
			vect_point = new grafar.Object().pin(pan3d_main),
			kasat = new grafar.Object().pin(pan3d_main),
			vect = new grafar.Object().pin(pan3d_main),
			problem;
			
		var Main_point = [0, 0];
	    var Vect_point = [0, 0];
		
		pan3d_main.camera.position.set(-8, 8, 8);
		
		
		var tang=0;
		var b=0;
		var resul=0;
		var k=1;
		
		
		
		
		function blockvect() {
			vect_nap.hide(false);
			vect_point.hide(false);
			updateProblem();
		}
		
		
		function updateProblem() {
		
			
			var xInp = parseFloat(document.getElementById('x_input').value),
				yInp = parseFloat(document.getElementById('y_input').value),
				//координаты направляющего вектора
				x1pt = parseFloat(document.getElementById('x_pt1').value),
				y1pt = parseFloat(document.getElementById('y_pt1').value);
				
		
			
			tang= x1pt/y1pt;
		    b=yInp-tang*xInp;
			
			
			Main_point[0] = xInp;
			Main_point[1] = yInp;
			Vect_point[0] = x1pt;
			Vect_point[1] = y1pt; 
			
			problem = getProblemById(sel1.container.getAttribute('value'));
			var problemId = sel1.container.getAttribute('value');
			
			Main_point[2] = problem.eqn_comp(Main_point[0], Main_point[1]);
			
			
			hideAllBut(
                document.getElementById('solution1'), 
                document.getElementById('solution-' + problemId));
				
			//считаем проихводную
			document.getElementById('res').disabled = true;
			tang=problem.grad_n[0](xInp, yInp);
			b=problem.grad_n[1](xInp, yInp);
			if (norm(Vect_point) != 0)
				resul= (problem.grad_n[0](xInp, yInp)*x1pt+problem.grad_n[1](xInp, yInp)*y1pt)/norm(Vect_point);
			else resul=NaN;
			document.getElementById('res').value=resul.toFixed(3);
			
			//Plotting Main function
			main_graf.reset()
					.constrain({what: 'x', maxlen: 100, as: grafar.seq(-8.5, 8.5, 'x')})
					.constrain({what: 'y', maxlen: 100, as: grafar.seq(-8.5, 8.5, 'y')})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {

							data.z[i] = problem.eqn_comp(y[i], x[i]);
						}
					 }})
					 .refresh();
			main_graf.glinstances[0].object.children[0].material.color.r = 180/255;
			main_graf.glinstances[0].object.children[0].material.color.g = 210/255;
			main_graf.glinstances[0].object.children[0].material.color.b = 255/255;
			
			//Ploting starting tangential plane
		
			tang_plane.reset()
			        .constrain({what: 'z', maxlen: 30, as: grafar.seq(-8, 8, 'z')})
					.constrain({what: 't', maxlen: 30, as: grafar.seq(-5, 5, 't')})
					.constrain({what: 'x, y,', using: 't', as: function(data, l) {
							var t = data.t;
							for (var i = 0; i < l; i++) {
								data.x[i] = Main_point[0] + t[i] * Vect_point[0] ;
								data.y[i] = Main_point[1] + t[i] * Vect_point[1] ;
								
							}
						}})
						.refresh();
				tang_plane.glinstances[0].object.children[0].material.color.r = 100/255;
				tang_plane.glinstances[0].object.children[0].material.color.g = 0/255;
				tang_plane.glinstances[0].object.children[0].material.color.b = 0/255;
				
				
				//Plotting tangential point (where the tangential plane is built)
			tang_point_graf.reset()
			tang_point_graf.constrain({what: 'x, y, z', maxlen: 1, as: function(data, l) {
							var x = data.x, y = data.y, z = data.z;
							x[0] = Main_point[0];
							y[0] = Main_point[1];
							z[0] = Main_point[2];
						}})
						.refresh();
			tang_point_graf.glinstances[0].object.children[0].visible = true;
			tang_point_graf.glinstances[0].object.children[0].material.transparent = false;
			tang_point_graf.glinstances[0].object.children[0].material.size = 20;
			tang_point_graf.glinstances[0].object.children[0].material.color.r = 25/255;
			tang_point_graf.glinstances[0].object.children[0].material.color.g = 255/255;
			tang_point_graf.glinstances[0].object.children[0].material.color.b = 25/255;
			
		
			
				/*
			//Plotting intersec
			intersec.reset();
			intersec.constrain({what: 'x', maxlen: 10000, as: grafar.seq(-5, 5, 'x', false, true)})
						.constrain({what: 'y', using: 'x', as: function (data, l) {
							var x = data.x;
							for (var i = 0; i < l; i++) {
								data.y[i] = tang*x[i]+b;
							}
						}})
						.constrain({what: 'z', using: 'x,y', as: function (data, l) {
							var x = data.x, y = data.y;
							for (var i = 0; i < l; i++) {
								data.z[i] = problem.eqn_comp(x[i], y[i]);
							}
						}})
						.refresh();
			intersec.glinstances[0].object.children[0].visible = true;
			intersec.glinstances[0].object.children[0].material.size = 5;
			intersec.glinstances[0].object.children[0].material.color.r = 255/255;
			intersec.glinstances[0].object.children[0].material.color.g = 140/255;
			intersec.glinstances[0].object.children[0].material.color.b = 0;
			intersec.glinstances[0].object.children[0].material.transparent = false;
					
			
			
	
			kasat.reset()
					.constrain({what: 'x', maxlen: 10000, as: grafar.seq(-5, 5, 'x', false, true)})
					.constrain({what: 'y', using: 'x', as: function(data, l) {
							var x = data.x;
							for (var i = 0; i < l; i++) {
								data.y[i] =  tang*x[i]+b;
							}
						}})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = Main_point[2] + problem.grad_n[0](xInp, yInp)*(x[i]-Main_point[0])+ problem.grad_n[1](xInp, yInp)*(y[i]-Main_point[1]) ;
						}
					 }})
					 .refresh();
			kasat.glinstances[0].object.children[0].visible = true;
			kasat.glinstances[0].object.children[0].material.size = 3;
			kasat.glinstances[0].object.children[0].material.color.r = 25/255;;
			kasat.glinstances[0].object.children[0].material.color.g = 255/255;
			kasat.glinstances[0].object.children[0].material.color.b =  25/255;
			kasat.glinstances[0].object.children[0].material.transparent = false;
		*/
		
		kasat.reset()
					.constrain({what: 't', maxlen: 1000, as: grafar.seq(-5, 5, 't', false, true)})
					.constrain({what: 'x, y,', using: 't', as: function(data, l) {
							var t = data.t;
							for (var i = 0; i < l; i++) {
								data.x[i] = Main_point[0] + t[i] * Vect_point[0] ;
								data.y[i] = Main_point[1] + t[i] * Vect_point[1] ;
								
							}
						}})
					.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {
							data.z[i] = Main_point[2] + problem.grad_n[0](xInp, yInp)*(x[i]-Main_point[0])+ problem.grad_n[1](xInp, yInp)*(y[i]-Main_point[1]) ;
						}
					 }})
					 .refresh();
			kasat.glinstances[0].object.children[0].visible = true;
			kasat.glinstances[0].object.children[0].material.size = 3;
			kasat.glinstances[0].object.children[0].material.color.r = 25/255;;
			kasat.glinstances[0].object.children[0].material.color.g = 255/255;
			kasat.glinstances[0].object.children[0].material.color.b =  25/255;
			kasat.glinstances[0].object.children[0].material.transparent = false;
			
			
			 intersec.reset()
						.constrain({what: 't', maxlen: 5000, as: grafar.seq(-5, 5, 't')})
						.constrain({what: 'x,y', using: 't', as: function(data, l) {
							var t = data.t;
							for (var i = 0; i < l; i++) {
								data.x[i] = Main_point[0] + t[i] * Vect_point[0] ;
								data.y[i] = Main_point[1] + t[i] * Vect_point[1] ;
							}
						}})
						.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {

							data.z[i] = problem.eqn_comp(x[i], y[i]);
						}
					    }})
						.refresh();
	
			 intersec.glinstances[0].object.children[0].visible = true;
			 intersec.glinstances[0].object.children[0].material.size = 7;
			 intersec.glinstances[0].object.children[0].material.color.r = 255/255;
			 intersec.glinstances[0].object.children[0].material.color.g = 255/255;
			 intersec.glinstances[0].object.children[0].material.color.b =   150/255;
			 intersec.glinstances[0].object.children[0].material.transparent = false;
			 
			 
			vect_nap.reset()
						.constrain({what: 't', maxlen: 1000, as: grafar.seq(0, 1, 't')})
						.constrain({what: 'x,y', using: 't', as: function(data, l) {
							var t = data.t;
							for (var i = 0; i < l; i++) {
								data.x[i] = Main_point[0]+ t[i] * Vect_point[0]/norm(Vect_point) ;
								data.y[i] = Main_point[1]+ t[i] * Vect_point[1]/norm(Vect_point) ;
							}
						}})
						.constrain({what: 'z', using: 'x, y', as: function (data, l) {
						var x = data.x, y = data.y;
						for (var i = 0; i < l; i++) {

							data.z[i] = problem.eqn_comp(Main_point[0],Main_point[1]);
						}
					    }})
						.refresh();
	
			 vect_nap.glinstances[0].object.children[0].visible = true;
			 vect_nap.glinstances[0].object.children[0].material.size = 6;
			 vect_nap.glinstances[0].object.children[0].material.color.r = 155/255;
			 vect_nap.glinstances[0].object.children[0].material.color.g = 0/255;
			 vect_nap.glinstances[0].object.children[0].material.color.b =   200/255;
			vect_nap.glinstances[0].object.children[0].material.transparent = false;
				
			vect_point.reset()
			vect_point.constrain({what: 'x, y, z', maxlen: 1, as: function(data, l) {
							var x = data.x, y = data.y, z = data.z;
							x[0] = Main_point[0]+Vect_point[0]/norm(Vect_point);
							y[0] = Main_point[1]+Vect_point[1]/norm(Vect_point);
							z[0] = problem.eqn_comp(Main_point[0],Main_point[1]);
						}})
						.refresh();
			vect_point.glinstances[0].object.children[0].visible = true;
			vect_point.glinstances[0].object.children[0].material.transparent = false;
			vect_point.glinstances[0].object.children[0].material.size = 12;
			vect_point.glinstances[0].object.children[0].material.color.r = 225/255;
			vect_point.glinstances[0].object.children[0].material.color.g = 0/255;
			vect_point.glinstances[0].object.children[0].material.color.b = 0/255;
			
}
		
		hideAllBut = function(container, visible) {
            var children = container.children;
            for (var i = 0; i < children.length; i++)
              children[i].style.display = 'none';
          visible.style.display = 'block';
        };
		
		sel1 = new eulerface.Select(document.getElementById('sel1')),
		
        sel1.container.addEventListener('change', updateProblem);
		
		for (var k = 1; k <= problems.length; k++) {
			sel1.addOption(document.getElementById('opt-la-' + k), 'la-' + k);
		}
        
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}());