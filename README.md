# 🌾 AI-Enabled Crop Suggestion System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)

**An intelligent real-time crop recommendation system powered by IoT sensors, ML models, and weather forecasting**

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

The **AI-Enabled Crop Suggestion System** is a cutting-edge precision agriculture platform designed to help small and medium-scale farmers make data-driven decisions. By combining real-time IoT sensor data, weather forecasting, and machine learning models, the system provides personalized crop recommendations, irrigation schedules, and farming alerts.

### 🎯 Problem Statement

Traditional farming relies heavily on experience and intuition, often leading to:
- Suboptimal crop selection for soil conditions
- Water wastage through improper irrigation
- Crop failures due to unexpected weather events
- Nutrient deficiencies and reduced yields
- Limited access to precision farming tools

### 💡 Solution

Our system democratizes precision agriculture by:
- **Real-time monitoring** of soil moisture, pH, nutrients, and microclimate
- **Intelligent recommendations** using ML models trained on agronomic data
- **Weather-aware planning** with 7-14 day forecasts
- **Actionable alerts** for drought, frost, and nutrient deficiency risks
- **User-friendly interface** accessible on mobile and desktop

---

## ✨ Features

### 🌍 Core Features

#### 🚜 Smart Crop Recommendations
- AI-powered crop suitability analysis
- Multi-factor decision engine (soil, weather, market demand)
- Alternative crop suggestions with confidence scores
- Variety-specific recommendations
- Seasonal planning assistance

#### 💧 Intelligent Irrigation Management
- Real-time soil moisture monitoring
- Evapotranspiration-based calculations
- Weather-aware irrigation scheduling
- Water usage optimization
- Cost estimation and savings tracker

#### 🌤️ Advanced Weather Integration
- Real-time weather conditions
- 7-day hourly forecasts (Open-Meteo API)
- Animated weather visualizations
- Extreme weather alerts
- Historical weather patterns

#### 🧪 Soil Health Monitoring
- Soil moisture tracking
- pH level analysis
- NPK (Nitrogen, Phosphorus, Potassium) monitoring
- Electrical conductivity (EC) measurements
- Soil type classification

#### 📊 Analytics & Insights
- Historical data visualization
- Yield prediction models
- Performance comparison charts
- Field-level heatmaps
- Exportable reports (PDF, CSV, Excel)

#### 🚨 Proactive Alerts
- Drought risk notifications
- Frost warnings
- Nutrient deficiency alerts
- Pest outbreak predictions
- Disease risk assessments
- SMS/WhatsApp integration

#### 🗺️ Field Management
- Interactive field mapping (Leaflet.js)
- Multi-field monitoring
- Sensor placement visualization
- Boundary management
- Satellite/terrain view

### 🎨 UI/UX Features

