import { useState } from "react"

export function useConfig() {
  const [config, setConfig] = useState({
    style: "default",
    packageManager: "npm" as "npm" | "yarn" | "pnpm" | "bun"
  })
  
  return [config, setConfig] as const
} 