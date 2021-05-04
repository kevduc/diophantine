/**
 * Solves a linear Diophantine equation of the form: <code>ax + by = c</code>
 *
 * @param {number} a Coefficient for <code>x</code>
 * @param {number} b Coefficient for <code>y</code>
 * @param {number} c Right-side constant
 *
 * @returns {Result} One object with all the result values.
 */

const dioSolve = (a, b, c) => {
  // ax + by = c

  const defaultReturn = { z: null, m: null, p: null, g: null, solutionType: 'error' }

  const swap = b > a
  if (swap) [a, b] = [b, a]

  const signs = [Math.sign(a), Math.sign(b)]
  ;[a, b] = [Math.abs(a), Math.abs(b)]

  const steps = []
  const g = gcd(a, b, steps)

  if (g === 0 && c === 0) return { ...defaultReturn, g, solutionType: 'always-true' }

  if ((c / g) % 1 !== 0) return { ...defaultReturn, g, solutionType: 'none' }

  if (a === 0 || b === 0) {
    const i = Number((a === 0) ^ swap)
    let z = [null, null]
    z[i] = c / g
    return { ...defaultReturn, z, g, solutionType: 'unique' }
  }

  // Normalize equation
  ;[a, b, c] = [a / g, b / g, c / g]

  // Get quotients from gcd calculation steps
  const q = steps.map(([a, b]) => Math.floor(a / b)).reverse()

  let Ai1 = 0
  let Ai0 = 1

  for (let i = 1; i < q.length; i++) {
    ;[Ai0, Ai1] = [Ai0 * q[i] + Ai1, Ai0]
  }

  const sign = (-1) ** q.length
  let [y0, x0] = [Ai0 * -sign * signs[1], Ai1 * sign * signs[0]]
  let mx = signs[0] * b
  let my = -signs[1] * a

  if (swap) [mx, my, x0, y0] = [my, mx, y0, x0]

  // Coefficients
  const m = [mx, my]

  // Scale solution back to c
  const z = [x0, y0].map((v) => v * c)

  // Offset x0 and y0 to be of the same sign as the m-coefficients
  const n = [0, 1].map((i) => Math.floor(z[i] / m[i]))
  const nMax = n[Number(Math.abs(n[1]) > Math.abs(n[0]))]
  const p = [0, 1].map((i) => z[i] - nMax * m[i])

  return {
    z,
    m,
    p,
    g,
    solutionType: 'linear',
  }
}

const gcd = (a, b, steps = []) => {
  if (a === 0) return b
  if (b === 0) return a
  const r = a % b
  steps.push([a, b])
  if (r === 0) return Math.abs(b)
  return gcd(b, r, steps)
}

/**
 * @typedef {Object} Result
 * @property {SolutionType} solutionType Type of solution found, see <code>{@link SolutionType}</code> for more information.
 * @property {number|null} g Value of <code>GCD(a,b)</code>, <code>null</code> if error.
 * @property {(Array|null)} z Initial solution <code>[x<sub>0</sub>, y<sub>0</sub>]</code> found using the Euclidean algorithm when solution is linear, <code>[x<sub>0</sub>, null]</code> or <code>[null, y<sub>0</sub>]</code> when solution is unique, else <code>null</code>.
 * @property {Array|null} m Slope coefficients <code>[m<sub>x</sub>, m<sub>y</sub>]</code> when solution is linear, else <code>null</code>.
 * @property {Array|null} p Intercepts <code>[p<sub>x</sub>, p<sub>y</sub>]</code> when solution is linear, else <code>null</code>.
 */

/**
 * Enum for solution type values.
 * @readonly
 * @enum {string}
 */

const SolutionType = {
  /** <code>'linear'</code> – Solutions are <code>x = m<sub>x</sub>n + p<sub>x</sub></code>, <code>y = m<sub>y</sub>n + p<sub>y</sub></code> */
  Linear: 'linear',
  /** <code>'unique'</code> – When <code>a</code> or <code>b</code> is <code>0</code>, if a solution exists it's unique, e.g. <code>5x + 0y = 15</code> <code>=></code> solution is <code>x = 3</code> */
  Unique: 'unique',
  /** <code>'always-true'</code> – Values of <code>x</code> and <code>y</code> don't matter, e.g. <code>0x + 0y = 0</code> */
  AlwaysTrue: 'always-true',
  /** <code>'none'</code> – No solution, e.g. <code>8x + 6y = 1</code> */
  None: 'none',
  /** <code>'error'</code> – Something went wrong */
  Error: 'error',
}

module.exports = { dioSolve, SolutionType }
