import React from 'react'
import { Pagination } from 'antd'

import './pagination.css'

class Pagin extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  // eslint-disable-next-line class-methods-use-this, react/require-render-return
  render() {
    const { onChange, totalPage } = this.props

    // eslint-disable-next-line prettier/prettier
    return (
      <>
        {/* <Pagination defaultCurrent={1} total={500} onChange={onChange} /> */}
        <Pagination showQuickJumper defaultCurrent={1} total={totalPage} onChange={onChange} />
      </>
    )
  }
}

export default Pagin
