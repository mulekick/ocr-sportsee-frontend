/**
 * module that exports the user activity chart component
 * @module components/activity
 */

import PropTypes from "prop-types";
import {ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";

const
    // legend hook-based component
    Header = props => {
        const
            // destructure props
            {nul} = props;

        // header div styling
        return <div className="bar-header">
            <span><strong>Activité quotidienne</strong></span>
            <div>
                <span><span className="dot" style={{backgroundColor: `red`}}></span>&nbsp;&nbsp;Poids (kg)</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span><span className="dot" style={{backgroundColor: `black`}}></span>&nbsp;&nbsp;Calories brûlées (kCal)</span>
            </div>
        </div>;
    },
    // x-axis tooltip hook-based component
    XToolTip = props => {
        const
            // destructure props
            {active, payload} = props;

        return active && payload && payload.length ?
            // tooltip div styling
            <div className="tooltip">
                <span>{`${ payload.at(0).value } kg`}</span>
                <span>{`${ payload.at(1).value } kCal`}</span>
            </div> :
            null;
    },
    // bar chart hook-based component
    UserActivityChart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="bar-wrapper" width={width} height={height}>
            <BarChart data={data} margin={{top: 65, right: 0, left: 0, bottom: -35}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} />
                {/* declare dedicated Y axis for weight and calories and restrict the kilogram values domain so the variations are visible ... */}
                <YAxis yAxisId={0} dataKey="kilogram" domain={[ `dataMin - 2.5`, `dataMax + 2.5` ]} orientation="right" tickLine={false} />
                <YAxis yAxisId={1} dataKey="calories" orientation="left" tickLine={false} />
                <Tooltip content={<XToolTip />} wrapperStyle={{padding: `10px`, backgroundColor: `red`, color: `white`}} />
                <Legend wrapperStyle={{top: `0px`, left: `0px`, width: `100%`}} content={<Header />} />
                {/* bind each bar to their specific Y axis ID ... */}
                <Bar yAxisId={0} barSize={7.5} dataKey="kilogram" fill="#000000" />
                <Bar yAxisId={1} barSize={7.5} dataKey="calories" fill="#ff0000" />
            </BarChart>
        </ResponsiveContainer>;
    };

// no prop types for header sincs props are empty ...

// define prop types ...
XToolTip.propTypes = {
    // active : array of object shapes optional
    active: PropTypes.bool,
    // payload : array of objects optional
    payload: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};

// define prop types ...
UserActivityChart.propTypes = {
    // data : array of object shapes required
    data: PropTypes.arrayOf(PropTypes.shape({
        // day / kilogram / calories : number required
        day: PropTypes.number.isRequired,
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired
    })).isRequired,
    // height / width : number required
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

export default UserActivityChart;
