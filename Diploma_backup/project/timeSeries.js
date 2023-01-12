import FisherCriticalValues from "./tabular_data/FisherCriticalValues.js";
import StudentCriticalValues from "./tabular_data/StudentCriticalValues.js";

//alpha = 0.05

export class timeSeries {
  constructor(stockPrices) {
    this.stockPrices = [];
    this.dates = [];
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
    this.hasTrend = false;
    this.linearModel = {
      //y=Mx+C
      m: 0,
      c: 0,
      determinationCoefficient: 0,
      values: [],
    };
    this.exponentialModel = {
      //y=a*e^bx
      a: 0,
      b: 0,
      determinationCoefficient: 0,
      values: [],
    };
    this.logarithmicModel = {
      //y=a+b*ln(x)
      a: 0,
      b: 0,
      determinationCoefficient: 0,
      values: [],
    };
    this.powerModel = {
      //y=a*x^b
      a: 0,
      b: 0,
      determinationCoefficient: 0,
      values: [],
    };
    this.polynomialModelCoefficients = {
      //anx^n+ ... + a1x + a0.
      a: [],
      determinationCoefficient: 0,
    };
    this.forecastModel = {};
    this.randomComponent = {
      values: [],
    };

    stockPrices.forEach((price) => this.stockPrices.push(Number(price.Close)));
    stockPrices.forEach((date) => this.dates.push(date.Date));

    this.numberOfTimeSeries = this.stockPrices.length;

    this.confidenceInterval = [
      -1.96 * (1 / Math.sqrt(this.numberOfTimeSeries)),
      1.96 * (1 / Math.sqrt(this.numberOfTimeSeries)),
    ];
  }

  showPrices() {
    console.log(this.stockPrices);
  }

  calculateMathematicalExpectation(arr, isDoubleArr = false, timeLag = 0) {
    let sum = 0;
    let mathExpect = null;
    if (timeLag === 0 && isDoubleArr === false) {
      sum = 0;
      mathExpect = 0;

      arr.forEach((price) => (sum += price));
      mathExpect = (1 / this.numberOfTimeSeries) * sum;

      console.log(`mathExp =  ${mathExpect}`);
      return mathExpect;
    } else if (timeLag === 0 && isDoubleArr === true) {
      sum = 0;
      mathExpect = [];

      arr[0].forEach((price) => (sum += price));
      mathExpect.push((1 / arr[0].length) * sum);

      sum = 0;

      arr[1].forEach((price) => (sum += price));
      mathExpect.push((1 / arr[1].length) * sum);

      return mathExpect;
    } else if (timeLag >= 1 && isDoubleArr === true) {
      sum = 0;
      mathExpect = [];

      for (let i = 0; i < this.numberOfTimeSeries - timeLag; i++) {
        sum += arr[i];
      }
      mathExpect.push((1 / (this.numberOfTimeSeries - timeLag)) * sum);

      sum = 0;

      for (let i = 0 + timeLag; i < this.numberOfTimeSeries; i++) {
        sum += arr[i];
      }
      mathExpect.push((1 / (this.numberOfTimeSeries - timeLag)) * sum);

      [this.mathematicalExpectationY1, this.mathematicalExpectationY2] =
        mathExpect;

      // console.log(`mathExpectY1 = ${this.mathematicalExpectationY1}`);
      // console.log(`mathExpectY2 = ${this.mathematicalExpectationY2}`);
    }
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

  calculateUnbiasedEstimate(arr, mathExpect, isDoubleArr = false) {
    let sum = 0;
    let unbiasedEstimate = null;
    if (isDoubleArr === false) {
      sum = 0;
      unbiasedEstimate = 0;

      arr.forEach((timeRow) => (sum += Math.pow(timeRow - mathExpect, 2)));

      this.dispersion.unbiasedEstimate =
        (1 / (this.numberOfTimeSeries - 1)) * sum;
      console.log(
        `dispersion unbiased Estimate = ${this.dispersion.unbiasedEstimate}`
      );
    } else if (isDoubleArr === true) {
      sum = 0;
      unbiasedEstimate = [];

      arr[0].forEach((value) => (sum += Math.pow(value - mathExpect[0], 2)));
      unbiasedEstimate.push((1 / (arr[0].length - 1)) * sum);

      sum = 0;

      arr[1].forEach((value) => (sum += Math.pow(value - mathExpect[1], 2)));
      unbiasedEstimate.push((1 / (arr[1].length - 1)) * sum);

      return unbiasedEstimate;
    }
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
      // console.log(`biased Estimate = ${this.orderAutocovariance[1]}`);

      //Автоковаріація порядку p1, незміщена оцінка
      this.orderAutocovariance.push((1 / (this.numberOfTimeSeries - 1)) * sum);
      // console.log(`unbiased Estimate = ${this.orderAutocovariance[2]}`);
    } else if (this.numberOfTimeSeries < 100) {
      //Автоковаріація порядку p0
      this.orderAutocovariance.push(this.dispersion.biasedEstimate);
      // console.log(`Autocovariance p0 = ${this.orderAutocovariance[0]}`);

      //Автоковаріація порядку p1
      let sum = 0;
      let timeLag = 1;

      while (this.numberOfTimeSeries - timeLag != 1) {
        this.calculateMathematicalExpectation(this.stockPrices, true, timeLag);

        for (let i = 0; i < this.numberOfTimeSeries - timeLag; i++) {
          sum +=
            (this.stockPrices[i] - this.mathematicalExpectationY1) *
            (this.stockPrices[i + timeLag] - this.mathematicalExpectationY2);
        }
        this.orderAutocovariance.push(
          (1 / (this.numberOfTimeSeries - timeLag)) * sum
        );
        // console.log(
        //   `Autocovariance p${timeLag} = ${this.orderAutocovariance[timeLag]}`
        // );

        sum = 0;
        timeLag++;
      }
    }
  }

