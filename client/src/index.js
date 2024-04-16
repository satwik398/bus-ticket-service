import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import App from "client/src/App";
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
);
