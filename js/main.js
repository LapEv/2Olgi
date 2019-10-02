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

let height = {
    _body: {},
    get body() {
        return $('body').height();
    },
    set body(value) {
        this._body = value;
    },
    _footer: {},
    get footer() {
        return $('.footer').outerHeight(true);
    },
    set footer(value) {
        this._footer = value;
    },
    _logo: {},
    get logo() {
        return $('.container_height').height()+($('.container_logo').outerHeight(true)-$('.container_logo').outerHeight());
    },
    set logo(value) {
        this._logo = value;
    },
    _margin: {},
    get margin() {
        return $('.container_general').outerHeight(true) - $('.container_general').outerHeight(false);
    },
    set margin(value) {
        this._margin = value;
    },
    _min: {},
    get min() {
        return this.body - this.logo - this.footer - this.margin;
    },
    set min(value) {
        this._min = value;
    },
    _main: {},
    get main() {
        return this._main;
    },
    set main(value) {
        this._main = value;
    },
    _general: {},
    get general() {
        return $('.container_general').outerHeight(true);
    },
    set general(value) {
        this._general = value;
    },
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
    _classActive: '',
    get classActive() {
        return this._classActive;
    },
    set classActive(value) {
        this._classActive = value;
    },
    ChangeActive: function (className,newClassName,index,timeoutChange){
        if (index > 0){ // for change to active status
            setTimeout(()=> { // timeout for contacts out
                if ($(this.class[index]).hasClass(className)){
                    $(this.class[index]).removeClass(className);
                    articles.ChangeActiveClass(articles.classActive,active = false);
                    if (this.class[index] == '.container_general_4'){
                        articles.ChangeActiveClass('.article_list',active=true);
                    }
                    $(this.class[index]).addClass(newClassName);
                    this.classActive = this.class[index];
                    } 
                document.title = this.title[index];
                WorkFunction.FooterCorrect(this.class[index],800);
            },timeoutChange);
            if (this.class[index] == '.container_general_5'){
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
                    if (this.class[key] == '.container_general_4'){
                        articles.ChangeActiveClass('.article_list',active=false);
                    }
                }
                if (this.class[key] == '.container_general_5'){ 
                    if ($('.main_container').hasClass('general_five')){
                        $('.main_container').removeClass('general_five');
                        $('.main_container').addClass('general_five_no');
                        return(true);
                    }
                }
            }
        }
    },
    mobileVersion : ()=>{
        if ($('.menu').hasClass('menu_active')){
            $('.menu').removeClass('menu_active');
        }
        if (document.querySelector('.ham').classList.contains('active')){
            document.querySelector('.ham').classList.remove('active');
        }
    },
},
WorkFunction = {
    _footerPosition: {},
    get footerPosition() {
        return $('.footer').css('position');
    },
    set footerPosition(value) {
        this._footerPosition = value;
    },
    FooterCorrect : (nameclass,resize)=>{
        let timeout = 1000,
            lastClassHeight = height.main;
        if (height.general > height.min){
            timeout = 0;
        } 
        $('.container_general').height(height.min);
        height.main = $(nameclass).outerHeight(true);
        lastClassHeight = lastClassHeight-height.main;
        if (height.main <= height.min){
            if (nameclass == '.container_general_5' && WorkFunction.footerPosition == 'absolute'){
                lastClassHeight = 0;
            }
            $('.footer').css({'bottom': '-'+lastClassHeight+'px'});
            $('.footer').animate({
                'bottom':'0'
            },resize);

            $('.footer').css({'position': 'absolute'});
        } else {
            $('.container_general').height(height.main);
            if (lastClassHeight > 0){
                $('.footer').css({'bottom': '-'+lastClassHeight+'px'});
                $('.footer').animate({
                    'bottom':'0'
                },resize);    
            } else {
                $('.footer').css({'bottom': '0'});
            }
            $('.footer').css({'position': 'relative'});
        }
    },
    Cross : ()=>{
        $('.cross a').attr('href',window.location.hash);
    },
    ScrlTop : ()=>{
        $('.main').animate({
            scrollTop: $("#maintop").offset().top
        }, 400);
    }
},
articles = {
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
    _class: {}, 
    get class() {
        return this._class;
    },
    set class(value) {
        this._class = value;
    },
    _classActive: '',
    get classActive() {
        return this._classActive;
    },
    set classActive(value) {
        this._classActive = value;
    },
    ChangeActiveClass: function(className, active){
        if (active == false){
            if ($(className).hasClass('active')){
                $(className).removeClass('active');
            }
            $(className).addClass('active_no');
        } else {
            if ($(className).hasClass('active_no')){
                $(className).removeClass('active_no');
            }
            $(className).addClass('active');
        }
    },
    ChangeActive: function (className,newClassName,index,timeoutChange){
        if (index > 0){ // for change to active status
            setTimeout(()=> { // timeout for contacts out
                if ($(this.class[index]).hasClass(className)){
                    $(this.class[index]).removeClass(className);
                    $(this.class[index]).addClass(newClassName);
                    this.classActive = this.class[index];
                    articles.ChangeActiveClass('.article_list',active=false);
                } 
                document.title = this.name[index];
                WorkFunction.FooterCorrect(this.class[index],800);
            },timeoutChange);
        } else { // for change to active_no status
            if ($('.article_list').hasClass(className)){
                $('.article_list').removeClass(className);
                $('.article_list').addClass(newClassName);
            }
            for (let key in this.class){
                if ($(this.class[key]).hasClass(className)){
                    $(this.class[key]).removeClass(className);
                    $(this.class[key]).addClass(newClassName);
                }
            }
        }
    },    
};

