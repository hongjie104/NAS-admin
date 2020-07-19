import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, List, Pagination, Card, Form, } from 'antd';
import VideoCard from '@/components/VideoCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ series, loading }) => ({ series, loading: loading.models.list, }))
@Form.create()
class VideoList extends Component {
    state = {
        page: 1,
    };

    componentWillMount() {
        this.pageSize = 30;
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.seriesId = id;
        this.handleSearch();
    }

    handlePageChange = page => {
        this.setState({
            page,
        }, () => {
            this.handleSearch();
        });
    };

    handleSearch = e => {
        if (e) e.preventDefault();

        const { dispatch } = this.props;
        const {
            page,
        } = this.state;
        dispatch({
            type: 'series/indexVideo',
            payload: {
                seriesId: this.seriesId,
                page,
                pageSize: this.pageSize,
            },
        });
    };

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.handleSearch();
    };

    render() {
        const {
            series: { videoList, videoTotal, },
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper
                title="影片列表"
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
                        />
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default VideoList;
