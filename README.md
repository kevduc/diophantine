# diophantine

Solve linear diophantine equations

**Documentation:** [kevduc.github.io/diophantine](https://kevduc.github.io/diophantine/)

**GitHub repository:** [kevduc/diophantine](https://github.com/kevduc/diophantine)

## Example

### `example.js`

```js
const { dioSolve, SolutionType } = require('diophantine')

const a = 59
const b = -7
const c = 4

console.log(`Solving: ${a}x + ${b}y = ${c}`)

const { solutionType, g, z, m, p } = dioSolve(a, b, c)

switch (solutionType) {
  case SolutionType.None: {
    console.log(`No solution (gcd = ${g} ∤ c = ${c})`)
    break
  }
  case SolutionType.Unique: {
    console.log(`Unique solution: ${z[0] ? `x = ${z[0]}` : `y = ${z[1]}`}`)
    break
  }
  case SolutionType.Linear: {
    console.log(`   gcd = ${g}`)
    console.log(`   x0 = ${z[0]}, y0 = ${z[1]}`)
    console.log(`   ${a} × ${z[0]} + ${b} × ${z[1]} = ${z[0] * a + z[1] * b}`)
    console.log(`Solution: x = ${m[0]}n + ${p[0]}, y = ${m[1]}n + ${p[1]}`)
    break
  }
  default: {
    console.log(`Solution: ${solutionType}`)
    break
  }
}
```

### Console output

```
Solving: 59x + -7y = 4
   gcd = 1
   x0 = -8, y0 = -68
   59 × -8 + -7 × -68 = 4
Solution: x = 7n + 6, y = 59n + 50
```
