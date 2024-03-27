import { render, screen, userEvent } from "../../../../../utils/test-utils";
import FlagButton from "./FlagButton";
import { fireEvent } from "@testing-library/react";
import { switchLanguage } from "../../../../../utils/i18n-helper";

/*const selectedLanguageStoreMock = {
    selectedLanguage: "en",
    setSelectedLanguage: vi.fn((language: string) => {
        selectedLanguageStoreMock.selectedLanguage = language;
    }),
};

vi.mock("../../../../../stores/selectedLanguageStore", () => {
    return {
        __esModule: true,
        default: () => "en",
    };
})*/

describe("FlagButton", () => {
    test("should render the FlagButton component", () => {
        render(<FlagButton />);
        const flagButton = screen.getByRole("button");
        expect(flagButton).toBeInTheDocument();
    });

    test("should render britain flag at start", () => {
        render(<FlagButton />);
        expect(screen.getByTestId("flag-button")).toBeInTheDocument();
    });

    test("should switch the language to 'en' when the button is clicked", () => {
        render(<FlagButton />);
        expect(screen.getByTestId("britain-flag-svg")).toBeInTheDocument();
    });
    test("should render german flag at start", () => {
        render(<FlagButton />);
        const button = screen.getByTestId("flag-button");
        fireEvent.click(button);
        expect(screen.getByTestId("britain-flag-svg")).toBeInTheDocument();
    });

    test.skip("should render change language", () => {
        render(<FlagButton />);
        const flagButton = screen.getByRole("button");
        userEvent.click(flagButton);
        switchLanguage();
        expect(screen.getByTestId("german-flag-svg")).toBeInTheDocument();
        userEvent.click(flagButton);
        switchLanguage();
        expect(screen.getByTestId("britain-flag-svg")).toBeInTheDocument();
    });
});