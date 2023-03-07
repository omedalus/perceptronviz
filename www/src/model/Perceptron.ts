const _createZeroArray = (n: number) => {
  const a = Array.from({ length: n }, (v, i) => 0);
  return a;
};

const _createRandomArray = (n: number, r: number) => {
  const a = Array.from({ length: n }, (v, i) => Math.random() * r * 2 - r);
  return a;
};

class Perceptron {
  public _dim: number;

  public input: number[];

  public outputs: { [key: string]: number[] };

  public _currentOutput = '';

  public isInitRandomOutputWeights = true;

  public constructor(dim: number) {
    this._dim = dim;

    this.input = _createZeroArray(dim * dim + 1);
    this.input[dim * dim] = 1;
    this.outputs = {};
  }

  public get size() {
    return this._dim * this._dim;
  }
  public get dim() {
    return this._dim;
  }

  public clearInput() {
    this.input.forEach((v, i) => {
      this.input[i] = 0;
    });
  }

  public createOutput(label: string) {
    if (!(label in this.outputs)) {
      if (this.isInitRandomOutputWeights) {
        this.outputs[label] = _createRandomArray(this.size + 1, this.dim);
      } else {
        this.outputs[label] = _createZeroArray(this.size + 1);
      }
    }
    return this.outputs[label];
  }

  public randomizeOutput(label: string) {
    this.outputs[label] = _createRandomArray(this.size + 1, this.dim);
    return this.outputs[label];
  }

  public randomizeCurrentOutput() {
    return this.randomizeOutput(this.currentOutputLabel);
  }

  public deleteOutput(label: string) {
    if (!(label in this.outputs)) {
      return;
    }
    delete this.outputs[label];

    if (this._currentOutput === label) {
      this._currentOutput = '';
    }
  }

  public deleteCurrentOutput() {
    this.deleteOutput(this.currentOutputLabel);
  }

  public set currentOutputLabel(label: string) {
    if (!(label in this.outputs)) {
      this.createOutput(label);
    }
    this._currentOutput = label;
  }

  public get currentOutputLabel() {
    return this._currentOutput;
  }

  public get currentOutputVector() {
    return this.outputs[this._currentOutput];
  }

  public get outputLabels() {
    const a = [...Object.keys(this.outputs)].sort();
    return a;
  }

  public getOutputVector(label: string) {
    if (!(label in this.outputs)) {
      return this.createOutput(label);
    }
    return this.outputs[label];
  }

  public trainOutput(outputLabel: string, reinforcementFactor: number) {
    const weights = this.getOutputVector(outputLabel);
    weights.forEach((w, i) => {
      const inputValue = i < this.input.length ? this.input[i] : 1;
      weights[i] += inputValue * reinforcementFactor;
    });
  }

  public trainCurrentOutput(reinforcementFactor: number) {
    this.trainOutput(this.currentOutputLabel, reinforcementFactor);
  }
}

export default Perceptron;