  calculateAutocorrelationCoefficient() {
    if (this.numberOfTimeSeries > 99) {
      //Коефіцієнт автокореляції порядку від p1 до p(n-1)
      let numerator = 0;
      let denominator = 0;
      let timeLag = 1;
      while (
        this.numberOfTimeSeries - timeLag !=
        Math.ceil(this.numberOfTimeSeries / 1.5) - 1
      ) {
        for (let i = 0; i < this.numberOfTimeSeries - timeLag; i++) {
          numerator +=
            (this.stockPrices[i] - this.mathematicalExpectation) *
            (this.stockPrices[i + timeLag] - this.mathematicalExpectation);
        }
        for (let i = 0; i < this.numberOfTimeSeries; i++) {
          denominator += Math.pow(
            this.stockPrices[i] - this.mathematicalExpectation,
            2
          );
        }

        this.autocorrelationCoefficient.push(numerator / denominator);
        timeLag++;
      }
    } else if (this.numberOfTimeSeries < 100) {
      //Коефіцієнт автокореляції порядку p1
      let numerator = 0;
      let denominator = 0;
      let sum1 = 0;
      let sum2 = 0;
      let timeLag = 1;

      while (this.numberOfTimeSeries - timeLag != 2) {
        this.calculateMathematicalExpectation(this.stockPrices, true, timeLag);
        // console.log(this.mathematicalExpectationY1);
        // console.log(this.mathematicalExpectationY2);

        for (let i = 0; i < this.numberOfTimeSeries - timeLag; i++) {
          numerator +=
            (this.stockPrices[i] - this.mathematicalExpectationY1) *
            (this.stockPrices[i + timeLag] - this.mathematicalExpectationY2);
        }
        for (let i = 0; i < this.numberOfTimeSeries - timeLag; i++) {
          sum1 += Math.pow(
            this.stockPrices[i] - this.mathematicalExpectationY1,
            2
          );
        }
        for (let i = 0 + timeLag; i < this.numberOfTimeSeries; i++) {
          if (!isNaN(this.stockPrices[i + timeLag])) {
            sum2 += Math.pow(
              this.stockPrices[i + timeLag] - this.mathematicalExpectationY2,
              2
            );
          }
          // let subtraction =
          //   this.stockPrices[i + timeLag] - this.mathematicalExpectationY2;
        }

        denominator = Math.sqrt(sum1 * sum2);
        console.log(
          `sum2 = ${sum2} | sum1 = ${sum1} | denom = ${denominator} | numer = ${numerator}`
        );
        this.autocorrelationCoefficient.push(numerator / denominator);

        console.log(
          `autocorrelation coef p${timeLag}  = ${
            this.autocorrelationCoefficient[timeLag - 1]
          }`
        );
        timeLag++;
        sum1 = 0;
        sum2 = 0;
      }
    }
  }

