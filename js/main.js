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

const menu = {
    _name: {},
    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    },
    _attr: {},
    get attr() {
        return this._attr;
    },
    set attr(value) {
        this._attr = value;
    },
    _title: {},
    get title() {
        return this._title;
    },
    set title(value) {
        this._title = value;
    },
    _class: {}, 
    get class() {
        return this._class;
    },
    set class(value) {
        this._class = value;
    },
    ChangeActive: function (className,newClassName,index,timeoutChange){
        if (index > 0){ // for change to active status
            if ($(this.class[index]).hasClass(className)){
                $(this.class[index]).removeClass(className);
            }
            setTimeout(()=> {
                $(this.class[index]).addClass(newClassName);
                document.title = this.title[index];
                CheckFooter($(this.class[index]));
            },timeoutChange);
            
            if (index == 5){
                if ($('.main_container').hasClass('general_five_no')){
                    $('.main_container').removeClass('general_five_no');
                }
                $('.main_container').addClass('general_five');
            } 
        } else { // for change to active_no status
            for (let key in this.class){
                if ($(this.class[key]).hasClass(className)){
                    $(this.class[key]).removeClass(className);
                    $(this.class[key]).addClass(newClassName);
                    menu.HeightCorrect(this.class[key]);
                }
                if (key == 5){ 
                    if ($('.main_container').hasClass('general_five')){
                        $('.main_container').removeClass('general_five');
                        $('.main_container').addClass('general_five_no');
                        return(true);
                    }
                }
            }
        }
    },
    HeightCorrect: (nameclass)=>{
        setTimeout(()=> {
            $(nameclass).css({'min-height': '250px'});
        },1500);
    },
    mobileVersion : ()=>{
        if ($('.menu').hasClass('menu_active')){
            $('.menu').removeClass('menu_active');
        }
        if (document.querySelector('.ham').classList.contains('active')){
            document.querySelector('.ham').classList.remove('active');
        }
    },
    Cross : ()=>{
        $('.cross a').attr('href',window.location.hash);
    },
    ScrlTop : ()=>{
        $('.main').animate({
            scrollTop: $("#maintop").offset().top
        }, 500);
    }
},
articles = {
    
};

//==== Record object menu
$('.menu a').each(function(index){
    let i = index + 1;
    menu.name[i] = $('.menu a').eq(index).text();
    menu.attr[i] = $('.menu a').eq(index).attr('href');
    menu.title[i] = $('.menu a').eq(index).attr('title');
    menu.class[i] = '.container_general_'+i;
});

//==== Record object article
$('.article_list a').each(function(index){
    articles['title'+index] = $('.article h3').eq(index).text();
});

function CheckFooter(mainclass){
    let height = {
        body : $('body').height(),
        main : mainclass.outerHeight(true),
        footer : $('.footer').outerHeight(true),
        logo : $('.container_logo').outerHeight(true),
        margin : $('.container_general').outerHeight(true)-$('.container_general').outerHeight(false),
        content : $('.content').height(),
        diff : 0,
        min : 0,
        container_full : $('.container_form').outerHeight(true),
        container : $('.container_form').height(),
        timeout : 0
    };
    console.log('content = '+$('.content').outerHeight());
    console.log('logo = '+$('.container_logo').outerHeight());
    console.log('maincont = '+$('.main_container').outerHeight());
    console.log('five = '+$('.general_five').outerHeight());
    console.log('five_no = '+$('.general_five_no').outerHeight());
    console.log('==================================');

    height.diff = height.body-height.logo-height.footer-height.margin;
    if (height.content > height.diff){
        height.timeout = 2000;
    }
    setTimeout(()=> {
        $('.content').height(height.main);
        if ($('.content').height() < height.diff){
            if (height.timeout > 0){$('.footer').css({'bottom':'-50px'});}
            $('.footer').animate({
                    'bottom':'0'
            },300);
            $('.footer').css({'position':'absolute'});
        } else {
            $('.content').height(height.main+height.margin*3);
            $('.footer').css({'position':'relative'});
        }
    }, height.timeout);

    let h = height.diff-height.margin*2;
    if (mainclass.selector != '.container_general_5'){
        if (height.main <= h){
            if (mainclass.selector == '.container_general_6'){
                h = height.container_full + (height.container_full-height.container)/0.67;
            }
            h=h+'px';
            mainclass.css({'min-height': h});
        }
    }
}

