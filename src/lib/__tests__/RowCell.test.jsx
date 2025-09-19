import { render, fireEvent } from "@testing-library/react"
import RowCell from "../RowCell"

let simulateClick = () => new MouseEvent("click", { bubbles: true, cancelable: true })

describe("<RowCell />", () => {
    it("renders row cell with data", () => {
        const testData = "Test data"
        let { container } = render(<RowCell reactKey={"test-key"} data={testData} />)
        // <td class="tgrid-data-cell"><span class="i-dummy"></span><span>Test data</span></td>
        expect(container.querySelectorAll(".tgrid-data-cell")).toHaveLength(1)
        expect(container.childAt(0).hasClass("i-dummy")).toBe(true)
        expect(container[1].name()).toBe("span")
        expect(container[1].text()).toBe(testData)
    })

    it("renders row cell with indent", () => {
        const testData = "Test data"
        const { container } = render(<RowCell reactKey={"test-key"} useIndent={true} indent={2} data={testData} />)
        expect(container.querySelectorAll(".tgrid-data-cell")).toHaveLength(1)
        expect(container.childAt(0).name()).toBe("RowIndent")
        expect(container[1].hasClass("i-dummy")).toBe(true)
        expect(container.childAt(2).text()).toBe(testData)
    })

    it("renders row cell with expand icon", () => {
        const testData = "Test data"
        const { container } = render(<RowCell reactKey={"test-key"} showExpandCollapse={true} data={testData} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container.childAt(0).hasClass("i-expand")).toBe(true)
        expect(container[1].text()).toBe(testData)
    })

    it("renders row cell with collapse icon", () => {
        const testData = "Test data"
        const { container } = render(
            <RowCell reactKey={"test-key"} showExpandCollapse={true} isExpanded={true} data={testData} />,
        )
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container.childAt(0).hasClass("i-collapse")).toBe(true)
        expect(container[1].text()).toBe(testData)
    })

    it("uses custom formatter to render cell data", () => {
        const testData = "Test data"
        function formatter(data) {
            return data + " formatted"
        }

        let { container } = render(<RowCell reactKey={"test-key"} formatter={formatter} data={testData} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].text()).toBe(formatter(testData))
    })

    it("should call custom formatter with two arguments - cell and row data", () => {
        const testData = "Test data"
        const rowData = { prop: "test" }
        const mockFormatter = vi.fn((data) => data + " formatted")

        let { container } = render(
            <RowCell reactKey={"test-key"} formatter={mockFormatter} data={testData} rowData={rowData} />,
        )
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(mockFormatter.mock.calls.length).toBe(1)
        expect(mockFormatter.mock.calls[0].length).toBe(2)
        expect(mockFormatter).toBeCalledWith(testData, rowData)
        expect(container[1].text()).toBe(mockFormatter(testData))
    })

    it("formats date values based on provided format", () => {
        const testData = new Date(1995, 11, 17).getTime()
        const format = "dd/mm/yyyy"

        let { container } = render(<RowCell reactKey={"test-key"} format={format} data={testData} type={"date"} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].innerText).toBe("17/12/1995")
    })

    it("formats date values based on default format if format is not provided", () => {
        const testData = new Date(1995, 11, 17).getTime()

        let { container } = render(<RowCell reactKey={"test-key"} data={testData} type={"date"} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].innerText).toBe("12/17/1995")
    })

    it("renders empty cell when data is not provided or undefined", () => {
        let { container } = render(<RowCell reactKey={"test-key"} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].innerText).toBe("")
    })

    it("renders empty cell when data is not provided or undefined and type is date", () => {
        let { container } = render(<RowCell reactKey={"test-key"} type={"date"} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].text()).toBe("")
    })

    it("renders row cell with custom class name", () => {
        const className = "test-class"
        let { container } = render(<RowCell reactKey={"test-key"} className={className} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].hasClass(className)).toBe(true)
    })

    it("renders row cell with custom dynamic class name", () => {
        const rowData = {
            field1: "myvalue1",
            field2: "myvalue2",
        }

        const className = function (data) {
            return data.field1
        }
        let { container } = render(<RowCell reactKey={"test-key"} className={className} rowData={rowData} />)
        expect(container.querySelectorAll(".tgrid-data-cell").length).toBe(1)
        expect(container[1].hasClass("myvalue1")).toBe(true)
    })

    it("calls callback function when expand icon is clicked", () => {
        const onExpandToggle = vi.fn()
        let { container } = render(
            <RowCell reactKey={"test-key"} showExpandCollapse={true} onExpandToggle={onExpandToggle} />,
        )

        fireEvent(container.querySelector(".i-expand"), simulateClick())

        expect(onExpandToggle.mock.calls).toHaveLength(1)
    })

    it("calls callback function when collapse icon is clicked", () => {
        const onExpandToggle = vi.fn()
        let { container } = render(
            <RowCell
                reactKey={"test-key"}
                showExpandCollapse={true}
                isExpanded={true}
                onExpandToggle={onExpandToggle}
            />,
        )

        fireEvent(container.querySelector(".i-collapse"), simulateClick())

        expect(onExpandToggle.mock.calls).toHaveLength(1)
    })
})
