import React from 'react'
// import { Table, Button } from 'antd'
import Grid from 'components/grid'
import request from 'utils/request'

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
}]

export default class tableDemo extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
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
    this.setState({ loading: true })
    request({
      url: 'https://randomuser.me/api',
      method: 'get',
      body: {
        results: 10,
        ...params
      },
      type: 'json'
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
  componentDidMount () {
    this.fetch()
  }
  render () {
    return (
      <div style={{backgroundColor: '#FFFFFF'}}>
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
            handleClick: () => { console.log('add') }
          }, {
            title: '删除',
            handleClick: () => { console.log('del') }
          }]}
          search={{
            placeholder: '请输入名称',
            onSearch: val => {
              console.log(val)
            }
          }}
        />
      </div>
    )
  }
}
