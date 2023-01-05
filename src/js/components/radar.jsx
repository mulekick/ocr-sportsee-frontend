import PropTypes from "prop-types";
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis} from "recharts";

const
    // radar chart hook-based component
    RadarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="radar-wrapper" width={width} height={height}>
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kind" />
                <Radar name="Mike" dataKey="value" fill="#ff0000" fillOpacity={0.75} />
            </RadarChart>
        </ResponsiveContainer>;
    };

// define prop types ...
RadarShart.propTypes = {
    // data : array of object shapes required
    data: PropTypes.arrayOf(PropTypes.shape({
        // kind : string required
        kind: PropTypes.string.isRequired,
        // value : number required
        value: PropTypes.number.isRequired
    })).isRequired,
    // height / width : number required
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

export default RadarShart;