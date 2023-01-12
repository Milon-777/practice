const fs = require("fs");
const csv = require("csv-parser");
// import path from "path";
// import csv from "csv-parser";
// import timeRow from "./timeRow.js";

// const fs = require("fs");
// const csv = require("csv-parser");

console.log("All is fine!");

const stockPrices = [];
fs.createReadStream("MSFT_history_20Y.csv")
  .pipe(csv())
  .on("data", (data) => stockPrices.push(data))
  .on("end", () => {
    fs.writeFileSync(
      "Microsoft_stock_history_20Y.json",
      JSON.stringify(stockPrices)
    );
    let msft = new timeSeries(stockPrices);
    msft.calculateMathematicalExpectation();
    msft.calculateMathematicalExpectationY1AndY2();
    msft.calculateBiasedEstimate();
    msft.calculateUnbiasedEstimate();
    msft.calculateOrderAutocovariance();
    msft.calculateAutocorrelationCoefficient();
  });

class timeSeries {
  constructor(stockPrices) {
    this.stockPrices = [];
    this.numberOfTimeSeries = 0;
    this.mathematicalExpectation = 0;
    this.mathematicalExpectationY1 = 0;
    this.mathematicalExpectationY2 = 0;
    this.dispersion = {
      biasedEstimate: 0,
      unbiasedEstimate: 0,
    };
    this.orderAutocovariance = [];
    this.autocorrelationCoefficient = [];

    stockPrices.forEach((price) => this.stockPrices.push(Number(price.Close)));
    console.log(this.stockPrices);
    console.log(0.11 + 0.22);

    this.numberOfTimeSeries = this.stockPrices.length;
  }

  showPrices() {
    console.log(this.stockPrices);
  }

  calculateMathematicalExpectation() {
    let sum = 0;

    this.stockPrices.forEach((price) => (sum += price));
    this.mathematicalExpectation = (1 / this.numberOfTimeSeries) * sum;

    console.log(`mathExp =  ${this.mathematicalExpectation}`);
  }

  calculateMathematicalExpectationY1AndY2() {
    let sum = 0;
    for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
      sum += this.stockPrices[i];
    }
    this.mathematicalExpectationY1 = (1 / (this.numberOfTimeSeries - 1)) * sum;
    console.log(`mathExpectY1 = ${this.mathematicalExpectationY1}`);

    sum = 0;
    for (let i = 1; i < this.numberOfTimeSeries; i++) {
      sum += this.stockPrices[i];
    }
    this.mathematicalExpectationY2 = (1 / (this.numberOfTimeSeries - 1)) * sum;
    console.log(`mathExpectY2 = ${this.mathematicalExpectationY2}`);
  }

  calculateBiasedEstimate() {
    let sum = 0;

    this.stockPrices.forEach((timeRow) => {
      sum += Math.pow(timeRow - this.mathematicalExpectation, 2);
    });

    this.dispersion.biasedEstimate = (1 / this.numberOfTimeSeries) * sum;
    console.log(
      `dispersion biased Estimate = ${this.dispersion.biasedEstimate}`
    );
  }

  calculateUnbiasedEstimate() {
    let sum = 0;

    this.stockPrices.forEach(
      (timeRow) => (sum += Math.pow(timeRow - this.mathematicalExpectation, 2))
    );

    this.dispersion.unbiasedEstimate =
      (1 / (this.numberOfTimeSeries - 1)) * sum;
    console.log(
      `dispersion unbiased Estimate = ${this.dispersion.unbiasedEstimate}`
    );
  }

  calculateOrderAutocovariance() {
    if (this.numberOfTimeSeries > 99) {
      //Автоковаріація порядку p0
      this.orderAutocovariance.push(this.dispersion.biasedEstimate);

      //Автоковаріація порядку p1
      let sum = 0;
      for (let i = 1; i < this.numberOfTimeSeries; i++) {
        sum +=
          (this.stockPrices[i] - this.mathematicalExpectation) *
          (this.stockPrices[i - 1] - this.mathematicalExpectation);
      }
      //Автоковаріація порядку p1, зміщена оцінка
      this.orderAutocovariance.push((1 / this.numberOfTimeSeries) * sum);
      console.log(`biased Estimate = ${this.orderAutocovariance[1]}`);

      //Автоковаріація порядку p1, незміщена оцінка
      this.orderAutocovariance.push((1 / (this.numberOfTimeSeries - 1)) * sum);
      console.log(`unbiased Estimate = ${this.orderAutocovariance[2]}`);
    } else if (this.numberOfTimeSeries < 100) {
      //Автоковаріація порядку p0
      this.orderAutocovariance.push(this.dispersion.biasedEstimate);
      console.log(`Autocovariance p0 = ${this.orderAutocovariance[0]}`);

      //Автоковаріація порядку p1
      let sum = 0;
      for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
        sum +=
          (this.stockPrices[i] - this.mathematicalExpectationY1) *
          (this.stockPrices[i + 1] - this.mathematicalExpectationY2);
      }
      this.orderAutocovariance.push((1 / (this.numberOfTimeSeries - 1)) * sum);
      console.log(`Autocovariance p1 = ${this.orderAutocovariance[1]}`);
    }
  }

  calculateAutocorrelationCoefficient() {
    if (this.numberOfTimeSeries > 99) {
      //Коефіцієнт автокореляції порядку p1 та p0
      let numerator = 0;
      let denominator = 0;
      for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
        numerator +=
          (this.stockPrices[i] - this.mathematicalExpectation) *
          (this.stockPrices[i + 1] - this.mathematicalExpectation);
      }
      for (let i = 0; i < this.numberOfTimeSeries; i++) {
        denominator += Math.pow(
          this.stockPrices[i] - this.mathematicalExpectation,
          2
        );
      }

      this.autocorrelationCoefficient.push(numerator / denominator);
      console.log(
        `Autocorrelation coeff order p1 and p0 = ${this.autocorrelationCoefficient[0]}`
      );
    } else if (this.numberOfTimeSeries < 100) {
      //Коефіцієнт автокореляції порядку p1 та p0
      let numerator = 0;
      let denominator = 0;
      let sum1 = 0;
      let sum2 = 0;

      for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
        numerator +=
          (this.stockPrices[i] - this.mathematicalExpectationY1) *
          (this.stockPrices[i + 1] - this.mathematicalExpectationY2);
      }
      for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
        sum1 += Math.pow(
          this.stockPrices[i] - this.mathematicalExpectationY1,
          2
        );
      }
      for (let i = 1; i < this.numberOfTimeSeries; i++) {
        sum2 += Math.pow(
          this.stockPrices[i] - this.mathematicalExpectationY2,
          2
        );
      }
      denominator = Math.sqrt(sum1 * sum2);
      this.autocorrelationCoefficient = numerator / denominator;
      console.log(`autocorrelation coef = ${this.autocorrelationCoefficient}`);
    }
  }
}

//Графік
// const myChart = document.getElementById("chart");

// new Chart(myChart, {
//   type: "bar",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
