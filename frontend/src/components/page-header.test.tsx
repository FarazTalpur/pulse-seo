import { render, screen } from "@testing-library/react";
import PageHeader from "./page-header";

describe("PageHeader", () => {
  it("renders title and description", () => {
    render(
      <PageHeader
        eyebrow="Section"
        title="Test Title"
        description="Test description"
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });
});
