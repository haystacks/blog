import { Component } from "react";
import { connect } from "dva";
import { Button } from "antd";
import styles from "./demo.css";

@connect(({ count }) => {
  return { count };
})
class Demo extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <h1>Page demo {this.props.count}</h1>
        <Button
          type="primary"
          onClick={() => {
            this.props.dispatch({ type: "count/add" });
          }}
        >
          ADD
        </Button>
      </div>
    );
  }
}
export default Demo;
