import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import HomeHeader from './HomeHeader';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalArticles: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsWorld`
    }

    capitalizeFirstLetter = (str) => { return str.charAt(0).toUpperCase() + str.slice(1) }

    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general',
        header: true
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        header: PropTypes.bool,
        apikey:PropTypes.string
    }

    async componentDidMount() {
        this.dataFetch();
    }

    dataFetch = async (pgno = 1) => {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${pgno}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40)
        let jsonData = await data.json();
        this.setState({
            articles: jsonData.articles,
            totalArticles: jsonData.totalResults,
            page: this.state.page + 1,
            loading: false,
        })
        this.props.setProgress(100)
    }

    // ---------************** This is Next and Previous Button function ********************-------------
    // handlePrevPage = () => {
    //     window.scrollTo(0, 0);
    //     this.dataFetch(this.state.page - 1);
    //     this.setState({page: this.state.page - 1})
    // }
    // handleNextPage = () => {
    //     window.scrollTo(0, 0);
    //     this.setState({page: this.state.page + 1})
    //     this.dataFetch(this.state.page + 1);
    // }
    // ---------***************************************---------------------------------------------

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${(this.state.totalArticles - this.state.articles.length) === (this.state.totalArticles % this.props.pageSize) ? this.props.pageSize - (this.props.pageSize - this.state.totalArticles % this.props.pageSize):this.props.pageSize}`;
        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({
            articles: this.state.articles.concat(jsonData.articles),
            totalArticles: jsonData.totalResults,
        })
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="df loading">
                        {this.state.loading && <Spinner />}
                    </div>
                    {this.props.header && !this.state.loading && <HomeHeader />}
                    {!this.props.header && !this.state.loading && <div className="header">Top News Headlines - {this.capitalizeFirstLetter(this.props.category)}</div>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalArticles}
                        loader={<div style={{ textAlign: 'center', margin: '2rem 0rem' }}>{<Spinner />}</div>}
                    >
                        <div className='df main-news-box'>
                            {
                                this.state.articles ?
                                    !this.state.loading && this.state.articles.map((element) => {
                                        if (element.url !== null && element.description !== null && element.urlToImage !== null) {
                                            return <div key={element.url}>
                                                <NewsItems key={element.title} title={element.title.slice(0, 60)} desc={element.description.slice(0, 110)} url={element.url} urlImg={element.urlToImage} pub={element.source.name} pubTime={element.publishedAt} />
                                            </div>
                                        } else {
                                            return ''
                                        }
                                    }) : ""
                            }
                        </div>
                    {!this.state.loading && <div className="uparrow btn" onClick={() => {window.scrollTo(0, 0) }}><button>&uarr; Go to Top</button></div>}
                    </InfiniteScroll>
                    {/* ---------***************************************--------------------------------------------- */}
                    {/* {!this.state.loading &&
                        <div className="footer df btn">
                            <button disabled={this.state.page <= 1} onClick={this.handlePrevPage}>&larr; Previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNextPage}>Next &rarr;</button>
                        </div>
                    } */}
                </div>
            </>
        )
    }
}