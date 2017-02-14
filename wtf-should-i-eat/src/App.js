import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'
import Keys from './apiKeys'
import superagent from 'superagent'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: {
				lat: 37.7749,
				lng: -122.4194
			},
			venues: []
		}
		this.getCurrentLocation = this.getCurrentLocation.bind(this)
	}

	getCurrentLocation() {		
		navigator.geolocation.getCurrentPosition(function(position) {					
			let updatedLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
			console.log("Location coordinates updatedLocation", updatedLocation);	
			return updatedLocation;
		})
	}

	componentDidMount() {
		this.getCurrentLocation()
		// this.setState({location: updatedLocation})
		// console.log("Location coordinates", this.state.location);
		// const url = `https://api.foursquare.com/v2/venues/search?v=20140806&section=food&ll=${this.state.location.lat}%2C${this.state.location.lng}&client_id=${Keys.fsqr.client_id}&client_secret=${Keys.fsqr.client_secret}`
		// superagent		
		// 	.get(url)			
		// 	.query('query=food')
		// 	.set('Accept', 'text/json')
		// 	.end((error, response) => {
		// 		if (error) throw new Error(error)
				

		// 	// localStorage.setItem('data', JSON.stringify())
		// 		const venues = response.body.response.venues
		// 		console.log(response.body.response.venues);
		// 		this.setState({venues: venues})
		// 	})
	}

	render() {
		const markers = [
			{
				location: {
					lat: this.state.location.lat,
					lng: this.state.location.lng
				}
			}
		]
		
		return (
			<div className="main-container">
				<h1>wtf should I eat</h1>
				<div className="inner-container">
					<div className="map">
						<Map center={this.state.location} markers={markers}/>
					</div>
					<Places venues={this.state.venues} />
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))