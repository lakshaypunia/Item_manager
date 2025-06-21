# 🛍️ Item Manager – A Simple Marketplace with Appwrite + Next.js

Welcome to **Item Manager**, a clean and modern full-stack marketplace where users can list and browse items like used products, files, or practical sheets, and contact sellers via email. Built entirely with **Next.js**, **TypeScript**, **Tailwind CSS**, **Shadcn/UI**, and powered by **Appwrite** for backend storage and database.

---

## ✨ Features

- 🏠 **Home Page** – Introduction to the app
- 📦 **View Items Page** – Browse all listed items with image, description, and price
- ➕ **Add Item Page** – Submit a new item with name, type, description, price, and images
- 📬 **Add Enquiry Email Page** – Set up and verify your email to receive enquiries

Each page includes a common **navbar** with 4 buttons to easily navigate between the pages.

---

## 🛠 Tech Stack

- ⚛️ **Next.js 14** (App Router)
- ⛑ **TypeScript**
- 🎨 **Tailwind CSS**
- 💅 **Shadcn/UI**
- 🧩 **React Hook Form + Zod**
- 📦 **Appwrite** (Database, Storage, and OTP Email)
- 📧 `mailto:` integration for enquiry functionality

---

## 🔌 How the Project Works

- We use **Appwrite** to manage the backend (databases and file storage).
- When a user adds a new item:
  - The **cover image** is uploaded to the `cover-images` bucket.
  - The **extra images** are uploaded to the `extra-images` bucket.
  - An item document is created in the Appwrite database with all form fields and uploaded file IDs.
- The **View Items** page fetches these documents directly from Appwrite and displays them.
- The **Enquire** button opens the user's Gmail (or default mail app) with the recipient set to the verified email from the **Add Enquiry Email** page.
- Email setup uses **OTP verification** via Appwrite to confirm the user’s email before storing it.

---

## 📩 Enquiry Email Setup

1. Go to the **"Add Enquiry Email"** page.
2. Enter your email address and click **Add Email**.
3. You'll receive an **OTP verification email**.
4. Once verified, your email will be stored in the database.
5. Now, when anyone clicks **Enquire** on an item, it opens Gmail with your email pre-filled in the `To:` field.

This ensures that only verified emails are used for enquiries.

---

## 🧱 Appwrite Setup Instructions

1. Go to your [Appwrite console](https://appwrite.io) (self-hosted or Appwrite Cloud).
2. Create a **new project**.
3. Create a **database**, and inside it:
   - Create a **collection** named `items` to store item data.
   - Create another **collection** named `users` to store enquiry emails.
4. Create **two storage buckets**:
   - `cover-images` – for storing the cover image of each item.
   - `extra-images` – for storing additional images of items.
5. Enable required permissions (e.g., `role:all` for testing or `role:users` for auth-protected setups).
6. Generate an **API key** (called `secretKey`) with permission to access the above resources.

---

## 🔐 Required Environment Variables

Create a `.env.local` file at the root of your project and add the following:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION=your_items_collection_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_cover_images_bucket_id
NEXT_APPWRITE_SECRET=your_secret_api_key


## 🚀 Local Development Setup

Follow these steps to run the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/lakshaypunia/Item_manager.git
cd item-manager

# 2. Install dependencies
npm install

# 3. Create a .env.local file and add the required environment variables
# Example:
# NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
# NEXT_PUBLIC_EMAIL_ID=example@example.com

# 4. Start the development server
npm run dev