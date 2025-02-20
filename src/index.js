/* eslint-disable object-curly-newline */
import React from 'react'
// eslint-disable-next-line import/order
import { createRoot } from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
// eslint-disable-next-line no-unused-vars
import { Alert, Input, Tabs, Spin } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
// import { debounce } from 'lodash.debounce'

import './style.css'

// eslint-disable-next-line import/no-unresolved, import/extensions
import ApiMovies from './api-movies'
import CardList from './card-list'
import CardListRated from './card-list-rated/card-list-rated'
import { Provider } from './context/context'
import TabsItem from './tabs'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

export default class App extends React.Component {
  apiMovies = new ApiMovies()

  constructor() {
    super()

    this.onTextChange = (evt) => {
      const { value } = evt.target
      if (value.length === 0) {
        this.setState({ label: '' })
      }

      this.setState({ label: evt.target.value })
    }

    this.createSessionID = (id) => {
      this.setState({ sessionID: id })
    }

    this.changeKeyTab = (keyTab) => {
      this.setState({ keyTab })
    }

    // eslint-disable-next-line consistent-return
    this.saveRatedList = (ratedMovies) => {
      this.setState({ arrayRated: ratedMovies })
    }

    this.changeArray = (array, totalPages) => {
      this.setState({ array, totalPages })
    }
  }

  state = { label: '', array: [], totalPages: 0, arrayRated: [], loading: true, genres: [], sessionID: '', keyTab: '1' }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    this.apiMovies
      .createGuestSession()
      .then((res) => {
        window.sessionStorage.setItem('guest_session_id', res.guest_session_id)
        this.createSessionID(res.guest_session_id)
      })
      .catch((err) => console.log(err))

    this.apiMovies
      .getGenresID()
      .then((genres) => {
        const genresArray = genres.genres
        this.setState({ genres: genresArray })
      })
      .catch((err) => console.log(err))

    this.apiMovies
      .getMovieList()
      .then((res) => {
        this.setState({ array: res.results, totalPages: res.total_pages })
      })
      .catch((err) => console.log(err))
  }

  //   componentDidUpdate(prevState) {
  //     if (this.state.label !== prevState.label) {
  //       this.onTextChange(this.state.label)
  //     }
  //   }

  render() {
    const { label, array, totalPages, arrayRated, keyTab } = this.state
    const cardList =
      keyTab === '1' ? (
        <CardList label={label} array={array} totalPages={totalPages} onchangeArray={this.changeArray} />
      ) : null
    const cardListRated = keyTab === '2' ? <CardListRated label={label} array={arrayRated} /> : null
    const inputVisible =
      keyTab === '2' ? null : <Input placeholder="Type to search..." autoFocus onChange={this.onTextChange} />
    //  const renderSpin = loading ? <Spin /> : null
    //  const renderCardList = !loading ? <CardList label={label} array={array} /> : null
    return (
      <div className="wrapper">
        <Online>
          <Provider value={this.state}>
            {/* <Tabs defaultActiveKey="1" items={this.items} /> */}
            <TabsItem onChangeKeyTab={this.changeKeyTab} onSaveRatedList={this.saveRatedList} />
            {inputVisible}
            {/* {renderSpin} */}
            {/* {renderCardList} */}
            {/* <CardList label={label} array={arrayTabs} /> */}
            {cardList}
            {cardListRated}
            {/* <Pagin label={label} onChange={this.changePage} /> */}
          </Provider>
        </Online>
        <Offline>
          <Alert
            message="Warning"
            description="You're offline right now. Check your connection and reload your web-page."
            type="warning"
            showIcon
            closable
          />
        </Offline>
      </div>
    )
  }
}

root.render(<App />)