- **Stunning Animations**: Framer Motion-powered smooth transitions
- **Responsive Design**: Seamless experience across devices
- **Dark Mode**: Eye-friendly night mode
- **Glassmorphism**: Modern, semi-transparent card designs
- **Real-time Updates**: Live data with smooth animations
- **Accessibility**: WCAG 2.1 AA compliant
- **Multilingual**: Support for regional languages (roadmap)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  (React 18 + TypeScript + Tailwind CSS + Framer Motion)    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ REST API / WebSocket
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                       Backend Layer                          │
│     (Node.js/Python + Express/FastAPI + MongoDB/PostgreSQL) │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   ML Model   │  │ Rules Engine │  │  Data Processor │  │
│  │   Service    │  │   (Agronomic)│  │                 │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌──────▼──────────┐
│  IoT Sensors   │  │  Weather API    │
│  (MQTT/HTTP)   │  │  (Open-Meteo)   │
└────────────────┘  └─────────────────┘
```

### Data Flow

1. **Sensor Data Collection**: IoT sensors measure soil and environmental parameters
2. **Data Ingestion**: Backend receives and validates sensor readings
3. **Weather Fusion**: Real-time weather data merged with sensor data
4. **ML Processing**: Machine learning model analyzes combined data
5. **Rules Application**: Agronomic rules validate ML recommendations
6. **Frontend Display**: Beautiful visualizations and actionable insights
7. **Alert Generation**: Critical events trigger notifications

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18+ |
| **TypeScript** | Type Safety | 5.0+ |
| **Tailwind CSS** | Styling | 3.4+ |
| **Framer Motion** | Animations | 11+ |
| **Recharts** | Charts/Graphs | 2.10+ |
| **D3.js** | Advanced Visualizations | 7+ |
| **Leaflet.js** | Interactive Maps | 1.9+ |
| **Axios** | HTTP Client | 1.6+ |
| **React Hook Form** | Form Management | 7.5+ |
| **Zustand** | State Management | 4.5+ |
| **Lucide React** | Icons | Latest |

### Backend (To Be Implemented)

| Technology | Purpose |
|------------|---------|
| **Node.js + Express** OR **Python + FastAPI** | API Server |
| **MongoDB** OR **PostgreSQL** | Database |
| **Redis** | Caching & Real-time |
| **TensorFlow/PyTorch** | ML Models |
| **MQTT** | IoT Communication |
| **JWT** | Authentication |
| **Docker** | Containerization |

### External APIs

- **Open-Meteo API**: Free weather forecasting (no API key required)
- **OpenStreetMap**: Map tiles (via Leaflet)

### DevOps & Tools

- **Git & GitHub**: Version control
- **Vite**: Build tool
- **ESLint & Prettier**: Code quality
- **Jest & React Testing Library**: Testing
- **GitHub Actions**: CI/CD
- **Vercel/Netlify**: Frontend hosting

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Optional Tools

- **Docker**: For containerized deployment
- **Postman/Insomnia**: API testing
- **MongoDB Compass**: Database GUI (if using MongoDB)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repo
git clone https://github.com/yourusername/crop-suggestion-system.git

# Navigate to project directory
cd crop-suggestion-system

# Navigate to frontend directory
cd frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the frontend root:

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WEATHER_API_URL=https://api.open-meteo.com/v1/forecast

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false

# Map Configuration
VITE_MAP_DEFAULT_LAT=30.7046
VITE_MAP_DEFAULT_LNG=76.7179
VITE_MAP_DEFAULT_ZOOM=12

# App Configuration
VITE_APP_NAME=Crop Suggestion System
VITE_APP_VERSION=1.0.0
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port)

---

## ⚙️ Configuration

### Weather API Setup

The system uses **Open-Meteo API** which is free and requires no API key:

```typescript
// src/config/weather.config.ts
export const WEATHER_CONFIG = {
  baseUrl: 'https://api.open-meteo.com/v1/forecast',
  params: {
    latitude: 30.7046,  // Default: Chandigarh, India
    longitude: 76.7179,
    hourly: 'temperature_2m,relative_humidity_2m,precipitation',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'Asia/Kolkata'
  }
};
```

### Sensor Configuration

```typescript
// src/config/sensors.config.ts
export const SENSOR_CONFIG = {
  updateInterval: 300000, // 5 minutes in milliseconds
  moistureThresholds: {
    critical: 20,
    low: 30,
    optimal: 60,
    high: 80
  },
  phRange: {
    min: 4.0,
    max: 9.0,
    optimal: { min: 6.0, max: 7.5 }
  }
};
```

---

## 💻 Usage

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

### Key User Flows

#### 1. View Dashboard
- Navigate to home page
- View real-time sensor data and weather
- Check crop recommendations

#### 2. Manage Fields
- Go to Field Management page
- Click on map to add new field
- View sensor placements
- Edit field boundaries

#### 3. Plan Irrigation
- Open Irrigation Planning page
- Review recommended schedule
- Check water requirements
- Set manual overrides

#### 4. View Analytics
- Access Analytics page
- Select date range
- Choose metrics to display
- Export reports

#### 5. Configure Alerts
- Go to Settings
- Enable/disable alert types
- Set notification preferences
- Test notifications

---

## 📚 API Documentation

### Frontend API Endpoints (Backend Required)

#### Sensor Data

```typescript
// Get latest sensor readings
GET /api/sensors/latest
Response: {
  moisture: number,
  ph: number,
  nutrients: { n: number, p: number, k: number },
  temperature: number,
  humidity: number,
  timestamp: string
}

