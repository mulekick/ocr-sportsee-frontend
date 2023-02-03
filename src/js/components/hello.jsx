/**
 * module that exports the page title component
 * @module components/hello
 */

// import modules
import PropTypes from "prop-types";

const
    // sample hook-based stuff
    Hello = props => {
        const
            // destructure props
            {data: {firstName}} = props;

        // wrapper div styling
        return <div>
            <h1>Bonjour <span>{ firstName }</span></h1>
            <h4>Félicitations ! Vous avez explosé vos objectifs hier 👏</h4>
        </div>;
    };

// define prop types ...
Hello.propTypes = {
    // data : object shape required
    data: PropTypes.shape({
        // firstName : string required
        firstName: PropTypes.string.isRequired
    }).isRequired
};

export default Hello;