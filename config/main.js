import _ from 'lodash';
export class Config {
    commons() {
        return {

        }
    }

    prodconfig() {
        return {

        }
    }

    devconfig() {
        return {

        }
    }

    prodcritical() {
        return {

        }
    }

    devcritical() {
        return {

        }
    }

    generate(env) {
        switch(env) {
            case 'development':
                return _.merge({}, this.commons(), this.devconfig());
            case 'production':
                return _.merge({}, this.commons(), this.prodconfig());
            default:
                break;
        }
    }
}

export default Config;
