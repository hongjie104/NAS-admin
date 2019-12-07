import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, List, Pagination, Card, /* Col, Form, Input, Button, Select, Icon */ } from 'antd';
import VideoCard from '@/components/VideoCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import { createActressAvatarUrl, formatDate } from '@/utils/utils';

// import styles from './List.less';
const { Description } = DescriptionList;

@connect(({ actress }) => ({ actress }))
class ActressDetail extends Component {
    state = {
        page: 1,
    };

    componentWillMount() {
        this.pageSize = 30;
    }

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        const {
            page,
        } = this.state;
        dispatch({
            type: 'actress/show',
            payload: {
                id,
                videoPage: page,
                videoPageSize: this.pageSize,
            },
        });
        this.handleSearch();
    }

    handlePageChange = page => {
        this.setState({
            page,
        }, () => {
            this.handleSearch();
        });
    };

    handleSearch = () => {
        const { page } = this.state;
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'actress/indexVideo',
            payload: {
                videoPage: page,
                videoPageSize: this.pageSize,
                actressId: id,
            },
        });
    };

    renderDetail = () => {
        const { actress: { detail: { birthday, bust, cup, height, hip, score, waist, } } } = this.props;
        return (
            <DescriptionList size="small" col="4">
                <Description term="生日">{formatDate(birthday)}</Description>
                <Description term="身高">{height}CM</Description>
                <Description term="评分">{score}</Description>
                <Description term="罩杯">{cup}</Description>
                <Description term="胸围">{bust}</Description>
                <Description term="腰围">{waist}</Description>
                <Description term="臀围">{hip}</Description>
            </DescriptionList>
        );
    }

    render() {
        // const { stepDirection, operationkey } = this.state;
        // const { profile, loading } = this.props;
        // const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
        const {
            actress: { detail, videoList, videoTotal, loading, },
        } = this.props;
        const {
            page,
        } = this.state;
        if (!detail) return <div />;
        return (
            <PageHeaderWrapper
                title={detail.name}
                logo={
                    <img alt="" src={createActressAvatarUrl(detail.img)} />
                }
                // extra={action}
                content={this.renderDetail()}
                // extraContent={extra}
                // tabList={tabList}
            >
                <Card bordered={false}>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 8, lg: 6, md: 4, sm: 3, xs: 2 }}
                        dataSource={videoList}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <VideoCard videoData={item} />
                            </List.Item>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination
                            showQuickJumper
                            total={videoTotal}
                            pageSize={this.pageSize}
                            onChange={this.handlePageChange}
                            page={page}
                        />
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default ActressDetail;
