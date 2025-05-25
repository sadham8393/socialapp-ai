import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import Header from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { store } from "./redux/store";
import AppRoutes from "./routes";
import { useCountries } from "./hooks/useCountries";

const App = () => {
    const { i18n } = useTranslation();
    const countries = useCountries();

    return (
        <Provider store={store}>
            <Router>
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    dir={i18n.dir()}
                >
                    <Header />
                    <main style={{ flex: 1 }}>
                        <AppRoutes countries={countries} />
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
