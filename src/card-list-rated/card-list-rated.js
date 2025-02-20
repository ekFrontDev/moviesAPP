/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/order
import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies, import/order, no-unused-vars
import { format } from 'date-fns'

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/no-duplicates, no-unused-vars
import { Spin, Alert } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
// import { Alert } from 'antd'

import './card-list-rated.css'

import CardItem from '../card-item'
import ApiMovies from '../api-movies'
// import Pagin from '../pagination'

class CardListRated extends React.Component {
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

    this.changePage = (page) => {
      this.apiMovies
        .getMoviePage(this.props.label, page)
        .then((movie) => {
          const array = movie.results
          this.setState(() => {
            return { array }
          })
        })
        .catch(this.onError)
    }

    this.movieList = () => {
      const { array, totalPages } = this.props
      this.setState({ array, totalPages })
    }
  }

  componentDidMount() {
    this.movieList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.array.length !== prevProps.array.length) {
      this.movieList()
    }
  }

  state = { array: [], totalPages: 0, loading: true, error: false }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { array } = this.props

    if (array.length === 0) {
      return (
        <Alert
          message="Информационное сообщение"
          description="Пожалуйста перезагрузите страницу. В данный список не добавлено ни одного фильма."
          type="info"
        />
      )
    }

    const elements = array.map((item) => {
      const { title, overview, id } = item
      const image = item.poster_path
      const date = item.release_date ? format(new Date(item.release_date), 'MMMM d, yyyy') : null
      const genre = item.genre_ids
      const vote = item.vote_average.toFixed(1)
      const { rating } = item

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
          defaultRating={rating}
        />
      )
    })

    return <div className="card-list">{elements}</div>
  }
}

export default CardListRated
