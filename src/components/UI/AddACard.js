import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Card, CardItem, Button, Item, Label, Input } from 'native-base';
class AddACard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardValue: '',
            cards: []
        }
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
        let cardsCopy = this.state.cards.slice()
        let card = {
            value: this.state.cardValue
        }
        cardsCopy.push(card)
        alert('Tarjeta Ingresada')
        this.setState({
            cardValue: '',
            cards: cardsCopy
        })

    }
    //nuevo
    goToTraining(){
        const { navigate } = this.props.navigation;
        navigate('Training', { cards: this.state.cards })
    }
    //nuevo
    render() {
        console.log('cards : ' + JSON.stringify(this.state.cards))//<--para testear
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
                            onPress={() => this.handleSubmit()}//<------nuevo
                            block
                            light
                        >
                            <Text>
                                Añadir
                            </Text>
                        </Button>
                    </CardItem>
                </Card>
                {/* esto es nuevo */}
                <Button block 
                    disabled={this.state.cards.length==0}
                    onPress={()=>this.goToTraining()}
                 >
                    <Text>
                        Entrenamiento
                    </Text>
                </Button>
                {/* esto es nuevo */}
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