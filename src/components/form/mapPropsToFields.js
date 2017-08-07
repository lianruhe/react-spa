/**
 * formData 转换
 * @param  {[object]} props [description]
 * @return [object]         {key: {value: xxx} ...}
 */
export default props => {
  const formData = {}
  if (typeof props.formData === 'object') {
    Object.keys(props.formData).forEach(key => {
      const value = props.formData[key]
      // if (typeof value === 'boolean') {
      //   value = value ? '1' : '0'
      // } else {
      //   if (typeof value === 'object') {
      //     value = value ? JSON.stringify(value, null, 2) : undefined
      //   } else {
      //     value = value ? `${value}` : undefined
      //   }
      // }
      formData[key] = { value }
    })
  }
  return formData
}