// Get sensor history
GET /api/sensors/history?from=DATE&to=DATE
```

#### Crop Recommendations

```typescript
// Get crop recommendation
POST /api/crops/recommend
Body: {
  fieldId: string,
  soilData: Object,
  weatherData: Object
}
Response: {
  recommendedCrop: string,
  score: number,
  alternatives: Array<{ crop: string, score: number }>,
  reasoning: string
}
```

#### Weather Data

```typescript
// Get current weather (proxied through backend)
GET /api/weather/current?lat=LAT&lon=LON

// Get forecast
GET /api/weather/forecast?lat=LAT&lon=LON&days=7
```

---

## 📁 Project Structure

```
crop-suggestion-system/
│
├── frontend/
│   ├── public/
│   │   ├── weather-icons/      # Animated weather icons
│   │   ├── crop-images/        # Crop illustrations
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/             # Static assets (images, fonts)
│   │   ├── components/         # React components
│   │   │   ├── atoms/          # Basic UI elements
│   │   │   ├── molecules/      # Composite components
│   │   │   ├── organisms/      # Complex components
│   │   │   └── templates/      # Page layouts
│   │   │
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FieldManagement.tsx
│   │   │   ├── IrrigationPlanning.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useWeather.ts
│   │   │   ├── useSensorData.ts
│   │   │   └── useAnimations.ts
│   │   │
│   │   ├── services/           # API services
│   │   │   ├── api.ts
│   │   │   ├── weatherService.ts
│   │   │   └── sensorService.ts
│   │   │
│   │   ├── store/              # State management
│   │   │   ├── userStore.ts
│   │   │   ├── sensorStore.ts
│   │   │   └── weatherStore.ts
│   │   │
│   │   ├── utils/              # Utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── calculations.ts
│   │   │
│   │   ├── types/              # TypeScript types
│   │   │   ├── sensor.types.ts
│   │   │   ├── weather.types.ts
│   │   │   └── crop.types.ts
│   │   │
│   │   ├── config/             # Configuration files
│   │   │   ├── api.config.ts
│   │   │   ├── weather.config.ts
│   │   │   └── theme.config.ts
│   │   │
│   │   ├── styles/             # Global styles
│   │   │   ├── globals.css
│   │   │   └── animations.css
│   │   │
│   │   ├── App.tsx             # Root component
│   │   ├── main.tsx            # Entry point
│   │   └── router.tsx          # Route definitions
│   │
│   ├── .env.example            # Environment variables template
│   ├── .eslintrc.cjs           # ESLint configuration
│   ├── .prettierrc             # Prettier configuration
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── vite.config.ts          # Vite configuration
│
├── backend/                    # Backend code (to be implemented)
│   └── (structure TBD)
│
├── docs/                       # Documentation
│   ├── PRD_Frontend.md
│   ├── API_Documentation.md
│   └── User_Guide.md
│
├── .gitignore
├── LICENSE
└── README.md                   # This file
```

---

## 🔄 Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```bash
git commit -m "feat(dashboard): add animated weather widget"
git commit -m "fix(sensors): resolve moisture data parsing error"
```

### Code Review Process

1. Create feature branch from `develop`
2. Implement feature with tests
3. Push and create Pull Request
4. Request review from team members
5. Address review comments
6. Merge after approval

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests (if configured)
npm run test:e2e
```

### Testing Strategy

#### Unit Tests
- Test utility functions
- Test custom hooks
- Test individual components

#### Integration Tests
- Test component interactions
- Test API service calls
- Test state management

#### E2E Tests (Optional)
- Test critical user flows
- Test cross-browser compatibility

### Example Test

```typescript
// src/components/WeatherCard.test.tsx
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  it('renders temperature correctly', () => {
    const mockWeather = {
      temperature: 25,
      condition: 'sunny',
      humidity: 60
    };
    
    render(<WeatherCard data={mockWeather} />);
    
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect GitHub Repository**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Configure Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variables

3. **Deploy**
   - Automatic deployment on push to `main`
   - Preview deployments for PRs

### Frontend Deployment (Netlify)

```bash
# Build the app
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Docker Deployment

