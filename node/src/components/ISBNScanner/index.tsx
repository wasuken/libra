import React, { useState, useRef, useEffect } from "react";
import Quagga from "quagga";
import styles from "./index.module.css";

interface ISBNScannerProps {
  onISBNDetected: (isbn: string) => Promise<void>;
}

const ISBNScanner: React.FC<ISBNScannerProps> = ({ onISBNDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScanning && scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment",
            },
            target: scannerRef.current,
          },
          decoder: {
            readers: ["ean_reader"],
          },
          locate: true,
        },
        (err) => {
          // alert(err);
          if (err) {
            console.error(err);
            setIsScanning(false);
            return;
          }
          Quagga.start();
        },
      );

      Quagga.onProcessed((result) => {
        //alert(result);
        if (result == null) return; // 未検出の場合
        if (typeof result != "object") return;
        // alert(result.boxes);
        if (result.boxes == undefined) return;
        const ctx = Quagga.canvas.ctx.overlay;
        const canvas = Quagga.canvas.dom.overlay;
        ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, {
          color: "blue",
          lineWidth: 5,
        }); // 結果を描画
      });
      Quagga.onDetected((data) => {
        const code = data.codeResult.code;
        onISBNDetected(code);
        Quagga.stop();
        setIsScanning(false);
      });
    }

    // Cleanup function
    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning, onISBNDetected]);

  const startScanning = () => {
    setIsScanning(true);
  };
  const cancelScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className={styles.container}>
      {isScanning ? (
        <div>
          <button className={styles.scanButton} onClick={cancelScanning}>
            Cancel
          </button>
          <div ref={scannerRef} className={styles.scanner} />
        </div>
      ) : (
        <button className={styles.scanButton} onClick={startScanning}>
          Start Scanning
        </button>
      )}
    </div>
  );
};

export default ISBNScanner;
