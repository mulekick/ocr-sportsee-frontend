import PropTypes from "prop-types";
import {ResponsiveContainer, Legend, RadialBarChart, RadialBar} from "recharts";

const
    // legend component
    Score = props => {
        const {percentage} = props;
        return <div className="overlay">
            <span style={{color: `black`, fontSize: `24px`}}><strong>{ percentage }%</strong></span>
            <span>de votre</span>
            <span>objectif</span>
        </div>;
    },
    // sample hook-based stuff
    RadialBarShart = props => {
        const
            // destructure props
            {data, height, width} = props;

        // wrapper div styling
        return <ResponsiveContainer className="radial-wrapper" width={width} height={height}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" barSize={15} data={data} startAngle={90} endAngle={450}>
                <Legend wrapperStyle={{left: `37.5%`, top: `37.5%`}} content={<Score percentage={ data.at(1).percentage } />} />
                <RadialBar background={false} clockWise dataKey="percentage" cornerRadius={15}/>
            </RadialBarChart>
        </ResponsiveContainer>;
    };


// define prop types ...
Score.propTypes = {
    // percentage : number required
    percentage: PropTypes.number.isRequired
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

export default RadialBarShart;
