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
    let z = [0, 0]
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
  const addN = n[Number(Math.abs(n[1]) > Math.abs(n[0]))]
  const p = [0, 1].map((i) => z[i] - addN * m[i])

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

module.exports = dioSolve
