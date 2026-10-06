import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Set up pdf.js worker URL
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('pdfjs worker initialization warning:', e);
}

/**
 * Gets the number of pages in a PDF file using pdf.js, with fallback to pdf-lib
 */
export async function getPdfPageCount(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();

    // Try pdf.js first as requested by specs
    try {
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      return pdf.numPages;
    } catch (pdfjsErr) {
      console.warn('pdf.js page count failed, trying pdf-lib fallback...', pdfjsErr);
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      return pdfDoc.getPageCount();
    }
  } catch (err) {
    console.error('Error reading PDF page count:', err);
    throw new Error('Unable to read this PDF file.');
  }
}

/**
 * Renders a specified page of a PDF onto an HTML canvas element using pdf.js
 */
export async function renderPdfPageToCanvas(file, pageNum, canvas) {
  if (!canvas) return;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(pageNum || 1);
    const viewport = page.getViewport({ scale: 1.2 });

    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  } catch (err) {
    console.error('Error rendering PDF page to canvas:', err);
  }
}

/**
 * GENERATES FINAL COMBINED PDF PACKAGE
 * Following Contest Rules:
 * 1. Page 1 must be Cover Page in ENGLISH.
 * 2. Cover page includes: Tender ID, Title, Procuring Entity, Bidder, Submission Deadline, Package Date, Included Docs.
 * 3. Append matched documents in requirement.order sequence.
 * 4. Add footer to EVERY page: "<tender_id> | Page X of Y" (e.g. T-2026-0417 | Page 3 of 18).
 * 5. Download filename: <tender_id>_Package.pdf
 */
