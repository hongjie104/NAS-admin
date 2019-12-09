import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, List, Pagination, Card, Tabs, Form, Input, InputNumber, DatePicker, Button, } from 'antd';
import VideoCard from '@/components/VideoCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import { createActressAvatarUrl } from '@/utils/utils';

// import styles from './List.less';
const { TabPane } = Tabs;
// const { Option } = Select;

const fieldLabels = {
    name: '姓名',
    alias: '别名',
    height: '身高',
    bust: '胸围',
    waist: '腰围',
    hip: '臀围',
    birthday: '生日',
    cup: '罩杯',
};

@connect(({ actress }) => ({ actress }))
@Form.create()
class ActressDetail extends Component {
    state = {
        page: 1,
        width: '100%',
    };

    componentWillMount() {
        this.pageSize = 12;
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'actress/show',
            payload: {
                id,
            },
            callback: detail => {
                const {
                    form: { setFieldsValue },
                } = this.props;
                setFieldsValue({
                    name: detail.name,
                    alias: detail.alias,
                    height: detail.height,
                    bust: detail.bust,
                    waist: detail.waist,
                    hip: detail.hip,
                    birthday: moment(detail.birthday),
                    cup: detail.cup,
                });
            },
        });
        this.handleSearch();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFooterToolbar);
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

    resizeFooterToolbar = () => {
        requestAnimationFrame(() => {
            const sider = document.querySelectorAll('.ant-layout-sider')[0];
            if (sider) {
                const width = `calc(100% - ${sider.style.width})`;
                const { width: stateWidth } = this.state;
                if (stateWidth !== width) {
                    this.setState({ width });
                }
            }
        });
    };

    validate = () => {
        const {
            actress: { detail: { id } },
            form: { validateFieldsAndScroll },
            dispatch,
        } = this.props;
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                // submit the values
                dispatch({
                    type: 'actress/update',
                    payload: {
                        data: values,
                        id,
                    },
                });
            }
        });
    };

    render() {
        const {
            actress: { detail, videoList, videoTotal, loading, submitting, },
            form: { getFieldDecorator },
        } = this.props;
        const {
            page,
            width,
        } = this.state;
        if (!detail) return <div />;
        return (
            <PageHeaderWrapper
                title={detail.name}
                logo={
                    <img alt="" src={createActressAvatarUrl(detail.img)} />
                }
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="档案" key="1">
                        <Card bordered={false} title="个人信息">
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.name}>
                                            {getFieldDecorator('name', {
                                                rules: [{ required: true, message: `请输入${fieldLabels.name}` }],
                                            })(<Input placeholder={`请输入${fieldLabels.name}`} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.alias}>
                                            {getFieldDecorator('alias', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.alias}` }],
                                            })(
                                                <Input placeholder={`请输入${fieldLabels.alias}`} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.height}>
                                            {getFieldDecorator('height', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.height}` }],
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={200}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.birthday}>
                                            {getFieldDecorator('birthday', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.birthday}` }],
                                            })(
                                                <DatePicker style={{ width: '100%' }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.cup}>
                                            {getFieldDecorator('cup', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.cup}` }],
                                            })(
                                                <Input placeholder={`请输入${fieldLabels.cup}`} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.bust}>
                                            {getFieldDecorator('bust', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.bust}` }],
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={200}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.waist}>
                                            {getFieldDecorator('waist', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.waist}` }],
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={200}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={fieldLabels.hip}>
                                            {getFieldDecorator('hip', {
                                                rules: [{ required: false, message: `请输入${fieldLabels.hip}` }],
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={200}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <FooterToolbar style={{ width }}>
                            <Button type="primary" onClick={this.validate} loading={submitting}>
                                提交
                            </Button>
                        </FooterToolbar>
                    </TabPane>
                    <TabPane tab="作品" key="2">
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
                    </TabPane>
                </Tabs>
            </PageHeaderWrapper>
        );
    }
}

export default ActressDetail;
