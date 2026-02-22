# LuxeCart (formerly MERN Shop) - UI/UX Design Requirements

**Project Overview:** LuxeCart is a modern, full-stack e-commerce application built on the MERN stack (MongoDB, Express.js, React, Node.js) with Redux Toolkit and Material UI. It offers a premium shopping experience for users and a robust management dashboard for administrators.

**Target Aesthetic:** Modern Minimalist. Utilize a muted, earthy, and pastel color palette (e.g., soft blues, sage greens, warm grays, muted peach/pink) inspired by the provided reference image. The design should feel clean, calming, and uncluttered. Avoid harsh primary colors.

---

## 1. Core User Flows (Customer Facing)

### 1.1 Authentication Flow

- **Sign Up:** Users must register with Name, Email, and Password. Includes validation.
- **Email Verification:** A prompt to verify the email address before shopping (via OTP/link).
- **Login:** Standard credential login.
- **Forgot Password:** Flow to request a password reset link/OTP to their registered email.
- **Reset Password:** Screen to enter a new password after successful verification.

### 1.2 Browsing & Discovery

- **Homepage / Landing (Hero Section):** Needs a visually striking banner, promotional text, and clear calls to action (e.g., "Shop Now", "New Arrivals").
- **Product Catalog (Shop Page):**
  - **Grid/List Layout:** Clean display of `ProductCards`.
  - **Filtering & Sorting:** Sidebar or top bar for filtering by Category, Brand, Price Range. Sorting options (Price: Low to High, Highest Rated, Newest).
  - **Search Bar:** Global search functionality.
  - **Pagination/Infinite Scroll:** To handle large inventories.
- **Product Card UI:** Needs to display: Image, Title, Brand, Price, Rating summary (stars/%), and quick action buttons ("Add to Cart", "Add to Wishlist").

### 1.3 Product Details

- **Product Description Page (PDP):**
  - **Image Gallery:** Main large image with a carousel/thumbnails of additional angles.
  - **Product Info:** Title, Brand, Price, Stock Status (In Stock/Out of Stock), detailed description.
  - **Actions:** Quantity selector, primary "Add to Cart" button, secondary "Add to Wishlist" button.
- **Reviews & Ratings Section:**
  - Summary display (average rating, distribution of stars).
  - List of individual user reviews (User name, date, star rating, comment).
  - _"Write a Review"_ form (for logged-in users who purchased). Contains rating input and text area.
  - Users can edit or delete their own reviews.

### 1.4 Cart & Checkout

- **Shopping Cart (Drawer or Dedicated Page):**
  - List of added items with thumbnail, title, price.
  - Quantity adjustment (+ / -) for each item.
  - "Remove" item action.
  - Order Summary layout (Subtotal, Shipping, Taxes, Total).
  - Primary "Proceed to Checkout" button.
- **Checkout Flow:**
  - **Address Selection:** Choose from saved addresses or add a new one (Name, Street, City, State, Zip, Phone).
  - **Payment Integration:** (Conceptual UI) Options for Credit Card, PayPal, etc.
  - **Order Review:** Final check of items, shipping address, and total cost before confirming.

### 1.5 User Dashboard (Profile)

- **My Profile:** Manage basic info (Email, Username).
- **Address Book:** Create, read, update, delete (CRUD) multiple shipping addresses.
- **Order History:** List of past orders with status (Processing, Shipped, Delivered), date, and total amount. Clicking an order shows a detailed receipt.
- **Wishlist:** A dedicated page showing saved `ProductCards`. Includes the ability to add personalized notes/annotations to wishlist items and remove them.

---

## 2. Administrator Dashboard (Internal Tools)

The admin panel should have a distinct, utilitarian but clean design compared to the customer-facing storefront.

### 2.1 Product Management

- **Product List:** Data table showing all inventory with quick edit/delete actions.
- **Add/Edit Product Form:** Fields for Title, Description, Price, Discount Price, Images (upload/URLs), Category, Brand, Stock Quantity.
- **Soft Delete:** Ability to hide products without permanently removing them from the database (to preserve order history).

### 2.2 Order Management

- **Order List:** Data table of all customer orders. Filterable by status.
- **Order Details View:** View purchased items, customer info, shipping address.
- **Status Updates:** Ability to change an order's status (e.g., from "Pending" to "Dispatched").

---

## 3. UI/UX Design Guidelines for Figma

- **Responsive Breakpoints:** Design for Mobile (375px), Tablet (768px), and Desktop (1440px).
- **Typography:** Choose modern Google Fonts (e.g., _Inter_, _Outfit_, or _Poppins_ which is currently referenced in the code). Setup a clear type hierarchy (H1-H6, Body, Caption).
- **Color System:** Define Primary, Secondary, Background (Light/Dark mode variants if possible), Surface (Cards), Error, Success, and Warning colors.
- **Components:** Create reusable Figma components for standard elements:
  - Buttons (Primary, Secondary, Ghost, Disabled, Icon buttons)
  - Input Fields (Text, Dropdown, Checkbox, Radio)
  - Product Cards
  - Navigation Bars (Top Nav, Sidebar for Admin)
  - Modals / Dialogs
  - Toast Notifications

**Goal for Figma Switch:** By mapping out these exact features and expected data points, you can use AI generation tools like Switch to quickly layout the structural wireframes and then refine them with your desired "Luxe" aesthetic.
