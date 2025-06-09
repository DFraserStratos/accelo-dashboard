# Accelo Dashboard

A React-based read-only web dashboard for Accelo API that displays companies, projects, and agreements with logged hours visualization.

## Features

- **Company List**: Display client companies in a sidebar
- **Project Tracking**: View projects with billable and non-billable hours
- **Agreement Management**: Monitor agreement usage vs. allowance
- **Interactive UI**: Add companies and their items dynamically
- **Responsive Design**: Works on desktop and tablet devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Accelo API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DFraserStratos/accelo-dashboard.git
cd accelo-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

Enter your Accelo API key in the dashboard's navigation bar to connect to your Accelo account.

## Architecture

### Components

- **NavBar**: Top navigation with API key input and Add Item button
- **Sidebar**: Vertical list of selected companies
- **MainContent**: Display area for progress tracker blocks
- **ProgressTrackerBlock**: Individual project or agreement display
- **AddItemModal**: Interface for adding new companies and items

### API Integration

The dashboard uses the following Accelo API endpoints:

- `GET /companies` - List all companies
- `GET /jobs` - List projects for a company
- `GET /activities/allocations` - Get logged hours for projects
- `GET /contracts` - List agreements for a company
- `GET /contracts/{id}/periods` - Get agreement period usage

## Development

### Project Structure

```
src/
├── components/
│   ├── NavBar.js
│   ├── Sidebar.js
│   ├── MainContent.js
│   ├── CompanyCard.js
│   ├── ProgressTrackerBlock.js
│   └── AddItemModal.js
├── hooks/
│   └── useAcceloData.js
├── services/
│   └── acceloApi.js
├── context/
│   └── AcceloContext.js
└── utils/
    └── helpers.js
```

### Styling

The project uses CSS modules for component-specific styling with:
- 8px border radius for blocks
- Subtle shadows for depth
- Responsive flexbox layouts
- High contrast for accessibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
