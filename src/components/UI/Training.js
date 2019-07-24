import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, CardItem, Button } from 'native-base';
import AppAsyncStorage from '../common/AppAsyncStorage';

class Training extends Component {
    //nuevo
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Repaso'
        }

    };

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            cards: []
        }
        this.loadCards();
    }

    async loadCards() {
        let mazo = JSON.parse(await AppAsyncStorage.retrieveData("cards"))
        setTimeout(() => {
            this.setState({
                cards: mazo != null ? mazo : []
            })
        }, 5000);
    }

    render() {
        if (this.state.cards.length == 0)
            return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text>Cargando mazo...</Text>
            </View>)
        return (<View style={styles.container}>
            <Card>
                <CardItem>
                    <Text style={{ fontSize: 30 }}>
                        {this.state.cards[this.state.currentIndex].value}
                    </Text>
                </CardItem>
            </Card>
            <Button
                style={{ alignSelf: 'center', padding: 5, backgroundColor: '#07889b' }}
                onPress={() => this.setState({
                    currentIndex: this.state.currentIndex + 1
                })}
                disabled={
                    this.state.currentIndex == this.state.cards.length - 1
                }
            >
                <Text style={{ color: 'white' }}>Siguiente</Text>

            </Button>
        </View>);
    }
}

export default Training;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});