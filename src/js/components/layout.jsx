/**
 * module that exports the page layout component
 * @module components/layout
 */

// import modules
import PropTypes from "prop-types";
import Thumbnail from "./thumbnail.jsx";

// import assets
import logo from "../../img/logo-sportsee.png";
import sitting from "../../img/sitting.svg";
import swimming from "../../img/swimming.svg";
import cycling from "../../img/cycling.svg";
import lifting from "../../img/lifting.svg";

const
    // sample hook-based stuff
    Layout = props => {
        const
            // destructure props
            {content} = props;

        // wrapper div styling
        return <>
            <header>
                {/* logo */}
                <img src={ logo } alt="logo" />
                {/* top menu */}
                <a href="./">Accueil</a>
                <a href="./">Profil</a>
                <a href="./">Réglage</a>
                <a href="./">Communauté</a>
            </header>
            <main>
                {/* left menu */}
                <div className="container left">
                    <nav>
                        {/* thumbnails */}
                        <ul>
                            <li><a href="./"><Thumbnail bg={ `#ffffff` } src={ sitting } alt={ sitting } /></a></li>
                            <li><a href="./"><Thumbnail bg={ `#ffffff` } src={ swimming } alt={ swimming } /></a></li>
                            <li><a href="./"><Thumbnail bg={ `#ffffff` } src={ cycling } alt ={ cycling } /></a></li>
                            <li><a href="./"><Thumbnail bg={ `#ffffff` } src={ lifting } alt ={ lifting } /></a></li>
                        </ul>
                    </nav>
                    {/* copyright */}
                    <span>Copyright, SportSee 2020</span>
                </div>
                <div className="container content">
                    {/* content */}
                    { content }
                </div>
            </main>
        </>;
    };

// define prop types ...
Layout.propTypes = {
    // content : react element required
    content: PropTypes.element.isRequired
};

export default Layout;