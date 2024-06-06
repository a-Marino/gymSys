## GymSys is a personal project aimed at creating a comprehensive gym management website. This application features user authentication using ReactJs with Firebase and includes a backend server built with NodeJs and Express.

#### Features
- **User Authentication**: Secure login and registration using Firebase.
- **Client Side**: Developed with ReactJs for a responsive and dynamic user interface.
- **Server Side**: Built with NodeJs and Express for robust server operations.
- **Database Integration**: Data management and storage with Firebase.

---

## Getting Started

### Prerequisites
- NodeJs
- npm
- Firebase account

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/a-Marino/gymSys.git
   cd gymSys

2. **Install dependencies for the client:**
   ```bash
   cd client
   npm install

3. **Install dependencies for the server:**
   ```bash
   cd server
   npm install

### Firebase Configuration
1. Create a project in Firebase: Firebase Console
2. Configure Firebase in the client:
   - In the Firebase console, go to **Project Settings > Your apps > Firebase SDK setup and configuration.**
   - Copy the Firebase configuration and paste it into a **.env** file in **client**:
     ```env
     REACT_APP_API_KEY=your_api_key
     REACT_APP_AUTH_DOMAIN=your_auth_domain
     REACT_APP_PROJECT_ID=your_project_id
     REACT_APP_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_APP_ID=your_app_id
3. Configure Firebase Admin SDK in the server:
   - In the Firebase console, go to **Project Settings > Service accounts.**
   - Generate a new private key and download it.
   - Move the private key file to **server** and name it **serviceAccountKey.json**
 
### Running the aplication

1. Start the client:
   ```bash
   cd client
   npm run dev

2. Start the server:
   ```bash
   cd server
   npm run dev
     
