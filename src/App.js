import React, { Component } from 'react';
import randomColor from 'randomcolor';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default class App extends Component {
	state = {
		quotes: [
			{
				quote: 'Every child is an artist. The problem is how to remain an artist once he grows up.',
				author: 'Pablo Picasso'
			}
		],
		index: 0
	};

	componentDidMount() {
		const API =
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
		fetch(API)
			.then((res) => res.json())
			.then((res) => {
				this.setState(
					{
						quotes: res.quotes
					},
					this.getRandomIndex
				);
			});
	}

	getRandomIndex = () => {
		const { quotes } = this.state;
		if (quotes.length > 0) {
			const index = Math.floor(Math.random() * quotes.length);
			this.setState({
				index
			});
		}
	};
	render() {
		const color = randomColor();
		const { quotes, index } = this.state;
		const quote = quotes[index];
		const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.quote}- ${quote.author}`;
		return (
			<div
				className='wrapper d-flex flex-column justify-content-center vh-100 align-items-center text-align-center'
				style={{ backgroundColor: color }}>
				<div className='row justify-content-center'>
					<div
						className='col-8 box d-flex flex-column p-4 rounded'
						id='quote-box'
						style={{ backgroundColor: 'white' }}>
						<i className='fas fa-quote-left fa-1.5x pr-2' style={{ color: color, opacity:0.7 }}></i>
						{quote && (
							<div className='mb-4 pl-4'>
								<h5 id='text' style={{ color: color }}>
									{' '}
									{'  '} {quote.quote}
								</h5>
								<cite id='author' className='d-block text-right' style={{ color: color }}>
									{' '}
									-{quote.author}{' '}
								</cite>
							</div>
						)}
						<div className='d-flex justify-content-between'>
							<a
								id='tweet-quote'
								className='btn btn-outline-light'
								// eslint-disable-next-line react/jsx-no-target-blank
								target='_blank'
								href={tweetUrl}
								style={{ backgroundColor: color }}>
								<i className='fab fa-twitter'></i>
							</a>
							<button
								style={{ backgroundColor: color }}
								className='btn btn-outline-light'
								onClick={this.getRandomIndex}
								id='new-quote'>
								<i className='fas fa-random'></i> Get Quote
							</button>
						</div>
					</div>
				</div>
				<div className='footer' style={{ color: 'white' }}>
					{' '}
					Made with <i className='fas fa-heart'></i> by{' '}
					<a style={{ color: 'white' }} href='https://codepen.io/NirvanaCore/'>
						Nirvana Core
					</a>
				</div>
			</div>
		);
	}
}
