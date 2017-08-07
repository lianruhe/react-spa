import React from 'react'
import Base from 'components/base'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import Form from 'components/form'

import './style.css'

export default class Grid extends Base {
  static propTypes = {
    className: PropTypes.string,
    operations: PropTypes.array,
    search: PropTypes.object
  }

  @autobind
  restFields () {
    this.refs.formSearch.formRef.props.form.resetFields()
  }

  render () {
    const { className, operations, search, ...tableProps } = this.props
    let cls = 'component-grid'
    if (className) {
      cls += ' ' + className
    }

    if (search && search.items.length) {
      search.items.push({
        id: '__opeation',
        col: {
          labelCol: { span: 0 },
          wrapperCol: { span: 24 }
        },
        element: <div>
          {search.reset && <Button style={{marginRight: 12}} onClick={this.restFields}>重置</Button>}
          <Button type="primary" htmlType="submit">搜索</Button>
        </div>
      })
      delete search.reset
    }

    return (
      <div className={cls}>
        <div className="grid-header clearfix">
          <div className="grid-operation">
            {
              // 操作按钮
              operations && operations.map((opera, index) =>
                <Button key={index} className="grid-operation-btn" type={opera.type || 'primary'} disabled={opera.disabled} onClick={opera.handleClick}>{opera.title}</Button>
              )
            }
          </div>
          {
            // 搜索框
            search && <Form ref="formSearch" className="grid-search" layout="inline" {...search} />
          }
        </div>

        <Table bordered {...tableProps} />
      </div>
    )
  }
}
