import 'magnific-popup/dist/jquery.magnific-popup';
import 'bootpag/lib/jquery.bootpag.min';

import * as ES6Promise from 'es6-promise';
ES6Promise.polyfill();

import 'slick-carousel/slick/slick';

async function getHumberger() {
  const element = document.querySelector('.test-humberger');
  if (element) {
    const Humberger = await import(/* webpackChunkName: "humberger" */ '../../../commons/libs/humberger');
  }
}

async function getHpCarousel() {
  const element = document.querySelector('.js-hero-banner');
  if (element) {
    const CarouselCode = await import(/* webpackChunkName: "Carousel" */ '../../../commons/libs/components/hpCarousel');
    const BannerCall = await import(/* webpackChunkName: "banner" */ '../../../commons/libs/components/bannerHandler');
    new CarouselCode.HpCarousel().init();
    new BannerCall.BannerHandler().init();
  }
}

async function getMenu() {
  const element = document.querySelector('.main-menur');
  if (element) {
    const Menu = await import(/* webpackChunkName: "Carousel" */ './components/headerMenu');
    new Menu.HeaderMenu().init();
  }
}

getHumberger();
getHpCarousel();
