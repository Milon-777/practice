// import regression from "regression";
import { timeSeries } from "./timeSeries.js";

let msft;

const getData = async () => {
  let data = await (
    await fetch("./stock_history_data/Microsoft_stock_history_10Y.json")
  ).json();

  msft = new timeSeries(data);
  msft.mathematicalExpectation = msft.calculateMathematicalExpectation(
    msft.stockPrices
  );
  msft.calculateMathematicalExpectation(msft.stockPrices, true, 1); //with Time Lag
  msft.calculateBiasedEstimate();
  msft.calculateUnbiasedEstimate(
    msft.stockPrices,
    msft.mathematicalExpectation
  );
  msft.calculateOrderAutocovariance();
  msft.calculateAutocorrelationCoefficient();
  msft.detectAbnormalValues();
  msft.checkTrend();
  msft.calculateLinearModel();
  msft.calculateExponentialModel();
  msft.calculateLogarithmicModel();
  msft.calculatePowerModel();
  msft.calculatePolynomialModelCoefficients();
  msft.compareTrendModels();
  console.log(msft);

  //Графік
  const myChart = document.getElementById("chart");
  new Chart(myChart, {
    type: "line",
    data: {
      labels: msft.dates,
      datasets: [
        {
          label: "Real price",
          data: msft.stockPrices,

          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Microsoft stock price history 10 years",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Real price: ${context.dataset.data[
                context.dataIndex
              ].toFixed(2)}$`;
            },
          },
        },
      },
    },
  });

  const myChart2 = document.getElementById("chart2");
  let labelsChart2 = Array.from(
    Array(msft.numberOfTimeSeries / 3),
    (_, index) => {
      return `${index + 1}`;
    }
  );
  new Chart(myChart2, {
    data: {
      labels: labelsChart2,
      datasets: [
        {
          label: "Сonfidence interval",
          data: Array.from({ length: 40 }, (_) => msft.confidenceInterval[1]),
          type: "line",
          backgroundColor: "white",
          borderColor: "#f87171",
          pointRadius: 0,
          borderDash: [25, 15],
          borderWidth: 5,
        },
        {
          label: "Autocorrelation coefficient",
          data: msft.autocorrelationCoefficient,
          type: "bar",
          categoryPercentage: 0.3,
          backgroundColor: "#60a5fa",
          borderColor: "#3b82f6",
          pointRadius: 5,
        },
        {
          label: "Сonfidence interval",
          data: Array.from({ length: 40 }, (_) => msft.confidenceInterval[0]),
          type: "line",
          backgroundColor: "white",
          borderColor: "#f87171",
          pointRadius: 0,
          borderDash: [25, 15],
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        x: {},
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Correlogram Microsoft stock price history 10 years",
          font: {
            size: 20,
          },
        },
      },
    },
  });

  //Linear model trend
  const linearModelChart = document.getElementById("linearModelChart");
  new Chart(linearModelChart, {
    data: {
      labels: msft.dates,
      datasets: [
        {
          label:
            msft.linearModel.c > 0
              ? `y = ${msft.linearModel.m}x + ${msft.linearModel.c}`
              : `y = ${msft.linearModel.m}x - ${Math.abs(msft.linearModel.c)}`,
          data: msft.linearModel.values,
          type: "line",
          pointRadius: 0,
          borderWidth: 4,
          borderColor: "#f87171",
          backgroundColor: "white",
        },
        {
          label: "Real price",
          data: msft.stockPrices,
          type: "scatter",
          pointRadius: 2,
          borderWidth: 4,
          borderColor: "#60a5fa",
          backgroundColor: "white",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Linear model Trend",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Price: ${context.dataset.data[context.dataIndex].toFixed(
                2
              )}$`;
            },
          },
        },
      },
    },
  });

  //Exponential model trend
  const exponentialModelChart = document.getElementById(
    "exponentialModelChart"
  );
  new Chart(exponentialModelChart, {
    data: {
      labels: msft.dates,
      datasets: [
        {
          label: `y = ${msft.exponentialModel.a} * e^${msft.exponentialModel.b}*x`,
          data: msft.exponentialModel.values,
          type: "line",
          pointRadius: 0,
          borderWidth: 4,
          borderColor: "#f87171",
          backgroundColor: "white",
        },
        {
          label: "Real price",
          data: msft.stockPrices,
          type: "scatter",
          pointRadius: 2,
          borderWidth: 4,
          borderColor: "#60a5fa",
          backgroundColor: "white",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Exponential model Trend",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Price: ${context.dataset.data[context.dataIndex].toFixed(
                2
              )}$`;
            },
          },
        },
      },
    },
  });

  //Logarithmic model trend
  const logarithmicModelChart = document.getElementById(
    "logarithmicModelChart"
  );
  new Chart(logarithmicModelChart, {
    data: {
      labels: msft.dates,
      datasets: [
        {
          label:
            msft.logarithmicModel.b > 0
              ? `y = ${msft.logarithmicModel.a} + ${msft.logarithmicModel.b} * lnx`
              : `y = ${msft.logarithmicModel.a} - ${Math.abs(
                  msft.logarithmicModel.b
                )} * lnx`,
          data: msft.logarithmicModel.values,
          type: "line",
          pointRadius: 0,
          borderWidth: 4,
          borderColor: "#f87171",
          backgroundColor: "white",
        },
        {
          label: "Real price",
          data: msft.stockPrices,
          type: "scatter",
          pointRadius: 2,
          borderWidth: 4,
          borderColor: "#60a5fa",
          backgroundColor: "white",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Logarithmic model Trend",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Price: ${context.dataset.data[context.dataIndex].toFixed(
                2
              )}$`;
            },
          },
        },
      },
    },
  });

  //Power model trend
  const powerModelChart = document.getElementById("powerModelChart");
  // let powerModelTrend = Array.from(
  //   { length: msft.numberOfTimeSeries },
  //   (_, index) => {
  //     return (
  //       msft.powerModelCoefficients.a *
  //       Math.pow(index, msft.powerModelCoefficients.b)
  //     );
  //   }
  // );
  new Chart(powerModelChart, {
    data: {
      labels: msft.dates,
      datasets: [
        {
          label: `y = ${msft.powerModel.a} * x^${msft.powerModel.b}`,
          data: msft.powerModel.values,
          type: "line",
          pointRadius: 0,
          borderWidth: 4,
          borderColor: "#f87171",
          backgroundColor: "white",
        },
        {
          label: "Real price",
          data: msft.stockPrices,
          type: "scatter",
          pointRadius: 2,
          borderWidth: 4,
          borderColor: "#60a5fa",
          backgroundColor: "white",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Power model Trend",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Price: ${context.dataset.data[context.dataIndex].toFixed(
                2
              )}$`;
            },
          },
        },
      },
    },
  });

  //Polynomial model trend
  const polynomialModelChart = document.getElementById("polynomialModelChart");
  let polynomialModelTrend = Array.from(
    { length: msft.numberOfTimeSeries },
    (_, index) => {
      return (
        msft.polynomialModelCoefficients.a[0] * Math.pow(index, 2) +
        msft.polynomialModelCoefficients.a[1] * index +
        msft.polynomialModelCoefficients.a[2]
      );
    }
  );
  let polynomialLabel = "";
  if (
    msft.polynomialModelCoefficients.a[1] > 0 &&
    msft.polynomialModelCoefficients.a[2] > 0
  ) {
    polynomialLabel = `y = ${msft.polynomialModelCoefficients[0]} * x^2 + ${msft.polynomialModelCoefficients[1]} * x + ${msft.polynomialModelCoefficients[2]}`;
  } else if (
    msft.polynomialModelCoefficients.a[1] > 0 &&
    msft.polynomialModelCoefficients.a[2] < 0
  ) {
    polynomialLabel = `y = ${msft.polynomialModelCoefficients[0]} * x^2 + ${
      msft.polynomialModelCoefficients[1]
    } * x - ${Math.abs(msft.polynomialModelCoefficients[2])}`;
  } else if (
    msft.polynomialModelCoefficients.a[1] < 0 &&
    msft.polynomialModelCoefficients.a[2] > 0
  ) {
    polynomialLabel = `y = ${
      msft.polynomialModelCoefficients[0]
    } * x^2 - ${Math.abs(msft.polynomialModelCoefficients[1])} * x + ${
      msft.polynomialModelCoefficients[2]
    }`;
  } else {
    polynomialLabel = `y = ${
      msft.polynomialModelCoefficients.a[0]
    } * x^2 - ${Math.abs(
      msft.polynomialModelCoefficients.a[1]
    )} * x - ${Math.abs(msft.polynomialModelCoefficients.a[2])}`;
  }
  new Chart(polynomialModelChart, {
    data: {
      labels: msft.dates,
      datasets: [
        {
          label: polynomialLabel,
          data: polynomialModelTrend,
          type: "line",
          pointRadius: 0,
          borderWidth: 4,
          borderColor: "#f87171",
          backgroundColor: "white",
        },
        {
          label: "Real price",
          data: msft.stockPrices,
          type: "scatter",
          pointRadius: 2,
          borderWidth: 4,
          borderColor: "#60a5fa",
          backgroundColor: "white",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Polynomial model Trend",
          font: {
            size: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return `Price: ${context.dataset.data[context.dataIndex].toFixed(
                2
              )}$`;
            },
          },
        },
      },
    },
  });
};

getData();
