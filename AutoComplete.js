import * as React from 'react';
import {
    Text,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';

// var activities = ['yoga', 'morning pages', 'breakfast'];

// var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedActivities: [],
            activity: '',
            suggesting: false
        };
    }

    searchedActivities = searchedText => {
        this.setState({ activity: searchedText })
        var searchedActivities = this.props.activities.filter(act => {
            return act.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({ searchedActivities: searchedActivities });
        this.state.suggesting = true
    };

    renderSuggestion = ({ item }) => {
        console.log('rendering' + item);
        console.log('rendering' + this.state.suggesting);
        return (
            <View>
                <TouchableOpacity style={this.props.suggestionsStyle} onPress={() => { this.setState({ activity: item }); this.state.suggesting = false }}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        console.log('render' + JSON.stringify(this.props.inputStyle))
        return (
            <View>
                <TextInput
                    onChangeText={this.searchedActivities}
                    placeholder={this.props.placeholder}
                    value={this.state.activity}
                    style={this.props.inputStyle}
                />
                {this.state.suggesting && <FlatList
                    data={this.state.searchedActivities}
                    renderItem={this.renderSuggestion}
                />}
            </View>
        );
    }
}