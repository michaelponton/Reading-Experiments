$(function() {

	var $wrap = $('.wrap');
	var $content = $('.content');
	var $section = $('section');
	var $depth = 0;
	var $gridSize = 0;

	$(window).load(function () {
		gridStep();
	});
	$(window).resize(function () {
		gridStep();
	});

	function gridStep() {
		console.log('FN gridStep');
		// Égaliser hauteur des section
		$gridSize = $section.equalheight();
		console.log('$gridSize:', $gridSize);
		// passer la hauteur au body;
		$wrap.css('height', $content.height());
		// Detecter le scroll :
		$( window ).scroll(function() {
			// Obtenir la valeur de scroll :
			$depth = $(window).scrollTop();
			console.log('$depth:', $depth);
			// Calculer le nombre de ligne de grile scrollées :
			var $gridOffset = Math.round($depth/$gridSize);
			console.log('$gridOffset:', $gridOffset);
			console.log('$%%%:', $depth%$gridSize);
			// Positionner le contenu :
			$content.css('top', -1 * $gridSize * $gridOffset);
		});
	}

	// ALIGNER LA HAUTEUR D'ÉLÉMENTS
	$.fn.equalheight = function () {
		var cont = $(this),
				item = $(this),
				maxh = 0,
				itmh = 0;
		$(this).each(function(){
			// Réinitialiser (car la valeur peux etre inférieure après un appel de resize)
			item.css('min-height', 'initial');
			// Comparaison des hauteurs, on garde la plus grande
			item.each(function () {
			itmh = $(this).outerHeight();
				if (itmh > maxh) { 
					maxh = itmh;
				}
			})
			item.css('min-height', maxh);
		})
		return maxh;
	};
  
  // Back to top
  $('a.top').on('click', function (e) {
    e.preventDefault();
    $(document.body).animate(
      {scrollTop: 0},
      5000
    );
  });

});
