# Task Flow Application

A modern, feature-rich task management application built with Next.js, React, and Tailwind CSS. This application provides a comprehensive task board with authentication, drag-and-drop functionality, and persistent data storage.

## Features

### Authentication System
- **Static Login Flow**: Hardcoded credentials for demo purposes
  - Email: `intern@demo.com`
  - Password: `intern123`
- **Remember Me Functionality**: Persist login session in localStorage
- **Route Protection**: Protected application routes with automatic redirection
- **Logout**: Secure session termination

### Task Management
- **Create Tasks**: Add new tasks with title, description, priority, due date, and tags
- **Edit Tasks**: Modify task details with real-time updates
- **Delete Tasks**: Remove tasks with activity logging
- **Task Status**: Three workflow states - To Do, Doing, Done
- **Priority Levels**: High, Medium, Low priority classification
- **Tags Support**: Add up to 5 tags per task for categorization
- **Due Dates**: Set and track task deadlines with visual indicators

### Board Features
- **Kanban View**: Three fixed columns (To Do, Doing, Done)
- **Search Functionality**: Full-text search across task titles and descriptions
- **Priority Filtering**: Filter tasks by priority level
- **Sorting Options**: Sort by name or due date (empty values last)
- **Statistics Dashboard**: Real-time task counts and metrics
- **Activity Log**: Track all task modifications with timestamps
- **Reset Board**: Clear all tasks and reset to initial state (with confirmation)

### User Experience
- **Light/Dark Mode**: Theme toggle with persistent preference
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Smooth Animations**: Fade-in and slide-up transitions
- **Form Validation**: Comprehensive validation with error messages
- **Empty States**: Helpful prompts when no tasks exist
- **Visual Feedback**: Hover effects, loading states, and transitions

### Data Persistence
- **localStorage Integration**: All data persists across browser sessions
- **Safe Loading**: Graceful handling of missing or corrupted data
- **Activity Tracking**: Complete audit log of all actions

## Technical Stack

- **Frontend Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context API
- **UI Components**: Custom components with Lucide icons
- **Date Handling**: date-fns library
- **Font**: Poppins (headings), Inter (body text)

## Project Structure

```
project-root/
├── app/
│   ├── layout.tsx           # Root layout with auth provider
│   ├── page.tsx             # Main page with route protection
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── LoginPage.tsx        # Login interface
│   ├── Header.tsx           # App header with controls
│   ├── TaskBoard.tsx        # Main task board component
│   ├── TaskColumn.tsx       # Individual column component
│   ├── TaskCard.tsx         # Task card component
│   ├── AddTaskModal.tsx     # Create task modal
│   ├── TaskDetailModal.tsx  # Edit task modal
│   └── ActivityLogModal.tsx # Activity log display
├── context/
│   ├── AuthContext.tsx      # Authentication state
│   └── TaskContext.tsx      # Task management state
├── __tests__/
│   └── task.test.ts         # Test suite
├── public/
│   └── task-board-preview.jpg
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind configuration
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Steps

1. **Clone or Extract the Project**
   ```bash
   cd task-board-app
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

4. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

## Usage Guide

### Login
1. Enter email: `intern@demo.com`
2. Enter password: `intern123`
3. Optionally check "Remember me" to persist session
4. Click "Sign In"

### Creating Tasks
1. Click "Add Task" button
2. Fill in task details:
   - **Title** (required, 3-100 characters)
   - **Description** (optional, max 500 characters)
   - **Priority** (Low, Medium, High)
   - **Due Date** (optional, cannot be in the past)
   - **Tags** (optional, up to 5 tags)
3. Click "Create Task"

### Managing Tasks
- **View Details**: Click on any task card
- **Edit**: Click "Edit Task" in the modal
- **Delete**: Click trash icon on task card
- **Move**: Click "Move Next" button to advance status
- **Change Status**: Click status buttons in task detail modal

### Filtering & Searching
- **Search**: Type in the search bar to find tasks
- **Filter by Priority**: Select from priority dropdown
- **Sort**: Choose sort option (Name or Due Date)

### Activity Log
- Click the history icon in the header to view all actions
- Log shows: action type, task name, timestamp, and details

### Other Features
- **Reset Board**: Click reset icon to clear all tasks
- **Toggle Theme**: Click sun/moon icon for dark/light mode
- **Logout**: Click logout icon to end session

## Form Validation

### Task Title
- Required field
- Minimum 3 characters
- Maximum 100 characters

### Description
- Optional
- Maximum 500 characters

### Due Date
- Optional
- Cannot be in the past
- Sorted last when empty

### Tags
- Optional
- Maximum 5 tags per task
- Alphanumeric characters

## Testing

The project includes basic tests covering:
1. Task creation with all required fields
2. Priority level validation
3. Status transitions (todo → doing → done)
4. Task filtering by priority
5. Task search functionality
6. Login credential validation
7. Email format validation
8. Storage key definitions
9. Activity log tracking

Run tests with:
```bash
pnpm test
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Environment Variables
No environment variables required for demo mode.

## Data Storage

All data is stored in browser's localStorage:
- `taskboard_tasks`: Task list
- `taskboard_activity`: Activity log
- `taskboard_auth`: Authentication state
- `taskboard_remember`: Remember me preference

## Performance Optimizations

- Server-side rendering for better initial load
- Image optimization and lazy loading
- CSS-in-JS with Tailwind for smaller bundle
- Context API with memoization
- Efficient re-rendering with React hooks

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Future Enhancements

Potential improvements:
- Real backend authentication
- User profiles and team collaboration
- Advanced filtering and custom views
- Task subtasks and dependencies
- Recurring tasks
- Email notifications
- Analytics and reporting
- Export/import functionality

## Troubleshooting

### Login Issues
- Clear browser cache/cookies
- Verify credentials: `intern@demo.com` / `intern123`
- Check localStorage is enabled

### Data Not Persisting
- Enable localStorage in browser settings
- Check available storage quota
- Try resetting the board

### Styling Issues
- Clear .next cache: `rm -rf .next`
- Rebuild: `pnpm build`
- Check Tailwind configuration

## Support

For issues or questions:
1. Check the browser console for errors
2. Review the test suite for usage examples
3. Check component prop definitions

## License

This project is created for educational purposes as a frontend internship assignment.

## Author

Built as a modern, production-ready task management application showcasing:
- Professional UI/UX design
- State management best practices
- Form validation and error handling
- Data persistence strategies
- Component composition
- TypeScript development

---

**Last Updated**: February 2026
**Version**: 1.0.0
