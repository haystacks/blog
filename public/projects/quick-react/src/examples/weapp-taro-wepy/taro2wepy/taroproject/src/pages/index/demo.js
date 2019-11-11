import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import Echarts from 'taro-echarts';
// import Echarts from '../../components/echart';
import { Echart, Hello } from 'echarts12';
// import { AtTag, Echarts, Hello } from 'taro-ui';

export default class Demo extends Component {
  state = {
      option: {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                  smooth: true
              }
          ]
      }
  };
  componentDidMount() {
      setTimeout(() => {
          this.setState({
              option: {
                  xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          data: [1000, 1000, 1000, 1000, 1000, 1000, 1000],
                          type: 'line',
                          smooth: true
                      }
                  ]
              }
          });
      }, 5000);
      setTimeout(() => {
          this.setState({
              option: {
                  xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          data: [800, 800, 800, 800, 800, 800, 800],
                          type: 'line',
                          smooth: true
                      }
                  ]
              }
          });
      }, 10000);
  }
  onInit = e => {
      console.log(e);
  };
  render() {
      const { option } = this.state;
      return (
          <View>
              {/* <AtTag /> */}
              <View>sdfasdf</View>
              <Hello />
              <Echart option={option} onInit={this.onInit} />
              <View>sdfadsfglsdflsdflsdf</View>
          </View>
      );
  }
}
