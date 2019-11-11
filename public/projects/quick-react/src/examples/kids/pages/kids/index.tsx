import React, { Component } from "react";
import { connect } from "dva";
import styles from "./index.styl";

@connect(({ Kid }) => ({
  ...Kid
}))
export default class Index extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: "报名人数统计"
  };

  constructor(props) {
    super(props);
    this.state = {
      info: [
        {
          name: "龙泉驿区大面街道元迪龙华幼儿园",
          num: 0
        },
        {
          name: "大面街道未来星实验幼儿园",
          num: 0
        },
        {
          name: "龙泉驿区龙华小学附属幼儿园",
          num: 0
        },
        {
          name: "龙泉驿区大面街道龙华新城幼儿园",
          num: 0
        }
      ]
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: "Kid/fetchSearch"
    });
  }

  render() {
    const { info } = this.state;
    return (
      <div className={styles.page}>
        <div className={[styles.line, styles.header].join(" ")}>
          <div className={styles.name}>幼儿园</div>
          <div className={styles.num}>报名人数</div>
        </div>
        {info.map(item => {
          return (
            <div className={[styles.line, styles.body].join(" ")}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.num}>{item.num}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