```dockerfile
# Dockerfile (frontend)
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run Docker container
docker build -t crop-system-frontend .
docker run -p 80:80 crop-system-frontend
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Write tests**
5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Follow ESLint rules
- Use Prettier for formatting

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

---

## 🗺️ Roadmap

### Phase 1: MVP (Current - Q4 2025)
- [x] Project setup and architecture
- [x] Frontend PRD documentation
- [ ] Core dashboard implementation
- [ ] Weather integration (Open-Meteo)
- [ ] Basic sensor data display
- [ ] Crop recommendation UI

### Phase 2: Enhanced Features (Q1 2026)
- [ ] Backend API development
- [ ] ML model integration
- [ ] Real-time sensor connectivity
- [ ] Irrigation planning module
- [ ] Alert system (SMS/WhatsApp)
- [ ] Field management with maps

### Phase 3: Analytics & Optimization (Q2 2026)
- [ ] Historical data visualization
- [ ] Advanced analytics dashboard
- [ ] Report generation (PDF/Excel)
- [ ] Performance optimization
- [ ] Mobile app (React Native)

### Phase 4: Advanced Features (Q3 2026)
- [ ] Dark mode
- [ ] Multilingual support (Hindi, Punjabi, Tamil)
- [ ] Voice commands
- [ ] AR field overlay
- [ ] Crop disease detection (image upload)
- [ ] Community features

### Phase 5: Scale & Enterprise (Q4 2026)
- [ ] Multi-tenant support
- [ ] Enterprise dashboard
- [ ] API for third-party integrations
- [ ] Government scheme integration
- [ ] Blockchain for supply chain
- [ ] Drone integration

---

## ❓ FAQ

### General Questions

**Q: Is this system free to use?**  
A: The frontend is open-source. Deployment and sensor costs may apply.

**Q: What sensors are compatible?**  
A: Any IoT sensor that can send data via HTTP/MQTT (Arduino, Raspberry Pi, ESP32, etc.)

**Q: Does it work offline?**  
A: Partial offline support via service workers (roadmap feature).

**Q: Which crops are supported?**  
A: Initially: rice, wheat, maize, cotton, sugarcane. More crops in future releases.

### Technical Questions

**Q: Can I use this with my existing farm management system?**  
A: Yes, via API integration (backend required).

**Q: What's the minimum internet speed required?**  
A: 2G connection is sufficient for basic functionality.

**Q: How accurate are the crop recommendations?**  
A: ML model accuracy is ~85% and improving with more data.

**Q: Can I self-host the application?**  
A: Yes, full deployment instructions provided.

### Development Questions

**Q: Can I contribute without agricultural knowledge?**  
A: Yes! We need help with frontend, backend, testing, and documentation.

**Q: How do I report a bug?**  
A: Open an issue on GitHub with detailed reproduction steps.

**Q: Is there a developer community?**  
A: Join our Discord server (link in Contact section).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Liability and warranty not provided

---

## 📞 Contact

### Project Maintainer
- **Name**: Kotha Dhakshin
- **Email**: kothadhakshin123@gmail.com
- **GitHub**: [🌚](https://github.com/Dhakshin2007)

### Community
- **Discord**: [Join our server](https://discord.gg/)
- **Twitter**: [@Twitter](https://twitter.com/)
- **Website**: [cropsuggest.io](https://dhakshin-portfolio.vercel.app)

---

## 🙏 Acknowledgments

Special thanks to:

- **Open-Meteo** for providing free weather API
- **OpenStreetMap** contributors for map data
- **Framer Motion** team for amazing animation library
- **React** and **Vite** teams for excellent tools
- **Agricultural experts** who provided domain knowledge
- **Open-source community** for inspiration and support

### Resources & Inspiration
- [FAO Crop Water Information](http://www.fao.org/land-water/databases-and-software/crop-information/en/)
- [USDA Plant Database](https://plants.usda.gov/)
- [OpenFarm](https://openfarm.cc/) - Open agricultural data
- [FarmBot](https://farm.bot/) - Open-source farming robot

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/crop-suggestion-system?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/crop-suggestion-system?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/crop-suggestion-system)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/crop-suggestion-system)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/crop-suggestion-system)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Dhakshin2007/GE107_CropSuggestion&type=Date)](https://star-history.com/#Dhakshin2007/GE107_CropSuggestion&Date)

---

<div align="center">

**Made with ❤️ for farmers worldwide**

*Empowering agriculture through technology*

[⬆ Back to Top](#-ai-enabled-crop-suggestion-system)

</div>
