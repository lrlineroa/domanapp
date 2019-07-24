import React, { Component } from 'react';
import { View, Modal, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableHighlight } from 'react-native';
import AppAsyncStorage from '../common/AppAsyncStorage';
import { Card, CardItem, Right, Icon, Button,Item,Label,Input } from 'native-base';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            cardValue: '',
            cardIdToUpdate: '',
            modalVisible: false,
        }
        this.loadCards();
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Mazo Principal'
        }

    };

    async loadCards() {
        let mazo = JSON.parse(await AppAsyncStorage.retrieveData("cards"))
        this.setState({
            cards: mazo != null ? mazo : []
        })
    }
    async deleteCard(idx) {
        let cardsCopy = this.state.cards.slice();
        cardsCopy.splice(idx, 1)
        await AppAsyncStorage.storeData("cards", JSON.stringify(cardsCopy))
        alert('Tarjeta Eliminada')
        this.setState({
            cards: cardsCopy
        })
    }
    showUpdateModalCard(idx) {
        this.setState(
            {
                modalVisible: true,
                cardIdToUpdate: idx,
                cardValue:this.state.cards[idx].value
            }
        )
    }

    handleInputText(value) {
        this.setState({
            cardValue: value
        })
    }
    async updateCard(){
        let cardsCopy = this.state.cards.slice();
        
        cardsCopy.splice(this.state.cardIdToUpdate, 1,{value:this.state.cardValue})//actualización
        await AppAsyncStorage.storeData("cards", JSON.stringify(cardsCopy))
        alert('Tarjeta Actualizada '+this.state.cardValue)
        this.setState({
            modalVisible:false,
            cards: cardsCopy
        })
    }
    render() {
        if (this.state.cards.length == 0)
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                    <Text>Cargando mazo...</Text>
                </View>)
        return (<ScrollView style={{ flex: 1, padding: 10 }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({
                        modalVisible: false
                    })
                }}>
                <View style={[styles.container, { padding: 10 }]}>
                    <Card>
                        <CardItem header>
                            <Text>
                                Edita una tarjeta
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
                                onPress={() => this.updateCard()}
                                block
                                light
                            >
                                <Text>
                                    Añadir
                            </Text>
                            </Button>
                        </CardItem>
                    </Card>

                </View>
            </Modal>
            {this.state.cards.map((card, idx) => {
                return (
                    <Card key={"card_" + idx}>
                        <CardItem>
                            <Text style={{ fontSize: 30 }}>
                                {card.value}
                            </Text>
                            <Right
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                            >
                                <Button
                                    style={{ backgroundColor: '#0f0', margin: 3 }}
                                    onPress={
                                        () => {
                                            this.showUpdateModalCard(idx)
                                        }
                                    }
                                >
                                    <Icon name="create" />
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#f00', margin: 3 }}
                                    onPress={
                                        () => {
                                            this.deleteCard(idx)
                                        }
                                    }
                                >
                                    <Icon color='#ff0000' name="trash" />
                                </Button>

                            </Right>
                        </CardItem>
                    </Card>
                )
            })}
        </ScrollView>);
    }
}

export default Deck;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});