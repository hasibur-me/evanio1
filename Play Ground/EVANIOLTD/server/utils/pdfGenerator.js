// PDF Invoice Generator
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoicePDF = async (invoice, order, user) => {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(__dirname, '../uploads/invoices');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filename = `invoice-${invoice.invoiceNumber}.pdf`;
      const filepath = path.join(uploadsDir, filename);
      const stream = fs.createWriteStream(filepath);
      
      doc.pipe(stream);

      // Header
      doc.fontSize(20).text('INVOICE', { align: 'right' });
      doc.moveDown();
      doc.fontSize(10).text(`Invoice #: ${invoice.invoiceNumber}`, { align: 'right' });
      doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, { align: 'right' });
      if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, { align: 'right' });
      }
      doc.moveDown(2);

      // Company Info (left side)
      doc.fontSize(12).text('Evanio', { continued: false });
      doc.fontSize(10).text('Business Services Platform');
      doc.moveDown();

      // Billing Address
      doc.fontSize(12).text('Bill To:', { continued: false });
      doc.fontSize(10);
      if (invoice.billingAddress.name) doc.text(invoice.billingAddress.name);
      if (invoice.billingAddress.email) doc.text(invoice.billingAddress.email);
      if (invoice.billingAddress.address) doc.text(invoice.billingAddress.address);
      if (invoice.billingAddress.city || invoice.billingAddress.state || invoice.billingAddress.zipCode) {
        doc.text(`${invoice.billingAddress.city || ''} ${invoice.billingAddress.state || ''} ${invoice.billingAddress.zipCode || ''}`.trim());
      }
      if (invoice.billingAddress.country) doc.text(invoice.billingAddress.country);
      doc.moveDown(2);

      // Invoice Items Table
      const tableTop = doc.y;
      const itemHeight = 30;
      
      // Table Header
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Description', 50, tableTop);
      doc.text('Qty', 350, tableTop);
      doc.text('Unit Price', 400, tableTop, { width: 80, align: 'right' });
      doc.text('Total', 480, tableTop, { width: 70, align: 'right' });
      
      // Table Line
      doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();
      
      // Table Items
      let y = tableTop + 30;
      doc.font('Helvetica');
      invoice.items.forEach((item) => {
        doc.fontSize(10).text(item.description, 50, y, { width: 280 });
        doc.text(item.quantity.toString(), 350, y);
        doc.text(`$${item.unitPrice.toFixed(2)}`, 400, y, { width: 80, align: 'right' });
        doc.text(`$${item.total.toFixed(2)}`, 480, y, { width: 70, align: 'right' });
        y += itemHeight;
      });

      // Totals
      y += 10;
      doc.moveTo(50, y).lineTo(550, y).stroke();
      y += 20;
      
      doc.fontSize(10);
      doc.text('Subtotal:', 400, y, { width: 80, align: 'right' });
      doc.text(`$${invoice.subtotal.toFixed(2)}`, 480, y, { width: 70, align: 'right' });
      
      if (invoice.tax > 0) {
        y += 20;
        doc.text('Tax:', 400, y, { width: 80, align: 'right' });
        doc.text(`$${invoice.tax.toFixed(2)}`, 480, y, { width: 70, align: 'right' });
      }
      
      if (invoice.discount > 0) {
        y += 20;
        doc.text('Discount:', 400, y, { width: 80, align: 'right' });
        doc.text(`-$${invoice.discount.toFixed(2)}`, 480, y, { width: 70, align: 'right' });
      }
      
      y += 20;
      doc.moveTo(400, y).lineTo(550, y).stroke();
      y += 20;
      
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Total:', 400, y, { width: 80, align: 'right' });
      doc.text(`$${invoice.total.toFixed(2)}`, 480, y, { width: 70, align: 'right' });

      // Payment Status
      y += 40;
      doc.fontSize(10).font('Helvetica');
      doc.text(`Payment Status: ${invoice.status.toUpperCase()}`, 50, y);
      if (invoice.paidAt) {
        doc.text(`Paid On: ${new Date(invoice.paidAt).toLocaleDateString()}`, 50, y + 20);
      }

      // Notes
      if (invoice.notes) {
        y += 60;
        doc.text('Notes:', 50, y);
        doc.text(invoice.notes, 50, y + 20, { width: 500 });
      }

      // Footer
      const pageHeight = doc.page.height;
      doc.fontSize(8)
        .text('Thank you for your business!', 50, pageHeight - 50, { align: 'center' })
        .text('Evanio - Business Services Platform', 50, pageHeight - 30, { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        const publicUrl = `/uploads/invoices/${filename}`;
        resolve({
          filepath,
          filename,
          url: publicUrl
        });
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

