import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </ThemeProvider>
  </Provider>
);
