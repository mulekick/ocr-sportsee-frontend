import PropTypes from "prop-types";
import {ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";

const
    // x-axis tooltip hook-based component
    XToolTip = props => {
        const
            // destructure props
            {active, payload} = props;

        // tooltip div styling
        return active && payload && payload.length ?
            <div>{`${ payload.at(0).value } min`}</div> :
            null;
    },
    // legend hook-based component
    Duration = props => {
        const
            // destructure props
            {nul} = props;

        // title div styling
        return <span>
            <strong>Durée moyenne des<br />sessions</strong>
        </span>;
    },
    // line chart hook-based component
    LineShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="line-wrapper" width={width} height={height}>
            <LineChart data={data} margin={{top: 0, right: 30, left: -20, bottom: 0}}>
                <XAxis stroke="lightgrey" dataKey="day" axisLine={false} tickLine={false} />
                {/* declare a hidden Y axis in order to restrict the domain ... */}
                <YAxis style={{display: `none`}} dataKey="sessionLength" domain={[ `dataMin - 25`, `dataMax + 25` ]} />
                <Tooltip content={<XToolTip />} wrapperStyle={{padding: `10px`, backgroundColor: `lightgrey`, color: `black`}} />
                <Legend wrapperStyle={{top: `15px`, left: `15px`}} content={<Duration />} />
                <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={3} dot={false} />
            </LineChart>
        </ResponsiveContainer>;
    };

// define prop types ...
XToolTip.propTypes = {
    // active : boolean optional
    active: PropTypes.bool,
    // payload : array of objects optional
    payload: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};

// define prop types ...
LineShart.propTypes = {
    // data : array of object shapes required
    data: PropTypes.arrayOf(PropTypes.shape({
        // day : string required
        day: PropTypes.string.isRequired,
        // sessionLength : number required
        sessionLength: PropTypes.number.isRequired
    })).isRequired,
    // height / width : number required
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

export default LineShart;