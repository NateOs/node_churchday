
# Church Management API

A Node.js/Express backend API for church management with MongoDB, featuring authentication, member management, attendance tracking, and service scheduling.

## Quick Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas or local)

### Installation

1. **Clone and install**
```bash
git clone https://github.com/your-username/node_churchday.git
cd node_churchday
npm install
```

2. **Environment Configuration**
Create a `.env` file in the root directory with:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/churchdb
JWT_SECRET=your_jwt_secret_here
```

3. **Run the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Record attendance
- `GET /api/services` - Get service schedules
- `POST /api/services` - Create new service schedule
