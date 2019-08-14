import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Card, Divider, Tag, /* Col, Form, Input, Button, Select, Icon */ } from 'antd';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import { createVideoCoverUrl, formatDate, getRandomColorName, } from '@/utils/utils';

import styles from './Detail.css';

const { Description } = DescriptionList;

@connect(({ actress, video, loading }) => ({ actress, video, loading: loading.models.list, }))
class VideoDetail extends Component {
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'video/show',
            payload: {
                id,
            },
        });
    }

    renderDetail = () => {
        const { video: { detail: { code, date, }, series, categoryArr, } } = this.props;
        return (
            <div className={styles.detailContainer}>
                <DescriptionList size="small" col="3">
                    <Description term="番号">{code}</Description>
                    <Description term="发行日期">{formatDate(date)}</Description>
                    <Description term="系列">
                        <a href="#">{series.name}</a>
                    </Description>
                </DescriptionList>
                <div className={styles.tagContainer}>
                    {
                        categoryArr.map((c, i) => <Tag key={`tag-${i}`} className="tag" color={getRandomColorName()}>{c.name}</Tag>)
                    }
                </div>
            </div>
        );
    }

    render() {
        const {
            video: { detail, actressList, },
            loading,
        } = this.props;
        if (!detail) return <div />;
        return (
            <PageHeaderWrapper
                title={detail.name}
                content={this.renderDetail()}
            >
                <Card bordered={false}>
                    <img src={createVideoCoverUrl()} className={styles.videoCover} alt={detail.code} />
                    <Divider orientation="left">参演演员</Divider>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 8, column: 4 }}
                        dataSource={actressList}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <ActressCard actressData={item} />
                            </List.Item>
                        )}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default VideoDetail;
