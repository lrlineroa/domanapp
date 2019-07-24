import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Button,Right,Item,Label,Input } from 'native-base';
import AppAsyncStorage from '../common/AppAsyncStorage';
class AddACard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardValue: '',
            cards: []
        }
        this.loadCards();
    }
  
    async loadCards() {
        console.log('cargando las cartas')
        let mazo = JSON.parse(await AppAsyncStorage.retrieveData("cards"))
        this.setState({
            cards: mazo != null ? mazo : []
        })
    }
   

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Formulario'
        }

    };


    handleInputText(value) {
        this.setState({
            cardValue: value
        })
    }

    handleSubmit() {
        if(this.state.cardValue==''){
            alert('tienes que ingresar algo')
            return
        }
        let cardsCopy = this.state.cards.slice()
        let card = {
            value: this.state.cardValue
        }
        cardsCopy.push(card)
        this.saveCard(cardsCopy)

    }
    async saveCard(cardsCopy) {
        await AppAsyncStorage.storeData("cards", JSON.stringify(cardsCopy))
        alert('Tarjeta Ingresada')
        this.setState({
            cardValue: '',
            cards: cardsCopy
        })
    }

    goToTraining() {
        const { navigate } = this.props.navigation;
        navigate('Training')
    }
    goToDeck(){
        const { navigate } = this.props.navigation;
        navigate('Deck')
    }

    render() {
        return (
            <View style={[styles.container, { padding: 10 }]}>
                <Card>
                    <CardItem header>
                        <Text>
                            Añade una tarjeta
                        </Text>
                        <Right>
                            <Text>
                                Cartas en mazo: {this.state.cards.length}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Front</Label>
                            <Input
                                value={this.state.cardValue}
                                onChangeText={
                                    (text) => {
                                        this.handleInputText(text)
                                    }
                                }

                            />
                        </Item>
                    </CardItem>
                    <CardItem footer>
                        <Button
                            onPress={() => this.handleSubmit()}
                            block
                            light
                        >
                            <Text>
                                Añadir
                            </Text>
                        </Button>
                    </CardItem>
                </Card>

                <Button block
                    style={{ backgroundColor: '#07889b',marginTop:10 }}
                    disabled={this.state.cards.length == 0}
                    onPress={() => this.goToTraining()}
                >
                    <Text style={{ color: 'white' }}>
                        Entrenamiento
                    </Text>
                </Button>
                <Button block
                    style={{ backgroundColor: '#07889b',marginTop:10 }}
                    disabled={this.state.cards.length == 0}
                    onPress={() => this.goToDeck()}
                >
                    <Text style={{ color: 'white' }}>
                        Mi mazo
                    </Text>
                </Button>

            </View>


        );
    }
}

export default AddACard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});