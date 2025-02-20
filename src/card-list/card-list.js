/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/order
import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies, import/order, no-unused-vars
import { format } from 'date-fns'

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/no-duplicates
import { Spin, Alert } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
// import { Alert } from 'antd'

import './card-list.css'

import CardItem from '../card-item'
import ApiMovies from '../api-movies'
import Pagin from '../pagination'

class CardList extends React.Component {
  apiMovies = new ApiMovies()

  constructor() {
    super()

    this.descriptionLength = (txt) => {
      const array = txt.split(' ')
      if (array.length > 30) {
        return `${array.slice(0, 30).join(' ')} ...`
      }
      return txt
    }

    // eslint-disable-next-line no-unused-vars
    this.onError = (err) => {
      this.setState({ error: true, loading: false })
    }

    this.updateMovies = (txt = '') => {
      this.apiMovies
        .findMovie(txt)
        // eslint-disable-next-line consistent-return
        .then((movie) => {
          const { onchangeArray } = this.props
          const totalPages = movie.total_pages
          const array = movie.results
          // eslint-disable-next-line object-curly-newline
          onchangeArray(array, totalPages)
          this.setState(() => {
            return { loading: false }
          })
        })
        .catch(this.onError)
    }

    this.changePage = (page) => {
      if (!this.props.label) {
        this.apiMovies.getMovieList(page).then((movie) => {
          const { onchangeArray } = this.props
          const totalPages = movie.total_pages
          const array = movie.results
          onchangeArray(array, totalPages)
          //  this.setState(() => {
          //    return { array }
          //  })
        })
      } else {
        this.apiMovies
          .getMoviePage(this.props.label, page)
          .then((movie) => {
            const { onchangeArray } = this.props
            const totalPages = movie.total_pages
            const array = movie.results
            //  this.setState(() => {
            //    return { array }
            //  })
            onchangeArray(array, totalPages)
          })
          .catch(this.onError)
      }
    }

    this.guestSession = () => {
      this.apiMovies
        .createGuestSession()
        .then((movie) => {
          const totalPages = movie.total_pages
          console.log(totalPages)
          const array = movie.results
          console.log(array)
          // eslint-disable-next-line object-curly-newline
          this.setState(() => {
            return { array, totalPages, loading: false }
          })
        })
        .catch(this.onError)
    }

    this.movieList = () => {
      const { array, totalPages } = this.props
      this.setState({ array, totalPages, loading: false })
    }
  }

  // запускается как только компонент зарендерился
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    return this.movieList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.label !== prevProps.label) {
      this.updateMovies(this.props.label)
    }
  }

  state = { array: [], totalPages: 0, loading: true, error: false }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { loading, error } = this.state
    const { array, totalPages } = this.props

    if (array.length === 0) {
      return null
    }

    const elements = array.map((item) => {
      const { title, overview, id } = item
      const image = item.poster_path
      const date = item.release_date ? format(new Date(item.release_date), 'MMMM d, yyyy') : null
      const genre = item.genre_ids
      const vote = item.vote_average.toFixed(1)

      return (
        <CardItem
          key={id}
          id={id}
          name={title}
          image={image}
          date={date}
          genreID={genre}
          description={overview}
          vote={vote}
        />
      )
    })

    const hasData = !(loading || error)
    const errorMessage = error ? <Alert /> : null
    const renderSpin = loading ? <Spin /> : null
    const renderElements = hasData ? elements : null
    const pagination = array.length > 1 ? <Pagin onChange={this.changePage} totalPage={totalPages} /> : null

    return (
      <div className="card-list">
        {errorMessage}
        {renderSpin}
        {renderElements}
        {pagination}
      </div>
    )
  }
}

export default CardList
