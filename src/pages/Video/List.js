import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, List, Pagination, Card } from 'antd';
import VideoCard from '@/components/VideoCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ video, loading }) => ({ video, loading: loading.models.list, }))
class VideoList extends Component {
    state = {
        page: 1,
    };

    componentWillMount() {
        this.pageSize = 30;
        const {
            dispatch,
        } = this.props;
        const {
            page,
        } = this.state;
        dispatch({
            type: 'video/index',
            payload: {
                page,
                pageSize: this.pageSize,
            },
        });
    }

    handleFormSubmit = value => {
        // eslint-disable-next-line
        console.log(value);
    };

    handlePageChange = page => {
        const {
            dispatch,
        } = this.props;
        dispatch({
            type: 'video/index',
            payload: {
                page,
                pageSize: this.pageSize,
            },
            callback: () => {
                this.setState({
                    page,
                });
            },
        });
        // this.setState({ page };
    };

    render() {
        // const tabList = [
        //   {
        //     key: 'articles',
        //     tab: '文章',
        //   },
        //   {
        //     key: 'projects',
        //     tab: '项目',
        //   },
        //   {
        //     key: 'applications',
        //     tab: '应用',
        //   },
        // ];

        // const mainSearch = (
        //   <div style={{ textAlign: 'center' }}>
        //     <Input.Search
        //       placeholder="请输入"
        //       enterButton="搜索"
        //       size="large"
        //       onSearch={this.handleFormSubmit}
        //       style={{ maxWidth: 522, width: '100%' }}
        //     />
        //   </div>
        // );

        // const { match, children, location } = this.props;

        const {
            video: { list, total, },
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper
                title="影片列表"
            // content={mainSearch}
            // tabList={tabList}
            // tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
            // onTabChange={this.handleTabChange}
            >
                <Card bordered={false}>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 8, lg: 6, md: 4, sm: 3, xs: 2 }}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <VideoCard name={item.name} code={item.code} />
                            </List.Item>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination
                            showQuickJumper
                            total={total}
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
