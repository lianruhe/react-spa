import React from 'react'
import Base from 'components/base'
// import { Table, Button } from 'antd'
import Grid from 'opiece-react-components/lib/grid'
import request from 'opiece-utils/lib/request'
import { message, Popconfirm } from 'antd'

export default class tableDemo extends Base {
  state = {
    data: [],
    pagination: {},
    loading: true,
    selectedRowKeys: []
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }
  fetch = (params = {}) => {
    console.log('params:', params)
    // this.setState({ loading: true })
    request({
      url: 'https://randomuser.me/api',
      method: 'get',
      body: {
        results: 10,
        ...params
      },
      interceptors: {
        request: [req => {
          delete req.credentials
          return req
        }]
      }
    }).then((data) => {
      const pagination = { ...this.state.pagination }
      // Read total count from server
      // pagination.total = data.totalCount
      pagination.total = 200
      this.setState({
        loading: false,
        data: data.results,
        pagination
      })
    })
  }
  handleEdit (val) {
    message.warning('Click Edit!')
    console.log('eidt', val)
  }
  componentDidMount () {
    this.fetch()
  }
  render () {
    const { handleEdit } = this
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%'
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      width: '20%'
    }, {
      title: 'Email',
      dataIndex: 'email'
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={ handleEdit }>Edit</a>
          <span className="ant-divider" />
          <Popconfirm title="Are you sure delete this task?" placement="left" onConfirm={ () => { message.error('Click Delete!') } }>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        </span>
      )
    }]
    return (
      <div style={{backgroundColor: '#FFFFFF', margin: '10px'}}>
        <Grid
          rowSelection={{
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
              console.log('selectedRowKeys changed: ', selectedRowKeys)
              this.setState({ selectedRowKeys })
            }
          }}
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          operations={[{
            title: '新增',
            handleClick: () => { message.success('Click Add!') }
          }, {
            title: '删除',
            handleClick: () => { message.success('Click Delete!') }
          }]}
          // search={{
          //   placeholder: '请输入名称',
          //   onSearch: val => {
          //     console.log(val)
          //   }
          // }}
        />
      </div>
    )
  }
}
