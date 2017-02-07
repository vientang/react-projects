import React, { Component } from 'react';

class Places extends Component {
	render() {
		const getMiles = (i) => {
		  return i*0.000621371192;
		}
		const list = this.props.venues.map((venue) => {			
			return [venue.name, venue.location.distance]
		})		
		const sortedList = list.sort((a, b) => {	
			return a[1] - b[1];	
		})
		const listInOrder = sortedList.map((venue, i) => {	
			let milesAway = Number((getMiles(venue[1])).toFixed(1))
			return <li key={i}>{venue[0]} is only {milesAway} miles away</li>
		})
		
		return (
			<div>
				<ul>
					{ listInOrder }
				</ul>
			</div>
		)
	}
}

export default Places