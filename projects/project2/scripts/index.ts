import 'magnific-popup/dist/jquery.magnific-popup';
import 'bootpag/lib/jquery.bootpag.min';

import * as ES6Promise from 'es6-promise';
ES6Promise.polyfill();

import 'slick-carousel/slick/slick';

/**
 * Import all your components here
 * it it better to have a common structure of initialization
 */
class Main {
  constructor() {
    this.__init__();
  }
  private __init__(): void {
    console.info('script initialization');
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
