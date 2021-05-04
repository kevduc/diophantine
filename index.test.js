const { dioSolve, SolutionType } = require('.')

expect.extend({
  toHaveLinearSolution(received) {
    const options = {
      comment: 'Has a linear solution',
      isNot: this.isNot,
      promise: this.promise,
    }

    const hint = this.utils.matcherHint('toHaveLinearSolution', '[a, b, c]', '', options)

    const [a, b, c] = received

    const { solutionType, g, z, m, p } = dioSolve(a, b, c)

    // Solution type
    const expectedSolutionType = SolutionType.Linear

    if (!solutionType !== expectedSolutionType)
      return {
        actual: received,
        message: () =>
          hint +
          '\n\n' +
          'Solution type:\n' +
          `\tExpected: ${this.utils.printExpected(expectedSolutionType)}\n` +
          `\tReceived: ${this.utils.printReceived(solutionType)}`,
        pass: false,
      }

    // expect(g).toBe(1)
    // expect((c / g) % 1).toBe(0)

    // const [x0, y0] = z
    // const c0 = a * x0 + b * y0
    // expect(c0).toBe(c)

    // const N = [0, 1, -1, 3, -40, 136, -177, 256, -293, 435, -708, 823, -910]
    // const [mx, my] = m
    // const [px, py] = p
    // N.forEach((n) => expect(a * (mx * n + px) + b * (my * n + py)).toBe(c))

    return { actual: received, message: () => '', pass: true }
  },
})

test('Example test', () => {
  expect([59, -59, 4]).toHaveLinearSolution()
})
