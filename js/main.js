let active_window = 0;

window.onload = function(){
    setTimeout(()=> {
        $('.container-header').addClass('active');
        $('.main_container').addClass('active');
        $('.footer_container').addClass('active');
        $('.loading_page').css({'display':'none'});
        $('.container_3_logo').removeClass('hidden');
        $('.container_1').css({'animation': 'bounceInLeft 3s'});
        $('.container_2').css({'animation': 'bounceInRight 3s'});
        // $('.loading_page').removeClass('loading_page');
    },300);
};


$(document).ready(()=>{
    'use strict';

    $(window).resize(function(){
        if ($('.container_general_6').hasClass('active')){
            $('.container_general_6').css({'min-height': '250px'});
            CheckFooter($('.container_general_6'));
            return;
        }
        for (let i = 1; i<=5; i++){
            if (i==4){
                if ($('.container_general_'+i).hasClass('active')){
                    $('.container_general_'+i).css({'min-height': '250px'});}
                if ($('.article_list').hasClass('active')){
                    $('.article_list').css({'min-height': '250px'});
                    CheckFooter($('.article_list'));
                    break;     
                }
                let lentgh = $('.article a').length-1;
                for (let q = 0; q<=lentgh; q++){
                    if ($('.article').eq(q).hasClass('active')){
                        $('.article').eq(q).css({'min-height': '250px'});
                        CheckFooter($('.article').eq(q));
                        break;
                    }
                }
            }
            if ($('.container_general_'+i).hasClass('active')){
                $('.container_general_'+i).css({'min-height': '250px'});
                CheckFooter($('.container_general_'+i));
                break;
            }
        }
    });

    ChangeClass($('.container_general_1'),true,'active',1);
    
    function ChangeClass(mainclass, active, nameclass, number){
        if (active == true){
            if (mainclass.hasClass(nameclass+'_no')){
                mainclass.removeClass(nameclass+'_no');
                mainclass.addClass(nameclass);   
                if (nameclass == 'active'){
                    CheckFooter(mainclass);
                    if(number < 5)
                      {ActionNo('.container_general_6');}
                    ActionNo('.footer_share');
                }
            }
        } else {
            if (mainclass.hasClass(nameclass)){
                mainclass.removeClass(nameclass);
                mainclass.addClass(nameclass+'_no');
                if (nameclass == '.container_general_5'){
                    $('.content').height() + 50;
                }          
            }
        }
    }

    function CheckFooter(mainclass){
        let bodyHeight = $('body').height(),
            mainHeight = mainclass.outerHeight(true),
            footerHeight = $('.footer').outerHeight(true),
            logoHeight = $('.container_logo').outerHeight(true),
            MarginHeight = $('.container_general').outerHeight(true)-$('.container_general').outerHeight(false);
        let timeout = 0;
        let diffHeight = bodyHeight-logoHeight-footerHeight-MarginHeight;
        if ($('.content').height() > diffHeight){
            timeout = 500;
        }
        setTimeout(()=> {
            $('.content').height(mainHeight);
            if ($('.content').height() < diffHeight){
                if (timeout > 0){$('.footer').css({'bottom':'-50px'});}
                $('.footer').animate({
                        'bottom':'0'
                },300);
                $('.footer').css({'position':'absolute'});
            } else {
                $('.content').height(mainHeight+MarginHeight*3);
                $('.footer').css({'position':'relative'});
            }
        }, timeout);
        let height = diffHeight-MarginHeight*2;
        if (mainclass.selector != '.container_general_5'){
            if (mainHeight <= height){
                if (mainclass.selector == '.container_general_6'){
                    let h1 = $('.container_form').outerHeight(true),
                        h2 = $('.container_form').height();
                    height = h1 + (h1-h2)/0.67;
                }
                height=height+'px';
                mainclass.css({'min-height': height});
            }
        }
    }

    function CheckActive(lentgh){
        for(let i=0; i<=lentgh; i++){
            if ($('.container_general_'+(i+1)).hasClass('active')){
                return(false);
            }
        } return(true);
    }

    function ScrlTop(){
        $('.main').animate({
            scrollTop: $("#maintop").offset().top
        }, 500);
    }

    function minHeightCorrect(mainclass){
        setTimeout(()=> {
            mainclass.css({'min-height': '250px'});
        },1500);
    }

    function MenuClick(indActive, lentgh){
        if ($('.menu').hasClass('menu_active')){
            $('.menu').removeClass('menu_active'); 
        }
        if (document.querySelector('.ham').classList.contains('active')){
            document.querySelector('.ham').classList.remove('active');
        }
        if ($('.container_general_5').hasClass('active') && indActive != 4){
            ChangeClass($('.main_container'),false,'general_five',indActive);
            ChangeClass($('.container_general_5'),false,'active',indActive);
            if(indActive != 5){
                active_window = indActive;
            }
            setTimeout(()=> {
                if (CheckActive(lentgh) == true){
                    ChangeClass($('.container_general_'+(indActive+1)),true,'active',indActive);
                }
            }, 2000);
            return;
        }
        for(let i=0; i<=lentgh; i++){
            if (i == indActive){
                ChangeClass($('.container_general_'+(i+1)),true,'active',indActive);
            } else {
                ChangeClass($('.container_general_'+(i+1)),false,'active',indActive);
                if (indActive != 4){minHeightCorrect($('.container_general_'+(i+1)));}
            }
            if (indActive == 4){
                ChangeClass($('.main_container'),true,'general_five',indActive);
                $('.main_container').addClass('general_five');
            } else {
                ChangeClass($('.main_container'),false,'general_five',indActive);
            }
            if(indActive != 5){
                active_window = indActive;
            }
        }
    }

    function CheckArticleActive(){
        if ($('.container_general_4').hasClass('active_no') || $('.article_list').hasClass('active_no')){
            ChangeClass($('.article_list'),true,'active',7);
            // if ($('.article_list').hasClass('active_no')){
            //     $('.article_list').removeClass('active_no');
            //     $('.article_list').addClass('active');}
            for (let i = 0; i < $('.article').length; i++){
                ChangeClass($('.article').eq(i),false,'active',7);
                // if ($('.article').eq(i).hasClass('active')){
                //     $('.article').eq(i).removeClass('active');
                //     $('.article').eq(i).addClass('active_no');
                    minHeightCorrect($('.article').eq(i));
                // }
            }
        }
        if ($('.container_general_4').hasClass('active') && $('.article_list').hasClass('active')){
            CheckFooter($('.article_list'));
        }
    }

    $('.menu a').on('click', function(event) {
        let ind = '.menu a',
        indActive = $(ind).index(this),
        lentgh = $(ind).length-1;
        event.preventDefault();
        MenuClick(indActive, lentgh);
        ScrlTop();
        CheckArticleActive();
    });

    $('.container_logo a').on('click', function() {
        let ind = '.container_logo a',
        indActive = $(ind).index(this)+1,
        lentgh = $(ind).length+1;
        MenuClick(indActive, lentgh);
        ScrlTop();
        CheckArticleActive();
    });

    function ArticleClick(indActive, lentgh){
        for(let i=0; i<lentgh; i++){
            if (i == indActive){
                ChangeClass($('.article_list'),false,'active',0);
                ChangeClass($('.article').eq(i),true,'active',0);
                // $('.article_list').removeClass('active');
                // $('.article_list').addClass('active_no');
                minHeightCorrect($('.article_list'));
            } else {
                ChangeClass($('.article').eq(i),false,'active',0);
                minHeightCorrect($('.article').eq(i));
            }
            active_window = indActive+6;
        }
    }

    $('.article_list a').on('click', function() {
        let ind = '.article_list a',
        indActive = $(ind).index(this),
        lentgh = $(ind).length;
        ArticleClick(indActive, lentgh);
        ScrlTop();
    });

    function ActionNo(nameclass){
        if ($(nameclass).hasClass('active')){
            $(nameclass).removeClass('active');
            $(nameclass).addClass('active_no');  
        }  
    }
    function ActionYes(nameclass){
        if (nameclass.hasClass('active_no')){
            nameclass.removeClass('active_no');
            nameclass.addClass('active');   
        }  
    }

    let articleMenu = $('.article_menu a'),
    lengthAMenu = articleMenu.length;
    articleMenu.eq(0).css({'opacity':'0', 'cursor':'context-menu'});
    articleMenu.eq(lengthAMenu-1).css({'opacity':'0', 'cursor':'context-menu'});
    $('.article_menu a').on('click', function(){
        let indActive = $('.article_menu a').index(this),
        lentgh = $('.article_menu a').length-1;
        event.preventDefault();
        for (let i = 1; i < lentgh; i++){
            if (i == indActive){
                for (let q = 0; q < $('.article').length; q++){
                    ChangeClass($('.article').eq(q),false,'active',0);
                    minHeightCorrect($('.article').eq(q));
                    // if ($('.article').eq(q).hasClass('active')){
                    //     $('.article').eq(q).removeClass('active');
                    //     $('.article').eq(q).addClass('active_no');
                    // }
                }
                ActionYes($('.article_list'));
                active_window = 3;
                CheckFooter($('.article_list'));
                ScrlTop();
                return;
            }
            i= i + 2; 
        }
        for (let i = 2; i < lentgh-1; i++){
            if (i == indActive){
                let articleactive;
                for (let q = 0; q < $('.article').length; q++){
                    if ($('.article').eq(q).hasClass('active')){
                        articleactive = q+1;
                        active_window = articleactive + 6;
                        ChangeClass($('.article').eq(q),false,'active',0);
                        minHeightCorrect($('.article').eq(q));
                        // $('.article').eq(q).removeClass('active');
                        // $('.article').eq(q).addClass('active_no');
                    }
                }
                ActionYes($('.article').eq(articleactive));
                CheckFooter($('.article').eq(articleactive));
                ScrlTop();
                return;
            }
            i= i + 2; 
        }
        for (let i = 3; i < lentgh-1; i++){
            if (i == indActive){
                let articleactive;
                for (let q = 0; q < $('.article').length; q++){
                    if ($('.article').eq(q).hasClass('active')){
                        articleactive = q-1;
                        active_window = articleactive + 6;
                        ChangeClass($('.article').eq(q),false,'active',0);
                        minHeightCorrect($('.article').eq(q));
                        // $('.article').eq(q).removeClass('active');
                        // $('.article').eq(q).addClass('active_no');
                    }
                }
                ActionYes($('.article').eq(articleactive));
                CheckFooter($('.article').eq(articleactive));
                ScrlTop();
                return;
            }
            i= i + 2; 
        }
    });

    $('.feedback').on('click', function() {
        if ($('.container_general_6').hasClass('active')){
            ActionNo('.footer_share');
            return;}
        let ind = '.feedback',
        indActive = $(ind).index(this)+5,
        lentgh = $(ind).length+5;
        if ($(ind).index(this) == 1)
            {
                indActive--;
                lentgh--;  
            }
        MenuClick(indActive, lentgh);
        ScrlTop();
    });

    $('.cross').on('click', function() {
        if ($('.container_general_6').hasClass('active')){
            ActionNo('.container_general_6');
            if (active_window > 5){
                ActionYes($('.article').eq(active_window-6));
                ActionYes($('.container_general_4'));
                CheckFooter($('.article').eq(active_window-6));
                ScrlTop();
            } else {
                MenuClick(active_window, active_window);
                CheckFooter($('.article_list'));
                ScrlTop();
            }
        }
    });

    $('.footer_last_articles span').text($('.article h3').eq($('.article h3').length-1).text());
    $('.footer_last_articles').on('click', function(){
        MenuClick(3, 6);
        let ind = '.article',
        lentgh = $(ind).length;
        ArticleClick(lentgh-1, lentgh);
        ScrlTop();
    });


    $('.slct').click(function(){
	let dropBlock = $(this).parent().find('.drop');
        if( dropBlock.is(':hidden') ) {
            dropBlock.slideDown();
            $(this).addClass('active');
            $(this).parent().parent().find('.slct').removeClass('arrow_down');
            $(this).parent().parent().find('.slct').addClass('arrow_up');
            $('.drop').find('li').click(function(){
                let selectResult = $(this).html();
                $(this).parent().parent().find('input').val(selectResult);
                $(this).parent().parent().find('.slct').removeClass('active').html(selectResult);
                $(this).parent().parent().find('.slct').removeClass('arrow_up');
                $(this).parent().parent().find('.slct').addClass('arrow_down');
                dropBlock.slideUp();
            });
        } else {
            $(this).removeClass('active');
            $(this).parent().parent().find('.slct').removeClass('arrow_up');
            $(this).parent().parent().find('.slct').addClass('arrow_down');
            dropBlock.slideUp();
        }
	return false;
    });

    $('.share').on('click', function() {
        if ($('.footer_share').hasClass('active_no'))
           {$('.footer_share').addClass('active');
            $('.footer_share').removeClass('active_no');return;}
        if ($('.footer_share').hasClass('active'))
            {$('.footer_share').addClass('active_no');
             $('.footer_share').removeClass('active');return;}
    });

    $(document).click( function(event){
        if( $(event.target).closest(".share").length  ) 
          return;
        if ($('.footer_share').hasClass('active'))
        {$('.footer_share').addClass('active_no');
        $('.footer_share').removeClass('active');return;}
        event.stopPropagation();
      });
      
});