

(function($) {

	$('#search-trigger').click(function() {
		$('.header-search-box').stop().slideToggle();
	});

	$(window).on('load resize orientationchange', function() {
		if(!max(640)) {
			$('.header-search-box').css({
				display: '',
			});
			$('#wrapper').css({
				paddingTop: '',
				paddingBottom: '',
			});
		} else {
			$('#wrapper').css({
				paddingTop: $('#common-header').outerHeight() + 'px',
				paddingBottom: $('#bottom-panel').outerHeight() + 'px',
			});
		}
	});

	//ヘッダーユーザーパネル
	$('#user-panel-trigger').click(function() {
		$(this).next('#user-panel-target').stop().fadeToggle();
	});



	$(".custom-select").each(function() {
		var classes = $(this).attr("class"),
			id      = $(this).attr("id"),
			name    = $(this).attr("name");
		var template =  '<div class="' + classes + '">';
		template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
		template += '<div class="custom-options">';
		$(this).find("option").each(function() {
			template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
		});
		template += '</div></div>';
		$(this).wrap('<div class="custom-select-wrapper"></div>');
		$(this).hide();
		$(this).after(template);
	});
	$(".custom-option:first-of-type").hover(function() {
		$(this).parents(".custom-options").addClass("option-hover");
	}, function() {
		$(this).parents(".custom-options").removeClass("option-hover");
	});
	$(".custom-select-trigger").on("click", function() {
		$('html').one('click',function() {
		$(".custom-select").removeClass("opened");
	});
	$(this).parents(".custom-select").toggleClass("opened");
		event.stopPropagation();
	});
	$(".custom-option").on("click", function() {
		$(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
		$(this).parents(".custom-options").find(".custom-option").removeClass("selection");
		$(this).addClass("selection");
		$(this).parents(".custom-select").removeClass("opened");
		$(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
	});


	$('.more-target').hide();

	$('.btn-more').click(function() {
		if($(this).attr('data-more') == '0') {
			$(this).find('.text').html('閉じる');
			$(this).find('.material-icons-outlined').html('keyboard_arrow_up');
			$(this).prev('.more-target').stop().slideDown();
			$(this).attr('data-more','1');
		} else {
			$(this).find('.text').html('つづきを見る');
			$(this).find('.material-icons-outlined').html('keyboard_arrow_down');
			$(this).prev('.more-target').stop().slideUp();
			$(this).attr('data-more','0');
		}
	});

	$('.btn-more-under').click(function() {
		if($(this).attr('data-more') == '0') {
			$(this).find('.text').html('閉じる');
			$(this).find('.material-icons-outlined').html('keyboard_arrow_up');
			$(this).next('.more-target').stop().slideDown();
			$(this).attr('data-more','1');
		} else {
			$(this).find('.text').html('詳細を入力');
			$(this).find('.material-icons-outlined').html('keyboard_arrow_down');
			$(this).next('.more-target').stop().slideUp();
			$(this).attr('data-more','0');
		}
	});


	//賞セレクト
	$('.select-img').each(function() {
		$(this).children('li').eq(0).show().css('display','flex');
	})

	$('.award-select').change(function() {
		var index = $(this).prop("selectedIndex");
		$(this).siblings('.select-img').children('li').eq(index).show().css('display','flex').siblings('li').hide();
	});

	function max(w) {
		if($(window).width() <= w ) {
			return true;
		} else {
			return false;
		}
	}

})(jQuery);