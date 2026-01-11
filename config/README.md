# 🔧 Configuration Guide

## 📋 Overview

This project now uses a consolidated configuration system with two main config files:

1. **`appearance.json`** - Main appearance configuration (fonts, themes, branding)
2. **`api-config.json`** - AI API configuration for Moorcheh

## 🎨 Appearance Configuration

### Quick Start

Edit `appearance.json` to customize your app's appearance:

```json
{
  "fonts": {
    "primary": "Roboto",
    "heading": "Inter",
    "mono": "Fira Code"
  },
  "theme": {
    "defaultTheme": "slate"
  },
  "branding": {
    "appName": "Moorcheh AI Assistant",
    "appTitle": "Moorcheh Chat",
    "appSubtitle": "Your intelligent chat companion",
    "appDescription": "AI-powered chat application with customizable themes and fonts",
    "companyName": "Moorcheh",
    "contactEmail": "support@moorcheh.ai",

    "storagePrefix": "moorcheh-chat",
    "exportPrefix": "Moorcheh-chat"
  }
}
```

### Configuration Sections

#### Fonts Configuration
```json
"fonts": {
  "primary": "Roboto",    // Main UI font
  "heading": "Inter",     // Headings font
  "mono": "Fira Code"     // Code font
}
```

#### Theme Configuration
```json
"theme": {
  "defaultTheme": "slate"  // Default theme (slate, light, dark, blue, etc.)
}
```

#### Branding Configuration
```json
"branding": {
  "appName": "Moorcheh AI Assistant",
  "appTitle": "Moorcheh Chat",
  "appSubtitle": "Your intelligent chat companion",
  "appDescription": "AI-powered chat application with customizable themes and fonts",
  "companyName": "Moorcheh",
  "contactEmail": "support@moorcheh.ai",

  "storagePrefix": "moorcheh-chat",
  "exportPrefix": "Moorcheh-chat"
}
```

### Available Theme Options

The following themes are available in the `defaultTheme` field:
- `light`, `dark`, `blue`, `green`, `purple`, `orange`, `red`, `pink`, `yellow`, `teal`, `indigo`, `rose`, `emerald`, `amber`, `coral`, `slate`, `system`

## 🤖 API Configuration

### Quick Start

**Option 1: Interactive Setup (Recommended)**
Visit [http://localhost:3000/landing](http://localhost:3000/landing) to use the interactive setup flow that guides you through API configuration step by step.

**Option 2: Manual Setup**
1. Create a new file named `api-config.json` in the `config` directory
2. Visit [Moorcheh Console](https://console.moorcheh.ai/playground) to generate your configuration
3. Export the JSON configuration and paste it into `api-config.json`
4. Restart your development server with `npm run dev`

### API Configuration Fields

| Field | Description | Auto-filled? |
|-------|-------------|--------------|
| `namespace` | Your unique project namespace | No |
| `query` | The user's current message | Yes ✓ |
| `top_k` | Number of top results to return (1-10) | No |
| `type` | Response type (e.g., "text", "json") | No |
| `aiModel` | AI model to use for responses | No |
| `temperature` | Response creativity (0.0-1.0) | No |
| `kiosk_mode` | Enable/disable kiosk mode | No |
| `chatHistory` | Conversation history array | Yes ✓ |
| `headerPrompt` | System instructions at start | No |
| `footerPrompt` | Instructions at end of prompt | No |

## 🔄 How It Works

### Configuration Flow
1. **appearance.json** → `branding-config.ts` → App branding
2. **appearance.json** → `font-config.ts` → Font settings
3. **appearance.json** → `theme-config.ts` → Theme settings
4. **api-config.json** → Chat components → AI responses

### File Structure
```
config/
├── appearance.json          # Main appearance config
├── api-config.json          # AI API config
├── branding-config.json     # Extended branding config (optional)
└── README.md               # This file
```

## ⚠️ Important Notes

- Changes to `appearance.json` are reflected immediately in the app
- Changes to `api-config.json` require a server restart
- Keep your `api-config.json` secure and never commit it to version control
- The `appearance.json` is safe to commit (contains only UI settings)

## 🛠️ Troubleshooting

### Appearance Issues
1. Verify your JSON syntax is valid
2. Check that theme names match the available options
3. Ensure font names are valid Google Fonts or system fonts
4. Try refreshing the page after changes

### API Issues
1. Verify your configuration matches the example format
2. Ensure all required fields are present
3. Check that the values match your Moorcheh Console settings
4. Try regenerating the configuration in the Playground

Need help? Visit our [support documentation](https://docs.moorcheh.ai/integrations/chat-boilerplate/overview) for more information. 