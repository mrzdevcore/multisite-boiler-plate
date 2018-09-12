export class Humberger {
  private element: JQuery<HTMLElement> = $('.humberger');
  private lines: JQuery<HTMLElement> = $('.humberger__line');

  constructor() {
    let that = this;
    this.element.on('click', (e) => {
      this.lines.toggleClass('is-clicked');
      const notif = $('.js-notif');
      if(notif.length !== 0) {
        notif.toggle();
      }
    })

    $(document).on('click', (e) => {
      const $target = $(e.target); 
      // When user click outside the menu, hide the menu
      if (!$target.is(this.element) && !$target.is('.js-parent-menu__link.js-dropdown')) {
        $('.nav-mobile').hide();
        that.lines.removeClass('is-clicked');
        const notif = $('.js-notif');
        if(notif.length !== 0) {
          notif.show();
        }
      }   
    });
  }

  public onClick(cc: Function): void {
    this.element.on('click', (evt) => cc(evt));
  }

  public close(): void {
    this.element.removeClass('is-clicked');
  }
 }

export default Humberger;
