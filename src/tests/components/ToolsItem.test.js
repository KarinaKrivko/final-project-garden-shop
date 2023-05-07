import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ToolsItem from "../../components/ToolsItem";

const testItem = {
    id: 1,
    title: "Test item",
    price: 10.99,
    image: "/images/test-item.jpg",
    description: "This is a description for test item.",
};
const url = "http://localhost:3333/"
describe("ToolsItem component", () => {
    it("should render the component with correct props", () => {
        render(<ToolsItem item={testItem} />);
        const image = screen.getByRole("img", { name: "image" });
        const title = screen.getByText("Test item");
        const price = screen.getByText("$10.99");
        const description = screen.getByText("This is a description for test item.");
        const addButton = screen.getByRole("button", { name: "Add to Cart" });

        expect(image).toHaveAttribute("src", `${url}/images/test-item.jpg`);
        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });
});
