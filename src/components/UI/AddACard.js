import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Button, Item, Label, Input } from 'native-base';
import AppAsyncStorage from '../common/AppAsyncStorage';
class AddACard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardValue: '',
            cards: []
        }
        this.loadCards();//<-- nuevo
    }

    //esto es lo nuevo
    async loadCards() {
        console.log('cargando las cartas')
        let mazo = JSON.parse(await AppAsyncStorage.retrieveData("cards"))
        this.setState({
            cards: mazo != null ? mazo : [] 
        })
    }
    //nuevo

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
        let cardsCopy = this.state.cards.slice()
        let card = {
            value: this.state.cardValue
        }
        cardsCopy.push(card)
        this.saveCard(cardsCopy)

    }
    async saveCard(cardsCopy){
        await AppAsyncStorage.storeData("cards",JSON.stringify(cardsCopy))
        alert('Tarjeta Ingresada')
        this.setState({
            cardValue: '',
            cards: cardsCopy
        })
    }
   
    goToTraining() {
        const { navigate } = this.props.navigation;
        navigate('Training', { cards: this.state.cards })
    }
   
    render() {
        return (

            <View style={{ padding: 10 }}>
                <Card>
                    <CardItem header>
                        <Text>
                            Añade una tarjeta
                        </Text>
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
                    disabled={this.state.cards.length == 0}
                    onPress={() => this.goToTraining()}
                >
                    <Text>
                        Entrenamiento
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
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});