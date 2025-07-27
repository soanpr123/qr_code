import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";

const BarcodeQRGenerator = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [inputText, setInputText] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");
    const barcodeRefs = useRef([]);

    const handleInputChange = (e) => {
        const cleanedText = e.target.value.replace(/['"]/g, "");
        setInputText(cleanedText);
    };

    const handleInputQuantityChange = (e) => {
        setInputQuantity(e.target.value);
    };

    const lines = inputText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

    const quantities = inputQuantity
        .split("\n")
        .map((q) => parseInt(q.trim()))
        .filter((q) => !isNaN(q));

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
    }, [activeTab, lines]);

    return (
        <div className="container mt-4">
            <h2 className="text-center fw-bold mb-3">QR Code & Barcode Generator</h2>
            <div className="row mb-3">
                <div className="col-md-6 mb-3">
                    <textarea
                        className="form-control"
                        rows="6"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Nhập nội dung (mỗi dòng tạo 1 QR Code)..."
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <textarea
                        className="form-control"
                        rows="6"
                        value={inputQuantity}
                        onChange={handleInputQuantityChange}
                        placeholder="Nhập số lượng tương ứng mỗi dòng..."
                    />
                </div>
            </div>

            <div className="row">
                {inputText
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line !== "")
                    .map((line, index) => {
                        const quantityLine = inputQuantity.split("\n")[index];
                        const qty = parseInt(quantityLine) || 1;
                        return (
                            <div key={index} className="col-md-3 text-center p-3 border">
                                <h6>{line}</h6>
                                <QRCode value={line} size={100} />
                                <div className="mt-2 text-muted fw-bold">Số lượng: {qty}</div>
                            </div>
                        );
                    })}
            </div>


        </div>
    );
};

export default BarcodeQRGenerator;
