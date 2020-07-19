import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Table from '@/components/Table';

import styles from './List.less';

const FormItem = Form.Item;

@connect(({ series, loading }) => ({ series, loading: loading.models.list, }))
@Form.create()
class VideoList extends Component {
    state = {
        page: 1,
    };

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (text, record) => <Link to={`/av/serise/videoList/${record.id}`}>{text}</Link>,
        },
    ];

    componentWillMount() {
        this.pageSize = 20;
    }

    componentDidMount() {
        const {
            form: { setFieldsValue },
            series: { formValue: { name, } },
        } = this.props;
        setFieldsValue({
            name,
        });
        this.handleSearch();
    }

    handleSearch = e => {
        if (e) e.preventDefault();

        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                page,
            } = this.state;
            dispatch({
                type: 'series/index',
                payload: {
                    ...fieldsValue,
                    page,
                    pageSize: this.pageSize,
                },
            });
        });
    };

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.handleSearch();
    };

    handleStandardTableChange = (pagination) => {
        this.setState({
            page: pagination.current,
        }, () => {
            this.handleSearch();
        });
    };

    renderForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 24 }}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col span={12}>
                        <FormItem label="名字">
                            {getFieldDecorator('name')(<Input placeholder="请输入系列关键字" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
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
            series: { list, total, },
            loading,
        } = this.props;
        const {
            page,
        } = this.state;

        return (
            <PageHeaderWrapper
                title="系列列表"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                    </div>
                    <Table
                        selectedRows={[]}
                        loading={loading}
                        data={{ list, pagination: { current: page, pageSize: this.pageSize, total, }}}
                        columns={this.columns}
                        onChange={this.handleStandardTableChange}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default VideoList;
