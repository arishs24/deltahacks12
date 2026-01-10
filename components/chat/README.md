# Dynamic Chat System

This folder contains a powerful, flexible chat system that can render as either a **widget** (floating button) or **interface** (full chat interface) based on your configuration.

## Quick Start

### 1. Choose Your Chat Type

Edit `lib/chat-config.ts`:

```typescript
export const chatConfig: ChatConfig = {
  chatType: 'widget', // or 'interface'
  // ... other config
};
```

### 2. Use the Dynamic Chat Component

```tsx
import { DynamicChat } from '@/components/chat';

export default function MyPage() {
  return <DynamicChat />;
}
```

That's it! The chat will automatically render as a widget or interface based on your config. 
Currently, it is on the homepage; change according to your needs.