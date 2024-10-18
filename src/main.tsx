import App from "./App.tsx";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Hooks/index.ts";
import { ErrorProvider } from "./Context/ErrorProvider.tsx";
import { SuccessProvider } from "./Context/SuccessProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorProvider>
          <SuccessProvider>
            <App />
          </SuccessProvider>
        </ErrorProvider>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
