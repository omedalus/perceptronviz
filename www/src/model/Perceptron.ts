// @ts-ignore
import pako from 'pako';
// @ts-ignore
import * as Uint8ToBase64 from 'uint8-to-base64';

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

  public assess(output?: number[] | string) {
    let outputVector = [] as number[];
    if (Array.isArray(output)) {
      outputVector = output;
    } else if (typeof output === 'undefined') {
      outputVector = this.currentOutputVector;
    } else if (typeof output === 'string') {
      outputVector = this.outputs[output];
    }

    if (!outputVector || !outputVector.length) {
      return 0;
    }

    const piecewiseMult = this.input.map((x, i) => x * outputVector[i]);
    const dotprod = piecewiseMult.reduce((acc, v) => acc + v, 0);

    //const retval = dotprod > 0;
    //return retval;

    return dotprod;
  }

  public static createZeroArray = _createZeroArray;

  public serialize(zip?: boolean) {
    let retval = '[' + _serializeVectorToFixedWidthJSON(this.input) + ',{';
    this.outputLabels.forEach((outputLabel, ixOutput) => {
      if (ixOutput !== 0) {
        retval += ',';
      }
      const outputVector = this.outputs[outputLabel];
      retval += JSON.stringify(outputLabel) + ':' + _serializeVectorToFixedWidthJSON(outputVector);
    });
    retval += '},' + JSON.stringify(this.currentOutputLabel) + ',[';
    retval += this.savedInputs.join(',') + ']]';

    if (!zip) {
      return retval;
    }

    console.info(`Zipping and Base64 encoding: ${retval}`);

    const zippedBuffer = pako.deflate(retval);
    const zippedStr = Uint8ToBase64.encode(zippedBuffer);
    return zippedStr;
  }

  public static deserialize(from: string | Uint8Array | any[]) {
    try {
      let jsondata = null;
      if (Array.isArray(from)) {
        jsondata = from;
      } else if (from instanceof Uint8Array) {
        const jsonStr = pako.inflate(from);
        jsondata = JSON.parse(jsonStr);
      } else if (typeof from === 'string') {
        try {
          jsondata = JSON.parse(from);
        } catch (ex) {
          const zippedBuffer = Uint8ToBase64.decode(from);
          const unzippedBuffer = pako.inflate(zippedBuffer);

          let decoder = new TextDecoder('utf-8');
          const jsonStr = decoder.decode(unzippedBuffer);

          jsondata = JSON.parse(jsonStr);
        }
      }

      const inputVector = jsondata[0];
      // Rounding is needed to avoid floating point sadness.
      const dim = Math.round(Math.sqrt(inputVector.length - 1));

      const newPerceptron = new Perceptron(dim);
      newPerceptron.input = inputVector;

      newPerceptron.outputs = jsondata[1];
      newPerceptron._currentOutput = jsondata[2];

      const savedInputs = jsondata[3];
      // They're actually stored as strings!
      newPerceptron.savedInputs = savedInputs.map((savedInput: number[]) =>
        _serializeVectorToFixedWidthJSON(savedInput)
      );

      return newPerceptron;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }

  public get bestOutput() {
    let bestAssessment = 0;
    let bestLabel = '';
    this.outputLabels.forEach((label) => {
      const assessment = this.assess(label);
      if (assessment > bestAssessment) {
        bestAssessment = assessment;
        bestLabel = label;
      }
    });
    return bestLabel;
  }
}

export default Perceptron;
