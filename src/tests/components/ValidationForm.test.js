import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {useDispatch} from "react-redux";
import {postOrder} from "../../actions/orderAction";
import ValidationForm from "../../components/ValidationForm";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));
jest.mock("../../actions/orderAction");

describe("ValidationForm", () => {
    test("should render ValidationForm without errors", () => {
        render(<ValidationForm total={100}/>);
        const formElement = screen.getByTestId("validation-form");
        expect(formElement).toBeInTheDocument();
    });

    test("should submit form and display response dialog", async () => {
        const dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
        postOrder.mockResolvedValue({status: "success"});

        render(<ValidationForm total={100}/>);

        const phoneNumberInput = screen.getByPlaceholderText("Phone number");
        const orderButton = screen.getByRole("button", {name: "Order"});

        fireEvent.change(phoneNumberInput, {target: {value: "+1234567890"}});
        fireEvent.click(orderButton);


        const element = await screen.findByText("ORDER REQUESTED");
        const sum = await screen.findByTestId("order-sum");
        const status = await screen.findByTestId("order-status");

        expect(element).toBeInTheDocument();
        expect(sum).toBeInTheDocument();
        expect(sum).toBeInTheDocument();
    });
});
