// eslint-disable-next-line import/order
import React from 'react'

import './tabs.css'

import { Tabs } from 'antd'

import ApiMovies from '../api-movies'

class TabsItem extends React.Component {
  apiMovies = new ApiMovies()

  items = [
    { key: '1', label: 'Search' },
    { key: '2', label: 'Rated' },
  ]

  // eslint-disable-next-line consistent-return
  getRatedFilm = (tabKey) => {
    const { onChangeKeyTab, onSaveRatedList } = this.props
    if (tabKey === '2') {
      this.apiMovies
        .getRate()
        // eslint-disable-next-line consistent-return
        .then((res) => {
          if (res.results === undefined) {
            return null
          }
          onSaveRatedList(res.results)
        })
        .catch((err) => err)
      return onChangeKeyTab(tabKey)
    }
    if (tabKey === '1') {
      return onChangeKeyTab(tabKey)
    }
  }

  render() {
    return (
      <Tabs
        defaultActiveKey="1"
        items={this.items}
        onTabClick={(tabKey) => {
          this.getRatedFilm(tabKey)
        }}
      />
    )
  }
}

export default TabsItem
