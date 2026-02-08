import { renderToFile } from '@react-pdf/renderer';
import path from 'path';
import React from 'react';

import PDFDocument from '../src/components/PDFDocument';

const generatePDF = async () => {
    const outputPath = path.join(
        process.cwd(),
        'public',
        'assets',
        'Lucas_Morais_Resume.pdf'
    );

    console.log('Generating PDF resume...');
    console.log(`Output path: ${outputPath}`);

    try {
        await renderToFile(<PDFDocument />, outputPath);
        console.log('✅ PDF generated successfully!');
        console.log(`📄 File saved to: ${outputPath}`);
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    }
};

generatePDF();
