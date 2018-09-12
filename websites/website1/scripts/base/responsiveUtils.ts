class ResponsiveUtils {
  public static TABLET_MAX_WIDTH = 768; 
  
  // include tablet and mobile
  public static isOnAllMobile():boolean {
    return $(window).width() <= this.TABLET_MAX_WIDTH;
  }
}

export default ResponsiveUtils;