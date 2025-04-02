import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import "./assets/font/font.css";
import "@/plugins/wow";
import "./i18n";
import './vars.scss'

import store from "./store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
