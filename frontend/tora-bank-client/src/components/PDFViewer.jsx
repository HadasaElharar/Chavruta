import React, { useState, useEffect } from 'react';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';


const PDFViewer = ({ filePath }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const fileRef = ref(storage, "Reciptes/" + filePath);
                const url = await getDownloadURL(fileRef);
                setPdfUrl(url);
            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        };

        fetchPDF();
    }, [filePath]);

    return (
        <div>
            {pdfUrl ? (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    לצפייה בקבלה
                </a>) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PDFViewer;