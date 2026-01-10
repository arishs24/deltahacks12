# Branding Guide

Customize your chat application's branding using the appearance.json configuration file.

## Quick Setup

**Option 1: Interactive Setup (Recommended)**
Visit [http://localhost:3000/landing](http://localhost:3000/landing) to use our 4-step interactive setup flow that guides you through:
1. **API Key Setup** - Connect to Moorcheh AI services
2. **Branding** - Configure app name, company, and contact info
3. **Theme Selection** - Choose from 10+ beautiful themes
4. **Typography & Complete** - Configure fonts and finish setup

**Option 2: Manual Setup**
Edit `config/appearance.json` directly:

```json
{
  "fonts": {
    "primary": "Inter",
    "heading": "Playfair Display",
    "mono": "JetBrains Mono"
  },
  "theme": {
    "defaultTheme": "slate"
  },
  "branding": {
    "appName": "My Chat App",
    "appTitle": "My Chat",
    "appSubtitle": "How can I help you today?",
    "appDescription": "AI-powered chat application",
    "companyName": "My Company",
    "contactEmail": "support@mycompany.com",
    "storagePrefix": "my-app-chat",
    "exportPrefix": "MyApp-chat",
    "logo": "/logo.png"
  }
}
```

## All Branding Options

| Field | Description | Example |
|-------|-------------|---------|
| `appName` | Main app name shown in chat header | "My AI Assistant" |
| `appTitle` | Browser tab title | "My Chat App" |
| `appSubtitle` | Welcome message in chat | "How can I help you today?" |
| `appDescription` | App description for metadata | "AI-powered chat application" |
| `companyName` | Your company/organization name | "My Company" |
| `contactEmail` | Support contact email | "support@mycompany.com" |
| `storagePrefix` | Local storage key prefix | "my-app-chat" |
| `exportPrefix` | Exported file name prefix | "MyApp-chat" |
| `logo` | Logo image path | "/assets/logo.png" |



## Custom Logo

1. Add your logo to `public/assets/your-logo.png`
2. Set in appearance.json: `"logo": "/assets/your-logo.png"`
3. Replace `public/favicon.ico` with your favicon

## Font Configuration

The appearance.json also controls typography:

```json
{
  "fonts": {
    "primary": "Inter",           // Main UI text font
    "heading": "Playfair Display", // Titles and headings
    "mono": "JetBrains Mono"      // Code blocks and technical text
  }
}
```

## Theme Configuration

Choose from 10+ available themes:

```json
{
  "theme": {
    "defaultTheme": "slate"  // light, dark, blue, green, purple, etc.
  }
}
```

## Live Preview & Setup

Use the interactive setup at [http://localhost:3000/landing](http://localhost:3000/landing) to:
- See live preview of your branding changes
- Test different themes instantly
- Configure fonts with real-time updates
- Save all settings automatically

## Troubleshooting

- Changes to `appearance.json` are reflected immediately (no server restart needed)
- Use the interactive setup for instant preview
- Logo files go in `public/assets/` directory
- Theme names must match available options
- Font names must be valid Google Fonts or system fonts

## Additional Customization

For advanced theme and font customization, see:
- `/customize/README.md` - Advanced theme/font configuration
- `/config/README.md` - API configuration guide 