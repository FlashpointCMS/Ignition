import Vue from 'vue';
import moment from "moment";

Vue.prototype.$moment = (...args) => {
    return moment(...args);
};