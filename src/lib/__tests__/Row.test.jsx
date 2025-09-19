import { render, fireEvent } from "@testing-library/react"
import { Row } from "../Row"

const testData = {
    id: 0,
    name: "Tim Robbins",
    position: "CEO",
    parentId: null,
}

const columns = [
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

describe("<Row />", () => {
    it("renders row with selected status", () => {
        let { container } = render(
            <Row reactKey={"test-key"} data={testData} columns={columns} level={0} canExpand={false} selected />,
        )
        expect(container.querySelectorAll(".row-selected")).toHaveLength(1)
    })

    it("renders row without selected status", () => {
        let { container } = render(
            <Row
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                level={0}
                canExpand={false}
                selected={false}
            />,
        )
        expect(container.querySelectorAll(".row-selected")).toHaveLength(0)
    })

    it("renders row with given className", () => {
        const className = "myclass"
        let { container } = render(
            <Row
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                level={0}
                canExpand={false}
                className={className}
            />,
        )
        expect(container.querySelectorAll(".myclass")).toHaveLength(1)
    })

    it("renders row with given dynamic className", () => {
        const className = function (data) {
            return data.position
        }
        let { container } = render(
            <Row
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                level={0}
                canExpand={false}
                className={className}
            />,
        )
        expect(container.querySelectorAll(".CEO")).toHaveLength(1)
    })

    it("onSelect is called on row click", () => {
        const handler = vi.fn()
        let { container } = render(
            <Row
                reactKey={"test-key"}
                data={testData}
                columns={columns}
                level={0}
                canExpand={false}
                onSelect={handler}
            />,
        )
        fireEvent(container.querySelector("tr"), new MouseEvent("click", { bubbles: true, cancelable: true }))
        expect(handler.mock.calls).toHaveLength(1)
    })
})
