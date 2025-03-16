import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";

const BarcodeQRGenerator = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [inputText, setInputText] = useState("");
    const barcodeRefs = useRef([]);

    const handleInputChange = (e) => {
        const cleanedText = e.target.value.replace(/['"]/g, ""); // Xóa dấu nháy đơn và nháy kép
        setInputText(cleanedText);
    };

    const lines = inputText.split("\n").filter((line) => line.trim() !== "");

    useEffect(() => {
        if (activeTab === 1) {
            lines.forEach((line, index) => {
                if (barcodeRefs.current[index]) {
                    JsBarcode(barcodeRefs.current[index], line, {
                        format: "CODE128",
                        displayValue: true,
                    });
                }
            });
        }
    }, [inputText, activeTab, lines]);

    return (
        <div className="container mt-4">
            <h2 className="text-center fw-bold mb-3">QR Code & Barcode Generator</h2>

            <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                <TabList className="nav nav-tabs">
                    <Tab className="nav-item">
                        <button className={`nav-link ${activeTab === 0 ? "active" : ""}`}>QR Code</button>
                    </Tab>
                    <Tab className="nav-item">
                        <button className={`nav-link ${activeTab === 1 ? "active" : ""}`}>Mã vạch</button>
                    </Tab>
                </TabList>

                {/* Tab QR Code */}
                <TabPanel>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Nhập nội dung (mỗi dòng tạo 1 QR Code)..."
                        />
                    </div>

                    <div className="row">
                        {lines.map((line, index) => (
                            <div key={index} className="col-md-4 text-center p-3 border">
                                <h6>{line}</h6>
                                <QRCode value={line} size={100} />
                            </div>
                        ))}
                    </div>
                </TabPanel>

                {/* Tab Barcode */}
                <TabPanel>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Nhập nội dung (mỗi dòng tạo 1 mã vạch)..."
                        />
                    </div>

                    <div className="row">
                        {lines.map((line, index) => (
                            <div key={index} className="col-md-4 text-center p-3 border">
                                <h6>{line}</h6>
                                <svg ref={(el) => (barcodeRefs.current[index] = el)}></svg>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default BarcodeQRGenerator;
