// tests/components/Bucket.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Bucket from "../../components/Bucket";

describe("Bucket", () => {
    afterEach(() => {
        localStorage.clear();
    });

    test("renders empty bucket message when no items are in the bucket", () => {
        render(<Bucket />);
        expect(screen.getByText(/No items in the bucket/i)).toBeInTheDocument();
    });

    test("renders bucket items when items are available in localStorage", () => {
        const item = {
            id: 1,
            title: "Test Product",
            price: 100,
            discont_price: 90,
            description: "Test product description",
            image: "/product_img/1.jpeg",
            count: 1,
        };

        localStorage.setItem(`product_${item.id}`, JSON.stringify(item));
        render(<Bucket />);
        expect(screen.getByText(item.title)).toBeInTheDocument();
        expect(screen.getByText(/Price: \$100/i)).toBeInTheDocument();
        expect(screen.getByText(/Discount Price: \$90/i)).toBeInTheDocument();
        expect(screen.getByText(/Description: Test product description/i)).toBeInTheDocument();
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
    });
});
