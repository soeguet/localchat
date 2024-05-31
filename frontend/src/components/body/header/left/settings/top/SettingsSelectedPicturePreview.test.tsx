import { render } from "../../../../../../utils/test-utils";
import { SettingsSelectedPicturePreview } from "./SettingsSelectedPicturePreview";
import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

describe("SettingsSelectedPicturePreview", () => {
    test("should render", () => {
        render(<SettingsSelectedPicturePreview />);
        const container = screen.queryByTestId("settings-picture-preview");

        expect(container).toBeInTheDocument();
    });
});
