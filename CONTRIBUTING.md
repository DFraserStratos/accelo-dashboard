# Contributing to Accelo Dashboard

Thank you for your interest in contributing to the Accelo Dashboard project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/accelo-dashboard.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start the development server: `npm start`

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow React best practices and hooks guidelines
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

```
src/
├── components/    # Reusable UI components
├── hooks/        # Custom React hooks
├── services/     # API and external services
├── context/      # React context providers
└── utils/        # Helper functions
```

### CSS Guidelines

- Use CSS modules for component-specific styles
- Follow BEM naming convention for class names
- Maintain consistent spacing and sizing (8px grid)
- Ensure responsive design for desktop and tablet

## Testing

Run tests with:
```bash
npm test
```

Add tests for:
- New components
- API integration functions
- Utility functions
- Complex business logic

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Ensure all tests pass
3. Update documentation if you're changing functionality
4. Submit a pull request with a clear description of changes

## Reporting Issues

When reporting issues, please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information
- Screenshots if applicable

## Feature Requests

We welcome feature requests! Please provide:
- Clear description of the feature
- Use case and benefits
- Any mockups or examples

## Questions?

Feel free to open an issue for any questions about contributing.