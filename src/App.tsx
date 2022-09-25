import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Market from "./components/Market/Market";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Nav from "./components/Header/Header";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "./components/Loading/Loading";
import Protected from "./components/Protected/Protected";

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
