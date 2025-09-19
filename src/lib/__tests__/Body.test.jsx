import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { getRowsWithChildren } from "../util/TreeUtils.js"
import Body from "../Body.jsx"

let testData = [
    {
        id: 0,
        name: "Tim Robbins",
        position: "CEO",
        parentId: null,
    },
    {
        id: 1,
        name: "Bob Gunton",
        position: "Manager",
        parentId: 0,
    },
]

let columns = [
    {
        title: "ID",
        field: "id",
        type: "number",
        width: 100,
    },
    {
        title: "Name",
        field: "name",
        type: "string",
    },
    {
        title: "Position",
        field: "position",
        type: "string",
    },
]

let simulateClick = () => new MouseEvent("click", { bubbles: true, cancelable: true })

describe("<Body />", () => {
    it("allow selection of row if canSelect is true", () => {
        let handler = vi.fn()

        let { container } = render(
            <Body
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                canSelect
                idField="id"
                parentIdField="parentId"
                onHScroll={vi.fn()}
                metadata={getRowsWithChildren(testData, "id", "parentId")}
                updateHash=""
                height={100}
                itemHeight={10}
                onSelectRow={handler}
            />,
        )

        container.querySelectorAll("tr").forEach((node) => fireEvent(node, simulateClick()))
        expect(handler.mock.calls).toHaveLength(1)
        expect(container.querySelectorAll(".row-selected")).toHaveLength(1)
    })

    it("does not allow selection of row if canSelect is false", () => {
        let handler = vi.fn()

        let { container } = render(
            <Body
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                canSelect={false}
                idField="id"
                parentIdField="parentId"
                onHScroll={vi.fn()}
                metadata={getRowsWithChildren(testData, "id", "parentId")}
                updateHash=""
                height={100}
                itemHeight={10}
                onSelectRow={handler}
            />,
        )

        container.querySelectorAll("tr").forEach((node) => fireEvent(node, simulateClick()))
        expect(handler.mock.calls).toHaveLength(0)
        expect(container.querySelectorAll(".row-selected")).toHaveLength(0)
    })

    it("allow deselection of row clicking on the selected row", () => {
        let handler = vi.fn()

        let { container } = render(
            <Body
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                canSelect
                idField="id"
                parentIdField="parentId"
                onHScroll={vi.fn()}
                metadata={getRowsWithChildren(testData, "id", "parentId")}
                updateHash=""
                height={100}
                itemHeight={10}
                onSelectRow={handler}
            />,
        )

        fireEvent(container.querySelectorAll("tr")[1], simulateClick())
        expect(handler.mock.calls).toHaveLength(1)
        expect(container.querySelectorAll(".row-selected")).toHaveLength(1)

        fireEvent(container.querySelectorAll("tr")[1], simulateClick())
        expect(handler.mock.calls).toHaveLength(2)
        //expect(container.querySelectorAll('.row-selected')).toHaveLength(0);
    })

    it("dynamic rows css", () => {
        let className = (data) => data.position

        let { container } = render(
            <Body
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                idField="id"
                parentIdField="parentId"
                onHScroll={vi.fn()}
                expandAll
                metadata={getRowsWithChildren(testData, "id", "parentId")}
                updateHash=""
                height={100}
                itemHeight={10}
                rowClass={className}
            />,
        )

        expect(container.querySelectorAll(".CEO")).toHaveLength(1)
        expect(container.querySelectorAll(".Manager")).toHaveLength(1)
    })
})
