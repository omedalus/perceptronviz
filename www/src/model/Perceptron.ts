class Perceptron {
  private _dim: number;

  public input: number[];

  public constructor(dim: number) {
    this._dim = dim;

    this.input = Array.from({ length: dim * dim }, (v, i) => 0);
  }

  public get size() {
    return this._dim * this._dim;
  }
}

export default Perceptron;
