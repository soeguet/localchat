import {describe} from "vitest";
import {useFontSizeStore} from "../../stores/fontSizeStore";
import {act} from "react-dom/test-utils";
import {renderHook} from "@testing-library/react";
import {useFontSizeInitializer} from "./useFontSizeInitializer";

describe("frontend/src/hooks/setup/useFontSizeInitializer.ts", () => {
    it("should return the correct value", async () => {
        act(() => useFontSizeStore.getState().setFontSize(10));

        renderHook(() => useFontSizeInitializer());
        expect(document.documentElement.style.getPropertyValue("--user-font-size")).toBe("10px");
    });
});