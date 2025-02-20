import React from 'react'
import { Rate, ConfigProvider } from 'antd'

import ApiMovies from '../api-movies'
import { Consumer } from '../context/context'

class RateItem extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  getRateMovie = (evt) => {
    console.log(evt)
  }

  apiMovies = new ApiMovies()

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Consumer>
        {({ keyTab }) => {
          const { id, defaultRating } = this.props
          const rating = keyTab === '2' ? defaultRating : 0
          return (
            <ConfigProvider theme={{ components: { Rate: { starSize: 15 } } }}>
              <Rate
                allowHalf
                defaultValue={rating}
                count={10}
                onChange={(value) => {
                  return this.apiMovies
                    .postRate(id, value)
                    .then(() => {})
                    .catch((err) => console.log(err))
                }}
              />
            </ConfigProvider>
          )
        }}
      </Consumer>
    )
  }
}

export default RateItem