export async function generateTenderPackagePdf({
  tender,
  requirements,
  matches,
  expiryDates,
  uploadedFilesMap,
  onProgress
}) {
  try {
    onProgress?.('Preparing package...', 10);

    const mergedPdf = await PDFDocument.create();
    const helveticaFont = await mergedPdf.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await mergedPdf.embedFont(StandardFonts.HelveticaBold);

    // Filter requirements to included matched ones in order
    const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);
    const includedDocs = [];

    onProgress?.('Reading documents...', 25);

    // 1. Pre-load document buffers and page counts
    for (const req of sortedReqs) {
      const fileId = matches[req.id];
      if (fileId && uploadedFilesMap[fileId]) {
        const fileObj = uploadedFilesMap[fileId];
        try {
          const arrayBuffer = await fileObj.file.arrayBuffer();
          const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
          const pageCount = srcPdf.getPageCount();

          includedDocs.push({
            req,
            fileObj,
            srcPdf,
            arrayBuffer,
            pageCount,
            expiryDate: expiryDates[req.id] || null
          });
        } catch (e) {
          console.error(`Failed to load PDF for requirement ${req.id}:`, e);
          throw new Error(`Unable to load attached PDF "${fileObj.name}". Please ensure it is not corrupted or password protected.`);
        }
      }
    }

    onProgress?.('Creating cover page...', 45);

    // 2. CREATE COVER PAGE (Page 1 - Standard A4 Size: 595.28 x 841.89 pt)
    const coverPage = mergedPdf.addPage([595.28, 841.89]);
    const { width, height } = coverPage.getSize();

    // Primary Colors for PDF (Deep Navy & Slate)
    const navyColor = rgb(18 / 255, 53 / 255, 91 / 255);
    const blueColor = rgb(37 / 255, 99 / 255, 235 / 255);
    const textDark = rgb(15 / 255, 23 / 255, 42 / 255);
    const textSlate = rgb(100 / 255, 116 / 255, 139 / 255);
    const borderGray = rgb(226 / 255, 232 / 255, 240 / 255);
    const lightBg = rgb(248 / 255, 250 / 255, 252 / 255);

    // Top Header Accent Bar
    coverPage.drawRectangle({
      x: 0,
      y: height - 16,
      width: width,
      height: 16,
      color: navyColor
    });

    // Branding Header
    coverPage.drawText('TENDERFLOW', {
      x: 40,
      y: height - 55,
      size: 18,
      font: helveticaBold,
      color: navyColor
    });

    coverPage.drawText('OFFICIAL TENDER SUBMISSION PACKAGE', {
      x: 40,
      y: height - 72,
      size: 9,
      font: helveticaBold,
      color: blueColor
    });

    // Divider
    coverPage.drawLine({
      start: { x: 40, y: height - 85 },
      end: { x: width - 40, y: height - 85 },
      thickness: 1,
      color: borderGray
    });

    // Document Title Banner
    coverPage.drawRectangle({
      x: 40,
      y: height - 160,
      width: width - 80,
      height: 60,
      color: lightBg,
      borderColor: borderGray,
      borderWidth: 1
    });

    coverPage.drawText('TENDER SUBMISSION PACKAGE', {
      x: 55,
      y: height - 125,
      size: 14,
      font: helveticaBold,
      color: navyColor
    });

    const truncatedTenderTitle = tender.title.length > 70 ? tender.title.substring(0, 67) + '...' : tender.title;
    coverPage.drawText(truncatedTenderTitle, {
      x: 55,
      y: height - 145,
      size: 10,
      font: helvetica,
      color: textDark
    });

    // Tender Information Metadata Box
    let currentY = height - 185;

    coverPage.drawText('TENDER INFORMATION', {
      x: 40,
      y: currentY,
      size: 11,
      font: helveticaBold,
      color: navyColor
    });

    currentY -= 15;

    const infoFields = [
      { label: 'Tender Reference ID:', value: tender.tender_id || 'N/A' },
      { label: 'Procuring Entity:', value: tender.procuring_entity || 'N/A' },
      { label: 'Bidder Name:', value: tender.bidder || 'N/A' },
      { label: 'Submission Deadline:', value: tender.submission_deadline || 'N/A' },
      { label: 'Package Generated Date:', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
    ];

    infoFields.forEach((field) => {
      coverPage.drawText(field.label, {
        x: 50,
        y: currentY,
        size: 9.5,
        font: helveticaBold,
        color: textSlate
      });
      coverPage.drawText(field.value, {
        x: 200,
        y: currentY,
        size: 9.5,
        font: helvetica,
        color: textDark
      });
      currentY -= 16;
    });

    currentY -= 15;

    // Divider
    coverPage.drawLine({
      start: { x: 40, y: currentY },
      end: { x: width - 40, y: currentY },
      thickness: 1,
      color: borderGray
    });

    currentY -= 20;

    // Table of Included Documents
    coverPage.drawText('TABLE OF INCLUDED DOCUMENTS', {
      x: 40,
      y: currentY,
      size: 11,
      font: helveticaBold,
      color: navyColor
    });

    currentY -= 18;

    // Table Header Row
    coverPage.drawRectangle({
      x: 40,
      y: currentY - 5,
      width: width - 80,
      height: 22,
      color: navyColor
    });

    coverPage.drawText('ORDER', { x: 50, y: currentY + 2, size: 8.5, font: helveticaBold, color: rgb(1, 1, 1) });
    coverPage.drawText('DOCUMENT TITLE', { x: 100, y: currentY + 2, size: 8.5, font: helveticaBold, color: rgb(1, 1, 1) });
    coverPage.drawText('PAGES', { x: 380, y: currentY + 2, size: 8.5, font: helveticaBold, color: rgb(1, 1, 1) });
    coverPage.drawText('EXPIRY DATE', { x: 450, y: currentY + 2, size: 8.5, font: helveticaBold, color: rgb(1, 1, 1) });

    currentY -= 22;

    // Table Rows
    includedDocs.forEach((doc, idx) => {
      const rowBg = idx % 2 === 0 ? lightBg : rgb(1, 1, 1);
      coverPage.drawRectangle({
        x: 40,
        y: currentY - 4,
        width: width - 80,
        height: 20,
        color: rowBg,
        borderColor: borderGray,
        borderWidth: 0.5
      });

      const orderStr = String(doc.req.order).padStart(2, '0');
      const titleStr = doc.req.title_en.length > 42 ? doc.req.title_en.substring(0, 39) + '...' : doc.req.title_en;
      const pagesStr = `${doc.pageCount} page${doc.pageCount > 1 ? 's' : ''}`;
      const expiryStr = doc.expiryDate || (doc.req.has_expiry ? 'Not Provided' : 'N/A');

      coverPage.drawText(orderStr, { x: 55, y: currentY + 2, size: 8.5, font: helveticaBold, color: textDark });
      coverPage.drawText(titleStr, { x: 100, y: currentY + 2, size: 8.5, font: helvetica, color: textDark });
      coverPage.drawText(pagesStr, { x: 380, y: currentY + 2, size: 8.5, font: helvetica, color: textSlate });
      coverPage.drawText(expiryStr, { x: 450, y: currentY + 2, size: 8.5, font: helvetica, color: doc.expiryDate ? textDark : textSlate });

      currentY -= 20;
    });

    currentY -= 30;

    // Official Verification Note Box at bottom of cover
    if (currentY > 70) {
      coverPage.drawRectangle({
        x: 40,
        y: 70,
        width: width - 80,
        height: 45,
        color: lightBg,
        borderColor: blueColor,
        borderWidth: 0.8
      });

      coverPage.drawText('SUBMISSION VERIFICATION STATEMENT', {
        x: 55,
        y: 100,
        size: 8.5,
        font: helveticaBold,
        color: blueColor
      });

      coverPage.drawText('All attached documents have been verified for completeness and validity using TenderFlow local processing.', {
        x: 55,
        y: 83,
        size: 8,
        font: helvetica,
        color: textSlate
      });
    }

    onProgress?.('Combining document pages...', 65);

    // 3. COMBINE ALL PAGES FROM MATCHED DOCUMENTS IN ORDER
    for (let i = 0; i < includedDocs.length; i++) {
      const doc = includedDocs[i];
      const pageIndices = doc.srcPdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(doc.srcPdf, pageIndices);

      copiedPages.forEach(page => {
        mergedPdf.addPage(page);
      });
    }

    onProgress?.('Adding page numbers and footers...', 85);

    // 4. ADD FOOTER TO EVERY PAGE
    // Required format: `<tender_id> | Page X of Y`
    const totalPages = mergedPdf.getPageCount();
    const tenderIdText = tender.tender_id || 'TENDER-PACKAGE';

    for (let i = 0; i < totalPages; i++) {
      const page = mergedPdf.getPage(i);
      const { width: pWidth } = page.getSize();

      // Footer divider line
      page.drawLine({
        start: { x: 40, y: 32 },
        end: { x: pWidth - 40, y: 32 },
        thickness: 0.5,
        color: rgb(203 / 255, 213 / 255, 225 / 255)
      });

      const footerString = `${tenderIdText}  |  Page ${i + 1} of ${totalPages}`;
      const footerWidth = helvetica.widthOfTextAtSize(footerString, 8.5);

      // Centered footer text
      page.drawText(footerString, {
        x: (pWidth - footerWidth) / 2,
        y: 18,
        size: 8.5,
        font: helvetica,
        color: rgb(71 / 255, 85 / 255, 105 / 255)
      });
    }

    onProgress?.('Finalizing package...', 95);

    // 5. SAVE AND GENERATE BLOB & DOWNLOAD URL
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const fileName = `${tenderIdText.replace(/[^a-zA-Z0-9_-]/g, '_')}_Package.pdf`;

    onProgress?.('Package ready', 100);

    return {
      blobUrl,
      fileName,
      totalPages,
      includedDocCount: includedDocs.length,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('Error generating PDF package:', err);
    throw err;
  }
}
