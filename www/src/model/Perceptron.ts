const _createZeroArray = (n: number) => {
  const a = Array.from({ length: n }, (v, i) => 0);
  return a;
};

const _createRandomArray = (n: number, r: number) => {
  const a = Array.from({ length: n }, (v, i) => Math.random() * r * 2 - r);
  return a;
};

const _serializeVectorToFixedWidthJSON = (vec: number[]) => {
  const s =
    '[' +
    vec
      .map((x) => {
        let s = x.toFixed(2);
        while (s.endsWith('0')) {
          s = s.slice(0, -1);
        }
        if (s.endsWith('.')) {
          s = s.slice(0, -1);
        }
        return s;
      })
      .join(',') +
    ']';
  return s;
};

class Perceptron {
  public _dim: number;

  public input: number[];

  public savedInputs = [] as string[];

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
    return this._dim * this._dim + 1;
  }
  public get dim() {
    return this._dim;
  }

  public clearInput() {
    this.input.forEach((v, i) => {
      this.input[i] = 0;
    });
    // Don't clear the bias neuron!
    this.input[this.input.length - 1] = 1.0;
  }

  public saveInput() {
    const currentInputSerialized = _serializeVectorToFixedWidthJSON(this.input);
    if (this.savedInputs.includes(currentInputSerialized)) {
      // This pattern is already saved.
      return true;
    }
    this.savedInputs.push(currentInputSerialized);
    return true;
  }

  public loadInput(serializedVector: string) {
    // If it's going to throw, let it throw.
    let vec = [] as number[];
    vec = JSON.parse(serializedVector);
    if (vec.length !== this.input.length) {
      throw new Error('Trying to unpack a saved input that has different size than current.');
    }
    if (vec[vec.length - 1] !== 1) {
      throw new Error('A valid input has to have a bias neuron.');
    }

    this.input = vec;
    return true;
  }

  public get numSavedInputs() {
    return this.savedInputs.length;
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

  public assess() {
    if (!this.currentOutputVector) {
      return false;
    }

    const piecewiseMult = this.input.map((x, i) => x * this.currentOutputVector[i]);
    const dotprod = piecewiseMult.reduce((acc, v) => acc + v, 0);

    const retval = dotprod > 0;
    return retval;
  }

  public static createZeroArray = _createZeroArray;
}

export default Perceptron;
