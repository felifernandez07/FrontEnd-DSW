import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formatea el número correctamente', () => {
    const result = formatCurrency(1299.99)
    expect(result).toBe('$1,299.99')
  })
})