import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Pagination, Card, Form, Input, Button, Select, } from 'antd';
import VideoCard from '@/components/VideoCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ video, loading }) => ({ video, loading: loading.models.list, }))
@Form.create()
class VideoList extends Component {
    componentDidMount() {
        const {
            form: { setFieldsValue },
            video: { formValue: { code, sortBy, page, pageSize, } },
        } = this.props;
        setFieldsValue({
            code, sortBy,
        });
        this.handleSearch(null, page, pageSize);
    }

    handlePageChange = (page, pageSize) => {
        this.handleSearch(null, page, pageSize);
    };

    handleSearch = (e, page, pageSize) => {
        if (e) e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            dispatch({
                type: 'video/index',
                payload: {
                    ...fieldsValue,
                    page,
                    pageSize,
                },
            });
        });
    };

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.handleSearch();
    };

    renderForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 24 }}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col span={6}>
                        <FormItem label="番号">
                            {getFieldDecorator('code')(<Input placeholder="请输入番号关键字" />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="排序方式">
                            {getFieldDecorator('sortBy')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="">上市日期</Option>
                                    <Option value="score-desc">评分降序</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <Row type="flex" justify="end">
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const {
            video: { list, total, formValue: { pageSize, page, }, },
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper
                title="影片列表"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                    </div>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 8, lg: 6, md: 4, sm: 3, xs: 2 }}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <VideoCard videoData={item} />
                            </List.Item>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination
                            showQuickJumper
                            total={total}
                            current={page}
                            pageSize={pageSize}
                            onChange={this.handlePageChange}
                        />
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default VideoList;
