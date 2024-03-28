import FontSizePopupHeader from "./FontSizePopupHeader";
import { render } from "../../../../../../utils/test-utils";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

const translations: { [key: string]: string } = {
    adjust_font_size: "Adjust Font Size",
} as const;

vi.mock("react-i18next", () => ({
    useTranslation: () => {
        return {
            t: (key: string) => translations[key] || key,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: "3rdParty",
        init: () => {},
    },
}));

describe("FontSizePopupHeader", () => {
    it("should render the component", () => {
        render(<FontSizePopupHeader fontSize={16} />);
        expect(screen.getByText("Adjust Font Size - 16")).toBeInTheDocument();
    });
});
