import React, { Component } from "react";
import { Card } from 'antd';
import Link from 'umi/link';

import { createVideoSmallCoverUrl } from '@/utils/utils';
import styles from './index.css';

export default class VideoCard extends Component {
    state = {
        score: 0,
        code: '',
        id: '',
    };

    componentDidMount() {
        const {
            videoData,
        } = this.props;
        this.setState({
            ...videoData,
        });
    }

    render() {
        const {
            score,
            code,
            id,
        } = this.state;
        return (
            <Link to={`/av/video/show/${id}`}>
                <Card
                    hoverable
                    className={styles.cardAvatar}
                    cover={<img alt="example" src={createVideoSmallCoverUrl()} />}
                >
                    {/* <Card.Meta title={code} /> */}
                    <div className={styles.videoCardTitleView}>
                        <div className={styles.videoCardTitleTxt}>
                            {code}
                        </div>
                        <div className={styles.videoCardScoreTxt}>
                            {score}
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }
}