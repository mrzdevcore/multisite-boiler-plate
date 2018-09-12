class Url {
    public static isHomePage(): Boolean {
        return window.location.pathname === '/';
    }
}

export default Url;
