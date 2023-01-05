/**
 * module that exports the user stats display component
 * @module components/score
 */

// import modules
import PropTypes from "prop-types";
import Thumbnail from "./thumbnail.jsx";

// import assets
import calories from "../../img/calories.svg";
import protein from "../../img/protein.svg";
import sugar from "../../img/sugar.svg";
import fat from "../../img/fat.svg";

const
    // user stats hook-based component
    Stats = props => {
        const
            // destructure props
            {data: {keyData: {calorieCount, proteinCount, carbohydrateCount, lipidCount}}} = props;

        // wrapper div styling
        return <div>
            {/* stats */}
            <ul>
                <li>
                    <Thumbnail bg={ `#f9e7e7` } src={ calories } alt={ calories } />
                    <div>
                        <span>{calorieCount}kCal</span><br />
                        <span>Calories</span>
                    </div>
                </li>
                <li>
                    <Thumbnail bg={ `#e7f3fb` } src={ protein } alt={ protein } />
                    <div>
                        <span>{proteinCount}g</span><br />
                        <span>Protéines</span>
                    </div>
                </li>
                <li>
                    <Thumbnail bg={ `#f9f5e1` } src={ sugar } alt ={ sugar } />
                    <div>
                        <span>{carbohydrateCount}g</span><br />
                        <span>Glucides</span>
                    </div>
                </li>
                <li>
                    <Thumbnail bg={ `#f9e7ed` } src={ fat } alt ={ fat } />
                    <div>
                        <span>{lipidCount}g</span><br />
                        <span>Lipides</span>
                    </div>
                </li>
            </ul>
        </div>;
    };

// define prop types ...
Stats.propTypes = {
    // keyData : object shape optional (only available once data is loaded)
    keyData: PropTypes.shape({
        // calorieCount / proteinCount / carbohydrateCount / lipidCount : number required
        calorieCount: PropTypes.number.isRequired,
        proteinCount: PropTypes.number.isRequired,
        carbohydrateCount: PropTypes.number.isRequired,
        lipidCount: PropTypes.number.isRequired
    })
};

export default Stats;