  analyzeCorelogram() {
    //треба проаналізувати корелограму
    //4 пункта на стор. 12
  }

  transformDataForRegression(arrayValues) {
    let x = Array.from(
      { length: this.numberOfTimeSeries },
      (_, index) => index + 1
    );
    let data = [];

    for (let i = 0; i < this.numberOfTimeSeries; i++) {
      data.push([x[i], arrayValues[i]]);
    }

    return data;
  }

  calculateLinearModel() {
    let data = this.transformDataForRegression(this.stockPrices); //Make matrix [x,y] for regression

    this.calculateLinearModelCoefficients(data);

    this.linearModel.values = this.calculateLinearModelValues(
      this.linearModel.m,
      this.linearModel.c
    );

    console.log(
      `Linear model coefficients: m = ${this.linearModel.m}, c = ${this.linearModel.c}`
    );
  }

  calculateLinearModelCoefficients(data) {
    let result = regression.linear(data, { precision: 3 });

    this.linearModel.m = result.equation[0];
    this.linearModel.c = result.equation[1];
    this.linearModel.determinationCoefficient = result.r2;
  }

  calculateLinearModelValues(m, c) {
    return Array.from({ length: this.numberOfTimeSeries }, (_, index) => {
      return m * index + c;
    });
  }

  calculateExponentialModel() {
    let data = this.transformDataForRegression(this.stockPrices);

    this.calculateExponentialModelCoefficients(data);

    this.calculateExponentialModelValues(
      this.exponentialModel.a,
      this.exponentialModel.b
    );

    console.log(
      `Exponential model coefficients: a = ${this.exponentialModel.a}, b = ${this.exponentialModel.b}`
    );
  }

  calculateExponentialModelCoefficients(data) {
    let result = regression.exponential(data, { precision: 3 });

    this.exponentialModel.a = result.equation[0];
    this.exponentialModel.b = result.equation[1];
    this.exponentialModel.determinationCoefficient = result.r2;
  }

  calculateExponentialModelValues(a, b) {
    this.exponentialModel.values = Array.from(
      { length: this.numberOfTimeSeries },
      (_, index) => {
        return a * Math.exp(b * index);
      }
    );
  }

  calculateLogarithmicModel() {
    let data = this.transformDataForRegression(this.stockPrices);

    this.calculateLogarithmicModelCoefficients(data);

    this.calculateLogarithmicModelValues(
      this.logarithmicModel.a,
      this.logarithmicModel.b
    );

    console.log(
      `Logarithmic model coefficients: a = ${this.logarithmicModel.a}, b = ${this.logarithmicModel.b}`
    );
  }

  calculateLogarithmicModelCoefficients(data) {
    let result = regression.logarithmic(data, { precision: 3 });

    this.logarithmicModel.a = result.equation[0];
    this.logarithmicModel.b = result.equation[1];
    this.logarithmicModel.determinationCoefficient = result.r2;
  }

  calculateLogarithmicModelValues(a, b) {
    this.logarithmicModel.values = Array.from(
      { length: this.numberOfTimeSeries },
      (_, index) => {
        return a + b * Math.log(index);
      }
    );
  }

  calculatePowerModel() {
    let data = this.transformDataForRegression(this.stockPrices);

    this.calculatePowerModelCoefficients(data);

    this.calculatePowerModelValues(this.powerModel.a, this.powerModel.b);

    console.log(
      `Power model coefficients: a = ${this.powerModel.a}, b = ${this.powerModel.b}`
    );
  }

