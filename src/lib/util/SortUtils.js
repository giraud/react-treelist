import sortBy from "lodash/sortBy"

// Sort on multiple fields solution from
// http://blog.falafel.com/nifty-underscore-tricks-sorting-by-multiple-properties-with-underscore/
const getSortedData = function (data, sortOptions) {
    // sortOptions comes in the format {field1: "asc", field2: "desc"}
    const sortKeys = Object.keys(sortOptions)
    sortKeys.reverse()

    let sortedData = data
    for (var i = 0, length = sortKeys.length; i < length; i++) {
        sortedData = sortBy(sortedData, sortKeys[i])
        if (sortOptions[sortKeys[i]] === "desc") {
            sortedData.reverse()
        }
        if (sortKeys[i + 1] && sortOptions[sortKeys[i + 1]] === "desc") {
            sortedData.reverse()
        }
    }

    return sortedData
}

export default getSortedData
