import React from "react";
// eslint-disable-next-line node/file-extension-in-import
import ReactDOM from "react-dom/client";
import SomeApp from "./App.js";

ReactDOM
    .createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <SomeApp />
        </React.StrictMode>
    );
