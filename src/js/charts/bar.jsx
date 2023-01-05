import PropTypes from "prop-types";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";

const
    // x-axis tooltip hook-based component
    XToolTip = props => {
        const
            // desctructure props
            {active, payload} = props;

        return active && payload && payload.length ?
            // tooltip div styling
            <div className="tooltip">
                <span>{`${ payload.at(0).value } kg`}</span>
                <span>{`${ payload.at(1).value } kCal`}</span>
            </div> :
            null;
    },
    // sample hook-based bar chart
    BarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="bar-wrapper" width={width} height={height}>
            <BarChart data={data} margin={{top: 5, right: 10, left: 10, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} />
                {/* declare dedicated Y axis for weight and calories and restrict the kilogram values domain so the variations are visible ... */}
                <YAxis yAxisId={0} dataKey="kilogram" domain={[ `dataMin - 2.5`, `dataMax + 2.5` ]} orientation="right" tickLine={false} />
                <YAxis yAxisId={1} dataKey="calories" orientation="left" tickLine={false} />
                <Tooltip content={<XToolTip />} wrapperStyle={{padding: `10px`, backgroundColor: `red`, color: `white`}} />
                {/* bind each bar to their specific Y axis ID ... */}
                <Bar yAxisId={0} barSize={7.5} dataKey="kilogram" fill="#000000" />
                <Bar yAxisId={1} barSize={7.5} dataKey="calories" fill="#ff0000" />
            </BarChart>
        </ResponsiveContainer>;
    };

// define prop types ...
XToolTip.propTypes = {
    // active : array of object shapes optional
    active: PropTypes.bool,
    // payload : array of objects optional
    payload: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};

// define prop types ...
BarShart.propTypes = {
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

export default BarShart;
