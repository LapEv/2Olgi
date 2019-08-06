$(document).ready(()=>{
    'use strict';

    $(()=> {
        setTimeout(()=> {
            $('.container_3_logo').removeClass('hidden');
        }, 500);
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
            MarginHeight = $('.container_general').outerHeight(true);
        $('.content').height(mainHeight);
        if ($('.content').height() < bodyHeight-logoHeight-footerHeight-MarginHeight){
            $('.footer').css({
                'position':'absolute',
                'bottom':'0'});
        } else {
            $('.content').height(mainHeight+footerHeight);
            $('.footer').css({'position':'relative'});
        }
    }

    function CheckActive(lentgh){
        for(let i=0; i<=lentgh; i++){
            if ($('.container_general_'+(i+1)).hasClass('active')){
                return(false);
            }
        } return(true);
    }

    function MenuClick(indActive, lentgh){
        if ($('.container_general_5').hasClass('active') && indActive != 4){
            ChangeClass($('.main_container'),false,'general_five',indActive);
            ChangeClass($('.container_general_5'),false,'active',indActive);
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
            }
            if (indActive == 4){
                ChangeClass($('.main_container'),true,'general_five',indActive);
                $('.main_container').addClass('general_five');
            } else {
                ChangeClass($('.main_container'),false,'general_five',indActive);
            }
        }
    }

    function CheckArticleActive(){
        if ($('.container_general_4').hasClass('active_no') || $('.article_list').hasClass('active_no')){
            if ($('.article_list').hasClass('active_no')){
                $('.article_list').removeClass('active_no');
                $('.article_list').addClass('active');}
            for (let i = 0; i < $('.article').length; i++){
                if ($('.article').eq(i).hasClass('active')){
                    $('.article').eq(i).removeClass('active');
                    $('.article').eq(i).addClass('active_no');
                }
            }
        }
        if ($('.container_general_4').hasClass('active') && $('.article_list').hasClass('active')){
            CheckFooter($('.article_list'));
        }
    }

    function ArticleClick(indActive, lentgh){
        for(let i=0; i<lentgh; i++){
            if (i == indActive){
                $('.article_list').removeClass('active');
                $('.article_list').addClass('active_no');
                ChangeClass($('.article').eq(i),true,'active',0);
                // CheckFooter($('.article'),true,'active');
            } else {
                ChangeClass($('.article').eq(i),false,'active',0);
            }
        }
    }

    function ScrlTop(){
        $('.main').animate({
            scrollTop: $("#top").offset().top
        }, 500);
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

    $('.footer_last_articles span').text($('.article h3').eq($('.article h3').length-1).text());

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
                    if ($('.article').eq(q).hasClass('active')){
                        $('.article').eq(q).removeClass('active');
                        $('.article').eq(q).addClass('active_no');
                    }
                }
                ActionYes($('.article_list'));
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
                        $('.article').eq(q).removeClass('active');
                        $('.article').eq(q).addClass('active_no');
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
                        $('.article').eq(q).removeClass('active');
                        $('.article').eq(q).addClass('active_no');
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

});