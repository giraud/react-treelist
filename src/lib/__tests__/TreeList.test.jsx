import React, { Component } from "react"
import { expect, describe, it } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import TreeList from "../TreeList"

const data = [
    {
        id: 0,
        name: "Tim Robbins",
        position: "CEO",
        parentId: null,
    },
]

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

let simulateClick = () => new MouseEvent("click", { bubbles: true, cancelable: true })

class RefreshWrapper extends Component {
    state = {
        counter: 1,
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
                refresh: this.props.refresh ? this.state.counter : 1,
            }),
        )
        return (
            <div id="refresh" onClick={() => this.setState({ counter: this.state.counter + 1 })}>
                {childrenWithProps}
            </div>
        )
    }
}

describe("<TreeList />", () => {
    it("tree is refreshed whenever refresh value changes", async () => {
        let counter = 0
        const options = {
            minimumColWidth: 100,
            expandAll: true,
            rowClass: () => {
                return "counter" + counter++
            },
        }

        let { container } = render(
            <RefreshWrapper refresh>
                <TreeList data={data} columns={columns} options={options} id={"id"} parentId={"parentId"} />
            </RefreshWrapper>,
        )

        expect(container.querySelectorAll("tr.counter0")).toHaveLength(1)
        expect(container.querySelectorAll("tr.counter1")).toHaveLength(0)
        fireEvent(container.querySelector("#refresh"), simulateClick())
        expect(container.querySelectorAll("tr.counter1")).toHaveLength(1)
        expect(container.querySelectorAll("tr.counter0")).toHaveLength(0)
    })

    it("tree is not refreshed if refresh value does not change", () => {
        let counter = 0
        const options = {
            minimumColWidth: 100,
            expandAll: true,
            rowClass: () => {
                return "counter" + counter++
            },
        }

        let { container } = render(
            <RefreshWrapper refresh={false}>
                <TreeList data={data} columns={columns} options={options} id={"id"} parentId={"parentId"} />
            </RefreshWrapper>,
        )

        expect(container.querySelectorAll("tr.counter0")).toHaveLength(1)
        expect(container.querySelectorAll("tr.counter1")).toHaveLength(0)
        fireEvent(container.querySelector("#refresh"), simulateClick())
        expect(container.querySelectorAll("tr.counter0")).toHaveLength(1)
        expect(container.querySelectorAll("tr.counter1")).toHaveLength(0)
    })
})
