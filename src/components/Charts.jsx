import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import style from "./home.module.css";
import { useSelector } from "react-redux";

export default function Charts(props) {
  const { current } = useSelector(state => state.face);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef) {
      const chart = new Chart(canvasRef.current.getContext("2d"), {
        type: "line",

        data: {
          labels: [],
          datasets: [
            {
              label: "angry",
              borderColor: "red",
              data: [],
            },
            {
              label: "disgusted",
              borderColor: "violet",
              data: [],
            },
            {
              label: "fearful",
              borderColor: "hotpink",
              data: [],
            },
            {
              label: "happy",
              borderColor: "yello",
              data: [],
            },
            {
              label: "neutral",
              borderColor: "tomato",
              data: [],
            },
            {
              label: "surprised",
              borderColor: "green",
              data: [],
            },
            {
              label: "sad",
              borderColor: "blue",
              data: [],
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            easing: "linear",
          },
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                position: "bottom",

                type: "time",
                distribution: "series",
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 20,
                },
              },
            ],

            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Value",
                },
              },
            ],
          },
        },
      });

      chartRef.current = chart;
    }
    // eslint-disable-next-line
  }, [canvasRef.current]);

  useEffect(() => {
    if (chartRef.current && current) {
      handleFrame(current);
    }
  }, [current]);

  async function handleFrame(face) {
    if (canvasRef.current) {
      const chart = chartRef.current;

      chart.data.labels.push(new Date().toISOString());
      let x = [...chart.data.labels];
      x.reverse();
      x = x.filter((v, i) => i <= 30);
      x.reverse();
      chart.data.labels = x;

      console.log(chart.data.labels);

      chart.data.datasets.forEach(ds => {
        ds.data = [...ds.data, face.expressions[ds.label]];
        let x = [...ds.data];
        x.reverse();
        x = x.filter((v, i) => i <= 30);
        x.reverse();

        ds.data = x;
      });

      chart.update();
    }
  }

  return <canvas ref={canvasRef} className={style.chart}></canvas>;
}
