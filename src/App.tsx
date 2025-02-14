import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { Details } from "./pages/Details";
import { Layout } from "./components/Layout/Layout";
import { New } from "./pages/New";
import { Toast } from "./components/Toast/Toast";

library.add(far, fas);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Main />} />
            <Route path="new" element={<New />} />
            <Route path="details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
}

export default App;
