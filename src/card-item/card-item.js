/* eslint-disable no-unused-vars */
import React from 'react'

import './card-item.css'
import ApiMovies from '../api-movies'
import notAvailable from '../image/poster.jpeg'
import RateItem from '../rate-item'
import RateBlock from '../rate-block'
import { Consumer } from '../context/context'

class CardItem extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  apiMovies = new ApiMovies()

  state = { name: null, image: null, date: null, genre: [], description: null }

  constructor() {
    super()
    this.descriptionLength = (txt) => {
      const array = txt.split(' ')
      if (array.length > 30) {
        return `${array.slice(0, 30).join(' ')} ...`
      }
      return txt
    }
  }

  render() {
    const { id, name, image, date, genreID, description, vote, defaultRating } = this.props

    const imageAvailable = image ? `https://image.tmdb.org/t/p/w500/${image}` : notAvailable

    return (
      <Consumer>
        {({ genres }) => {
          const genreItemFirst = genres.filter((el) => el.id === genreID[0])
          const genreNameFirst =
            genreID[0] !== undefined && genreItemFirst[0].name !== undefined ? (
              <div className="genre-movie-item">{genreItemFirst[0].name}</div>
            ) : null

          const genreItemSecond = genres.filter((el) => el.id === genreID[1])
          const genreNameSecond =
            genreID[1] !== undefined && genreItemSecond[0].name !== undefined ? (
              <div className="genre-movie-item">{genreItemSecond[0].name}</div>
            ) : null

          return (
            <div className="card-item">
              <div className="image-item">
                <img src={imageAvailable} alt={name} />
              </div>
              <div className="about-movie">
                <p className="name-movie">{name}</p>
                <RateBlock vote={vote} />
              </div>
              <div>
                <p className="release-date">{date}</p>
              </div>

              <div className="genre-movie">
                {genreNameFirst}
                {genreNameSecond}
              </div>
              <div className="description-movie">
                <p>{this.descriptionLength(description)}</p>
              </div>
              <RateItem id={id} defaultRating={defaultRating} />
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default CardItem
