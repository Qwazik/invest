$(function(){
	var DOM = {
		homeSlider:'.home-slider',
		homeSliderContainer:'.home-slider__container',
		homeSliderDots: '.home-slider-dots',
		mainNav:'.main-nav',
		mainNavItem:'.main-nav__item',
		tabs: '.tabs',
		tabsNav: '.tabs-nav',
		tabsNavItem: '.tabs-nav__item',
		tabsContent: '.tabs-content',
		tabsContentItem: '.tabs-content__item',
		eventTile: '.event-tile',
		eventTileClose: '.event-tile__close',
		fancybox:'.fancybox',
		mainNav: '.main-nav',
		mainNavItem: '.main-nav__item',
		mainNavDropdown: '.main-nav-dropdown',
		spoiler: '.spoiler',
		spoilerHeader: '.spoiler-header',
		spoilerBody: '.spoiler-body',
		responsiveNavBtn: '.responsive-nav-btn'
	}

	var mainNav = (function(){
		function equalItems(){
			equalHeight(DOM.mainNav, DOM.mainNavItem);
			$(window).resize(function(){
				equalHeight(DOM.mainNav, DOM.mainNavItem);
			});
		}
		function generateMobileNav(selector){
			console.log(1);
			var mobileNav = $(selector).eq(0).clone()
			var mobileNavHtml = mobileNav.html().replace(/main-nav/g, 'mobile-nav');
			mobileNav.html(mobileNavHtml);
			mobileNav.addClass('mobile-nav').removeClass('main-nav');
			$('body').append(mobileNav);
			mobileNav.wrap($('<div class="mobile-nav__wrap"></div>'));
			$(DOM.responsiveNavBtn).click(function(){
				console.log(1);
				mobileNav.parent().toggleClass('active');
				$(this).toggleClass('active');
			})
		}
		function positions(menu){

			var ww = $(window).outerWidth();
			var wh = $(document).outerHeight();
			menu.show();
			menu.children().each(function(){
				var offsetRight = menu.offset().left + menu.outerWidth();
				var offsetBottom = menu.offset().top + menu.outerHeight()
				if(wh < offsetBottom) {menu.addClass('main-nav-dropdown--columns'); };
				if(ww < offsetRight) {menu.addClass('main-nav-dropdown--right'); };
			});
			menu.hide();
		}
		return {
			init: function(selector){
				generateMobileNav(selector);
				this.pos($(selector).find(DOM.mainNavDropdown));
				equalItems();
			},
			pos: function(selector){
				$(selector).each(function(){
					$this = $(this);
					positions($this)
				});
			}
		}
	}());


	if(DOM.mainNavDropdown) {
		mainNav.init(DOM.mainNav);
		$(window).on('resize', function(){
			mainNav.pos(DOM.mainNavDropdown);
		})
	};
	if(DOM.fancybox) initFancybox(DOM.fancybox)
	if(DOM.eventTile.length) initEventTile(DOM.eventTile);
	if(DOM.homeSlider.length) initHomeSlider(DOM.homeSliderContainer);
	if(DOM.tabs.length) initTabs(DOM.tabs);
	if(DOM.spoiler.length) initSpoilers(DOM.spoiler);


	function initSpoilers(selector){
		$(selector).each(function(){
			$(this).find(DOM.spoilerHeader).click(function(){
				$(this).parent().toggleClass('active');
				$(this).siblings(DOM.spoilerBody).slideToggle(300);

			});
			if($(this).is('.active')) $(this).find(DOM.spoilerHeader).click();
		});
	}
	function initFancybox(){
		$('.fancybox').fancybox({
			padding: 0
		})
	}

	function initEventTile(selector){
		$(selector).each(function(){
			var $this = $(this);
			$this.find(DOM.eventTileClose).click(function(){
				$this.hide();
			});
		});
	}

	function initHomeSlider(slider){
		var dots = $(slider).find(DOM.homeSliderDots);
		$(slider).owlCarousel({
			items: 1,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			loop: true,
			dots: true,
			nav: true,
			autoplay: true,
			autoplayTimeout: 5000,
			dotsContainer: '.home-slider-dots',
		});
	}

	function initTabs(selector){
		$(selector).each(function(){
			var $this = $(this);
			$this.find(DOM.tabsNav).children().click(function(){
				var activeContentItem = $this.find(DOM.tabsContentItem).eq($(this).index());
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				$this.find(DOM.tabsContent).children().removeClass('active');
				activeContentItem.addClass('active');
				return false;
			});
		});
	}

	function equalHeight(wrap, element){
	    $(wrap).each(function(){
	        var maxHeight = [],
	            className = element;
	        $(this).find(className).each(function(){
	            $(this).height('auto');
	        });
	        $(this).find(className).each(function(){
	            maxHeight.push($(this).height());
	        });
	        maxHeight = Math.max.apply(null, maxHeight);
	        $(this).find(className).each(function(){
	            $(this).height(maxHeight);
	        });
	    });
	}
});

if(location.origin == 'https://qwazik.github.io'){
    $('body').append($('<script type="text/javascript" src="https://cdn.rawgit.com/Qwazik/scripts/master/navGit.js"></script>'));
    $(window).load(function(){
        navGit({
            'Главная':'index.html',
            'Текстовая':'text.html',
            'Галерея':'gallery.html',
            'Контакты':'contacts.html'
        });
    });
}
