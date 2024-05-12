"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.create = exports.storeResetFns = void 0;
var react_1 = require("@testing-library/react");
var _a = await vi.importActual("zustand"), actualCreate = _a.create, actualCreateStore = _a.createStore;
// a variable to hold reset functions for all stores declared in the app
exports.storeResetFns = new Set();
var createUncurried = function (stateCreator) {
    var store = actualCreate(stateCreator);
    var initialState = store.getInitialState();
    exports.storeResetFns.add(function () {
        store.setState(initialState, true);
    });
    return store;
};
// when creating a store, we get its initial state, create a reset function and add it in the set
exports.create = (function (stateCreator) {
    // to support curried version of create
    return typeof stateCreator === "function"
        ? createUncurried(stateCreator)
        : createUncurried;
});
var createStoreUncurried = function (stateCreator) {
    var store = actualCreateStore(stateCreator);
    var initialState = store.getInitialState();
    exports.storeResetFns.add(function () {
        store.setState(initialState, true);
    });
    return store;
};
// when creating a store, we get its initial state, create a reset function and add it in the set
exports.createStore = (function (stateCreator) {
    // to support curried version of createStore
    return typeof stateCreator === "function"
        ? createStoreUncurried(stateCreator)
        : createStoreUncurried;
});
// reset all stores after each test run
afterEach(function () {
    (0, react_1.act)(function () {
        exports.storeResetFns.forEach(function (resetFn) {
            resetFn();
        });
    });
});
