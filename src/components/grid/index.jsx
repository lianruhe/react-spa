import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Input } from 'antd'

import './style.css'

const Grid = ({ className, operations, search, ...tableProps }) => {
  let cls = 'component-grid'
  if (className) {
    cls += ' ' + className
  }

  return (
    <div className={cls}>
      {
        // 搜索框
        search && <div className="grid-search"><Input.Search {...search} /></div>
      }
      {
        // 操作按钮
        operations && operations.map((opera, index) =>
          <Button key={index} className="grid-operation-btn" type="primary" onClick={opera.handleClick}>{opera.title}</Button>
        )
      }

      <Table bordered {...tableProps} />
    </div>
  )
}

Grid.propTypes = {
  className: PropTypes.string,
  operations: PropTypes.array,
  search: PropTypes.object
}

export default Grid
