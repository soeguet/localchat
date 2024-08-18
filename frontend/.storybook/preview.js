"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../src/index.css");
require("../src/config/i18n");
var preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};
exports.default = preview;
