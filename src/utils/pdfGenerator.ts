import {
  AGENCY_CONFIG,
  MEMBERSHIP_PLANS,
  SERVICE_CATEGORIES,
} from '../data/services';
import { formatINR } from './format';

/**
 * Dynamically imports jsPDF and jspdf-autotable only when requested so the PDF
 * bundle is code-split away from the initial page load.
 */
export async function generateRateCardPdf(): Promise<void> {
  const [{ jsPDF }, autoTableModule] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);

  const autoTable = autoTableModule.default;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;

  // Brand Header Banner
  doc.setFillColor(7, 11, 22); // #070B16
  doc.rect(0, 0, pageWidth, 34, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(AGENCY_CONFIG.brandName, marginX, 15);

  doc.setTextColor(59, 130, 246); // #3B82F6
  doc.setFontSize(8.5);
  doc.text(AGENCY_CONFIG.brandSubtitle, marginX, 20.5);

  doc.setTextColor(245, 158, 11); // #F59E0B
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.text(`"${AGENCY_CONFIG.tagline}"`, marginX, 27.5);

  // Header Right: Contact & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('OFFICIAL RATE CARD', pageWidth - marginX, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(
    `WhatsApp / Call: ${AGENCY_CONFIG.deskLines[0].displayNumber}`,
    pageWidth - marginX,
    20.5,
    { align: 'right' }
  );
  doc.text(`Email: ${AGENCY_CONFIG.email}`, pageWidth - marginX, 26, {
    align: 'right',
  });

  let cursorY = 42;

  // Service Categories Tables
  for (const category of SERVICE_CATEGORIES) {
    if (cursorY > pageHeight - 52) {
      doc.addPage();
      cursorY = 18;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`${category.number} ${category.title}`, marginX, cursorY);
    cursorY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(category.description, marginX, cursorY, {
      maxWidth: pageWidth - marginX * 2,
    });
    cursorY += category.description.length > 95 ? 8 : 5;

    const rows = category.services.map((service) => [
      service.recommended ? `${service.name} (Recommended)` : service.name,
      `${formatINR(service.price)} ${service.billingCycle}`,
      service.features.map((f) => `• ${f}`).join('\n'),
    ]);

    autoTable(doc, {
      startY: cursorY,
      head: [['Service Package', 'Price (INR)', 'Included Deliverables']],
      body: rows,
      margin: { left: marginX, right: marginX },
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 41, 59],
        cellPadding: 2.5,
      },
      columnStyles: {
        0: { cellWidth: 48, fontStyle: 'bold' },
        1: { cellWidth: 34, fontStyle: 'bold' },
        2: { cellWidth: 'auto' },
      },
    });

    const lastTable = (doc as unknown as { lastAutoTable?: { finalY: number } })
      .lastAutoTable;
    cursorY = (lastTable?.finalY ?? cursorY + 25) + 8;
  }

  // Membership Plans Table
  if (cursorY > pageHeight - 62) {
    doc.addPage();
    cursorY = 18;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`${AGENCY_CONFIG.brandName} VIP Annual Membership`, marginX, cursorY);
  cursorY += 4;

  autoTable(doc, {
    startY: cursorY,
    head: [['Membership Tier', 'Annual Fee', 'Service Discount', 'Member Benefits']],
    body: MEMBERSHIP_PLANS.map((plan) => [
      plan.popularBadge ? `${plan.name} (${plan.popularBadge})` : plan.name,
      `${formatINR(plan.price)} ${plan.billingLabel}`,
      `${plan.discountPercent}% OFF`,
      plan.features.map((f) => `• ${f}`).join('\n'),
    ]),
    margin: { left: marginX, right: marginX },
    theme: 'grid',
    headStyles: {
      fillColor: [245, 158, 11],
      textColor: [15, 23, 42],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 2.5,
    },
    columnStyles: {
      0: { cellWidth: 44, fontStyle: 'bold' },
      1: { cellWidth: 28, fontStyle: 'bold' },
      2: { cellWidth: 24, fontStyle: 'bold' },
      3: { cellWidth: 'auto' },
    },
  });

  const afterMemberTable = (doc as unknown as { lastAutoTable?: { finalY: number } })
    .lastAutoTable;
  let noteY = (afterMemberTable?.finalY ?? cursorY + 30) + 8;

  if (noteY > pageHeight - 28) {
    doc.addPage();
    noteY = 20;
  }

  // Important Notes & Contact Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(marginX, noteY, pageWidth - marginX * 2, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Important Notes:', marginX + 4, noteY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    '• Domain & hosting are separate on website packages.  • Meta/Google ad spend is billed separately.',
    marginX + 4,
    noteY + 11.5
  );
  doc.text(
    `• Direct Inquiries: ${AGENCY_CONFIG.deskLines[0].displayNumber}  |  ${AGENCY_CONFIG.email}`,
    marginX + 4,
    noteY + 15.5
  );

  // Page Footers (date generated + disclaimer + page numbers)
  const totalPages = doc.getNumberOfPages();
  const generatedDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
    doc.setPage(pageIndex);
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 13, pageWidth - marginX, pageHeight - 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Generated on ${generatedDate}  |  Prices are subject to change.`,
      marginX,
      pageHeight - 8
    );
    doc.text(`Page ${pageIndex} of ${totalPages}`, pageWidth - marginX, pageHeight - 8, {
      align: 'right',
    });
  }

  doc.save(`${AGENCY_CONFIG.brandName}-Rate-Card.pdf`);
}
