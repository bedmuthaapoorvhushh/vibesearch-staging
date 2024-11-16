/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBox from "../src/app/components/utilities/SearchBox/SearchBox";
import "@testing-library/jest-dom";
import { describe } from "node:test";
import { Figtree } from "next/font/google";

jest.mock("next/font/google", () => ({
  Figtree: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("cross renders of a reasonable size", () => {
  it("should render a cross icon", async () => {
    render(<SearchBox />);
    const searchInput = screen.getByTestId("SearchBox__Input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const cross = screen.getByTestId("SearchBox__Icon");
    expect(cross).toBeInTheDocument();
  });
});
