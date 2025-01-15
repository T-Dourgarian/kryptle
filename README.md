# Kryptle

Live Demo: [Kryptle](https://kryptle-c85be340ad52.herokuapp.com/)

## Running Locally

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application
```bash
npm start
```

### 4. Set Up Prisma
Open a second terminal and execute the following commands:
```bash
npm i -g prisma
prisma generate --schema server/prisma/schema.prisma
```

### 5. Set Up PostgreSQL Database
- Host a local PostgreSQL database.
- Copy the `database.sql` file into the database.

- ### 6. Configure Environment Variables
Create a `.env` file in the root directory and include the following variables:
```env
DATABASE_URL=<locally-hosted-db-URI>
AT_SECRET=<random-string>
REACT_APP_API_URL="http://localhost:5000"
RT_SECRET=<random-string>
```

### 6. Start Server
- npm run start:dev


