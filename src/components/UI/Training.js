import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Card, CardItem, Button } from 'native-base';

class Training extends Component {
    //nuevo
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Repaso'
        }

    };
    //nuevo
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,//<--nuevo
            cards: props.navigation.getParam('cards')//<--nuevo
        }
    }
    render() {
        console.log('cards tra : ' + JSON.stringify(this.state.cards))//<--para testear
        return (<View style={styles.container}>
            <Card>
                <CardItem>
                    <Text style={{ fontSize: 30 }}>
                        {this.state.cards[this.state.currentIndex].value}
                    </Text>
                </CardItem>
            </Card>
            <Button
                onPress={() => this.setState({
                    currentIndex: this.state.currentIndex + 1
                })}
                disabled={
                    this.state.currentIndex == this.state.cards.length - 1
                }
            >
                <Text>Siguiente</Text>

            </Button>
        </View>);
    }
}

export default Training;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });