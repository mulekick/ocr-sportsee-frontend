// import modules
import React from "react";
// eslint-disable-next-line
import ReactDOM from "react-dom/client";

// import modules
import Layout from "./js/components/layout.jsx";
import Content from "./js/components/content.jsx";

// import styles
import "./scss/main.scss";

ReactDOM
    .createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <Layout content={ <Content user={ 12 } /> } />
        </React.StrictMode>
    );
