import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import NewsItems from './NewsItems';

export default class LHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      loading: true,
      page: 0,
      totalArticles: 0,
      prevPage: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsWorld`
    this.notpage = 'Page Not Avialable'
    this.pageList = []
  }

  capitalizeFirstLetter = (str) => { return str.charAt(0).toUpperCase() + str.slice(1); }

  static defaultProps = {
    pageSize: 10,
    category: 'top',
    header: false
    // business
    // crime
    // domestic
    // education
    // entertainment
    // environment
    // food
    // health
    // lifestyle
    // other
    // politics
    // science
    // sports
    // technology
    // top
    // tourism
    // world
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    header: PropTypes.bool
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_368561fcb5a6ee1fa488588ba438a2882bcb3&q=india&category=${this.props.category}`;
    this.setState({ loading: true })
    let lData = await fetch(url);
    var liveData = await lData.json();
    if (liveData.status !== 'error') {
      this.setState({
        articles: liveData.results,
        totalArticles: liveData.totalResults,
        loading: false
      })
      this.pageList.push(liveData.nextPage)
    } else {
      this.setState({
        articles: null,
        page: 0,
        totalArticles: 0,
        loading: false
      })
    }
    if (this.pageList.length === 2) {
      this.pageList.pop();
    }
  }

  dataFetch = async (page) => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_368561fcb5a6ee1fa488588ba438a2882bcb3&q=india&page=${page}&category=${this.props.category}`;
    let lData = await fetch(url);
    var liveData = await lData.json();
    if (liveData.status !== 'error') {
      this.pageList.push(liveData.nextPage)
      this.setState({
        articles: liveData.results,
        totalArticles: liveData.totalResults
      })
    } else {
      this.setState({
        articles: null,
        page: 0,
        totalArticles: 0
      })
    }
  }

  handleNextPage = () => {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    this.dataFetch(this.pageList[this.pageList.length - 1]);
    this.setState({ loading: false })
  }

  handlePrevPage = () => {
    window.scrollTo(0, 0);
    this.pageList.pop();
    this.pageList.pop();
    this.setState({ loading: true, })
    if (this.pageList.length === 0) {
      this.fetch()
    }
    else {
      this.dataFetch(this.pageList[this.pageList.length - 1]);
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="df loading">
            {this.state.loading && this.state.articles && <Spinner />}
          </div>
          <div className='df main-news-box' id='main-news'>
            {
              this.state.articles ?
                !this.state.loading && this.state.articles.map((element) => {
                  if (element.url !== null && element.description !== null && element.image_url !== null) {
                    return <div key={element.url}>
                      <NewsItems title={element.title} desc={element.description.slice(0, 120)} url={element.link} urlImg={element.image_url} pub={element.source_id} pubTime={element.pubDate} />
                    </div>
                  } else {
                    return ''
                  }
                }) : <div className='not-found'>{this.state.loading ? <Spinner /> : this.notpage}</div>
            }
          </div>
          {!this.state.loading &&
            <div className="footer df btn">
              <button disabled={this.pageList.length < 2} onClick={this.handlePrevPage}>&larr; Previous</button>
              <button disabled={this.pageList.length + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
          }
        </div>
      </>
    )
  }
}
