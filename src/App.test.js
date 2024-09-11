import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("1 and 1", () => {
  render(<App />);
  const linkElement = 1 + 1;
  expect(linkElement).toEqual(2);
});
