import React, { Component } from "react";
import { Card, Tag, } from 'antd';
import Link from 'umi/link';

import { createVideoSmallCoverUrl, formatDate, } from '@/utils/utils';
import styles from './index.css';

export default class VideoCard extends Component {
    state = {
        score: 0,
        code: '',
        id: '',
        img: '',
        date: '',
        subtitle: false,
        hd: false,
    };

    componentDidMount() {
        const {
            videoData,
        } = this.props;
        this.setState({
            ...videoData,
            img: videoData.img_s,
        });
    }

    render() {
        const {
            score,
            code,
            id,
            img,
            date,
            subtitle,
            hd,
        } = this.state;
        return (
            <Link to={`/av/video/show/${id}`}>
                <Card
                    hoverable
                    className={styles.cardAvatar}
                    cover={<img alt="example" src={createVideoSmallCoverUrl(img)} />}
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
                    <div className={styles.videoCardTitleView}>
                        {formatDate(date)}
                    </div>
                    <div>
                        {subtitle && <Tag color="volcano">字幕</Tag>}
                        {hd && <Tag color="geekblue">高清</Tag>}
                    </div>
                </Card>
            </Link>
        );
    }
}