class Perceptron {
  public _dim: number;

  public input: number[];

  public constructor(dim: number) {
    this._dim = dim;

    this.input = Array.from({ length: dim * dim }, (v, i) => 0);
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
}

export default Perceptron;
