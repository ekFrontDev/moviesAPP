import React from 'react'

// eslint-disable-next-line no-unused-vars
class ApiMovies extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  sessionID = sessionStorage.getItem('guest_session_id')

  api = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US'

  apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new'

  apiGenresURL = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

  apiKey = '99d4aae98a1a254e5cf7fa9fa564dfff'

  tokenBearer =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQ0YWFlOThhMWEyNTRlNWNmN2ZhOWZhNTY0ZGZmZiIsIm5iZiI6MTczODU2NjEzMi45NDksInN1YiI6IjY3YTA2OWY0MDJhNzRkYzczZjk1NzQzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.imMYnqz0Krrsb4rr-ujYTZTd36HYgP-FxVcscrXBStg'

  // eslint-disable-next-line object-curly-newline
  options = {
    method: 'GET',
    // eslint-disable-next-line object-curly-newline
    headers: {
      accept: 'application/json',
      Authorization: this.tokenBearer,
      // eslint-disable-next-line object-curly-newline
    },
    // eslint-disable-next-line object-curly-newline
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  async findMovie(url) {
    try {
      const res = await fetch(`${this.api}&query=${url}`, this.options)

      if (!res.ok) {
        throw new Error(`Could not fetch ${this.api}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  getAllMovies(url) {
    this.findMovie(url).then((body) => {
      const array = body.results
      return array
    })
  }

  async getMoviePage(text, page) {
    try {
      const res = await fetch(`${this.api}&query=${text}&page=${page}`, this.options)

      if (!res.ok) {
        throw new Error(`Could not fetch ${this.api}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  async getMovieListPage(page) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=&page=${page}`,
        this.options
      )

      if (!res.ok) {
        throw new Error(`Could not fetch ${this.api}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  async createGuestSession() {
    try {
      const res = await fetch(this.apiGuestSession, this.options)
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.apiGuestSession}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  async getGenresID() {
    try {
      const res = await fetch(this.apiGenresURL, this.options)
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.apiGenresURL}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  async postRate(movieID, value) {
    // eslint-disable-next-line object-curly-newline
    if (value < 1) {
      return this.deleteRate(movieID)
    }
    // eslint-disable-next-line object-curly-newline
    const optionsPost = {
      method: 'POST',
      // eslint-disable-next-line object-curly-newline
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.tokenBearer,
        // eslint-disable-next-line object-curly-newline
      },
      body: `{"value":${value}}`,
      // eslint-disable-next-line object-curly-newline
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${this.sessionID}`,
        optionsPost
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${this.sessionID}, recieved ${res.status}`
        )
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getRate() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/guest_session/${this.sessionID}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
        this.options
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://api.themoviedb.org/3/guest_session/${this.sessionID}/rated/movies?language=en-US&page=1&sort_by=created_at.asc, recieved ${res.status}`
        )
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }

  async deleteRate(movieID) {
    try {
      // eslint-disable-next-line object-curly-newline
      const optionsPost = {
        method: 'DELETE',
        // eslint-disable-next-line object-curly-newline
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: this.tokenBearer,
          // eslint-disable-next-line object-curly-newline
        },
        // eslint-disable-next-line object-curly-newline
      }
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/rating`, optionsPost)
      if (!res.ok) {
        throw new Error(`Could not fetch https://api.themoviedb.org/3/movie/${movieID}/rating, recieved ${res.status}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getMovieList(page = 1) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        this.options
      )
      if (!res.ok) {
        throw new Error(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc, recieved ${res.status}`
        )
      }
      return res.json()
    } catch (err) {
      return console.log(err)
    }
  }
}

export default ApiMovies
