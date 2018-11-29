import buttonCss from '@pluralsight/ps-design-system-button/css'
import * as buttonVars from '@pluralsight/ps-design-system-button/vars'
import * as glamor from 'glamor'
import React from 'react'

const styles = {
  button: _ =>
    glamor.css(
      buttonCss['.psds-button'],
      buttonCss[`.psds-button--size-${buttonVars.sizes.medium}`],
      buttonCss[`.psds-button--appearance-${buttonVars.appearances.primary}`],
      {
        ':hover': buttonCss['.psds-button:hover'],
        ':focus': buttonCss['.psds-button:focus'],
        ':focus:before': buttonCss['.psds-button:focus:before'],
        ':focus:after': buttonCss['.psds-button:focus:after'],
        display: 'inline-flex',
        alignItems: 'center'
      }
    )
}

export default props => <a {...styles.button(props)} {...props} />
