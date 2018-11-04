import React from 'react'
import { mount } from 'enzyme'

import FocusLock from '../index'

const children = (
  <ul>
    <li>
      <a href="#">first</a>
    </li>
    <li>
      <a href="#">second</a>
    </li>
    <li>
      <a href="#">third</a>
    </li>
    <li>
      <a href="#">forth</a>
    </li>
  </ul>
)

describe('FocusLock', () => {
  beforeEach(() => {
    document.activeElement.blur()
  })

  it('has defaultProps', () => {
    expect(FocusLock.defaultProps).toMatchInlineSnapshot(`
Object {
  "as": "div",
  "autofocus": true,
  "returnFocus": true,
}
`)
  })

  describe('WITH focusable children', () => {
    it('renders successfully', () => {
      expect(() => mount(<FocusLock>{children}</FocusLock>)).not.toThrow()
    })
  })

  describe('WITHOUT focusable children', () => {
    it('renders successfully', () => {
      expect(() => mount(<FocusLock>unfocusable</FocusLock>)).not.toThrow()
    })
  })

  describe('autofocus', () => {
    describe('when enabled', () => {
      it('focuses the first focusable child', () => {
        const wrapper = mount(<FocusLock autofocus>{children}</FocusLock>)

        const el = wrapper.find('a[href]').first()

        expect(el.getDOMNode()).toEqual(document.activeElement)
      })
    })

    describe('when disabled', () => {
      it('does NOT focus any children', () => {
        mount(<FocusLock autofocus={false}>{children}</FocusLock>)

        expect(document.activeElement).toEqual(document.body)
      })
    })
  })

  describe('on keydown', () => {
    describe('when first child tabs backward', () => {
      it('focuses the last child', () => {
        const wrapper = mount(<FocusLock>{children}</FocusLock>)

        const firstEl = wrapper.find('a[href]').first()
        const lastEl = wrapper.find('a[href]').last()

        firstEl.getDOMNode().focus()
        firstEl.simulate('keydown', { key: 'Tab', shiftKey: true })

        expect(lastEl.getDOMNode()).toEqual(document.activeElement)
      })
    })

    describe('when last child tabs forward', () => {
      it('focuses the first child', () => {
        const wrapper = mount(<FocusLock>{children}</FocusLock>)

        const firstEl = wrapper.find('a[href]').first()
        const lastEl = wrapper.find('a[href]').last()

        lastEl.getDOMNode().focus()
        lastEl.simulate('keydown', { key: 'Tab' })

        expect(firstEl.getDOMNode()).toEqual(document.activeElement)
      })
    })
  })

  describe('on unmount', () => {
    it('returns focus to the prev active element', () => {
      const button = document.createElement('button')
      document.body.appendChild(button)
      button.focus()

      const wrapper = mount(<FocusLock>{children}</FocusLock>)
      const lastEl = wrapper.find('a[href]').last()

      lastEl.getDOMNode().focus()
      wrapper.unmount()

      expect(document.activeElement).toEqual(button)
    })
  })
})