  calculatePowerModelCoefficients(data) {
    let result = regression.power(data, { precision: 3 });

    this.powerModel.a = result.equation[0];
    this.powerModel.b = result.equation[1];
    this.powerModel.determinationCoefficient = result.r2;
  }

  calculatePowerModelValues(a, b) {
    this.powerModel.values = Array.from(
      { length: this.numberOfTimeSeries },
      (_, index) => {
        return a * Math.pow(index, b);
      }
    );
  }

  calculatePolynomialModelCoefficients() {
    let data = this.transformDataForRegression(this.stockPrices);

    let result = regression.polynomial(data, { precision: 3 });

    result.equation.forEach((res) => {
      this.polynomialModelCoefficients.a.push(res);
    });
    this.polynomialModelCoefficients.determinationCoefficient = result.r2;

    console.log(`Polynomial model coefficients: ${result.equation}`);
  }

  compareTrendModels() {
    if (
      this.linearModel.determinationCoefficient >
        this.exponentialModel.determinationCoefficient &&
      this.linearModel.determinationCoefficient >
        this.logarithmicModel.determinationCoefficient &&
      this.linearModel.determinationCoefficient >
        this.powerModel.determinationCoefficient &&
      this.linearModel.determinationCoefficient >
        this.polynomialModelCoefficients.determinationCoefficient
    ) {
      this.forecastModel = {
        name: "Linear model",
        coefficients: this.linearModel,
      };
    } else if (
      this.exponentialModel.determinationCoefficient >
        this.linearModel.determinationCoefficient &&
      this.exponentialModel.determinationCoefficient >
        this.logarithmicModel.determinationCoefficient &&
      this.exponentialModel.determinationCoefficient >
        this.powerModel.determinationCoefficient &&
      this.exponentialModel.determinationCoefficient >
        this.polynomialModelCoefficients.determinationCoefficient
    ) {
      this.forecastModel = {
        name: "Exponential model",
        coefficients: this.exponentialModelCoefficients,
      };
    } else if (
      this.logarithmicModel.determinationCoefficient >
        this.linearModel.determinationCoefficient &&
      this.logarithmicModel.determinationCoefficient >
        this.exponentialModel.determinationCoefficient &&
      this.logarithmicModel.determinationCoefficient >
        this.powerModel.determinationCoefficient &&
      this.logarithmicModel.determinationCoefficient >
        this.polynomialModelCoefficients.determinationCoefficient
    ) {
      this.forecastModel = {
        name: "Logarithmic model",
        coefficients: this.logarithmicModel,
      };
    } else if (
      this.powerModel.determinationCoefficient >
        this.linearModel.determinationCoefficient &&
      this.powerModel.determinationCoefficient >
        this.exponentialModel.determinationCoefficient &&
      this.powerModel.determinationCoefficient >
        this.logarithmicModel.determinationCoefficient &&
      this.powerModel.determinationCoefficient >
        this.polynomialModelCoefficients.determinationCoefficient
    ) {
      this.forecastModel = {
        name: "Power model",
        coefficients: this.powerModel,
      };
    } else if (
      this.polynomialModelCoefficients.determinationCoefficient >
        this.linearModel.determinationCoefficient &&
      this.polynomialModelCoefficients.determinationCoefficient >
        this.exponentialModel.determinationCoefficient &&
      this.polynomialModelCoefficients.determinationCoefficient >
        this.logarithmicModel.determinationCoefficient &&
      this.polynomialModelCoefficients.determinationCoefficient >
        this.powerModel.determinationCoefficient
    ) {
      this.forecastModel = {
        name: "Power model",
        coefficients: this.powerModel,
      };
    }
  }

  calculateRandomComponent() {
    let randomComponent = [];
    // for(let i = 0; i < this.numberOfTimeSeries; i++) {
    //   randomComponent.push(this.stockPrices[i] - (this.))
    // }
    console.log(this.forecastModel);
  }

