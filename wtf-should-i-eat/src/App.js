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
			location: null,
			venues: [],
			markers: null			
		}
		this.getCurrentLocation = this.getCurrentLocation.bind(this)
		this.setCurrentLocation = this.setCurrentLocation.bind(this)
		// this.renderMap = this.renderMap.bind(this)
	}

	// renderMap() {		
	// 	const markers = [
	// 		{
	// 			location: {
	// 				lat: this.state.location.lat,
	// 				lng: this.state.location.lng
	// 			}
	// 		}
	// 	]			
	// }

	setCurrentLocation(currentLocation) {
		this.setState({
			location: currentLocation,
			markers: [
				{
					location: {
						lat: currentLocation.lat,
						lng: currentLocation.lng
					}
				}
			]
		})
		console.log("State is now set to:", this.state)
	}

	getCurrentLocation() {
		let self = this;	
		navigator.geolocation.getCurrentPosition(function(position) {					
			let updatedLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
			self.setCurrentLocation(updatedLocation)			
		})
	}

	componentDidMount() {
		this.getCurrentLocation()
		
		
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
		return (
			<div className="main-container">
				<h1>wtf should I eat</h1>
				<div className="inner-container">
					<div className="map">
						{this.state.location && 
							<Map center={this.state.location} markers={this.state.markers}/>
						}
					</div>
					<Places venues={this.state.venues} />
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))