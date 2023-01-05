import PropTypes from "prop-types";
import {ResponsiveContainer, RadialBarChart, RadialBar} from "recharts";

const
    // radial chart overlay hook-based component
    RadialOverlay = props => {
        const
            // destructure props
            {percentage, height, width} = props;

        return <div className="radial-overlay" style={{height: height, width: width}}>
            <span><strong>Score</strong></span>
            <span><strong>{ percentage }%</strong></span>
            <span>de votre</span>
            <span>objectif</span>
        </div>;
    },
    // radial chart hook-based component
    RadialBarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="radial-wrapper" width={width} height={height}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" barSize={15} data={data} startAngle={90} endAngle={450}>
                <RadialBar background={false} clockWise dataKey="percentage" cornerRadius={15}/>
            </RadialBarChart>
        </ResponsiveContainer>;
    };


// define prop types ...
RadialOverlay.propTypes = {
    // percentage : number required
    percentage: PropTypes.number.isRequired,
    // height / width : number required
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
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
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

export {RadialOverlay, RadialBarShart};
