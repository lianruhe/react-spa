import React from 'react'
import PropTypes from 'prop-types'
import Base from 'components/base'
import list2tree from 'utils/list2tree'

import { TreeSelect } from 'antd'
const TreeNode = TreeSelect.TreeNode

export default class ListTreeSelect extends Base {
  static propTypes = {
    listData: PropTypes.array,
    objectData: PropTypes.array,
    selfId: PropTypes.string,
    parendId: PropTypes.string,
    label: PropTypes.string,
    valueKey: PropTypes.string,
    children: PropTypes.string
  }

  render () {
    const { listData, objectData, label = 'label', selfId = 'id', valueKey = 'value', children = 'children', parentId = 'parentId', ...treeProps } = this.props
    const treeData = objectData || list2tree(listData, selfId, parentId) || []

    const loop = data => data.map(item => {
      if (!item[valueKey]) {
        return null
      }

      if (item[children] && item[children].length) {
        return <TreeNode title={item[label]} value={item[valueKey]} key={item[selfId]}>{loop(item[children])}</TreeNode>
      }
      return <TreeNode title={item[label]} value={item[valueKey]} key={item[selfId]} isLeaf />
    })

    return (
      <TreeSelect dropdownStyle={{ maxHeight: '300px' }} {...treeProps}>
        {
          loop(treeData)
        }
      </TreeSelect>
    )
  }
}
