import React, { Component } from 'react';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

class TranslatorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageFrom: "",
            languageTo: "",
            languageCode: 'fr',
             };
    }

    render() {
        const styles = this.getStyles();
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyB5ip6KC-9KCIjO9Q7Rm47dYJDmOdjLgM0', this.state.languageCode);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.languageBar}>
                    <TouchableOpacity onPress={() => { this.changeLanguage('en') }}><Text style={styles.p}>English</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.changeLanguage('fr') }}><Text style={styles.p}>French</Text></TouchableOpacity>
                </View>
                <View>
                    <PowerTranslator style={styles.title} text={'A Confucian Revival Began'} />
                    <PowerTranslator style={styles.subtitle} text={'Author: Confucianism'} />
                </View>

                <View style={styles.section}>
                    <PowerTranslator style={styles.p} text={'Confucianism was particularly strong during the Han Dynasty, whose greatest thinker was Dong Zhongshu, who integrated Confucianism with the thoughts of the Zhongshu School and the theory of the Five Elements. He also was a promoter of the New Text school, which considered Confucius as a divine figure and a spiritual ruler of China, who foresaw and started the evolution of the world towards the Universal Peace.'} />
                </View>

                <View style={styles.section}>
                    <PowerTranslator style={styles.p} text={'Confucianism was particularly strong during the Han Dynasty, whose greatest thinker was Dong Zhongshu, who integrated Confucianism with the thoughts of the Zhongshu School and the theory of the Five Elements. He also was a promoter of the New Text school, which considered Confucius as a divine figure and a spiritual ruler of China, who foresaw and started the evolution of the world towards the Universal Peace.'} />
                </View>

                <View style={styles.section}>
                    <PowerTranslator style={styles.p} text={'Engineering physics or engineering science refers to the study of the combined disciplines of physics'} />
                </View>
            </ScrollView>
        );
    }

    getStyles() {
        return {
            container: {
                padding: 40,
                backgroundColor: '#fff',
            },
            section: {
                marginTop: 15,
                marginBottom: 15,
            },
            title: {
                marginTop: 80,
                marginBottom: 5,
                fontWeight: 'bold',
                fontSize: 38,
                lineHeight: 38
            },
            subtitle: {
               color:'#000'
            },
            p: {
                color: '#828280',
                lineHeight: 24
            },
            languageBar: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            languageBarItem: {
                color: '#828280',
            }
        }
    }

    changeLanguage(languageCode) {
        this.setState({ languageCode: languageCode });
    }
}
export default TranslatorComponent;