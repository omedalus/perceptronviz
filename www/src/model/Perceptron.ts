const _createZeroArray = (n: number) => {
  const a = Array.from({ length: n }, (v, i) => 0);
  return a;
};

class Perceptron {
  public _dim: number;

  public input: number[];

  public outputs: { [key: string]: number[] };

  public _currentOutput = '';

  public constructor(dim: number) {
    this._dim = dim;

    this.input = _createZeroArray(dim * dim);
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

  public createOutput(name: string) {
    if (!(name in this.outputs)) {
      this.outputs[name] = _createZeroArray(this.size + 1);
    }
    return this.outputs[name];
  }

  public deleteOutput(name: string) {
    if (!(name in this.outputs)) {
      return;
    }
    delete this.outputs[name];

    if (this._currentOutput === name) {
      this._currentOutput = '';
    }
  }

  public deleteCurrentOutput() {
    this.deleteOutput(this.currentOutputName);
  }

  public set currentOutput(name: string) {
    if (!(name in this.outputs)) {
      this.createOutput(name);
    }
    this._currentOutput = name;
  }

  public get currentOutputName() {
    return this._currentOutput;
  }

  public get currentOutputVector() {
    return this.outputs[this._currentOutput];
  }

  public get outputNames() {
    const a = [...Object.keys(this.outputs)].sort();
    return a;
  }
}

export default Perceptron;
