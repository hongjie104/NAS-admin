import React, { Component } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';
import { createActressAvatarUrl, getAge, } from '@/utils/utils';
import { actressScoreCategory } from '@/config';

import styles from './index.css';

export default class ActressCard extends Component {
    state = {
        id: '',
        name: '',
        score: 0,
        birthday: '1970-01-01',
        img: '',
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
            score = 0,
            birthday,
            img,
        } = this.state;
        return (
            <Link to={`/av/actress/show/${id}`}>
                <Card
                    hoverable
                    className={styles.cardAvatar}
                    cover={<img alt="example" src={createActressAvatarUrl(img)} />}
                >
                    <Card.Meta
                        title={name}
                        description={
                            <div className={styles.desContainer}>
                                <span>{actressScoreCategory.filter(s => s.value === score)[0].display}</span>
                                <span>{getAge(birthday)}岁</span>
                            </div>
                        }
                    />
                </Card>
            </Link>
        );
    }
}