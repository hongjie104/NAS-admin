import React, { Component } from 'react';
import { Card } from 'antd';
// import Ellipsis from '@/components/Ellipsis';

import styles from './index.css';

export default class ActressCard extends Component {
    state = {
        name: '',
    };

    componentDidMount() {
        const {
            name,
        } = this.props;
        this.setState({
            name,
        });
    }

    render() {
        const {
            name,
        } = this.state;
        return (
            <Card
                hoverable
                className={styles.cardAvatar}
                cover={<img alt="example" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=969194526,1892037601&fm=26&gp=0.jpg" />}
            >
                <Card.Meta title={name} />
            </Card>
        );
    }
}