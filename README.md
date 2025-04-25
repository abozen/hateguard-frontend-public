# HateGuard Frontend

## Overview
The HateGuard Frontend is a modern React application that provides a user-friendly interface for monitoring and analyzing Twitter content for potential hate speech and offensive material. This single-page application connects to the HateGuard backend API to fetch, display, and highlight potentially problematic tweets mentioning specific Twitter usernames.

## Features
- **Clean, Intuitive Interface**: Modern design with a focus on readability and usability
- **Real-time Tweet Search**: Easily search for tweets mentioning any Twitter username
- **Visual Risk Indicators**: Clear visual indicators for tweets with high hate speech scores
- **Interactive Tweet Display**: Click on any tweet to view it directly on Twitter
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Loading States**: Provides visual feedback during API calls
- **Error Handling**: Clear error messaging when issues occur

## Technical Architecture

### Core Technologies
- **React**: Frontend library for building the user interface
- **Lucide React**: Icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling

### Component Structure
The application is built as a single React component (`App`) that manages:
- User input handling
- API communication
- State management
- UI rendering

### State Management
The application uses React's useState hook to manage several state variables:
- `username`: The Twitter username being searched
- `tweets`: Array of tweet data retrieved from the API
- `error`: Error message if API call fails
- `isLoading`: Boolean flag for loading state
- `isScanning`: Boolean flag indicating if backend is scanning for new tweets
- `isFirstTime`: Boolean flag indicating if this is the first scan for this username
- `message`: Status message from the backend

### API Integration
The frontend communicates with the HateGuard backend through a simple RESTful API:
- `GET /api/tweets/{username}`: Retrieves tweets mentioning the specified username

### User Interface Components

#### Navigation Bar
- Fixed position at the top of the screen
- Displays the application name and description

#### Search Section
- Input field for entering Twitter usernames
- Search button to initiate API calls

#### Status Messages
- Information about scanning status
- Error messages when API calls fail

#### Tweet Display
- Individual tweet cards with user information
- Tweet content with original formatting
- Engagement metrics (replies, retweets, likes, views)
- Hate speech score with visual indicator
- Warning box for tweets classified as offensive

### UI/UX Features
- **Interactive Elements**: Hover effects on clickable items
- **Visual Feedback**: Loading spinner during API calls
- **Metric Formatting**: Automatic formatting of large numbers (e.g., 1K, 1M)
- **External Links**: Direct links to Twitter profiles and tweets

## User Flow
1. User enters a Twitter username in the search field
2. Upon clicking "Search", the application displays a loading spinner
3. After the API responds, tweets are displayed in a scrollable list
4. Status messages inform the user about the scanning process
5. Tweets with high hate scores are visually highlighted
6. Users can click on tweets to view them directly on Twitter

## Code Structure

### Main Component
The `App` component handles all the functionality:
- State initialization with useState hooks
- API communication through fetch
- Event handlers for user interactions
- Rendering of UI components based on state

### Helper Functions
- `handleSubmit`: Manages the API call process
- `formatNumber`: Formats large numbers for display (e.g., 1000 → 1K)

### Styling
The application uses Tailwind CSS for styling with:
- Responsive design principles
- Custom hover states
- Consistent color scheme
- Accessibility considerations

## Setup and Configuration

### Prerequisites
- Node.js (v14 or later recommended)
- npm or yarn package manager

### Configuration
The application uses a configuration file (`config.js`) to store environment-specific values:
```javascript
// config.js example
export default {
  API_BASE_URL: 'https://api.hateguard.example.com/api'
};
```

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure the `config.js` file with your backend API URL
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Building for Production
To create an optimized production build:
```bash
npm run build
# or
yarn build
```

## Integration with Backend
The frontend expects the backend API to return data in the following format:
```json
{
  "tweets": [
    {
      "tweetId": "1234567890",
      "userName": "user123",
      "name": "User Name",
      "content": "Tweet content here",
      "profileImageUrl": "https://...",
      "favCount": 5,
      "replyCount": 2,
      "retweetCount": 1,
      "viewCount": 100,
      "createdAt": "2023-04-20T15:30:00Z",
      "isOffensive": false,
      "hateScore": 15
    }
  ],
  "isScanning": true,
  "isFirstTime": false,
  "message": "Tweet taraması başlatıldı. Lütfen birkaç dakika sonra tekrar kontrol edin."
}
```

## Future Enhancements
- User authentication for personalized monitoring
- Filtering options for tweet display
- Advanced analytics and reporting features
- Localization for multiple languages
- Detailed view for individual tweet analysis
- Real-time updates using WebSockets
- Tweet categorization by risk level
