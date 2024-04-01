import {describe, expect, it, vi} from "vitest";
import {useWindowFocussedListener} from "./useWindowFocussedListener";
import {renderHook} from "@testing-library/react";
import {useGuiHasFocusStore} from "../../stores/guiHasFocusStore";

describe("useWindowFocussedListener", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should register and unregister focus and blur event listeners", () => {

        vi.spyOn(window, "addEventListener").mockImplementation(() => {
        });
        vi.spyOn(window, "removeEventListener").mockImplementation(() => {
        });

        renderHook(() => useWindowFocussedListener());

        expect(window.addEventListener).toHaveBeenCalledWith("focus", expect.any(Function));
        expect(window.addEventListener).toHaveBeenCalledWith("blur", expect.any(Function));
    });

    it("should call setGuiHasFocus with true on focus and false on blur", async () => {

        renderHook(() => useWindowFocussedListener());

        window.dispatchEvent(new Event("focus"));
        expect(useGuiHasFocusStore.getState().guiHasFocus).toBe(true);

        window.dispatchEvent(new Event("blur"));
        expect(useGuiHasFocusStore.getState().guiHasFocus).toBe(false);
    });

});