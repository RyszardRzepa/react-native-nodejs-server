/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import { NetworkInfo } from 'react-native-network-info';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
const EXAMPLE_ENDPOINT = "http://192.168.1.154:3000/url";
const EXAMPLE_ENDPOINTPOST = "http://192.168.1.154:3000/url/data";
export default class App extends Component<Props> {
  state = {
    ipAdress: '',
    ssid: '',
    result: null,
    postData: null,
  }

  componentDidMount() {
    NetworkInfo.getIPAddress(ip => {
      this.setState({ ipAdress: ip })
    });

    NetworkInfo.getSSID(ssid => {
      this.setState({ ssid: ssid })
    });
    nodejs.start("main.js");
    nodejs.channel.addListener(
      "message",
      (msg) => {
        alert("From node: " + msg);
      },
      this
    );
  }

  _fetchExampleAsync = async () => {
    try {
      let response = await fetch(EXAMPLE_ENDPOINT);
      let result = await response.json();
      this.setState({ result });
    } catch (e) {
      this.setState({ result: e });
    }
  };


  postData = async () => {
    const data = {
      test: 1,
      test2: 2
    }

    try {
      let response = await fetch(EXAMPLE_ENDPOINT, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      let result = await response.json();
      this.setState({ postData: result });
    } catch (e) {
      this.setState({ result: e });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {
            this.state.result ? (
              <Text>{JSON.stringify(this.state.result)}</Text>
            ) : (
              <Text>Trying to get response from {EXAMPLE_ENDPOINT}</Text>
            )
          }
          <Text>Post data: {this.state.postData}</Text>
        </View>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Message Node"
                onPress={() => this._fetchExampleAsync()}
        />

        <Button title="Post to Node"
                onPress={() => this.postData()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
