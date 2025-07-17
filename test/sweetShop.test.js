/**
 * @file sweetShop.test.js
 * @description Unit tests for SweetShop Management System using dictionary-based inventory.
 *
 * These tests follow the Test-Driven Development (TDD) approach.
 * Each test verifies one key functionality — such as searching, sorting, purchasing, or restocking.
 *
 * Author: Priyansh Liya
 * Created: July 2025
 * Assisted by: ChatGPT (OpenAI)
 */

const { expect } = require("chai");
const SweetShop = require("../src/sweetShop");

describe("SweetShop Management System (Dictionary-based)", () => {
  let shop;

  //  Fresh instance before each test to ensure isolation
  beforeEach(() => {
    shop = new SweetShop();
  });

  //  Add Sweet
  it("should add a sweet and assign a unique string ID", () => {
    const sweet = shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    expect(sweet).to.include({ name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 });
    expect(sweet).to.have.property("id").that.is.a("string");
    expect(shop.inventory[sweet.id]).to.deep.equal(sweet);
  });

  //  Delete Sweet
  it("should delete a sweet by ID", () => {
    const sweet = shop.addSweet("Gulab Jamun", "Milk-Based", 10, 50);
    const deleted = shop.deleteSweet(sweet.id);
    expect(deleted).to.be.true;
    expect(shop.inventory[sweet.id]).to.be.undefined;
  });

  //  Get All Sweets
  it("should return all sweets", () => {
    shop.addSweet("Ladoo", "Nut-Based", 25, 30);
    shop.addSweet("Barfi", "Milk-Based", 35, 25);
    const sweets = shop.getAllSweets();
    expect(sweets).to.have.lengthOf(2);
    expect(sweets.map(s => s.name)).to.include.members(["Ladoo", "Barfi"]);
  });

  //  Search by exact category
  it("should search sweets by category", () => {
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    shop.addSweet("Gulab Jamun", "Milk-Based", 10, 50);
    const results = shop.searchSweets({ category: "Milk-Based" });
    expect(results).to.have.lengthOf(1);
    expect(results[0].name).to.equal("Gulab Jamun");
  });

  //  Search by partial name
  it("should search sweets by partial name match", () => {
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    shop.addSweet("Kalakand", "Milk-Based", 40, 20);
    const results = shop.searchSweets({ name: "Ka" });
    expect(results).to.have.lengthOf(2);
    expect(results.map(s => s.name)).to.include.members(["Kaju Katli", "Kalakand"]);
  });

  //  Search by price range
  it("should search sweets within a price range", () => {
    shop.addSweet("Rasgulla", "Milk-Based", 25, 10);
    shop.addSweet("Barfi", "Milk-Based", 40, 10);
    shop.addSweet("Halwa", "Vegetable-Based", 55, 10);
    const results = shop.searchSweets({ minPrice: 30, maxPrice: 50 });
    expect(results).to.have.lengthOf(1);
    expect(results[0].name).to.equal("Barfi");
  });

  //  Sort by price descending
  it("should sort sweets by price descending", () => {
    shop.addSweet("Barfi", "Milk-Based", 30, 20);
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    const sorted = shop.sortSweets("price", "desc");
    expect(sorted[0].price).to.equal(50);
    expect(sorted[1].price).to.equal(30);
  });

  //  Sort by name ascending
  it("should sort sweets by name ascending", () => {
    shop.addSweet("Gulab Jamun", "Milk-Based", 10, 20);
    shop.addSweet("Barfi", "Milk-Based", 15, 20);
    const sorted = shop.sortSweets("name", "asc");
    expect(sorted[0].name).to.equal("Barfi");
    expect(sorted[1].name).to.equal("Gulab Jamun");
  });

  //  Combine filter and sort (manually)
  it("should filter by category and sort by name", () => {
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 10);
    shop.addSweet("Gulab Jamun", "Milk-Based", 15, 10);
    shop.addSweet("Barfi", "Milk-Based", 10, 10);

    const filtered = shop.getAllSweets().filter(s => s.category === "Milk-Based");
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

    expect(sorted.map(s => s.name)).to.deep.equal(["Barfi", "Gulab Jamun"]);
  });

  //  Purchase success
  it("should purchase sweet if stock is available", () => {
    const sweet = shop.addSweet("Gajar Halwa", "Vegetable-Based", 30, 15);
    const success = shop.purchaseSweet(sweet.id, 5);
    expect(success).to.be.true;
    expect(shop.inventory[sweet.id].quantity).to.equal(10);
  });

  //  Purchase failure due to insufficient stock
  it("should not purchase sweet if stock is insufficient", () => {
    const sweet = shop.addSweet("Rasgulla", "Milk-Based", 25, 2);
    const success = shop.purchaseSweet(sweet.id, 5);
    expect(success).to.be.false;
    expect(shop.inventory[sweet.id].quantity).to.equal(2);
  });

  //  Restock
  it("should restock sweet by ID", () => {
    const sweet = shop.addSweet("Kalakand", "Milk-Based", 40, 5);
    const restocked = shop.restockSweet(sweet.id, 10);
    expect(restocked).to.be.true;
    expect(shop.inventory[sweet.id].quantity).to.equal(15);
  });

  //  No match search
  it("should return empty array if no sweets match search", () => {
    shop.addSweet("Barfi", "Milk-Based", 20, 10);
    const results = shop.searchSweets({ name: "Unknown Sweet" });
    expect(results).to.be.an("array").that.is.empty;
  });
});
