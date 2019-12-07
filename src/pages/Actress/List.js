import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Pagination, Card, Form, Input, Button, Select, /* Icon */ } from 'antd';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ actress }) => ({ actress }))
@Form.create()
class ActressList extends Component {
    state = {
        page: 1,
    };

    componentWillMount() {
        this.pageSize = 30;
    }

    componentDidMount() {
        const {
            form: { setFieldsValue },
            actress: { formValue: { name, sortBy, } },
        } = this.props;
        setFieldsValue({
            sortBy,
            name,
        }, () => {
            this.handleSearch();
        });
    }

    handleFormSubmit = value => {
        // eslint-disable-next-line
        console.log(value);
    };

    handlePageChange = page => {
        this.setState({
            page,
        }, () => {
            this.handleSearch();
        });
    };

    handleSearch = e => {
        if (e) e.preventDefault();

        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                page,
            } = this.state;
            dispatch({
                type: 'actress/index',
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

    renderForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 24 }}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col span={8}>
                        <FormItem label="名字">
                            {getFieldDecorator('name')(<Input placeholder="请输入名字关键字" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="排序方式">
                            {getFieldDecorator('sortBy')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="score-desc">评分降序</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
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
            actress: { list, total, loading, },
        } = this.props;
        const {
            page,
        } = this.state;

        return (
            <PageHeaderWrapper
                title="演员列表"
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
                                <ActressCard actressData={item} />
                            </List.Item>
                        )}
                    />
                    <Row type="flex" justify="end">
                        <Pagination
                            showQuickJumper
                            total={total}
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

export default ActressList;
