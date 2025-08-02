# User Documentation
## AI Todo App

### Table of Contents
1. [Getting Started](#getting-started)
2. [Creating Todos](#creating-todos)
3. [Managing Todos](#managing-todos)
4. [AI Subtask Generation](#ai-subtask-generation)
5. [Translation Feature](#translation-feature)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Getting Started

### Accessing the Application
1. Open your web browser
2. Navigate to: https://to-do-fullstack-front.vercel.app/
3. The application will load automatically

### System Requirements
- **Browser:** Chrome, Firefox, Safari, or Edge (latest version)
- **Internet Connection:** Required for AI features
- **Device:** Desktop, tablet, or mobile phone

---

## Creating Todos

### Adding a New Todo
1. **Locate the "Add Todo" button** at the top of the page
2. **Click the button** to open the todo creation form
3. **Fill in the required fields:**
   - **Title:** Enter a brief description of your task (required)
   - **Description:** Add detailed information about the task (optional)
   - **Priority:** Select from Low, Medium, or High
   - **Due Date:** Choose a deadline (optional)
4. **Click "Add Todo"** to save your task

### Form Validation
- Title field is required and cannot be empty
- Description can be left blank
- Priority defaults to "Medium" if not selected
- Due date is optional

---

## Managing Todos

### Viewing Your Todos
- All todos are displayed in a clean list format
- Each todo shows: title, description, priority, due date, and status
- Completed todos are visually distinguished with strikethrough text

### Marking Todos as Complete
1. **Find the todo** you want to mark as complete
2. **Click the checkbox** next to the todo title
3. **The todo will be marked as complete** with visual indicators

### Editing Todos
1. **Click the edit icon** (pencil) next to any todo
2. **Modify the fields** as needed
3. **Click "Update"** to save changes

### Deleting Todos
1. **Click the delete icon** (trash) next to any todo
2. **Confirm the deletion** in the popup dialog
3. **The todo will be permanently removed**

---

## AI Subtask Generation

### Generating Subtasks
1. **Select a todo** from your list
2. **Click the "Generate Subtasks" button**
3. **Wait for AI processing** (you'll see a loading indicator)
4. **Review the generated subtasks** that appear below the main todo

### How AI Subtask Generation Works
- The AI analyzes your todo's title and description
- It generates 3-5 relevant, actionable subtasks
- Subtasks are contextually related to your main task
- Generation typically takes 2-5 seconds

### Managing Generated Subtasks
- **Mark subtasks as complete** by clicking their checkboxes
- **Delete subtasks** by clicking the delete icon
- **Add manual subtasks** using the "Add Subtask" button
- **All changes are automatically saved**

### Tips for Better Subtask Generation
- Provide detailed descriptions in your todos
- Use specific, actionable language
- Include context about what you want to achieve

---

## Translation Feature

### Translating Todo Items
1. **Select any todo** from your list
2. **Click the "Translate" button** (globe icon)
3. **Enter your target language** in the popup dialog
   - Examples: "Spanish", "French", "German", "Chinese", "Arabic"
   - You can specify any language, not just predefined options
4. **Click "Translate"** to process
5. **View the translation** in the modal window

### Translation Features
- **Real-time translation** with loading indicators
- **Original and translated text** displayed side by side
- **Error handling** for unsupported languages
- **Close modal** to return to your todo list

### Supported Languages
- The system supports most world languages
- Enter the language name in English (e.g., "Spanish" not "Español")
- If a language isn't supported, you'll receive an error message

---

## Troubleshooting

### Common Issues and Solutions

#### Application Won't Load
- **Check your internet connection**
- **Try refreshing the page**
- **Clear browser cache and cookies**
- **Try a different browser**

#### AI Features Not Working
- **Ensure you have a stable internet connection**
- **Wait a few seconds and try again**
- **Check if the AI service is experiencing issues**
- **Try with a different todo item**

#### Translation Errors
- **Verify the language name is spelled correctly**
- **Try using the language name in English**
- **Check if the language is supported**
- **Try a different language**

#### Data Not Saving
- **Check your internet connection**
- **Refresh the page and try again**
- **Ensure you're not in incognito/private mode**
- **Try clearing browser cache**

#### Slow Performance
- **Close other browser tabs**
- **Check your internet speed**
- **Try refreshing the page**
- **Wait a few minutes and try again**

---

## FAQ

### General Questions

**Q: Is my data saved permanently?**
A: Yes, all your todos and subtasks are saved to a database and will persist across browser sessions.

**Q: Can I use the app offline?**
A: No, the app requires an internet connection for AI features and data synchronization.

**Q: Is my data secure?**
A: Yes, the application uses secure connections and doesn't store sensitive personal information.

### AI Features

**Q: How accurate are the AI-generated subtasks?**
A: The AI analyzes your todo content and generates relevant subtasks. Accuracy depends on the clarity and detail of your todo descriptions.

**Q: Can I customize the AI behavior?**
A: Currently, the AI behavior is optimized for general task management. Future versions may include customization options.

**Q: What happens if the AI service is down?**
A: You'll receive an error message, but you can still manually add subtasks and use all other features.

### Translation

**Q: How many languages are supported?**
A: The system supports most world languages. Enter the language name in English for best results.

**Q: Is the translation accurate?**
A: The translation uses AI technology and is generally accurate, but may not be perfect for complex or technical content.

**Q: Can I translate the entire app interface?**
A: Currently, only todo content can be translated. Full interface translation may be added in future versions.

### Technical Support

**Q: How do I report a bug?**
A: Please contact the development team through the GitHub repository or assessment submission.

**Q: Will there be updates to the app?**
A: This is an assessment project, but the code is open source and can be extended by developers.

**Q: Can I export my todos?**
A: This feature is not currently available but could be added in future versions.

---

## Contact Information

For technical support or questions about this assessment project:
- **Developer:** Muhammad Bilal
- **Email:** bilal.ai.developer@gmail.com
- **GitHub:** https://github.com/bilalsxadad1231231

---

*Last updated: January 2025* 