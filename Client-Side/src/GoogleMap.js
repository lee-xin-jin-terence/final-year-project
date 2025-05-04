import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {



  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

	//prevents component from refreshing
  shouldComponentUpdate(nextProps) {

  return false;
	}

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };


  render(arrayOfCoordinates) {
    const mapStyles = {
      width: "35em",
      height: "35em",
    };
	

  console.log(this.props.getHiveLocation);
	
    return (
      <Map
        google={this.props.google}
        zoom={21}
        style={mapStyles}
        initialCenter={{ lat: 1.278806575186262, lng: 103.79849654389926 }}>
          {/* {<Marker position={{lat: this.props.locations["lat"], lng: this.props.locations["lng"]}} label={{color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Golden Bee Apiary Office	' }}/> } */}
		<Marker position={{ lat:1.278806575186262, lng: 103.79849654389926}}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Golden Bee Apiary Office	' }}/>
		
		<Marker position={{ lat:1.2788130779261575, lng: 103.79836142762014}}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Tool Shed	' }}/>
		
		<Marker position={{ lat:1.2788083389795266, lng: 103.79862950380083}}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Toilet	' }}/>
		
		<Marker position={{ lat:1.2788669098572614, lng: 103.79840937210628}}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-1' }}/>
				
		<Marker position={{ lat: 1.278862887545909, lng: 103.79849754972764}}   
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-2' }}/>
				
		<Marker position={{ lat: 1.2788648987015852, lng: 103.79857466323682}} 
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-3' }}/>
				
		<Marker position={{ lat: 1.2787485868622432, lng: 103.79858036293098}}   
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-4' }}/>
				
		<Marker position={{ lat: 1.2787475812843605, lng: 103.79849989666053 }}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-5' }}/>
				
		<Marker position={{ lat: 1.2787475812843605, lng: 103.79841205431529 }}  
				label={ {color: '#000000', fontWeight: 'bold', fontSize: '18px', text: 'Hive-6' }}/>
      </Map>
    );
  }
}

export default GoogleApiWrapper({

  apiKey: "[redacted]"
})(MapContainer);
