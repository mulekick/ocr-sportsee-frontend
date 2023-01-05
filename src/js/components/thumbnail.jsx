// import modules
import PropTypes from "prop-types";

const
    // sample hook-based stuff
    Thumbnail = props => {
        const
            // destructure props
            {bg, src, alt} = props;

        // wrapper div styling
        return <div className="thumbnail" style={{backgroundColor: bg}}>
            <img src={ src } alt={ alt } />
        </div>;
    };

// define prop types ...
Thumbnail.propTypes = {
    // bg : string required
    bg: PropTypes.string.isRequired,
    // source : any required
    src: PropTypes.any.isRequired,
    // alt : string optional
    alt: PropTypes.string
};

export default Thumbnail;