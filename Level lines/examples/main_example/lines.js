(function() {
	grafar.config.debug = false;
    function getProblemById(id) {
        return problems.filter(function(pr) {
            return pr.id === id;
        })[0];
    }
	function setupView(graph) {
		graph.glinstances[0].object.children[0].visible = true;
		graph.glinstances[0].object.children[0].material.size = 3;
		graph.glinstances[0].object.children[0].material.color.r = 255/255;
		graph.glinstances[0].object.children[0].material.color.g = 165/255;
		graph.glinstances[0].object.children[0].material.color.b =   0/255;
		graph.glinstances[0].object.children[0].material.transparent = false;
	}

	var panelMainDiv = document.getElementById('plot3d');
	panelMainDiv.addEventListener('mouseover', eulerface.lockScroll);
	panelMainDiv.addEventListener('mouseout', eulerface.unlockScroll);

	var panelCondDiv = document.getElementById('plot2d');
    panelCondDiv.addEventListener('mouseover', eulerface.lockScroll);
    panelCondDiv.addEventListener('mouseout', eulerface.lockScroll);

	grafar.ui([
		{type: 'range', init: '0', min: '-5', max: '5', step : '0.05', id: 'c_param', bind: updateProblem},
		{type: 'checkbox', id: 'auto_pt_select', bind: blockrender},
	    {type: 'label', init: 'Отобразить несколько линий уровня'}
	], {container: 'options'});

    var pan3d = new grafar.Panel(document.getElementById('plot3d')),
	    pan2d = new grafar.Panel(document.getElementById('plot2d')),
	    main_graf = new grafar.Object().pin(pan3d),
		plate = new grafar.Object().pin(pan3d),
		intersec_1 = new grafar.Object().pin(pan3d),
		sub_graf_1 = new grafar.Object().pin(pan2d)
		mass_inter=[];

    pan2d.setAxes(grafar.setpop(['x', 'y', 'z'], 'z'));
	pan3d.camera.position.set(-15, 5, 5);
	pan2d.camera.position.set(0, -1,-10);
	
	for (var i = 0; i < 5; i++) 
	{
			mass_inter.push(new grafar.Object().pin(pan2d));
			
	}
	for (var i = 0; i < 5; i++) 
					mass_inter[i].hide(true);
	function blockrender()
	{
			var autoPtSelect = document.getElementById('auto_pt_select').checked;
			if (autoPtSelect) 
			{
				sub_graf_1.hide(false);
			    intersec_1.hide(false);
				plate.hide(false);
				for (var i = 0; i < 5; i++) 
					mass_inter[i].hide(false);
			
	        }
			
			else 
			{
				sub_graf_1.hide(false);
			    intersec_1.hide(false);
				plate.hide(false);
				for (var i = 0; i < 5; i++) 
					mass_inter[i].hide(true);
			}
			updateProblem();
		}

    function updateProblem() {
		var C = document.getElementById('c_param').val;
		var problemId = sel1.container.getAttribute('value');
		var problem = getProblemById(sel1.container.getAttribute('value'));

		var fun = problem.eqn_comp[0];
		var funl = function(a) {
			return function(v) {
				if (problem.id == 'la-2') {
					return fun(v[0], v[1]) + a;
				}
				return fun(v[0], v[1]) - a;
			};
		};

	
	
		main_graf.reset()
			.constrain({what: 'x', maxlen: 300, as: grafar.seq(-7, 7, 'x')})
			.constrain({what: 'y', maxlen: 300,as: grafar.seq(-7, 7, 'y')})
			.constrain({what: 'z', using: 'x, y', as: function (data, l) {
				var x = data.x, y = data.y;
				for (var i = 0; i < l; i++) {
					if (problem.id == 'la-4' || problem.id == 'la-5') {
					data.z[i] = fun(y[i], x[i]);
					} else {
						data.z[i] = fun(x[i], y[i]);
					}
				}
			}})
			.refresh();
		main_graf.colorize({using: '', as: grafar.Style.constantColor(90/255, 6/255, 239/255)});

		plate.reset()
			.constrain({what: 'x', maxlen: 100, as: grafar.seq(-7, 7, 'x')})
			.constrain({what: 'y', maxlen: 100, as: grafar.seq(-7, 7, 'y')})
			.constrain({what: 'z', using: 'x, y', as: grafar.constant(C, 'z')})
			.colorize({using: '', as: grafar.Style.constantColor(0 / 255.0, 141 / 255.0, 156 / 255.0)})
			.refresh();


		intersec_1
			.constrain({what: 'x,y', as: grafar.traceZeroSet(funl(C), ['x', 'y']), maxlen: 5000, dicrerte: true})
			.constrain({what: 'z', as: grafar.constant(C, 'z'), maxlen: 1})
			.refresh();
		setupView(intersec_1);

		sub_graf_1.reset()
			.constrain({what: 'x,y', as: grafar.traceZeroSet(funl(C), ['x', 'y']), maxlen: 5000, dicrerte: true})
			.refresh();
		setupView(sub_graf_1);
		
		
		for (var i = 0; i < 5; i++) 
		{
			mass_inter[i]
			.constrain({what: 'x,y', as: grafar.traceZeroSet(funl(problem.C_par[i]), ['x', 'y']), maxlen: 5000, dicrerte: true})
			.constrain({what: 'z', as: grafar.constant(problem.C_par[i], 'z'), maxlen: 1})
			.refresh();
		    setupView(mass_inter[i]);
		}
		
		
		
		
		
	}

	sel1 = new eulerface.Select(document.getElementById('sel1')),
    sel1.container.addEventListener('change', updateProblem);

	for (var k = 1; k <= problems.length; k++) {
		if (k != 8) {
		sel1.addOption(document.getElementById('opt-la-' + k), 'la-' + k);
		}
	}

    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}());