  detectAbnormalValues() {
    let res = [];
    let hasAbnormalValues = false;

    for (let i = 0; i < this.numberOfTimeSeries - 1; i++) {
      res.push(
        Math.abs(
          (this.stockPrices[i + 1] - this.stockPrices[i]) /
            Math.sqrt(this.dispersion.unbiasedEstimate)
        )
      );
    }

    for (let i = 0; i < res.length; i++) {
      if (res[i] > 1.46) {
        console.log(`Abnormal value i=${i} : ${res[i]}`);
        hasAbnormalValues = true;
      } else if (i === res.length - 1 && hasAbnormalValues === false) {
        console.log(`There are no abnormal values!`);
      }
    }
  }

  checkTrend() {
    this.checkingAverageLevelDifferences();
    this.seriesCriterion();
  }

  //Метод перевірки різниць середніх рівнів
  checkingAverageLevelDifferences() {
    const twoArrays = [];
    const chunkSize = Math.ceil(this.numberOfTimeSeries / 2);
    let mathExpectY1 = 0;
    let mathExpectY2 = 0;
    let unbiasedEstimateN1 = 0;
    let unbiasedEstimateN2 = 0;
    let empiricalValueF = 0;
    let criticalValueF = 0; //for n1-1, n2-1
    let empiricalValueS = 0;
    let criticalValueS = 0; //for n1+n2-1
    let canFindTrend = false;

    for (let i = 0; i < this.stockPrices.length; i += chunkSize) {
      const chunk = this.stockPrices.slice(i, i + chunkSize);
      twoArrays.push(chunk);
    }

    let firstArraySize = twoArrays[0].length;
    let secondArraySize = twoArrays[1].length;

    // console.log(twoArrays);

    [mathExpectY1, mathExpectY2] = this.calculateMathematicalExpectation(
      twoArrays,
      true
    );

    console.log(`Math expectation Y1 = ${mathExpectY1}`);
    console.log(`Math expectation Y2 = ${mathExpectY2}`);

    [unbiasedEstimateN1, unbiasedEstimateN2] = this.calculateUnbiasedEstimate(
      twoArrays,
      [mathExpectY1, mathExpectY2],
      true
    );

    console.log(`dispersion unbiased Estimate for N1 = ${unbiasedEstimateN1}`);
    console.log(`dispersion unbiased Estimate for N2 = ${unbiasedEstimateN2}`);

    empiricalValueF = this.calculateEmpiricalFisherValue(
      unbiasedEstimateN1,
      unbiasedEstimateN2
    );

    criticalValueF = this.findFisherCriticalValue(
      firstArraySize,
      secondArraySize
    );

    canFindTrend = this.compareEmpiricalAndCriticalFisherValue(
      empiricalValueF,
      criticalValueF
    );

    if (canFindTrend === true) {
      empiricalValueS = this.calculateEmpiricalStudentValue(
        [firstArraySize, secondArraySize],
        [unbiasedEstimateN1, unbiasedEstimateN2],
        [mathExpectY1, mathExpectY2]
      );

      criticalValueS = this.findStudentCriticalValue(
        firstArraySize + secondArraySize
      );

      this.hasTrend = this.compareEmpiricalAndCriticalStudentValue(
        empiricalValueS,
        criticalValueS
      );
    }

    this.hasTrend = false;
  }

  //Пошук Емпірічного значення критерію Фішера
  calculateEmpiricalFisherValue(unbiasedEstimate1, unbiasedEstimate2) {
    let empiricalFisherValue;
    if (unbiasedEstimate1 > unbiasedEstimate2) {
      empiricalFisherValue = unbiasedEstimate1 / unbiasedEstimate2;
    } else {
      empiricalFisherValue = unbiasedEstimate2 / unbiasedEstimate1;
    }
    return empiricalFisherValue;
  }

  //Пошук Емпірічного значення критерію Стьюдента
  calculateEmpiricalStudentValue(
    arraySizes,
    unbiasedEstimates,
    mathExpectations
  ) {
    let deviationOfDifferenceOfMeans = Math.sqrt(
      ((arraySizes[0] - 1) * unbiasedEstimates[0] +
        (arraySizes[1] - 1) * unbiasedEstimates[1]) /
        (arraySizes[0] + arraySizes[1] - 2)
    );

    let empiricalStudentValue =
      Math.abs(mathExpectations[0] - mathExpectations[1]) /
      (deviationOfDifferenceOfMeans *
        Math.sqrt(1 / arraySizes[0] + 1 / arraySizes[1]));
    return empiricalStudentValue;
  }

