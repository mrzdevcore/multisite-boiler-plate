import Humberger from '../atoms/humberger';
import Url from '../libs/url';
import { setActiveMenuFromSubMenu } from '../libs/utils';
import ResponsiveUtils from '../base/responsiveUtils';

export class HeaderMenu {
    private humbergerHandler: Humberger;
    private currentActiveMenu;
    private hoveredMenu;
    private hovered = false;
    private isMobile = false;
    private isMobileMenuGenerated = false;

    constructor() {
      this.humbergerHandler = new Humberger();
      this.currentActiveMenu = setActiveMenuFromSubMenu();
      this.isMobile = ResponsiveUtils.isOnAllMobile();
      if (!this.currentActiveMenu) {
          this.currentActiveMenu = document.querySelector('.main-menu[data-active-menu="True"]');
      }

      $(window).on('resize', () => {
        if (ResponsiveUtils.isOnAllMobile() && !this.isMobile && !this.isMobileMenuGenerated) {
          this.isMobile = true;
          this.createMobileMenu();
        }
        else if (!ResponsiveUtils.isOnAllMobile() && this.isMobile) {
          this.isMobile = false;
          this.initSubmenu();
        }
      })
    }

  // Init humburger handler
  private initHumburgerHandler():void {
    this.humbergerHandler.onClick((evt:Event) => {
      evt.preventDefault();
      $('.nav-mobile').toggle();
    })
  }

  // Respond to window resize
  private respondToWindowResize():void {
    $(window).resize(() => {
      if ($(window).outerWidth() > 768) {
        $('.main-nav').removeAttr("style");
        $('.nav-mobile').hide();
        this.humbergerHandler.close();
      }
    });
  }

  // Init all function
  public init():void {
    // Init humburger handler
    this.initHumburgerHandler();
    // Respond to window resize
    this.respondToWindowResize();
    // Respond to logo click
    this.onLogoClick();
    // Init the submenu handler
    this.initSubmenu();
    // Init the child menu of submenu
    this.initSubmenuChild();
    // Construct the mobile menu
    this.createMobileMenu();
    // Init event on the mobile menu
    this.initSubmenuEvent();
    // Change menu url
    this.changeMenuUrl();
  }

  /**
   * When user click on logo on HP, the page should not refresh
   */
  protected onLogoClick(): void {
    $('.btn-home').on('click', (e) => {
      e.preventDefault();
      if (!Url.isHomePage()) {
          window.location.href = '/';
      }
    });
  }

  // Function to handle the top menu hover
  private initSubmenu():void {

    // No need to implement this on mobile
    if(ResponsiveUtils.isOnAllMobile()) {
      return;
    }

    // Begin function implementation on this section
    let instance = this;

    $('.main-menu').hover(function(e) {
      if (!$(this).hasClass('js-has-submenu')) {
        instance.closeSubMenu();
      }
      if (instance.currentActiveMenu) {
        instance.currentActiveMenu.removeAttribute('data-active-menu');
      }
      $('.main-menu').removeAttr('data-active-menu');
      $(this).attr('data-active-menu', 'True');
      instance.hoveredMenu = $(this);
    }, function(t) {
      if ($(this).hasClass('js-has-submenu')) {
        instance.hovered = true;
      }
      else {
        $(this).removeAttr('data-active-menu');
        instance.hoveredMenu = null;
        if (instance.currentActiveMenu) {
          instance.currentActiveMenu.setAttribute('data-active-menu', 'True');
        }
      }
    });

    $('.main-menu.js-has-submenu').hover(function(e) {
      // Close menu if there is already an open one
      instance.closeSubMenu();
      // Open the corresponding submenu
      instance.openSubMenu($(this));
    },function(e) {
      // If the mouse is not inside the sub menu, hide the submenu
      if(instance.isOutSubmenu(e)) {
        instance.closeSubMenu();
      }
    });

    $('.js-sub-menu-container').mouseleave (function(e) {
      if($(this).hasClass('active') && e.pageY > 80) {
        $(this).removeClass('active').hide();
      }
      $('.main-menu').removeAttr('data-active-menu');
      if (instance.currentActiveMenu) {
        instance.currentActiveMenu.setAttribute('data-active-menu', 'True');
      }
      instance.hoveredMenu = null;
    });
  }

