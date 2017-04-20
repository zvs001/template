(function(){

	//stop animation
	window.addEventListener("load", removeLoadingClass);
	function removeLoadingClass() {
		setTimeout(function(){
		  document.body.className = document.body.className.replace("no-anim", "");
		}, 200);
	}


	////	home
	//slider >  slider-screens
	$(".sc .sc__slides").slick({
		prevArrow: $(".sc__arrow.left"),
		nextArrow: $(".sc__arrow.right"),
		fade: true,
		appendDots: $(".sc__pagination"),
		dots: true
	});

	//requst form
	$("#reqf_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#reqf2_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#reqf3_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#pop-cb_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#coo_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#ord_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$("#call_phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	

	//home form
	if( $(".reqf__form,.subs__form")[0] ){
		$( ".reqf__form" ).on( "submit", function( event ) {
		  event.preventDefault();
		  var validator = new FormValidator();
		  var result = validator.validate(this);
		  if(result){
		  
		  	//send $( this ).serialize()
		  
		  }
		});
	}
	
	//footer feedback form
	if( $(".pop-cb__form")[0] ){
		$( ".pop-cb__form" ).on( "submit", function( event ) {
		  event.preventDefault();
		  var validator = new FormValidator();
		  var result = validator.validate(this);
		  //send $( this ).serialize()
		  $(".pop-cb__submit").prop("disabled", "disabled");
		});
	}

	$(".foot__button, .map__board-button").click(function(){
		$(".pop__wrapper").addClass("active");
	});
	$(".pop__close").click(function(){
		$(".pop__wrapper").removeClass("active");
	});

	// Cases popup seo




	var revs__slider = ".revs .revs__slider";
	if($(revs__slider)[0]){
		revs__slider = $( revs__slider );
		revs__slider.slick({
			infinite: true,
			slidesToScroll: 1,
			slidesToShow: 3,
			variableWidth: true,
			prevArrow: $(".revs__slider-arrow.left"),
			nextArrow: $(".revs__slider-arrow.right"),
			speed: 300,
			draggable: false
		});
		revs__slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$(".revs .slick-slide").removeAttr('style');
			var tg = $($(".revs .slick-active")[2]);
			tg.animate({
			    width: "400px"
			  }, 150, function(){
			  	$(".revs .slick-active")[2].style.removeProperty('width');
			  });
			$($(".revs .slick-active")[2]).addClass("big");
		});

		revs__slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$(".revs__slide-wrap").removeClass("big");
			$(".revs .slick-slide").removeAttr('style');
		});
	}

	$('.revs__slide').magnificPopup({
		  type: 'image',
		  removalDelay: 300, //delay removal by X to allow out-animation
		  callbacks: {
		    beforeOpen: function() {
		      // just a hack that adds mfp-anim class to markup 
		       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		       this.st.mainClass = this.st.el.attr('data-effect');
		    }
		  },
		  closeOnContentClick: true,
		  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});
	
	var trust = ".trust__slides";
	if($(trust)[0]){
		trust = $(trust).slick({
			prevArrow: $(".trust__arrow.left"),
			nextArrow: $(".trust__arrow.right"),
			slidesToShow: 7,
			slidesToScroll: 3,
			responsive: [
				{
			      breakpoint: 1100,
			      settings: {
			        slidesToShow: 5,
			        slidesToScroll: 2,
			      }
			    },
			    {
			      breakpoint: 850,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 1
			      }
			    },			    
			    {
			      breakpoint: 500,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			]
		});
	}

	var equalHeightBlog = function(){
			$(".blog__item").not(".full").find(".blog__item-title").each(function(i, item){
				item = $(item);
				var t_h = item.height(),
					t_lh = parseInt($(item).css('line-height'), 10),
					t_max = 3;//max rows 
				var d = item.parent().children(".blog__item-desc"),
					d_lh = parseInt($(d).css('line-height'), 10),
					d_max = 5,//max rows by default
					d_h = d_max * d_lh;

				var free = t_max * t_lh - t_h;

				if(d_lh !== 0){
					while(free > d_lh){
						d_h += d_lh;
						free -= d_lh;
					}
					d.css("height", d_h);
				}
			});
		};

	//blog widjet
	
	$(".blog__widget .blog__widget-link").click(function(e){
		var toggle = this.dataset.toggle;
		var className = ".blog__widget .tag-" + toggle;
		var arr = $(className);
		var i=0;

		$(".blog__widget .blog__widget-item").css("display", "none");
		$(".blog__widget .blog__widget-link").removeClass("active");
		this.className += " active";

		for(i; i<3; i++){
			if(arr[i]){
				arr[i].style.display = "block";
			}
		}

		//dynamic height
		equalHeightBlog();
	});
	$(".blog__widget").ready(function(){
		$(".blog__widget .blog__widget-link:first-child").click();
	});

	equalHeightBlog();

	$("#go-top").click(function(){
		 $('html, body').animate({
		    scrollTop: 0
		 }, 1400);
	});

	//map
	if(document.getElementById('google-map')){
	    jQuery(document).ready(function() {
	    	var map_styles = [
		    {
			        "featureType": "all",
			        "stylers": [
			            {
			                "hue": "#dde1e3"
			            },
			            {
			                "saturation": 60
			            },
			            {
			                "lightness": -10
			            }
			        ]
			    }
			];
			var map__string = 
				'<div class="mpop">' + 
					'<h3 class="h3 mpop__title">Маркетинг Ап</h3>' + 
					'<p class="mpop__desc">Агентство интернет-маркетинга полного цикла</p>' + 
					'<span class="mpop__span">Россия, г. Москва, ул. Южнопортовая д. 7</span>' +
				'</div>';
			var M = document.getElementById('google-map');

	        var latitude = parseFloat(M.dataset.centery),
	            longitude = parseFloat(M.dataset.centerx),
	            map_zoom = 16;

	        var map_options = {
	            center: new google.maps.LatLng(latitude, longitude),
	            zoom: map_zoom,
	            panControl: false,
	            mapTypeControl: false,
	            streetViewControl: false,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            scrollwheel: false,
				mapTypeControlOptions: {
				  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
	        };
	        var map = new google.maps.Map(M, map_options);
	        var marker_url = '../images/svg/mark.svg';
	        var icon = {
				url: '../images/svg/mark.svg', // url
				scaledSize: new google.maps.Size(41, 56)//, // scaled size
				// origin: new google.maps.Point(0,0), // origin
				// anchor: new google.maps.Point(0, 0) // anchor
			};
			
			var infowindow = new google.maps.InfoWindow({
	          content: map__string
	        });

	        var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(
	            	parseFloat(M.dataset.y),// || 55.707059, 
	            	parseFloat(M.dataset.x)// || 37.692489
	            ),
	            map: map,
	            visible: true,
	            icon: icon
	        });
	        
	        marker.addListener('click', function() {
	          infowindow.open(map, marker);
	        });
		    var styledMap = new google.maps.StyledMapType(map_styles, {name: "Styled Map"});
		    map.mapTypes.set('map_style', styledMap);
	  		map.setMapTypeId('map_style');


	  		var myoverlay = new google.maps.OverlayView();
			myoverlay.draw = function () {
			    //id for map layer
			    var mapLayer = this.getPanes().markerLayer.nextElementSibling;
			    if(mapLayer) mapLayer.id='grayscale'; 
			};
			myoverlay.setMap(map);

	    });
	}//map end

	//about page
	$(".partners__l-slides").slick({
		prevArrow: $(".partners__l-arrow.left"),
		nextArrow: $(".partners__l-arrow.right"),
		appendDots: $(".partners__l-pagination"),
		dots: true,
		slidesToShow: 3,
		speed: 300,
		draggable: false
	});
	$(".partners__r-slides").slick({
		prevArrow: $(".partners__r-arrow.left"),
		nextArrow: $(".partners__r-arrow.right"),
		appendDots: $(".partners__r-pagination"),
		dots: true,
		slidesToShow: 2,
		speed: 300,
		draggable: false
	});

	var sertSlider = $(".sert .sert__slides");
	var classNameSert = "sert__slide-center";
	sertSlider.slick({
		prevArrow: $(".sert .sert__arrow.left"),
		nextArrow: $(".sert .sert__arrow.right"),
		centerMode: true,
  		focusOnSelect: true,
  		variableWidth: true,
  		speed: 600,
  		swipe: false
	});
	

	var sertReset = function(event, slick, currentSlide, nextSlide){
		$(".sert .sert__slide").each(function(index, item){
			if($(item).data("slick-index") == nextSlide)
			{
				$(".sert .sert__slide").removeClass(classNameSert);
				$(item).addClass(classNameSert);
			}
		});
	};
	sertSlider.on('beforeCalculate', sertReset);
	sertSlider.on('afterChange', function(){
		$(".sert .sert__slide").removeClass(classNameSert);
		$(".sert .slick-center").addClass(classNameSert);
	});
	
	sertSlider.ready(function(){
		$(".sert .slick-center").addClass(classNameSert);
	});

	//services
	$("#select-sales").selectmenu();

	$("#select-sales-2").selectmenu();

	$("#select-sales-3").selectmenu();

	$("#select-sales-4").selectmenu();

	$("#reqf__select").selectmenu();

	
	
	$(".done__slides").slick({
		slidesToShow: 3,
		prevArrow: $(".done__slider-arrow.left"),
		nextArrow: $(".done__slider-arrow.right")
	});

	$(".ints .blog__widget-link").click(function(e){
		var toggle = this.dataset.toggle;
		var className = ".ints .tag-" + toggle;
		var arr = $(className);

		$(".ints .ints__slider").css("display", "none");
		$(".ints .blog__widget-link").removeClass("active");
		this.className += " active";

		arr[0].style.display = "block";
		
		$(className + " .ints__slides").slick({
			slidesToShow: 6,
			prevArrow: $(className + " .ints__arrow.left"),
			nextArrow: $(className + " .ints__arrow.right"),
			speed: 1000,
			draggable: false,
			infinite: false
		});
		
	});
	$(".ints").ready(function(){
		$(".ints .blog__widget-link:first-child").click();
	});



	//technology slider
	$(".tecl .tecl__slides").slick({
		slidesToShow: 7,
		prevArrow: $(".tecl .tecl__arrow.left"),
		nextArrow: $(".tecl .tecl__arrow.right"),
		variableWidth: true
	});

	//partners slider	
	$(".pars .pars__slides").slick({
		slidesToShow: 6,
		prevArrow: $(".pars .pars__arrow.left"),
		nextArrow: $(".pars .pars__arrow.right")
	});


	//// blog start
	$(".sidebar__expand").click(function(){
		var ctx = this;
		var list = $(ctx).parent().parent().children(".sidebar__links");
		if(list.hasClass("expanded")){
			list.removeClass("expanded");
			setTimeout(function(){
				ctx.innerHTML = "Показать еще";
			}, 600);
		} else {
			list.addClass("expanded");
			setTimeout(function(){
				ctx.innerHTML = "Скрыть";
			}, 400);
		}
	});

	$(".blog__sort").selectmenu();


	/////  cases start  [dev]
	$(".ins .ins__slides").slick({
		slidesToShow: 3,
		prevArrow: $(".ins .ins__arrow.left"),
		nextArrow: $(".ins .ins__arrow.right"),
		infinite: true
	});

	var design__slider = $(".des .des__slides");
	var className = "big";
	var max_slides = 4;

	design__slider.on('init', function(event, slick){
		slick.slickGoTo( 0 );
	} );

	design__slider.slick({
		slidesToShow: max_slides,
		prevArrow: $(".des .des__arrow.left"),
		nextArrow: $(".des .des__arrow.right"),
		infinite: true,
		variableWidth: true,
		draggable: false,
		speed: 700
	});

	var designCalc = function(nextSlide){
			if(!nextSlide && nextSlide !== 0) return;
			var index = nextSlide + max_slides - 1;
			// var max = slick.$slides.length + max_slides;
			// while(index > max) index = max - index;

			var next = $(".des .slick-slide[data-slick-index=" + index +  "]");
			$(".des .slick-slide").removeClass(className);
			next.addClass(className);
		};
		
	//design__slider.on('beforeCalculate', sertReset);
	design__slider.on('beforeCalculate', function(event, slick, currentSlide, nextSlide){
		designCalc(nextSlide);
	});
	design__slider.on('afterChange', function(event, slick, currentSlide){
		designCalc(currentSlide);
	} );

	var mobChanges = function(index){
		var className = "mob__slide-center";
		var next = $(".mob .mob__slides .slick-slide[data-slick-index=" + index +  "]");
		$(".mob .mob__slides .slick-slide").removeClass(className);
		next.addClass(className);
	};
	$(".mob .mob__slides").slick({
		slidesToShow: 5,
		prevArrow: $(".mob .mob__arrow.left"),
		nextArrow: $(".mob .mob__arrow.right"),
		infinite: true,
		centerMode: true,
		focusOnSelect: true,
		asNavFor: '.mob .mob__slides-cur',
  		variableWidth: true,
  		draggable: false

	})
	.on("beforeCalculate", function(event, slick, currentSlide, nextSlide){
		mobChanges(nextSlide);
	})
	.on("afterChange", function(event, slick, currentSlide){
		mobChanges(currentSlide);
	}).ready(function(){
		mobChanges(0);
	});

	$(".mob .mob__slides-cur").slick({
		slidesToShow: 1,
		arrows: false,
		infinite: true,
		fade: true,
  		asNavFor: '.mob .mob__slides',
  		speed: 700
	});


	////workshop
	$(document).ready(function(){
		var T = $('.event__timer');
		if(!T[0]) return;
		var T_time = parseInt(T[0].dataset.timer) || 60 * 60 * 24 * 3;//seconds * minutes * hours * days
		T.FlipClock(T_time, {
			clockFace: 'DailyCounter',
			countdown: true,
			language:'ru'
		});
	});



	$('.slider-main-slides').slick({
	 slidesToShow: 1,
	 slidesToScroll: 1,
	 arrows: false,
	 fade: true,
	 asNavFor: '.slider-cli-slides'
	});
	$('.slider-cli-slides').slick({
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  asNavFor: '.slider-main-slides',
	  dots: false,
	  prevArrow: $(".slider-arrow.left"),
	  nextArrow: $(".slider-arrow.right"),
	  centerMode: false,
  	  focusOnSelect: true
	});

	$(document).ready(function(){
		$(".prize-item").each(function(index, item){
			equalTextHeight(
				$(item).find(".prize-item-title"),
				3,
				$(item).find(".prize-item-text"),
				7
				);
		});
	});
	
	



})();