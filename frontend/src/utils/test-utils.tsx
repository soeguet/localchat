import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import { ReactElement } from "react";

afterEach(() => {
    cleanup();
});

function customRender(ui: ReactElement, options = {}) {
    return render(ui, {
        wrapper: ({ children }) => children,
        ...options,
    });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
