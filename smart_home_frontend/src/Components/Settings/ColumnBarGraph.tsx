import React from "react";
import Chart from "react-google-charts";
import "./ColumnBarGraph.scss";

type Props = {
    data: Array<Array<string | number>>;
};

const ColumnBarGraph = (props: Props) => {
    return (
        <div className="chart-wrapper">
            <Chart
                chartType="ColumnChart"
                data={props.data}
                options={{
                    height: 500,
                    width: 900,
                    backgroundColor: "transparent",
                    colors: ["#e99160"],
                    legend: "none",
                    vAxis: {
                        gridlines: {
                            color: "transparent",
                        },
                        textStyle: {
                            color: "transparent",
                        },
                    },
                    hAxis: {
                        color: "#FFFFFF",
                        textStyle: {
                            color: "#FFF",
                            fontSize: 22,
                        },
                        slantedText: true,
                        slantedTextAngle: 30,
                    },
                    chartArea: {
                        backgroundColor: {
                            fill: "#000000",
                            fillOpacity: 0,
                        },
                    },
                }}
            />
        </div>
    );
};

export default ColumnBarGraph;
