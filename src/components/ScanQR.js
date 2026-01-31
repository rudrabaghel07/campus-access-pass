// src/components/ScanQR.js
import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useRef, useState } from 'react';
import '../App.css';
import '../styles.css';

const ScanQR = () => {
    const [scannedData, setScannedData] = useState('');
    const scannerRef = useRef(null);

    React.useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 300,
            },
            fps: 10,
        });

        scannerRef.current = scanner;

        scanner.render(
            (decodedText) => {
                setScannedData(decodedText);
                // keep scanner running for multiple scans; comment the next line if you want continuous scans
                scanner.clear().catch(() => {});
            },
            (error) => {
                // You can show an overlay or ignore minor scan failures
            }
        );

        return () => {
            scannerRef.current?.clear().catch(() => {});
        };
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow scan-card p-4" style={{ maxWidth: '720px', width: '100%' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="mb-0">📷 Scan QR Code</h3>
                    <small className="text-muted">Allow camera access to scan</small>
                </div>

                <div className="d-flex flex-column flex-lg-row gap-4 align-items-center">
                    <div id="reader" className="scanner-box bg-light p-2 rounded" style={{ minWidth: '320px' }}></div>

                    <div className="flex-grow-1">
                        <p className="text-muted">Point the camera at a generated QR to read the ID encoded on the pass.</p>
                        {scannedData ? (
                            <div className="alert alert-success">
                                ✅ <strong>Scanned ID:</strong> {scannedData}
                            </div>
                        ) : (
                            <div className="placeholder-box p-3 rounded bg-white border">No QR scanned yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanQR;
