
import { describe, expect, it } from 'vitest'
import { hexToRGB } from './parseColor'

describe('hexToRGB', () => {
  it('should convert hexa color "#ffffff" to rgb color "rgb(255, 255, 255)"', () => {
    const color = hexToRGB('#ffffff')
    expect(color).toEqual('rgb(255, 255, 255)')
  })

  it('should convert hexa color "#ffffff" with alpha "0.8" to rgb color "rgb(255, 255, 255, 0.8)"', () => {
    const color = hexToRGB('#ffffff', 0.8)
    expect(color).toEqual('rgba(255, 255, 255, 0.8)')
  })

  it('throw new Error("alpha out of range")', () => {
    const err = () => {
      hexToRGB('#ffffff', 2)
    }
    expect(err).toThrow(Error)
    expect(err).toThrow('alpha out of range')
  })
})
