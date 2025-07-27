import React from "react";
import BarcodeQRGenerator from "./BarcodeQRGenerator";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex justify-content-center bg-light">
      <BarcodeQRGenerator />
    </div>
  );
}

export default App;
