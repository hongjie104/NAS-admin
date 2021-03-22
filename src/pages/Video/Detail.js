import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Card, Divider, Tag, Row, Col, Form, Select, Button, Input, } from 'antd';
import Link from 'umi/link';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import DescriptionList from '@/components/DescriptionList';
import { formatDate, getRandomColorName, createVideoCoverUrl, } from '@/utils/utils';
import { videoScoreCategory, } from '@/config';

import styles from './Detail.css';

const { Description } = DescriptionList;
const { Option } = Select;

@connect(({ actress, video, loading }) => ({ actress, video, loading: loading.models.list, }))
@Form.create()
class VideoDetail extends Component {
    state = {
        width: '100%',
    };

    componentDidMount() {
        window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({
            type: 'video/show',
            payload: {
                id,
            },
            callback: detail => {
                const {
                    form: { setFieldsValue },
                } = this.props;
                setFieldsValue({
                    subtitle: detail.subtitle || false,
                    hd: detail.hd || false,
                    score: detail.score || 0,
                    img: detail.img || '',
                    img_s: detail.img_s || '',
                    name: detail.name || '',
                });
            },
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFooterToolbar);
    }

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
            video: { detail: { id } },
            form: { validateFieldsAndScroll },
            dispatch,
        } = this.props;
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                dispatch({
                    type: 'video/update',
                    payload: {
                        data: values,
                        id,
                    },
                });
            }
        });
    };

    renderDetail = () => {
        const { video: { detail: { code, date, }, series, categoryArr, } } = this.props;
        return (
            <div className={styles.detailContainer}>
                <DescriptionList size="small" col="3">
                    <Description term="番号">{code}</Description>
                    <Description term="发行日期">{formatDate(date)}</Description>
                    <Description term="系列">
                        {/* <a href="#">{series ? series.name : '无'}</a> */}
                        {
                            series ? <Link to={`/av/serise/videoList/${series.id}`}>{series.name}</Link> : '无'
                        }
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
            width,
        } = this.state;
        const {
            video: { detail, actressList, },
            loading,
            submitting,
            form: { getFieldDecorator },
        } = this.props;
        if (!detail) return <div />;
        return (
            <PageHeaderWrapper
                title={detail.name}
                content={this.renderDetail()}
            >
                <Card bordered={false}>
                    <img src={createVideoCoverUrl(detail.img)} className={styles.videoCover} alt={detail.code} />
                    <Divider orientation="left">影片信息</Divider>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Form.Item label="影片名">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入影片名' }],
                                })(<Input placeholder='请输入影片名' />)}
                            </Form.Item>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="评级">
                                    {getFieldDecorator('score')(
                                        <Select>
                                            {
                                                videoScoreCategory.map(s => <Option key={s.value} value={s.value}>{s.display}</Option>)
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="是否有字幕">
                                    {getFieldDecorator('subtitle')(
                                        <Select>
                                            <Option value>有字幕</Option>
                                            <Option value={false}>无字幕</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="是否是高清">
                                    {getFieldDecorator('hd')(
                                        <Select>
                                            <Option value>高清版</Option>
                                            <Option value={false}>非高清版</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="封面图地址(小)">
                                    {getFieldDecorator('img_s', {
                                        rules: [{ required: true, message: '请输入封面图地址' }],
                                    })(<Input placeholder='请输入封面图地址' />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="影片图地址(大)">
                                    {getFieldDecorator('img', {
                                        rules: [{ required: true, message: '请输入封面图地址' }],
                                    })(<Input placeholder='请输入封面图地址' />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider orientation="left">参演演员</Divider>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 6, column: 6 }}
                        dataSource={actressList}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <ActressCard actressData={item} />
                            </List.Item>
                        )}
                    />
                </Card>
                <FooterToolbar style={{ width }}>
                    <Button type="primary" onClick={this.validate} loading={submitting}>
                        提交
                    </Button>
                </FooterToolbar>
            </PageHeaderWrapper>
        );
    }
}

export default VideoDetail;
