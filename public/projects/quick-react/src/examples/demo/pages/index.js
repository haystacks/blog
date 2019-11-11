import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';

export default connect(state => ({ count: state.count }))(function(props) {
    return (
        <div className={styles.normal}>
            <h1>{props.count}</h1>
            <Button
                type="primary"
                onClick={() => {
                    props.dispatch({ type: 'count/add' });
                }}
            >
                ADD
            </Button>
        </div>
    );
});
