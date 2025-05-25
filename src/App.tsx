import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormWizard from "./pages/FormWizard";
import { store } from "./redux/store";

const App = () => {
    const { i18n } = useTranslation();
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
                        <Routes>
                            <Route path="/" element={<FormWizard />} />
                            {/* Add more routes here as needed */}
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
