import {render, screen} from "@testing-library/react";
import NewSeason from "../../components/NewSeason";
import "@testing-library/jest-dom/extend-expect";
import {useMediaQuery} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

jest.mock("@mui/material", () => ({
    ...jest.requireActual("@mui/material"),
    useMediaQuery: jest.fn(),
}));

describe("NewSeason", () => {
    test("should render NewSeason without errors", () => {
        render(
            <BrowserRouter>
                <NewSeason />
            </BrowserRouter>
        );

        const newSeasonElement = screen.getByText("New Season");
        expect(newSeasonElement).toBeInTheDocument();

        const saleButtonElement = screen.getByRole("button", { name: "Sale" });
        expect(saleButtonElement).toBeInTheDocument();
    });



    test("should not render flowers image on small screens", () => {
        useMediaQuery.mockReturnValue(true);

        render(
            <BrowserRouter>
                <NewSeason />
            </BrowserRouter>
        );

        const flowersImageElement = screen.queryByAltText("flowers");
        expect(flowersImageElement).not.toBeInTheDocument();
    });
});
