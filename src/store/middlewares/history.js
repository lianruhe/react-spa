import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

const historyConfig = { basename: '' }

export default useRouterHistory(createHashHistory)(historyConfig)
