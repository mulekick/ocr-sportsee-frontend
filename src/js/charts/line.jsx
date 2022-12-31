import PropTypes from "prop-types";
import {LineChart, Line, XAxis, Tooltip} from "recharts";

const
    // x-axis tooltip hook-based component
    XToolTip = props => {
        const
            // desctructure props
            {active, payload} = props;

        return active && payload && payload.length ?
            <div>{`${ payload.at(0).value } min`}</div> :
            null;
    },
    // sample hook-based stuff
    LineShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <div className="line-wrapper">
            {/* overlayed div styling */}
            <span style={{position: `absolute`}}><strong>Durée moyenne des<br />sessions</strong></span>
            <LineChart height={height} width={width} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis stroke="lightgrey" dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip content={<XToolTip />} wrapperStyle={{padding: `10px`, "background-color": `lightgrey`, color: `black`}} />
                <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={3} dot={false} />
            </LineChart>
        </div>;
    };

// define prop types ...
XToolTip.propTypes = {
    // active : array of object shapes optional
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
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default LineShart;