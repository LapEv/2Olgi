window.onload = function(){
    if (window.location.hash == '') {
        window.location.hash = '#main';
    }
    setTimeout(()=> {
        $('.container-header').addClass('active');
        $('.main_container').addClass('active');
        $('.footer_container').addClass('active');
        $('.loading_page').css({'display':'none'});
        $('.container_3_logo').removeClass('hidden');
        $('.container_1').css({'animation': 'bounceInLeft 3s'});
        $('.container_2').css({'animation': 'bounceInRight 3s'});
    },700);
};

$(document).ready(()=>{
    'use strict';
    
    $('.cross').on('click', function(){
        if ($('.cross a').attr('href') == '#feedbackclose'){
            history.back();
            $('.cross a').attr('href',window.location.hash);
        }
    });

    let length = {
        menu : $('.menu a').length,
        article : $('.article_list a').length,
        article_menu : $('.article_menu a').length,
        feedback: $('.feedback').length
    };

    let articles = {};
    $('.article_list a').each(function(index){
        articles['title'+index] = $('.article h3').eq(index).text();
    });

    //---- For hidden next article for maximum and pref articles for minimum
    $('.article_menu a').eq(0).css({'opacity':'0', 'cursor':'context-menu', 'z-index':'-1'});
    $('.article_menu a').eq(length.article_menu-1).css({'opacity':'0', 'cursor':'context-menu', 'z-index':'-1'});

    //---- For Footer Last Articles
    $('.footer_last_articles a').text($('.article h3').eq(length.article-1).text());
    $('.footer_last_articles a').attr('href', '#article'+length.article);
    
    function ChangeTitle(index){
        switch (index){
            case 0: document.title = '2Oльги. Всё о метафорических картах и регрессиях'; break; 
            case 1: document.title = '2Oльги. МАК'; break; 
            case 2: document.title = '2Oльги. Регрессии'; break; 
            case 3: document.title = '2Oльги. Статьи'; break; 
            case 4: document.title = '2Oльги. Контакты'; break; 
        }
    }

    function ChangeLocation(location){
        $('a').each(function(index){
            // console.log('index = '+index+' element = '+$(this).attr('href'));
            if ($(this).attr('href') == location){
                if (index < length.menu) {
                    CheckArticleActive();
                    MenuClick(index, length.menu-1);
                    ScrlTop();
                    ChangeTitle(index);
                    $('.cross a').attr('href',location);
                }
                if (index >= length.menu+2 && index <= (length.menu+2)+length.article-1) {
                    let index_article = index - (length.menu+2);
                    if (index == (length.menu+2)+length.article-1){
                        MenuClick(3, 6);
                    }
                    if ($('.container_general_6').hasClass('active')){
                        ActiveClassChange($('.container_general_6'), 'active', 'active_no');
                    }            
                    ArticleClick(index_article, length.article);
                    ActiveClassChange($('.container_general_4'), 'active_no', 'active');
                    ScrlTop();
                    document.title = `2Oльги. ${articles['title'+index_article]}`;
                    $('.cross a').attr('href',location);
                }
                if (location == '#feedbackclose'){
                    console.log('yes');}  
                if (location == '#feedback2Olgi'){
                    if ($('.container_general_6').hasClass('active')){
                        ActiveClassChange($('.footer_share'), 'active', 'active_no');
                        return;}
                    let ind = '.feedback',
                    indActive = $(ind).index(this)+5;
                    length.feedback = length.feedback+5;
                    if ($(ind).index(this) == 1)
                        {
                            indActive--;
                            length.feedback--;
                        }
                    CheckArticleActive();
                    MenuClick(indActive, length.feedback);
                    ScrlTop();
                    document.title = `2Oльги. Форма обратной связи`;
                    return false;
                }
                return false;
            }
        });
    }

    ChangeLocation(document.location.hash);

    window.addEventListener("hashchange", function() {
        ChangeLocation(window.location.hash);
    });
    
    let device = Device();

    $(window).resize(function(){
        if ($('.container_general_6').hasClass('active')){
            $('.container_general_6').css({'min-height': '250px'});
            CheckFooter($('.container_general_6'));
            return;
        }
        for (let i = 1; i<=length.menu; i++){
            if (i==length.menu-1){
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

    function ChangeClass(mainclass, active, nameclass, number){
        if (active == true){
            if (mainclass.hasClass(nameclass+'_no')){
                mainclass.removeClass(nameclass+'_no');
                mainclass.addClass(nameclass);
                if (nameclass == 'active'){
                    CheckFooter(mainclass);
                    if(number < length.menu)
                      {ActiveClassChange($('.container_general_6'), 'active', 'active_no');}
                    ActiveClassChange($('.footer_share'), 'active', 'active_no');
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
            timeout = 2000;
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

    function ScrlTop(){
        $('.main').animate({
            scrollTop: $("#maintop").offset().top
        }, 500);
    }

    function minHeightCorrect(mainclass){
        setTimeout(()=> {
            if (mainclass.hasClass('active_no')){
                mainclass.css({'min-height': '250px'});
            }
        },1500);
    }

    function CheckActive(){
        for(let i=0; i<=length.menu; i++){
            if ($('.container_general_'+(i+1)).hasClass('active')){
                return(false);
            }
        } return(true);
    }

    function MenuClick(indActive, lentgh){
        if ($('.menu').hasClass('menu_active')){
            $('.menu').removeClass('menu_active');
        }
        if (document.querySelector('.ham').classList.contains('active')){
            document.querySelector('.ham').classList.remove('active');
        }
        if ($('.container_general_5').hasClass('active') && indActive != length.menu-1){
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
                if (indActive != 4){minHeightCorrect($('.container_general_'+(i+1)));}
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
            ChangeClass($('.article_list'),true,'active',length.article);
            for (let i = 0; i < $('.article').length; i++){
                ChangeClass($('.article').eq(i),false,'active',length.article);
                minHeightCorrect($('.article').eq(i));
            }
        }
        if ($('.container_general_4').hasClass('active') && $('.article_list').hasClass('active')){
            CheckFooter($('.article_list'));
        }
    }

    function ArticleClick(indActive, lentgh){
        for(let i=0; i<lentgh; i++){
            if (i == indActive){
                ChangeClass($('.article_list'),false,'active',0);
                ChangeClass($('.article').eq(i),true,'active',0);
                minHeightCorrect($('.article_list'));
            } else {
                ChangeClass($('.article').eq(i),false,'active',0);
                minHeightCorrect($('.article').eq(i));
            }
        }
    }

    function ActiveClassChange(nameclass, classname, classname_new){
        if (nameclass.hasClass(classname)){
            nameclass.removeClass(classname);
            nameclass.addClass(classname_new);
        }
    }

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

    // let social_items = {
    //     OlgaR : {
    //         vk : '//vk.com/id278093970',
    //         instagram : '',
    //         facebook : '',
    //         skype : ''
    //     },
    //     OlgaL : {
    //         vk : '//vk.com/id2660880',
    //         instagram : '//instagram.com/lapkina6416',
    //         facebook : '//facebook.com/profile.php?id=100014775069349&fref=profile_friend_list&hc_location=friends_tab',
    //         skype : 'olga8405?chat'
    //     },
    //     Olgi2 : {
    //         vk : '//vk.com/club183106924',
    //         instagram : '',
    //         facebook : '',
    //     },
    //     App : {
    //         https : 'https:',
    //         vk : 'vk:',
    //         facebook : 'facebook:',
    //         instagram : 'instagram:',
    //         skype : 'skype:',
    //         share : 'share',
    //         feedback : 'feedback',
    //         viber : 'viber:'
    //     },
    //     Share : {
    //         vk:           '//vk.com/share.php?url=https://lapev.github.io',
    //         facebook:     '//www.facebook.com/sharer.php?u=https://lapev.github.io',
    //         ok:           '//connect.ok.ru/offer?url=https://lapev.github.io',
    //         twitter:      '//twitter.com/share?url=https://lapev.github.io',
    //         mail:         '//connect.mail.ru/share?url=https://lapev.github.io&title=Всё о метафорических картах и регрессиях&description=Решение жизненных проблем с помощью проверенных практик используемых именитыми психологами в их профессиональной деятельности&image_url=https://lapev.github.io/img/2Olgi.png',
    //         whatsapp:     '//web.whatsapp.com/send?text=https://lapev.github.io',
    //         viber:        '//forward?text=https://lapev.github.io'
    //     }
    // };
    
    $('.social_items a').on('click', function(){
        let scl_app,
            scl_https = 'https:',
            link = '';
        switch ($('.social_items a').index(this)){
            case 0:   scl_app = 'vk:';           link = '//vk.com/id278093970'; break;
            case 1:   scl_app = 'instagram:';    link = ''; break;
            case 2:   scl_app = 'facebook:';     link = ''; break;
            case 3:   scl_app = 'skype:';        link = ''; break;
            case 4:   scl_app = 'vk:';           link = '//vk.com/id2660880'; break;
            case 5:   scl_app = 'instagram:';    link = '//user?username=lapkina6416'; break;
            case 6:   scl_app = 'fb:';     link = '//facebook.com/profile.php?id=100014775069349'; break;
            case 7:   scl_app = 'skype:'; scl_https = 'skype:'; link = 'olga8405?chat'; break;
            case 8:   scl_app = 'vk:';           link = '//vk.com/club183106924 '; break;
            case 9:   scl_app = 'facebook:';     link = ''; break;
            case 10:  scl_app = 'instagram:';    link = ''; break;
            case 11:  scl_app = 'share';  scl_https = 'share'; link = ''; break;
            case 12:  scl_app = 'feedback'; scl_https = 'feedback';   link = '#feedback'; break;
        }
        if (scl_app == 'share') {return(false);}
        if (scl_app == 'feedback') {return(true);}
        if (device.indexOf('desktop') > -1) {
            window.open(scl_https+link, 'width=800,height=300,toolbar=0,status=0'); return(false);
        } else {
            if (scl_app == 'fb') {link = '//profile/100014775069349';}
            window.open(scl_app+link, 'width=800,height=300,toolbar=0,status=0'); return(false);
        }
    });

    $('.social_group_items a').on('click', function(){
        let scl_https = 'https:',
            scl_app = '',
            link = '';
        switch ($('.social_group_items a').index(this)){
            case 0:  scl_app = 'vk:'; link = '//vk.com/club183106924'; break;
            case 1:  scl_app = 'instagram:'; link = ''; break;
            case 2:  scl_app = 'facebook:'; link = ''; break;
            case 3:  scl_app = 'feedback'; scl_https = 'feedback'; link = '#feedback'; break;
        }
        if (scl_app == 'feedback') {return(true);}
        if (device.indexOf('desktop') > -1) {
            window.open(scl_https+link, 'width=800,height=300,toolbar=0,status=0'); return(false);
        } else {
            window.open(scl_app+link, 'width=800,height=300,toolbar=0,status=0'); return(false);
        }
    });

    $('.share-icons a').on('click', function(){
        let scl_https = 'https:',
            scl_app = '',
            link = '';
        switch ($('.share-icons a').index(this)){
            case 0:   scl_app = 'vk:';           link = '//vk.com/share.php?url=https://lapev.github.io'; break;
            case 1:   scl_app = 'fb:';           link = '//www.facebook.com/sharer.php?u=https://lapev.github.io'; break;
            case 2:   scl_app = 'ok:';           link = '//connect.ok.ru/offer?url=https://lapev.github.io'; break;
            case 3:   scl_app = 'twitter:';      link = '//twitter.com/share?url=https://lapev.github.io'; break;
            case 4:   scl_app = 'mail:';         link = '//connect.mail.ru/share?url=https://lapev.github.io&title=Всё о метафорических картах и регрессиях&description=Решение жизненных проблем с помощью проверенных практик используемых именитыми психологами в их профессиональной деятельности&image_url=https://lapev.github.io/img/2Olgi.png'; break;
            case 5:   scl_app = 'whatsapp:';     link = '//web.whatsapp.com/send?text=https://lapev.github.io'; break;
            case 6:   scl_app = 'viber:'; scl_https='viber:'; link = '//forward?text=https://lapev.github.io'; break;
        }
        if (scl_app == '' || scl_https == '') {return(false);}
        if (device.indexOf('desktop') > -1) {
            window.open(scl_https+link, 'width=800,height=600,toolbar=0,status=0'); return(false);
        } else {
            if (scl_app == 'fb') {link = '//sharer.php?u=https://lapev.github.io';}
            window.open(scl_app+link, 'width=800,height=600,toolbar=0,status=0'); return(false);
        }
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