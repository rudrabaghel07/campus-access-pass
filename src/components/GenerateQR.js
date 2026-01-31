// src/components/GenerateQR.js
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';
import '../App.css';
import { db } from '../firebase';
import '../index.css';
import '../styles.css';

const GenerateQR = () => {
    const [userId, setUserId] = useState('');
    const [showQR, setShowQR] = useState(false);
    const qrRef = useRef(null);

    const [showToast, setShowToast] = useState(false);

    const handleGenerate = async () => {
        if (userId.trim()) {
            setShowQR(true);
            setShowToast(true);
            try {
                await addDoc(collection(db, 'access-pass'), {
                    userId: userId,
                    generatedAt: Timestamp.now(),
                });
                console.log("Saved to Firebase!");
            } catch (err) {
                console.error("Error saving to Firebase: ", err);
            }

            // Hide toast after 2.2s
            setTimeout(() => setShowToast(false), 2200);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="hero d-flex align-items-center gap-3 mb-3">
                    <div className="hero-badge d-flex align-items-center justify-content-center">🎓</div>
                    <div>
                        <h4 className="mb-0">Generate Access Pass</h4>
                        <small className="text-muted">Quickly create and save a QR code</small>
                    </div>
                </div>

                <input
                    type="text"
                    className="form-control mb-3 input-lg"
                    placeholder="🎓 Enter Student/Staff ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <button className="btn btn-primary w-100 mb-2" onClick={handleGenerate}>
                    🔄 Generate QR
                </button>

                {showQR && (
                    <div className="text-center mt-3">
                        <div className="qr-animate">
                            <div ref={qrRef} className="qr-wrapper mx-auto p-3">
                                <QRCodeCanvas value={userId} size={220} />
                            </div>
                            <div className="ring" aria-hidden="true"></div>
                        </div>

                        <p className="mt-2"><strong>ID:</strong> {userId}</p>

                        <div className="d-flex gap-2 justify-content-center mt-2">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => {
                                    navigator.clipboard?.writeText(userId);
                                }}
                            >
                                📋 Copy ID
                            </button>

                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => {
                                    // trigger download of QR as PNG
                                    const canvas = qrRef.current?.querySelector('canvas');
                                    if (canvas) {
                                        const url = canvas.toDataURL('image/png');
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `campus-qr-${userId}.png`;
                                        a.click();
                                    }
                                }}
                            >
                                ⬇️ Download
                            </button>
                        </div>
                    </div>
                )}

                {showToast && (
                    <div className="toast-success shadow-sm mt-3 mx-auto">
                        <strong>Success</strong>
                        <div className="small">QR generated and saved</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateQR;
