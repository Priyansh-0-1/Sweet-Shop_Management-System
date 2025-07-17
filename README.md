### Sweet Shop Management System: A TDD Approach

This project showcases a robust and user-friendly inventory management system for a sweet shop, developed with a strong emphasis on Test-Driven Development (TDD). By prioritizing testing throughout the development lifecycle, we've ensured a reliable and maintainable application.

-----

### **Key Features:**

  * **Comprehensive Sweet Management:**

      * **Add:** Seamlessly add new sweet varieties to your inventory.
      * **Delete:** Effortlessly remove sweets that are no longer stocked.
      * **Restock:** Efficiently update quantities for existing sweet products.
      * **Purchase:** Accurately track sales and deplete stock with each customer transaction.

  * **Advanced Search & Filtering:**

      * **Search by Name:** Quickly locate sweets by their specific names.
      * **Search by Price Range:** Filter sweets based on a minimum and maximum price, allowing for targeted inventory analysis.
      * **Filter by Category:** Organize and view sweets by their designated categories for better management.

  * **Intuitive Data Organization:**

      * **Sort by Name:** Arrange your sweet inventory alphabetically for easy Browse.
      * **Sort by Price:** Order sweets by price, enabling quick identification of high-value or discounted items.

  * **Enhanced User Experience:**

      * **Smart Suggestions:** As you type sweet names, the system provides intelligent suggestions, accelerating data entry and reducing errors.

  * **Rigorous Testing & Quality Assurance:**

      * **Fully Tested:** The entire system has undergone comprehensive testing using the powerful **Mocha** testing framework and **Chai** assertion library.
      * **TDD Methodology:** All tests were meticulously crafted following the Test-Driven Development approach, ensuring that business logic was thoroughly validated before implementation.
      * **AI-Driven Test Design:** Leveraging AI-driven suggestions during test design and development significantly enhanced test coverage and efficiency.

-----

### **Project Structure:**

The project is thoughtfully organized into the following directories:

  * `src/sweetShop.js`: Contains the core business logic of the sweet shop, implemented using an efficient dictionary-based data structure for managing sweets.
  * `public/index.html`: Defines the intuitive and responsive user interface, providing the front-end display for the sweet shop management system.
  * `public/app.js`: Houses the frontend logic responsible for handling user interactions and seamlessly communicating with the core business logic.
  * `test/sweetShop.test.js`: Contains a comprehensive suite of unit tests, meticulously crafted to validate every aspect of the `sweetShop.js` business logic.

-----

### **Testing:**

To run the tests and verify the system's integrity, follow these simple steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Execute Tests:**
    ```bash
    npm test
    ```

**All tests are written adhering to the strict principles of the TDD method, providing clear specifications and ensuring the correctness of the application's functionality. The integration of AI-driven suggestions played a crucial role in shaping the robust and comprehensive test suite.**