  //Порівняння Емпірічно та Критичного значення критерія Фішера
  compareEmpiricalAndCriticalFisherValue(empirical, critical) {
    /*Якщо Емп >= Крит то гіпотеза про однорідність дисперсій відхиляється
               немає відповіді про наявність тренду*/
    /*Якщо Емп < Крит то гіпотеза про однорідність дисперсій приймається
             і необхідно переходити до наступних розрахунків*/
    if (empirical < critical) {
      console.log(
        `Emp Fisher's value: ${empirical} < Critical Fisher's value: ${critical}\nОднорідність дисперсій приймається`
      );
      return true;
    } else {
      console.log(
        `Emp Fisher's value: ${empirical} > Critical Fisher's value: ${critical}\nОднорідність дисперсій відхиляється`
      );
      return false;
    }
  }

  //Порівняння Емпірічно та Критичного значення критерія Стьюдента
  compareEmpiricalAndCriticalStudentValue(empirical, critical) {
    //Якщо Емп >= Крит то гіпотеза про рівність середніх відхиляється, тренд є
    //Якщо Емп < Крит то гіпотеза про рівність середніх приймається, тренду немає.
    if (empirical >= critical) {
      console.log(
        `Emp Student's value: ${empirical} >= Critical Student's value: ${critical}\nГіпотеза про рівність середніх відхиляється, Тренд є!`
      );
      return true;
    } else {
      console.log(
        `Emp Student's value: ${empirical} < Critical Student's value: ${critical}\nГіпотеза про рівність середніх приймається, Тренду немає!`
      );
      return false;
    }
  }

  //Пошук Критичного значення критерію Фішера з таблиці
  findFisherCriticalValue(sizeArr1, sizeArr2) {
    let k1Index = 0;
    let k2Index = 0;
    if (sizeArr1 - 1 <= 10) {
      k1Index = sizeArr1 - 2;
    } else if (sizeArr1 - 1 > 10 && sizeArr1 - 1 <= 12) {
      k1Index = 10;
    } else if (sizeArr1 - 1 > 12 && sizeArr1 - 1 <= 15) {
      k1Index = 11;
    } else if (sizeArr1 - 1 > 15 && sizeArr1 - 1 <= 20) {
      k1Index = 12;
    } else if (sizeArr1 - 1 > 20 && sizeArr1 - 1 <= 24) {
      k1Index = 13;
    } else if (sizeArr1 - 1 > 24 && sizeArr1 - 1 <= 30) {
      k1Index = 14;
    } else if (sizeArr1 - 1 > 30 && sizeArr1 - 1 <= 40) {
      k1Index = 15;
    } else if (sizeArr1 - 1 > 40 && sizeArr1 - 1 <= 60) {
      k1Index = 16;
    } else if (sizeArr1 - 1 > 60 && sizeArr1 - 1 <= 120) {
      k1Index = 17;
    } else if (sizeArr1 - 1 > 120 && sizeArr1 - 1 <= 160) {
      k1Index = 18;
    } else {
      k1Index = 19;
    }

    if (sizeArr2 - 1 <= 30) {
      k2Index = sizeArr2 - 2;
    } else if (sizeArr2 - 1 > 30 && sizeArr2 - 1 <= 40) {
      k2Index = 30;
    } else if (sizeArr2 - 1 > 40 && sizeArr2 - 1 <= 60) {
      k2Index = 31;
    } else if (sizeArr2 - 1 > 60 && sizeArr2 - 1 <= 120) {
      k2Index = 32;
    } else if (sizeArr2 - 1 > 120 && sizeArr2 - 1 <= 160) {
      k2Index = 33;
    } else {
      k2Index = 34;
    }

    return FisherCriticalValues[k2Index][k1Index];
  }

