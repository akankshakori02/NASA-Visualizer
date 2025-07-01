import React, { useState, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import APOD from "./components/APOD";
import Facts from "./components/Facts";
import Footer from "./components/Footer";
import LoadSpinner from "./components/LoadSpinner";

// Lazy Load Mars & EPIC
const MarsRover = lazy(() => import("./components/MarsRover"));
const EPIC = lazy(() => import("./components/EPIC"));

const App = () => {
  const [showFacts, setShowFacts] = useState(false); // Control facts visibility
  const [showMarsChart, setShowMarsChart] = useState(false);
  const [showEpicChart, setShowEpicChart] = useState(false);

  const toggleMarsChart = () => setShowMarsChart((prev) => !prev);
  const toggleEpicChart = () => setShowEpicChart((prev) => !prev);
  // Toggle facts panel visibility
  const toggleFacts = () => {
    setShowFacts((prev) => !prev);
  };

  return (
    <>
      <Header toggleFacts={toggleFacts}
        showFacts={showFacts}
        toggleMarsChart={toggleMarsChart}
        toggleEpicChart={toggleEpicChart}
        showMarsChart={showMarsChart}
        showEpicChart={showEpicChart} />
      <div className="set-container background-gradient">
        {showFacts && (
          <div className="horizontal-facts-bar">
            <Facts onClose={() => setShowFacts(false)} />
          </div>
        )}
        <Suspense fallback={<LoadSpinner />}>
          <Routes>
            <Route exact path="/" element={<APOD />} />
            <Route exact path="/apod" element={<APOD />} />
            <Route exact path="/mars-rover" element={<MarsRover showChart={showMarsChart} />} />
            <Route exact path="/epic" element={<EPIC showChart={showEpicChart} />} />
          </Routes>
        </Suspense>
      </div>

      <button
        className="facts-toggle-btn"
        onClick={toggleFacts}
        title={showFacts ? "Hide space facts" : "Show a space fact!"}
      >
        🧠
      </button>
      <Footer />
    </>
  );
};

export default App;
