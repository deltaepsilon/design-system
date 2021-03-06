import * as glamor from 'glamor'
import PropTypes from 'prop-types'
import React from 'react'

import filterReactProps from '@pluralsight/ps-design-system-filter-react-props'

import css from '../css'
import icons from '../js/icon-transformer'
import * as vars from '../vars'

const style = {
  icon: ({ css: propCSS = {}, color, size }) =>
    glamor.css({
      ...css['.psds-icon'],
      ...css[`.psds-icon--size-${size}`],

      '> svg': color
        ? css[`.psds-icon--color-${color} > svg`]
        : css['.psds-icon > svg']
    })
}

const IconNotFound = () => null

class Icon extends React.PureComponent {
  getIconById(id) {
    const Comp = icons[id] ? icons[id](React, filterReactProps) : IconNotFound
    return <Comp />
  }

  render() {
    const { id, ...props } = this.props

    return (
      <div {...style.icon(props)} {...filterReactProps(props)}>
        {this.props.children || this.getIconById(id)}
      </div>
    )
  }
}

Icon.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(vars.colors)),
  id: PropTypes.oneOf(Object.values(vars.ids)),
  size: PropTypes.oneOf(Object.values(vars.sizes))
}

Icon.defaultProps = {
  size: vars.sizes.medium
}

Icon.colors = vars.colors
Icon.ids = vars.ids
Icon.sizes = vars.sizes

export const ids = vars.ids
export const sizes = vars.sizes
export const colors = vars.colors

export default Icon
