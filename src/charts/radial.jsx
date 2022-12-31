import PropTypes from "prop-types";
import {RadialBarChart, RadialBar} from "recharts";

const
    // sample hook-based stuff
    RadialBarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <div className="radial-wrapper">
            {/* overlayed div styling */}
            <div className="overlay" style={{height: `${ height }px`, width: `${ width }px`}}>
                <span style={{position: `absolute`, top: `10px`, left: `10px`}}><strong>Score</strong></span>
                <span style={{color: `black`, "font-size": `24px`}}><strong>{ data.at(1).percentage }%</strong></span>
                <span>de votre</span>
                <span>objectif</span>
            </div>
            <RadialBarChart height={height} width={width} style={{transform: `rotate(0.75turn)`}} cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" barSize={15} data={data}>
                <RadialBar background={false} clockWise dataKey="percentage" />
            </RadialBarChart>
        </div>;
    };

// define prop types ...
RadialBarShart.propTypes = {
    // data : array of object shapes required
    data: PropTypes.arrayOf(PropTypes.shape({
        // name / fill : string required
        name: PropTypes.string.isRequired,
        fill: PropTypes.string.isRequired,
        // percentage : number required
        percentage: PropTypes.number.isRequired
    })).isRequired,
    // height / width : number required
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default RadialBarShart;
