// @ts-check

/** @module Computed */

import { Store, UpdateEventDetails } from "./Store.js";

/** 
 * @typedef {(details:UpdateEventDetails, store:Store)=>void} Subscriber
 * @typedef {(a:any, b:any, item_name:string, property: (string | null))=>boolean} CompareFunction
*/

export class Computed {
    /** @type {String} */
    #name
    /** @type {Store} */
    #store

    /**
     * Creates the atom item
     * @param {Store} store 
     * @param {string} name 
     * @param {(store: Store)=>any} [callback] 
     */
    constructor(store, name, callback) {
        this.#store = store;
        this.#name = name;

        if (typeof callback != "undefined") {
            this.#store.createComputedItem(this.#name, callback);
        }
    }

    get value() {
        return this.#store.getItem(this.#name);
    }

    get name() {
        return this.#name;
    }

    /**
     * 
     * @param {Subscriber} callback
     * @param {number|undefined} [debounce_time] debounce time
     */
    subscribe(callback, debounce_time) {
        this.#store.subscribe(this.#name, callback, debounce_time);
    }

    clearSubscribers() {
        this.#store.clearItemSubscribers(this.#name);
    }

    hasSubscribers() {
        this.#store.hasSubscribers(this.#name);
    }

    /**
     * 
     * @param {CompareFunction | null} func_or_null 
     * @returns {boolean}
     */
    setCompareFunction(func_or_null) {
        return this.#store.setCompareFunction(this.#name, func_or_null);
    }

    recalc() {
        return this.#store.recalcComputed(this.#name);
    }
}

