"use strict"
import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@/styles/base.css';
import { Rating } from './modules/rating.js';
import { ThemeChanger } from './modules/theme.js';
import mobileMenu from './modules/mobileMenu.js';

const rating = new Rating( {
    ratingClass: "jsSetRating",
    overlayClass: "jsRatingOverlay",
    itemClass: "app_title__rating_item",
    scoreTextClass: "jsUserRating",
    scoreCountClass: "jsUserRatingCount",
    overlayColor: getComputedStyle(document.documentElement).getPropertyValue('--set_rating_empty_bg'),
});

rating.init();

const theme = new ThemeChanger('jsThemeSwitcher', 'light_theme', 'dark_theme', ()=>{
    const color = getComputedStyle(document.documentElement).getPropertyValue('--set_rating_empty_bg');
    rating.updateOverlayColor(color);
});

mobileMenu('subheader__mobile_menu_btn', 'subheader__mobile_menu');
mobileMenu('app_title__more_info', 'app_title__mobile_menu');