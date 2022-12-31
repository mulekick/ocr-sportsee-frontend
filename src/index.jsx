// import modules
import React from "react";
// eslint-disable-next-line
import ReactDOM from "react-dom/client";

// import modules
import Layout from "./js/layout.jsx";
import SportSee from "./js/app.jsx";

// import styles
import "./scss/main.scss";

ReactDOM
    .createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <Layout content={ <SportSee user={ 18 } /> } />
        </React.StrictMode>
    );
