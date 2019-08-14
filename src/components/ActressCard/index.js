import React, { Component } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';
import { createActressAvatarUrl } from '@/utils/utils';

import styles from './index.css';

export default class ActressCard extends Component {
    state = {
        id: '',
        name: '',
        score: 0,
        birthday: '1970-01-01',
    };

    componentDidMount() {
        const {
            actressData,
        } = this.props;
        this.setState({
            ...actressData,
        });
    }

    render() {
        const {
            id,
            name,
            score,
            birthday,
        } = this.state;
        return (
            <Link to={`/av/actress/show/${id}`}>
                <Card
                    hoverable
                    className={styles.cardAvatar}
                    cover={<img alt="example" src={createActressAvatarUrl()} />}
                >
                    <Card.Meta
                        title={name}
                        description={
                            <div className={styles.desContainer}>
                                <span>{score}</span>
                                <span>{birthday}</span>
                            </div>
                        }
                    />
                </Card>
            </Link>
        );
    }
}