/**
 * Dead simple pub-sub pattern
 * Taken from: https://gist.github.com/learncodeacademy/777349747d8382bfb722
 */
export default class Event {

    constructor() {
        this.events = {};
    }

    subscribe(eventName, fn) {

        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }

    remove(eventName, fn) {

        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    }

    dispatch(eventName, data) {

        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }
}
