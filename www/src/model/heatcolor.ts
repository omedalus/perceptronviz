const heatcolor = (v: number, range: number, floor = 50) => {
  // vRaw is -inf to +inf, but the juicy parts are
  // between -dim and +dim.
  // We treat the negative and positive cases differently.
  if (v <= 0) {
    const red = Math.min(-v, range) / range;
    const redInt = floor + Math.floor((255 - floor) * red);
    const retval = `rgb(${redInt}, ${floor}, ${floor})`;
    return retval;
  }

  const green = Math.min(v, range) / range;
  const greenInt = floor + Math.floor((255 - floor) * green);
  const retval = `rgb(${floor}, ${greenInt}, ${floor})`;
  return retval;
};

export default heatcolor;
