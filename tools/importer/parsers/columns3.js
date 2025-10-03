/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: expect 3 columns for columns3
  const colCount = 3;
  const headerRow = ['Columns (columns3)'];

  // Defensive: fill with empty divs if less than 3 columns
  while (columns.length < colCount) {
    const emptyDiv = document.createElement('div');
    columns.push(emptyDiv);
  }

  // Second row: each cell is the content of a column
  // Use the entire column div for each cell for resilience
  const contentRow = columns.map(col => col);

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
