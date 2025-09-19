import {createRoot} from "react-dom/client"
import App from "./App.jsx"

let container = document.getElementById('tree')
if (container) {
    let root = createRoot(container)
    root.render(<App/>);
}
