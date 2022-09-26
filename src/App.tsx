import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Nav from "./components/Header/Header";
import { Loading } from "./components/Loading/Loading";
import Market from "./components/Market/Market";
import Protected from "./components/Protected/Protected";
import { persistor, store } from "./redux/store";

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
          </Route>
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
