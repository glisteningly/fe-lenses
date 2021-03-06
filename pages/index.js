import React from 'react'
import keep from '../now-keep'
import HtmlHead from '../components/html-head'
import LensRow from '../components/lens-row'

const db = require('../db.json')
RegExp.escape = RegExp.escape || function (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      search: ''
    }
    this.onSearchInput = this.onSearchInput.bind(this)
  }

  onSearchInput (e) {
    const words = e.target.value
    this.setState({
      search: words,
      searchReg: new RegExp(RegExp.escape(words).replace(/\s+/, '|'), 'i')
    })
  }

  render () {
    keep(24)

    const noSearch = this.state.search === ''
    const lenses = noSearch ? db.lenses : db.lenses.filter(lens => {
      return this.state.searchReg.test(lens.name)
    })

    return <div>
      <HtmlHead />
      <header>
        <h1 style={styles.h1}>
          <a href='https://github.com/amio/fe-lenses' className='github-link'>
            <svg className='github-icon' fill='#FFF' version='1.1' viewBox='0 0 16 16'>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
          </a>
          Full-frame E-mount lenses catalog
        </h1>
        <label className='search-bar'>
          <input className='search-input'
            placeholder='Search'
            value={this.state.search}
            onInput={this.onSearchInput} />
        </label>
      </header>
      <div className='lens-chart'>
        {
          lenses.map(lens => {
            return <LensRow {...lens} key={lens.model} />
          })
        }
      </div>
      <footer>
        mail to <a href='mailto:amio.cn@gmail.com'>amio.cn@gmail.com</a>
      </footer>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .github-link {
          display: inline-block;
          height: 1.1em;
          width: 1.1em;
          float: right;
          opacity: 0.7;
          margin-left: 1em;
        }
        .github-link:hover {
          opacity: 1;
        }
        .search-bar {
          display: block;
          background-color: #E52;
        }
        .search-input {
          background: transparent;
          box-sizing: border-box;
          border: none;
          width: 100%;
          color: #FFF;
          font-size: 1rem;
          line-height: 1.8em;
          padding: 0.5em 1em;
        }
        .search-input::placeholder {
          color: rgba(255,255,255, 0.6);
        }
        .search-input:focus {
          background-color: rgba(191, 54, 12, 0.3);
          box-shadow: 0 0 8px #BF360C inset;
          outline: none;
        }
        footer {
          text-align: center;
          padding: 2em;
          border-top: 1px solid #EEE;
          color: #AAA;
        }
        footer a {
          color: #AAA;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 1.5em;
          }
          .github-link {
            width: 2em;
            height: 2em;
          }
        }
      `}</style>
    </div>
  }
}

const styles = {
  h1: {
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    fontFamily: 'Palatino, Georgia, serif',
    margin: 0,
    padding: '0.7em',
    background: '#333',
    color: '#EEE'
  }
}
