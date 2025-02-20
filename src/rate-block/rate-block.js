import React from 'react'

import './rate-block.css'

class RateBlock extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { vote } = this.props

    let clazz = 'rate-block'

    if (vote >= 0 && vote < 3) {
      clazz += ' rate-block-border-red'
    } else if (vote >= 3 && vote < 5) {
      clazz += ' rate-block-border-orange'
    } else if (vote >= 5 && vote < 7) {
      clazz += ' rate-block-border-yellow'
    } else {
      clazz += ' rate-block-border-green'
    }

    return (
      <div className={clazz}>
        <span className="rate-block-text">{vote}</span>
      </div>
    )
  }
}

export default RateBlock
