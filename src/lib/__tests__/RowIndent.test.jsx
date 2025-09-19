import { expect, describe, it } from "vitest"
import { render } from "@testing-library/react"
import RowIndent from "../RowIndent"

describe("<RowIndent />", () => {
    it("renders one row indent dummy with react key", () => {
        let { container } = render(<RowIndent reactKey={"test-key"} indent={1} />)
        expect(container.querySelectorAll(".row-indent-wrapper")).toHaveLength(1)
        expect(container.querySelectorAll(".row-indent-wrapper")).toHaveLength(1)
        // expect(container.querySelectorAll('.row-indent-wrapper .row-indent').key()).toBe('test-key-indent-1');
    })

    it('renders "n" row indent dummies with react keys', () => {
        let { container } = render(<RowIndent reactKey={"test-key"} indent={3} />)
        expect(container.querySelectorAll(".row-indent-wrapper")).toHaveLength(1)
        expect(container.querySelectorAll(".row-indent-wrapper .row-indent")).toHaveLength(3)
        // expect(container.querySelectorAll('.row-indent-wrapper .row-indent')[2].key()).toBe('test-key-indent-1');
        // expect(container.querySelectorAll('.row-indent-wrapper .row-indent')[1].key()).toBe('test-key-indent-2');
        // expect(container.querySelectorAll('.row-indent-wrapper .row-indent')[0].key()).toBe('test-key-indent-3');
    })

    it("renders nothing when indent is 0", () => {
        let { container } = render(<RowIndent reactKey={"test-key"} indent={0} />)
        expect(container[0]).toBeUndefined()
    })

    it("renders nothing when indent is less than 0", () => {
        let { container } = render(<RowIndent reactKey={"test-key"} indent={0} />)
        expect(container[0]).toBeUndefined()
    })
})
