"use strict"
import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@/styles/base.css';
import {Rating} from './modules/rating.js';

const rating = new Rating( {
    ratingClass: "jsSetRating",
    overlayClass: "jsRatingOverlay",
    itemClass: "app_title__rating_item",
    scoreTextClass: "jsUserRating",
    scoreCountClass: "jsUserRatingCount",
    overlayColor: "EBF6F5"
}).init();