import React from "react";
import { ThemeProvider } from "@chakra-ui/react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MainHeader, Footer, ListMenu, SearchModal } from "../components/index";
import theme from "../../theme";
import { myLinks } from "../components/core/Footer";

afterEach(cleanup);

test("should shows main header", () => {
    render(
        <ThemeProvider theme={theme}>
            <MainHeader />
        </ThemeProvider>
    );
    expect(screen.queryByText("LAGU.FM")).toBeInTheDocument();
});

test("should shows footer element", () => {
    const { container } = render(
        <ThemeProvider theme={theme}>
            <Footer />
        </ThemeProvider>
    );

    expect(container.firstChild).toHaveTextContent(
        "Made with 💛 by Abraham A. Agung"
    );
    expect(
        screen.getByRole("link", { name: "Abraham A. Agung" })
    ).toHaveAttribute("href", "https://anakagung.com");

    myLinks.map((link) => {
        expect(screen.getByTestId(link.name)).toHaveAttribute("href", link.url);
    });
});

test("should shows menu element", () => {
    const props = {
        onChange: jest.fn(),
        searchTerms: "pink floyd",
        setSearchTerms: jest.fn(),
        setShowBy: jest.fn(),
    };

    const { container } = render(
        <ThemeProvider theme={theme}>
            <ListMenu {...props} />
        </ThemeProvider>
    );

    expect(container.querySelector("label")).toHaveTextContent("Show by");
    expect(container.querySelector("select")).toBeInTheDocument();

    const searchInput = container.querySelector("input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
        "placeholder",
        "Search artist or song name"
    );
    expect(searchInput).toHaveAttribute("readonly");
    expect(searchInput).toHaveValue("pink floyd");
});

test("should select show-by onChange is working", () => {
    const props = {
        onChange: jest.fn(),
        searchTerms: "pink floyd",
        setSearchTerms: jest.fn(),
        setShowBy: jest.fn(),
    };

    const { container } = render(
        <ThemeProvider theme={theme}>
            <ListMenu {...props} />
        </ThemeProvider>
    );
    fireEvent.change(container.querySelector("select") as Element);
    expect(props.onChange).toHaveBeenCalled();
    expect(props.setSearchTerms).not.toHaveBeenCalled();
});

test("should input search working", async () => {
    const props = {
        onChange: jest.fn(),
        searchTerms: "pink floyd",
        setSearchTerms: jest.fn(),
        setShowBy: jest.fn(),
    };

    const { container } = render(
        <ThemeProvider theme={theme}>
            <ListMenu {...props} />
        </ThemeProvider>
    );

    fireEvent.click(container.querySelector("input") as Element);

    const searchModal = screen.getByTestId("search-modal");
    const searchSubmitButton = screen.getByTestId("search-submit");

    expect(searchModal).toBeInTheDocument();
    expect(searchSubmitButton).toBeInTheDocument();
});

test("should shows modal, its children and close when submit", () => {
    const props = {
        isOpen: true,
        onClose: jest.fn(),
        setSearchTerms: jest.fn(),
        setShowBy: jest.fn(),
    };
    const { queryByRole } = render(
        <ThemeProvider theme={theme}>
            <SearchModal {...props} />
        </ThemeProvider>
    );
    fireEvent.click(queryByRole("button") as Element);
    expect(props.onClose).toBeCalledTimes(1);
});
