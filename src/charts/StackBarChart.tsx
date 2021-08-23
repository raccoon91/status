import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";

const config = {
  type: "bar",
  data: { labels: [], dataset: [] },
  options: {
    responsive: true,
    plugins: { title: { display: true, text: "Chart.js Bar Chart - Stacked" } },
    scales: { x: { stacked: true }, y: { stacked: true, ticks: { maxTicksLimit: 6 } } },
  },
};

interface IStackBarChartData {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface IStackBarChartProps {
  width: number;
  height: number;
  chartLoadEnd: () => void;
}

export interface SetChartData {
  setData: (labels: string[], datasets: IStackBarChartData[]) => void;
}

export const StackBarChart = forwardRef<SetChartData, IStackBarChartProps>(({ width, height, chartLoadEnd }, ref) => {
  const webviewRef = useRef<WebView>(null);
  const source = Platform.OS === "ios" ? require("./chart.html") : { uri: "file:///android_asset/chart.html" };

  useImperativeHandle(ref, () => ({
    setData,
  }));

  const addChart = (chartConfig = config, canvasWidth: number, canvasHeight: number) => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
        const canvasEl = document.createElement("canvas");
        canvasEl.width = ${canvasWidth};
        canvasEl.height = ${canvasHeight};
        document.body.appendChild(canvasEl);
        window.barChart = new Chart(canvasEl.getContext('2d'), ${JSON.stringify(chartConfig)});
      `);
    }
  };

  const setData = (labels: string[], datasets: IStackBarChartData[]) => {
    if (webviewRef.current) {
      if (labels) {
        webviewRef.current.injectJavaScript(`window.barChart.config.data.labels = ${JSON.stringify(labels)};`);
      }

      if (datasets) {
        webviewRef.current.injectJavaScript(`window.barChart.config.data.datasets = ${JSON.stringify(datasets)};`);
      }

      webviewRef.current.injectJavaScript("window.barChart.update();");
    }
  };

  const handleLoadEnd = () => {
    addChart(config, width, height);
    chartLoadEnd();
  };

  return (
    <WebView
      originWhitelist={["*"]}
      ref={webviewRef}
      source={source}
      onLoadEnd={handleLoadEnd}
      style={webviewStyle(width, height)}
    />
  );
});

const webviewStyle = (width: number, height: number) => ({
  width,
  height,
});
