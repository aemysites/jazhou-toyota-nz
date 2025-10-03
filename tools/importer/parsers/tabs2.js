/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find all tab panels in the dealer finder overlay
  function getTabPanels() {
    // There are two main tab panels in the HTML: the default and the campaign
    // Both appear as .dealer-finder__panel
    return Array.from(element.querySelectorAll('.dealer-finder__panel'));
  }

  // Helper to find the alert tab
  function getAlertTab() {
    // The alert tab is in .alert.dealer-alert
    return element.querySelector('.alert.dealer-alert');
  }

  // Compose the header row
  const headerRow = ['Tabs (tabs2)'];
  const rows = [headerRow];

  // Get tab panels (default and campaign)
  const tabPanels = getTabPanels();

  // Compose the tab rows
  // Tab 1: Find a store (Default)
  if (tabPanels[0]) {
    // Label: from h4 inside the first panel
    const h4 = tabPanels[0].querySelector('h4');
    const label = h4 ? h4.textContent.trim() : 'Tab 1';
    // Content: the entire panel, minus the h4 (to avoid duplicate label)
    // We'll clone the panel and remove the h4
    const panelContent = tabPanels[0].cloneNode(true);
    const h4ToRemove = panelContent.querySelector('h4');
    if (h4ToRemove) h4ToRemove.remove();
    rows.push([label, panelContent]);
  }

  // Tab 2: Find a store (Campaign)
  if (tabPanels[1]) {
    const h4 = tabPanels[1].querySelector('h4');
    const label = h4 ? h4.textContent.trim() : 'Tab 2';
    const panelContent = tabPanels[1].cloneNode(true);
    const h4ToRemove = panelContent.querySelector('h4');
    if (h4ToRemove) h4ToRemove.remove();
    rows.push([label, panelContent]);
  }

  // Tab 3: Dealer Alert (if present)
  const alertTab = getAlertTab();
  if (alertTab) {
    // Label: from the link text inside .dealer-finder ("Find a store")
    const labelEl = alertTab.querySelector('.dealer-finder a');
    const label = labelEl ? labelEl.textContent.trim() : 'Alert';
    // Content: the entire alert block, minus the tab label link
    const alertContent = alertTab.cloneNode(true);
    // Remove the tab label link from the content
    const linkToRemove = alertContent.querySelector('.dealer-finder');
    if (linkToRemove) linkToRemove.remove();
    rows.push([label, alertContent]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