$(document).ready(()=>{
    'use strict';

    let device = Device();
    
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

    //---- For hidden next article for maximum and pref articles for minimum
    $('.article_menu a').eq(0).css({'opacity':'0', 'cursor':'context-menu', 'z-index':'-1'});
    $('.article_menu a').eq(length.article_menu-1).css({'opacity':'0', 'cursor':'context-menu', 'z-index':'-1'});

    //---- For Footer Last Articles
    $('.footer_last_articles a').text($('.article h3').eq(length.article-1).text());
    $('.footer_last_articles a').attr('href', '#article'+length.article);
    

    function ChangeLocation(location){
        $('a').each(function(index){
            if ($(this).attr('href') == location){
                if (index < length.menu) {
                    // CheckArticleActive();
                    menu.mobileVersion();
                    let timeoutChange = 0;
                    if (menu.ChangeActive('active','active_no',0)){timeoutChange = 2000;}
                    menu.ChangeActive('active_no','active',index+1,timeoutChange);
                    menu.ScrlTop();
                    menu.Cross();
                }
                if (index >= length.menu+2 && index <= (length.menu+2)+length.article-1) {
                    let index_article = index - (length.menu+2);
                    if ($('.container_general_6').hasClass('active')){
                        ActiveClassChange($('.container_general_6'), 'active', 'active_no');
                    }            
                    // ArticleClick(index_article, length.article);
                    MenuClick();
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
                    // CheckArticleActive();
                    MenuClick();
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
        ChangeLocation(location.hash);
    });

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

    // function ScrlTop(){
    //     $('.main').animate({
    //         scrollTop: $("#maintop").offset().top
    //     }, 500);
    // }

    // function MenuClick(){
    //     if ($('.menu').hasClass('menu_active')){
    //         $('.menu').removeClass('menu_active');
    //     }
    //     if (document.querySelector('.ham').classList.contains('active')){
    //         document.querySelector('.ham').classList.remove('active');
    //     }
        // if ($('.container_general_5').hasClass('active') && indActive != length.menu-1){
        //     ChangeClass($('.main_container'),false,'general_five',indActive);
        //     ChangeClass($('.container_general_5'),false,'active',indActive);
        //     setTimeout(()=> {
        //         ChangeClass($('.container_general_'+(indActive+1)),true,'active',indActive);
        //     }, 2000);
        //     return;
        // }
        // for(let i=0; i<=lentgh; i++){
        //     if (i == indActive){
        //         ChangeClass($('.container_general_'+(i+1)),true,'active',indActive);
        //     } else {
        //         ChangeClass($('.container_general_'+(i+1)),false,'active',indActive);
        //         if (indActive != 4){minHeightCorrect($('.container_general_'+(i+1)));}
        //     }
        //     if (indActive == 4){
        //         ChangeClass($('.main_container'),true,'general_five',indActive);
        //         $('.main_container').addClass('general_five');
        //     } else {
        //         ChangeClass($('.main_container'),false,'general_five',indActive);
        //     }
        // }
    // }

    // function CheckArticleActive(){
    //     if ($('.container_general_4').hasClass('active_no') || $('.article_list').hasClass('active_no')){
    //         ChangeClass($('.article_list'),true,'active',length.article);
    //         for (let i = 0; i < $('.article').length; i++){
    //             ChangeClass($('.article').eq(i),false,'active',length.article);
    //             minHeightCorrect($('.article').eq(i));
    //         }
    //     }
    //     if ($('.container_general_4').hasClass('active') && $('.article_list').hasClass('active')){
    //         CheckFooter($('.article_list'));
    //     }
    // }

    // function ArticleClick(indActive, lentgh){
    //     for(let i=0; i<lentgh; i++){
    //         if (i == indActive){
    //             ChangeClass($('.article_list'),false,'active',0);
    //             ChangeClass($('.article').eq(i),true,'active',0);
    //             minHeightCorrect($('.article_list'));
    //         } else {
    //             ChangeClass($('.article').eq(i),false,'active',0);
    //             minHeightCorrect($('.article').eq(i));
    //         }
    //     }
    // }

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