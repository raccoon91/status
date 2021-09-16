import React, { FC, useRef, useState, useEffect } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewMessageEvent } from "react-native-webview";
const chartHtml = Platform.OS === "ios" ? require("./chart.html") : { uri: "file:///android_asset/chart.html" };

const config = {
  type: "bar",
  data: { labels: [], dataset: [] },
  options: {
    responsive: true,
    animation: false,
    plugins: {
      legend: { position: "bottom", reverse: true, align: "start", labels: { boxWidth: 14 } },
      tooltip: { enabled: false },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, ticks: { maxTicksLimit: 6, precision: 3 } },
    },
  },
};

interface IStackBarChartProps {
  chartLabels: string[] | null;
  chartDatasets: IChartData[] | null;
  width: number;
  height: number;
  handleClickChart: (evet: WebViewMessageEvent) => void;
}

export const StackBarChart: FC<IStackBarChartProps> = ({
  chartLabels,
  chartDatasets,
  width,
  height,
  handleClickChart,
}) => {
  const webviewRef = useRef<WebView>(null);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (isMount && !!chartLabels && !!chartDatasets) {
      webviewRef.current?.injectJavaScript(`
        ${!!chartLabels && `window.barChart.config.data.labels = ${JSON.stringify(chartLabels)};`}
        ${!!chartDatasets && `window.barChart.config.data.datasets = ${JSON.stringify(chartDatasets)};`}
        window.barChart.update();
      `);
    }
  }, [isMount, chartLabels, chartDatasets]);

  const renderChart = (chartConfig = config, canvasWidth: number, canvasHeight: number) => {
    webviewRef.current?.injectJavaScript(`
      var canvasEl = document.createElement("canvas");
      canvasEl.width = ${canvasWidth};
      canvasEl.height = ${canvasHeight};
      document.body.appendChild(canvasEl);
      window.barChart = new Chart(canvasEl.getContext("2d"), ${JSON.stringify(chartConfig)});

      canvasEl.onclick = function (evt) {
        var points = window.barChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true)

        if (points.length) {
          var element = points[0];
          var elementIndex = element.index;
  
          window.ReactNativeWebView.postMessage(JSON.stringify(elementIndex))
        } else {
          window.ReactNativeWebView.postMessage(JSON.stringify(null))
        }
      };
    `);
  };

  const handleLoadEnd = () => {
    renderChart(config, width, height);
    setIsMount(true);
  };

  return (
    <WebView
      originWhitelist={["*"]}
      ref={webviewRef}
      source={chartHtml}
      onMessage={handleClickChart}
      onLoadEnd={handleLoadEnd}
      style={webviewStyle(width, height)}
    />
  );
};

const webviewStyle = (width: number, height: number) => ({
  width,
  height: height + 10,
});
