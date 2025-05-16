# Keyword-Based Document Retrieval System

A full-stack document retrieval system that allows users to upload, search, and retrieve documents using keyword-based queries.

## Project Structure

Keyword-based-Document-Retrieval-System-/
├── backend/ # Node.js + Express server (API + Document processing)
├── frontend/ # React + Tailwind CSS frontend
├── db/ # PostgreSQL schema
├── README.md # Project documentation

## Features

- Upload plain text or `.txt` files
- Store documents with titles and content
- Search documents using keyword queries (TF-IDF)
- Rank results based on relevance
- Stylish responsive UI with Tailwind CSS

 Setup Instructions

1. Clone the Repository
git clone https://github.com/LochanaWijesinghe/Keyword-based-Document-Retrieval-System-.git
cd Keyword-based-Document-Retrieval-System-

2. Backend Setup (/backend)
cd backend
npm install
npm node app.js

3. Fronend Setup (/frontend)
cd ../frontend
npm install
npm run dev

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

4. Database setup (/db)
Create a PostgreSQL database
Run the SQL schema or scripts inside the db/ folder
Update the connection details in your backend .env file
Example .env in /backend:
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
PORT=5050

5. API Endpoints
Method	Endpoint	Description
GET	/api/documents	List all documents
POST	/api/documents/add	Add a text-based document
POST	/api/documents/upload	Upload file-based documents
GET	/api/documents/search	Search documents by keyword

Author
Built by Lochana Wijesinghe

GitHub: https://github.com/LochanaWijesinghe/


