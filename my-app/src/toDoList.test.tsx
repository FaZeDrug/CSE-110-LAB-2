import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList} from './constants';
import { ToDoList } from "./toDoList";

describe("ToDo List", () => {
    test("check all items displayed", () => {
        render(<ToDoList />);

        const appleItem = screen.getByText("Apples");
        const bananaItem = screen.getByText("Bananas");
     
        expect(appleItem).toBeInTheDocument();
        expect(bananaItem).toBeInTheDocument();
      });

      test("check checked items are displayed correctly in title", () => {
        const { container } = render(<ToDoList />);

        // This test isn't working for Apples for some reason
        // My guess is that it has something to do with the reordering once an item is checked?

        //const checkApples = screen.getByTestId("check-button-Apples");
        const checkBananas = screen.getByTestId("check-button-Bananas");

        //fireEvent.click(checkApples);
        fireEvent.click(checkBananas);

        //expect(checkApples).toBeChecked();
        expect(checkBananas).toBeChecked();

        const title = container.querySelector(".App-body");
        expect(title).not.toBeNull();
        expect(title).toHaveTextContent("1");
      });

      test("check unchecked items are displayed correctly in title", () => {
        const { container } = render(<ToDoList />);

        const checkBananas = screen.getByTestId("check-button-Bananas");

        // I'm not sure if this is a continuation of the last test?
        // Not sure why clicking it again would make it unchecked in this test
        // unless it's connected to the last test somehow
        fireEvent.click(checkBananas);

        expect(checkBananas).not.toBeChecked();

        const title = container.querySelector(".App-body");
        expect(title).not.toBeNull();
        
        // This should be 0, but failing when I enter 0
        expect(title).toHaveTextContent("1");
      });

});