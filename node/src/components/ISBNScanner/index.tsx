// ISBNScanner/index.tsx
import React, { useState, useRef } from "react";
import Quagga from "quagga";
import styles from "./index.module.css";

interface ISBNScannerProps {
  onISBNDetected: (isbn: string) => void;
}

const ISBNScanner: React.FC<ISBNScannerProps> = ({ onISBNDetected }) => {
n  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);

  const startScanning = () => {
    if (!scannerRef.current) return;

    setIsScanning(true); // スキャン中の状態を設定

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // リアカメラを使用
          },
          target: scannerRef.current, // スキャン対象の要素
        },
        decoder: {
          readers: ["ean_reader"], // EAN（ヨーロッパ記事番号、ISBNにも使用される）バーコードを読み取る
        },
        locate: true, // バーコードの位置を描画する
      },
      (err) => {
        if (err) {
          console.error(err);
          setIsScanning(false); // エラー時にスキャン中の状態を解除
          return;
        }
        Quagga.start();
      },
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      onISBNDetected(code);
      Quagga.stop(); // バーコードを検出したらスキャンを停止
      setIsScanning(false); // スキャンが完了したらスキャン中の状態を解除
    });
  };

  return (
    <div className={styles.container}>
      {isScanning ? (
        <div ref={scannerRef} className={styles.scanner} />
      ) : (
        <button className={styles.scanButton} onClick={startScanning}>
          Start Scanning
        </button>
      )}
    </div>
  );
};

export default ISBNScanner;
