import React from 'react';
import { Table } from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from './index.less';

export default class NoSelectTable extends StandardTable {
    render() {
        const { data = {}, rowKey, ...rest } = this.props;
        const { list = [], pagination } = data;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        return (
            <div className={styles.standardTable}>
                <Table
                    rowKey={rowKey || 'id'}
                    dataSource={list}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...rest}
                />
            </div>
        );
    }
}