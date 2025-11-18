# Contributing to GYM Management System

Thank you for your interest in contributing to the GYM Management System! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a feature branch: `git checkout -b feat/your-feature-name`
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Use clear, descriptive commit messages:
- `feat: Add member search functionality`
- `fix: Resolve attendance date formatting issue`
- `docs: Update README with new features`
- `refactor: Simplify payment calculation logic`

### Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Test your changes thoroughly
3. Update documentation if needed
4. Create a pull request with a clear description
5. Link any related issues

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page-level components
- `src/contexts/` - Context providers for state management
- `src/data/` - Mock data and initial data
- `src/services/` - Utility functions and helpers
- `src/styles/` - Global styles and Tailwind configuration

## Testing

When adding new features:
- Test all user flows manually
- Ensure forms validate correctly
- Check responsive design on different screen sizes
- Verify data persistence in localStorage

## Questions?

If you have questions or need help, please open an issue on the repository.

Thank you for contributing! 🎉

