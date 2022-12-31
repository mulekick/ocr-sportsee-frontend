import PropTypes from "prop-types";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis} from "recharts";

const
    // sample hook-based radar chart
    RadarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <div className="radar-wrapper">
            <RadarChart height={height} width={width} data={data} cx="50%" cy="50%" outerRadius="80%" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kind" />
                <Radar name="Mike" dataKey="value" fill="#ff0000" fillOpacity={0.75} />
            </RadarChart>
        </div>;
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
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default RadarShart;