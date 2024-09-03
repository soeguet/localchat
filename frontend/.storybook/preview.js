Object.defineProperty(exports, "__esModule", { value: true });
import "../src/index.css";
import "../src/config/i18n";
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};
const _default = preview;
export { _default as default };
