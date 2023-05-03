import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, ScrollView, Text, Button, Image} from "react-native"
import axios from "axios";
import moment from 'moment';



class EventDetails extends React.Component{

  render(){
  return(
    <View style={{
      height: 200,
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginRight: 20,
      padding: 10,
      zIndex: 2
    }}>
      <Text style={{fontWeight: "bold", fontSize: 18}}>
        {this.props.title}
      </Text>
      <Text style={{ fontSize: 16 }}>
        {this.props.time}
      </Text>
    </View>
    );
      
  }
}

const Social = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "JYWpnGYOWaSd1NVcM3sheVJAk14sYUVX5bTCMAFs";
        const radius = "100km";
        let location = "Dallas";
        const start = moment().format("YYYY-MM-DDTHH:mm:ssZ");
        const end = moment().add(7, "days").format("YYYY-MM-DDTHH:mm:ssZ");
      
        axios
          .get(`https://api.predicthq.com/v1/events/`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Accept": "application/json",
            },
            params: {
              within: `${radius}@32.9857,-96.7502`,
              "start.gte": start,
              "end.lte": end,
            },
          })
          .then((response) => {
            const events = response.data.results.map((event) => ({
              id: event.id,
              title: event.title,
              image: event.category ? event.category.image : null,
              location: event.location ? event.location : "Online",
              time: moment(event.start).format("MMM D, YYYY h:mm A"),
              latitude: event.location ? event.location[1] : null,
              longitude: event.location ? event.location[0] : null
            }));
            setEvents(events);
            setIsLoading(false);

          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
  });

  if(isLoading){
    return (
      <View style={{
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center"
        }}>
        <Text style={{
          fontSize: 45,
          fontWeight: "bold"
        }}>Loading events...</Text>
      </View>
    );
  }else{
    return(
      <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 32.9857,
        longitude: -96.7502,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    ><Button title="Back" onPress={() => navigation.goBack()}/>
      {events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{ latitude: event.latitude, longitude: event.longitude }}
          title={event.title}
          description={event.location}
        />
      ))}
    </MapView>
    <ScrollView style={styles.details} horizontal>   
      {events.map((event) => (
        <EventDetails
          key={event.id}
          title={event.title}
          location={event.location}
          time={event.time}
          image={event.image}
        />
      ))}
    </ScrollView>
  </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  boldText: {
    fontSize: 25,
    color: "red",
    marginVertical: 16,
    textAlign: "center",
  },
  map: {
    flex: 1,
    heigth: "100%",
    paddingTop: 0
  },
  details: {
    height: 200,
    paddingHorizontal: 10,
    zIndex: 1
  },
  events: {
    heigth: "50%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});

export default Social;