/**
 * @fileoverview TDD-driven SweetShop inventory system using UUID-based dictionary storage.
 * Implements core  operations: Create, Edit (restock), Update (purchase), Delete,
 *  View, Search, Sort, Purchase, Restock.
 * Designed for unit testing and maintainability, without persistence.
 * @date 2025-07-16
 */

// Short unique ID generator (browser-compatible, no dependencies)
function shortId() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substring(0, 8);
}


class SweetShop {
  constructor() {
    // In-memory inventory using dictionary: { id: sweetObject }
    this.inventory = {};
  }

  /**
   * Creates a new sweet and stores it in the dictionary.
   * @returns {object} The added sweet with generated UUID.
   */
  addSweet(name, category, price, quantity) {
    const id = shortId();

    const sweet = { id, name, category, price, quantity };
    this.inventory[id] = sweet;
    return sweet;
  }

  /**
   * Deletes a sweet by its ID.
   * @returns {boolean} True if deleted, false if not found.
   */
  deleteSweet(id) {
    if (!this.inventory[id]) return false;
    delete this.inventory[id];
    return true;
  }

  /**
   * Returns all sweets as an array.
   * @returns {Array} List of sweet objects.
   */
  getAllSweets() {
    return Object.values(this.inventory);
  }

  /**
   * Filters sweets by optional name, category, and price range.
   * Used to support search functionality.
   */
  searchSweets(filter = {}) {
    return Object.values(this.inventory).filter(sweet => {
      const matchesName = filter.name ? sweet.name.includes(filter.name) : true;
      const matchesCategory = filter.category ? sweet.category === filter.category : true;
      const matchesPrice = (filter.minPrice != null && filter.maxPrice != null)
        ? sweet.price >= filter.minPrice && sweet.price <= filter.maxPrice
        : true;
      return matchesName && matchesCategory && matchesPrice;
    });
  }

  /**
   * Sorts sweets by a field ('price' or 'name') in given order ('asc' or 'desc').
   * Returns a new sorted array (non-mutating).
   */
  sortSweets(field = 'price', order = 'asc') {
    return Object.values(this.inventory).sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });
  }

  /**
   * Purchases (reduces quantity) if stock is sufficient.
   * @returns {boolean} True if purchase succeeds, false if not enough stock or sweet not found.
   */
  purchaseSweet(id, quantity) {
    const sweet = this.inventory[id];
    if (!sweet || sweet.quantity < quantity) return false;
    sweet.quantity -= quantity;
    return true;
  }

  /**
   * Restocks (adds quantity) to an existing sweet.
   * @returns {boolean} True if restocked, false if sweet not found.
   */
  restockSweet(id, quantity) {
    const sweet = this.inventory[id];
    if (!sweet) return false;
    sweet.quantity += quantity;
    return true;
  }
}

// Export for Node.js testing or attach to window in browser
if (typeof module !== 'undefined') {
  module.exports = SweetShop;
} else {
  window.SweetShop = SweetShop;
}
