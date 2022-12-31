// import modules
import React from "react";
// eslint-disable-next-line
import ReactDOM from "react-dom/client";

// import app
import SportSee from "./app.jsx";

// import styles
import "./scss/main.scss";

ReactDOM
    .createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <SportSee user={ 18 } />
        </React.StrictMode>
    );
