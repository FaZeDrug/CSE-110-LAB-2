import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList} from './constants';
import { ToDoList } from "./toDoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("ToDo List", () => {

    // OUR TESTS BELOW
    test("check all items displayed", () => {
        render(<ToDoList />);

        const appleItem = screen.getByText("Apples");
        const bananaItem = screen.getByText("Bananas");
     
        expect(appleItem).toBeInTheDocument();
        expect(bananaItem).toBeInTheDocument();
      });

      test("check title render", () => {
        render(<ToDoList />);

        const title = screen.getByText("'s To Do List");
        expect(title).toBeInTheDocument();
      });

      test("check checked items are displayed correctly in title", () => {
        render(<ToDoList />);

        const itemsBought0 = screen.getByText("Items bought: 0")
        expect(itemsBought0).toBeInTheDocument();

        const box = screen.getAllByRole("checkbox");

        // Check all boxes
        const firstItem = box[0];

        fireEvent.click(firstItem);
        const itemsBought1 = screen.getByText("Items bought: 1")
        expect(itemsBought1).toBeInTheDocument();

        fireEvent.click(firstItem);
        const itemsBought2 = screen.getByText("Items bought: 2")
        expect(itemsBought2).toBeInTheDocument();

        // Uncheck all boxes
        fireEvent.click(firstItem);
        expect(itemsBought1).toBeInTheDocument();

        const secondItem = box[1];
        fireEvent.click(secondItem);
        expect(itemsBought0).toBeInTheDocument();
      });

});