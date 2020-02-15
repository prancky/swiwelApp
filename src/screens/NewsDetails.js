import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import {Card, Header} from 'react-native-elements';
import moment from 'moment-timezone';
import RNPickerSelect from 'react-native-picker-select';

export default class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPara: 'bitcoin',
    };
  }

  componentDidMount() {
    // this.props.fetchCustomNewsList(this.state.searchPara);
  }

  newsTime(para) {
    // var gmtDateTime = moment.utc(para.created_at, "YYYY-MM-DD HH");

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 8,
        }}>
        <Text
          style={{
            fontSize: 9,
            color: '#484848',
            textAlign: 'right',
          }}>
          {moment.utc(para).format('MMM Do YYYY')}
          {' -'}
        </Text>
        {/*<Image
          style={{marginHorizontal: 5}}
          source={require('../../../../static/images/support-center/sep-dot.png')}
        />*/}
        <Text
          style={{
            fontSize: 9,
            fontWeight: '400',
            color: '#808080',
            textAlign: 'right',
          }}>
          {moment
            .utc(para)
            .local()
            .format('h:mm a')}
        </Text>
      </View>
    );
  }

  navigateToWeb(obj) {
    Linking.canOpenURL(obj.url)
      .then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(obj.url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  leftComponent() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => this.props.navigation.pop()}>
        <Text style={{color: '#000'}}>back</Text>
      </TouchableOpacity>
    );
  }

  render() {
    let data = this.props.route;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          leftComponent={this.leftComponent()}
          centerComponent={{text: 'News Detail', style: {color: '#fff'}}}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
          }}>
          <View ViewStyle={{borderTopWidth: 0, borderBottomWidth: 0}} />

          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              margin: 0,
              padding: 0,
              position: 'relative',
            }}>
            {data.params.title && (
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  lineHeight: 24,
                  fontWeight: 'bold',
                }}>
                {data.params.title}
              </Text>
            )}
            <ImageLoad
              style={{
                width: null,
                height: 250,
              }}
              resizeMode="cover"
              loadingStyle={{size: 'small', color: '#1DBE7E'}}
              source={{uri: data.params.urlToImage}}
            />
            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {data.params.source && data.params.source.name && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#00C07F',
                        lineHeight: 15,
                        marginLeft: 5,
                      }}>
                      {data.params.source.name}
                    </Text>
                  </View>
                )}
                {data.params.publishedAt &&
                  this.newsTime(data.params.publishedAt)}
              </View>

              {data.params.content && (
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#484848',
                  }}>
                  {data.params.content}
                </Text>
              )}
            </View>
          </View>
          <View style={{paddingVertical: 15}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: '#00a699',
                padding: 20,
                borderRadius: 4,
                marginTop: 20,
              }}
              onPress={() => this.navigateToWeb(data.params)}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
                More Detais
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
