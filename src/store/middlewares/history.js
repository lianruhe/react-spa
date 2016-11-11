import { useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createHashHistory'

const historyConfig = { basename: __BASENAME__ }

export default useRouterHistory(createBrowserHistory)(historyConfig)