//==== Record object menu
$('.menu a').each(function(index){
    let i = index + 1;
    menu.name[i] = $('.menu a').eq(index).text();
    menu.attr[i] = $('.menu a').eq(index).attr('href');
    menu.title[i] = $('.menu a').eq(index).attr('title');
    menu.class[i] = '.container_general_'+i;
});
    menu.name[6] = 'Написать нам';
    menu.attr[6] = '#feedback2Olgi';
    menu.title[6] = '2Oльги. Форма обратной связи';
    menu.class[6] = '.container_general_6';

//==== Record object article
$('.article_list a').each(function(index){
    articles.name[index+1] = '2Oльги. '+$(this).text();
    articles.attr[index+1] = $(this).attr('href');
});

$('.article').each(function(index){
    $(this).toggleClass(`article article_${index+1} active_no article active_no`);
    articles.class[index+1] = `.article_${index+1}`;
    articles.last_hash = `#article${index+1}`;
});

$(window).resize(function(){
    $('.container_general').height(height.min);
    WorkFunction.FooterCorrect(menu.classActive,0);
    if ($(articles.classActive).hasClass('active')){
        WorkFunction.FooterCorrect(articles.classActive,0);
    }
    if ($('.article_list').hasClass('active')){
        WorkFunction.FooterCorrect('.article_list',0);
    }

});

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
                let timeoutChange = 0;
                if (index < length.menu) {
                    menu.mobileVersion();
                    if (menu.ChangeActive('active','active_no',0))
                       {timeoutChange = 2000;}
                    menu.ChangeActive('active_no','active',index+1,timeoutChange);
                    WorkFunction.ScrlTop();
                    WorkFunction.Cross();
                }
                if ((index >= length.menu+2 && index <= (length.menu+2)+length.article-1) ||
                 (location == articles.last_hash)) {
                    articles.ChangeActive('active','active_no',0);
                    if (menu.ChangeActive('active','active_no',0)){
                        timeoutChange = 2000;
                    }                    
                    menu.ChangeActive('active_no','active',4,timeoutChange);
                    articles.ChangeActive('active_no','active',index+1-(length.menu+2),timeoutChange);
                    WorkFunction.ScrlTop();
                    WorkFunction.Cross();
                }
                if (location == '#feedback2Olgi'){
                    let timeoutChange = 0;
                    if (menu.ChangeActive('active','active_no',0))
                       {timeoutChange = 2000;}
                    menu.ChangeActive('active_no','active',length.menu+1,timeoutChange);
                    WorkFunction.ScrlTop();
                    // WorkFunction.Cross();
                }
                return false;
            }
        });
    }

    ChangeLocation(document.location.hash);

    window.addEventListener("hashchange", function() {
        ChangeLocation(location.hash);
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
            if (scl_app == 'instagram:') {link = '//www.instagram.com/lapkina6416/';}
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
            case 3:   scl_app = 'whatsapp:';     link = '//web.whatsapp.com/send?text=https://lapev.github.io'; break;
            case 4:   scl_app = 'viber:'; scl_https='viber:'; link = '//forward?text=https://lapev.github.io'; break;
        }
        if (scl_app == '' || scl_https == '') {return(false);}
        if (device.indexOf('desktop') > -1) {
            window.open(scl_https+link, 'width=800,height=600,toolbar=0,status=0'); return(false);
        } else {
            if (scl_app == 'fb') {link = '//sharer.php?u=https://lapev.github.io';}
            window.open(scl_app+link, 'width=800,height=600,toolbar=0,status=0'); return(false);
        }
    });

    $('.ham').on('click', function(){
        document.querySelector('.ham').classList.toggle('active');
        $('.menu').toggleClass('menu_active');
    });

    $(document).click( function(event){
        if ($('.footer_share').hasClass('active')){
            if( $(event.target).closest(".share").length) return;
            $('.footer_share').addClass('active_no');
            $('.footer_share').removeClass('active');
            return;
        }
        if ($('.menu').hasClass('menu_active')){
            if( $(event.target).is('.ham'))         return;
            if( $(event.target).is('.line')) {
                if ($(event.target).is('.top'))     return;
                if ($(event.target).is('.middle'))  return;
                if ($(event.target).is('.bottom'))  return;
            }
            if( $(event.target).is(".menu ul"))     return;
            if( $(event.target).is(".hamburger"))   return;
            $('.menu').removeClass('menu_active');
            document.querySelector('.ham').classList.toggle('active');
            return;
        }
        event.stopPropagation();
    });

});