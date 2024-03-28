// src/test/setup-vitest.ts
import "@testing-library/jest-dom";
import "../config/i18n";

vi.mock("zustand"); // to make it works like Jest (auto-mocking)