  //Пошук Критичного значення критерію Стьюдента з таблиці
  findStudentCriticalValue(sizeArr) {
    let kIndex = 0;
    if (sizeArr - 1 <= 30) {
      kIndex = sizeArr - 2;
    } else if (sizeArr > 30) {
      kIndex = 30;
    } else if (sizeArr > 40) {
      kIndex = 31;
    } else if (sizeArr > 60) {
      kIndex = 32;
    } else if (sizeArr > 120) {
      kIndex = 33;
    }

    return StudentCriticalValues[kIndex];
  }

  //Критерій серій
  seriesCriterion() {
    let median = this.calculateMedian(this.stockPrices);
    console.log(`median = ${median}`);

    let sequence = this.formSequence(this.stockPrices, median);
    console.log(`sequence: ${sequence}`);

    let series = [];
    let numberSeries = 0;
    let largestSeries = 0;
    [series, numberSeries, largestSeries] =
      this.calculateNumberSeries(sequence);
    console.log(
      `series: ${series} | number series = ${numberSeries} | largest series = ${largestSeries}`
    );

    let criticalValueNumberSeries = this.calculateCriticalValueOfNumberSeries(
      sequence.length
    );
    console.log(`critical value = ${criticalValueNumberSeries}`);

    let criticalValueLargestSeries =
      this.calculateCriticalValueOfLargestSeries(largestSeries);
    console.log(
      `critical value largest series = ${criticalValueLargestSeries}`
    );

    this.checkingInequalities(
      largestSeries,
      criticalValueLargestSeries,
      numberSeries,
      criticalValueNumberSeries
    );
  }

  //Розрахунок медіани
  calculateMedian(arr) {
    let median = 0;
    arr.forEach((element) => (median += element));

    return median / arr.length;
  }

  //Формування послідовностей + та -
  formSequence(arr, median) {
    let sequence = [];
    arr.forEach((element) => {
      if (element > median) {
        sequence.push("+");
      } else if (element < median) {
        sequence.push("-");
      }
    });

    return sequence;
  }

  //Розрахунок кількості серій та довжини найдовшої серії
  calculateNumberSeries(sequence) {
    let numberSeries = 0;
    let series = [];
    let largestSeries = 0;
    let count = 0;
    let prevValue = "+";
    sequence.forEach((element, index) => {
      if (element === prevValue) {
        count++;
        if (index === sequence.length - 1) {
          series.push(count);
        }
      } else if (element !== prevValue) {
        prevValue = element;
        if (count != 0) {
          series.push(count);
        }

        count = 0;
        count++;

        if (index === sequence.length - 1) {
          series.push(count);
        }
      }
    });

    series.forEach((element) => {
      if (element > largestSeries) {
        largestSeries = element;
      }
    });

    numberSeries = series.length;

    return [series, numberSeries, largestSeries];
  }

  //Розрахунок критичного значення для кількості серій
  calculateCriticalValueOfNumberSeries(numberSeries) {
    let criticalValue = Math.floor(
      (1 / 2) * (numberSeries + 1 - 1.96 * Math.sqrt(numberSeries - 1))
    );

    return criticalValue;
  }

  //Розрахунок критичного значення для найдовшої серії
  calculateCriticalValueOfLargestSeries(largestSeries) {
    let criticalValue = Math.floor(3.3 * (Math.log10(largestSeries) + 1));

    return criticalValue;
  }

  //Перевірка нерівностей для перевірки, чи є тренд
  //Якщо нерівності виконуються, то тренду немає
  checkingInequalities(
    largestSeries,
    criticalValueLargestSeries,
    numberSeries,
    criticalValueNumberSeries
  ) {
    console.log(
      `largest series = ${largestSeries} < critical value lg series = ${criticalValueLargestSeries} \nnumber series = ${numberSeries} > critical value number series = ${criticalValueNumberSeries}`
    );
    if (
      largestSeries < criticalValueLargestSeries &&
      numberSeries > criticalValueNumberSeries
    ) {
      console.log(`Обидві нерівності виконуються, тренду немає`);
      this.hasTrend = false;
    } else {
      console.log(`Одна або дві з нерівностей не виконується, тренд є`);
      this.hasTrend = true;
    }
  }
}
