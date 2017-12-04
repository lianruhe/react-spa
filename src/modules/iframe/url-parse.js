export default url => {
  const MAP = {
    '/iframe-baidu': 'https://www.baidu.com',
    '/iframe-table': 'http://localhost:3000/#/demo-table'
  }

  return MAP[url]
}
