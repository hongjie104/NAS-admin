import React, { Component } from "react";
import { Card } from 'antd';

import styles from './index.css';

export default class VideoCard extends Component {
    state = {
        name: '',
    };

    componentDidMount() {
        const {
            name,
            code,
        } = this.props;
        this.setState({
            name,
            code,
        });
    }

    render() {
        const {
            name,
            code,
        } = this.state;
        return (
            <Card
                hoverable
                className={styles.cardAvatar}
                cover={<img alt="example" src="https://i.jpg.dog/img/6a7edaad04c39673989003345c2973f2.jpg" />}
            >
                <Card.Meta title={code} />
            </Card>
        );
    }
}