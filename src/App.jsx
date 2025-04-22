import Header from "./components/Header.jsx";
import CardContainer from "./components/CardContainer.jsx";
import FooterMenu from "./components/FooterMenu.jsx";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';

const App = () => {
    const [floor, setFloor]   = useState("G1");
    const [filter, setFilter] = useState("all");

    return (
        <div>
            <Header
                selectedFloor={floor}
                onSelectFloor={setFloor}
                selectedFilter={filter}
                onSelectFilter={setFilter}
            />
            <main className={"container-fluid"}>
                <CardContainer floor={floor} filter={filter} />
            </main>
            <FooterMenu />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>

    );
};

export default App;