  // Function to open submenu
  private openSubMenu(element:JQuery):void {
    let menuFor = element.attr('data-menu-for');
    if(menuFor !== undefined) {
      const submenu = $(`.js-sub-menu-container[data-submenu-for="${menuFor}"]`);
      if(submenu.length !== 0) {
        submenu.addClass('active').show();
      }
    }
  }

  private setHightligtedMenu(e) {
      console.log('test');
      this.hoveredMenu =  $(e);
      this.hoveredMenu.find('a').attr('data-active-menu', 'True');
      if (this.currentActiveMenu.length) {
          this.currentActiveMenu.removeAttr('data-active-menu');
      }
  }

  // Function to close submenu
  private closeSubMenu():void {
    const submenu:JQuery = $('.js-sub-menu-container.active');
    if(submenu.length !== 0) {
      submenu.removeClass('active').hide();
    }
  }

  // Function to check if mouse is inside or outside the sub menu
  private isOutSubmenu(e:MouseEvent):boolean {
    const activeSubMenu = $('.js-sub-menu-container.active');
    if(activeSubMenu.length !== 0) {
        const min = 80;
        const max = activeSubMenu.height() + 80;
        const mouseEvent = <MouseEvent> e;
        return ((mouseEvent.clientY < min) || (mouseEvent.clientY > max));
    }
    else {
      return true;
    }
  }

  // Init submenu child (submenu of a submenu)
  private initSubmenuChild():void {
    $(document).on('click', '.js-parent-menu__link.js-dropdown', function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      $(this).next('.js-child-menu-container').slideToggle();
    });
  }

  // Calculate the submenu container max width
  private calculateSubmenuWidth():void {
    // Get the left navigation menu position plus the padding left on the link
    if (!$('.left-nav').offset()) {
        return;
    }
    const leftNavPos = $('.left-nav').offset().left + 55 ;
    // Get the search icon position
    const rightNavPos = this.getRightNavPos();
    // Set max width on all submenu container
    const subMenu = $('.sub-menu');
    if(subMenu.length !== 0) {
      //subMenu.css('max-width',rightNavPos - leftNavPos);
    }
  }

  // Get the right navigation position
  private getRightNavPos():number {
    const btnSearch = $('.btn-search');
    // If the search btn exist, get this position
    if(btnSearch.length !== 0) {
      // 24 represent the width of the search icon
      return btnSearch.offset().left + 24;
    }
    // if the search btn doesnt exist, get the right nav position
    else {
      const rightNav = $('.right-nav');
      return rightNav.offset().left + rightNav.width();
    }
  }


  // Create the mobile menu
  private createMobileMenu():void {
    // create mobile menu if only on mobile device
    if(ResponsiveUtils.isOnAllMobile()) {
      this.isMobileMenuGenerated = true;
      const subMenu:JQuery = $('.js-sub-menu-container');
      for(let i:number = 0; i < subMenu.length; i++) {
        let oneSubMenu:JQuery = subMenu.eq(i);
        const menuFor:string = oneSubMenu.attr('data-submenu-for');
        if(menuFor !== undefined) {
          // To do: use classe prefixes with js to target
          const targetMenu = $(`.nav-mobile__list[data-menu-for="${menuFor}"]`);
          if(targetMenu.length !== 0) {
            oneSubMenu.clone().appendTo(targetMenu);
          }
        }
      }
    }
  }

  // Init the submenu event
  private initSubmenuEvent():void {
    $('.js-has-submenu .nav-mobile__link').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      const subMenu  = $(this).next('.js-sub-menu-container');
      if(subMenu.length !== 0) {
        $(this).parent().toggleClass('active');
        subMenu.slideToggle();
      }
    });
  }

  // Change menu url
  private changeMenuUrl():void {
    const settings = $('.js-offers-setting');
    if(settings.length !== 0) {
      const offerMenu = $('.js-main-menu--offer a');
      if(offerMenu.length !== 0) {
        offerMenu.attr('href', settings.attr('data-offer-menu-url'));
        offerMenu.attr('target', settings.attr('data-offer-menu-target'));
      }
    }
  }
}

const HM = new HeaderMenu();
export default HM;
