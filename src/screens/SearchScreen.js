import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchCustomNewsList} from '../redux/actions/NewsAction';
import ImageLoad from 'react-native-image-placeholder';
import {Card, Header} from 'react-native-elements';
import moment from 'moment-timezone';
import RNPickerSelect from 'react-native-picker-select';
import {SearchPars} from '../config/const';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPara: 'bitcoin',
    };
  }

  componentDidMount() {
    this.props.fetchCustomNewsList(this.state.searchPara);
  }

  _renderItem(item) {
    const timeToDisplay = moment(item.publishedAt).format('YYYY-MM-DD HH:mm');
    return (
      <TouchableOpacity
        style={{paddingBottom: 10}}
        onPress={() => {
          // this.props.clearPromotinViewData();
          // this.props.fetchPromotionById(item.id);
          this.props.navigation.navigate('Detais', item);
        }}>
        <Card
          containerStyle={{
            borderRadius: 50,
            padding: 0,
            borderRadius: 8,
            borderWidth: 0,
            borderBottomWidth: 2,
            borderBottomColor: '#00C07F',
            borderLeftWidth: 0,
            backgroundColor: '#F8F8F8',
          }}
          wrapperStyle={{
            borderWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
          }}>
          <View style={{position: 'relative'}}>
            {item.urlToImage && (
              <ImageLoad
                style={{width: null, height: 220, borderRadius: 8}}
                loadingStyle={{size: 'small', color: '#1DBE7E'}}
                source={{uri: item.urlToImage}}
              />
            )}

            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {item.source && item.source.name && (
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
                      {item.source.name}
                    </Text>
                  </View>
                )}
                {item.publishedAt && this.newsTime(item.publishedAt)}
              </View>

              {item.title && (
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    lineHeight: 24,
                  }}>
                  {item.title}
                </Text>
              )}

              {item.description && item.description.length > 250 ? (
                <Text
                  style={{
                    fontSize: 9,
                    color: '#484848',
                  }}>
                  {item.description.substring(0, 250)}
                  ...
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 9,
                    color: '#484848',
                  }}>
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
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

  keyExtractor = () => {
    return (
      new Date().getTime().toString() +
      Math.floor(Math.random() * Math.floor(new Date().getTime())).toString()
    );
  };

  renderFooter = () => {
    // if (!this.state.loading) {
    //   return null;
    // }

    let screenHeight = Dimensions.get('screen').height;

    return (
      <View
        style={{
          flex: 1,
          height: screenHeight - 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  rightComponent = () => {
    return (
      <RNPickerSelect
        onValueChange={value => {
          this.setState({searchPara: value}, () => {
            this.props.fetchCustomNewsList(value);
          });
        }}
        value={this.state.searchPara}
        items={SearchPars}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          centerComponent={{text: 'News About', style: {color: '#fff'}}}
          rightComponent={this.rightComponent()}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
          }}>
          <View ViewStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
            {this.props.customNewsList &&
              this.props.customNewsList.articles &&
              this.props.customNewsList.articles.length > 0 && (
                <FlatList
                  data={this.props.customNewsList.articles}
                  initialNumToRender={7}
                  renderItem={({item}) => this._renderItem(item)}
                  keyExtractor={this.keyExtractor}
                  // ListFooterComponent={this.renderFooter}
                  // refreshing={this.state.refreshing}
                  // onRefresh={this.handleRefresh}
                  onEndThreshold={1200}
                />
              )}
          </View>
        </View>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchCustomNewsList: data => dispatch(fetchCustomNewsList(data)),
  };
}

const mapStateToProps = state => {
  return {
    customNewsList: state.news.customNewsList,
  };
};

export default connect(
  mapStateToProps,
  bindActions,
)(SearchScreen);
