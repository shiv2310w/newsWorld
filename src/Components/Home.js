import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import HomeHeader from './HomeHeader';
import NavBar from './NavBar';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            articles: null,
            page: 1,
            loading: false,
        }
    }

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
        header: PropTypes.bool
    }

    async componentDidMount() {
        this.dataFetch();
    }

    dataFetch = async (pgno = 1) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=241a4419070d48e28ad72168354095aa&page=${pgno}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({
            articles: jsonData.articles,
            totalArticles:jsonData.totalResults,
            loading: false,
        })
    }

    handlePrevPage = () => {
        window.scrollTo(0, 0);
        this.setState({ loading: true });
        this.dataFetch(this.state.page - 1);
        this.setState({
            page: this.state.page - 1,
            loading: false,

        })
    }
    handleNextPage = () => {
        window.scrollTo(0, 0);
        this.setState({ loading: true });
        this.setState({
            page: this.state.page + 1,
            loading: false,
        })
    }

    // clickScreen = () => {
    //     document.getElementById("sideBar").style.left = '-20rem';
    //     <NavBar s={'-20rem'}/>
    // }
    render() {
        return (
            <>
                {/* <div className="container" onClick={!this.state.loading ? this.clickScreen:()=>console.log('fetching data')}> */}
                <div className="container">
                    <div className="df loading">
                        {this.state.loading && <Spinner />}
                    </div>
                    {this.props.header && !this.state.loading && <HomeHeader />}
                    <div className='df main-news-box'>
                        {
                            this.state.articles ?
                                !this.state.loading && this.state.articles.map((element) => {
                                    if (element.url !== null && element.description !== null && element.urlToImage !== null) {
                                        return <div key={element.url}>
                                            <NewsItems title={element.title} desc={element.description.slice(0, 70)} url={element.url} urlImg={element.urlToImage} pub={element.source.name} pubTime={element.publishedAt} />
                                        </div>
                                    } else {
                                        return ''
                                    }
                                }) : ""
                        }
                    </div>
                    {!this.state.loading &&
                        <div className="footer df btn">
                            <button disabled={this.state.page <= 1} onClick={this.handlePrevPage}>&larr; Previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNextPage}>Next &rarr;</button>
                        </div>
                    }
                </div>
            </>
        )
    }
}