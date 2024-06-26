import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./Component/ReduxConfig/store.js"

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)