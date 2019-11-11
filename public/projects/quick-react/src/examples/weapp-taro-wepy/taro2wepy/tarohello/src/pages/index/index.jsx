import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Echart } from 'echarts12'
import './index.less'

export default class Index extends Component {
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
  }
  config = {
    navigationBarTitleText: 'ss'
  }

  componentWillMount = () => {
    // const option = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [900, 900, 900, 900, 900, 900, 900],
    //       type: 'line',
    //       smooth: true
    //     }
    //   ]
    // }
    // const _this = this
    console.log(JSON.stringify(this.state.option))
    setTimeout(() => {
      let { option } = { ...this.state }
      option.series[0].data = [900, 900, 900, 900, 900, 900, 900]
      console.log(JSON.stringify(this.state.option))
      this.setState({
        option
      })
      console.log(123)
    }, 8000)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { option } = this.state
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Echart option={option} />
      </View>
    )
  }
}
