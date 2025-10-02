/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the three main column contents from the footer
  const logoContainer = element.querySelector('.site-footer__logo-container');
  const externalLinks = element.querySelector('.site-footer__external-links');
  const socialLinks = element.querySelector('.site-footer__social-links');

  // Build columns array by referencing existing elements
  const columns = [];
  if (logoContainer) columns.push(logoContainer);
  if (externalLinks) columns.push(externalLinks);
  if (socialLinks) columns.push(socialLinks);

  // Ensure exactly three columns for layout balance
  while (columns.length < 3) columns.push('');

  // Table header must match block name exactly
  const headerRow = ['Columns (columns4)'];
  const columnsRow = columns;

  // Create the table with the required header and columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
