(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/projects/deltahacks12/customize/themes/available-themes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Available Themes
 * 
 * This file contains all the theme definitions for your chat application.
 * Edit this file to modify existing themes or add new ones.
 */ __turbopack_context__.s([
    "themes",
    ()=>themes
]);
const themes = {
    light: {
        '--radius': '0.625rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.145 0 0)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.145 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.145 0 0)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--chart-1': 'oklch(0.646 0.222 41.116)',
        '--chart-2': 'oklch(0.6 0.118 184.704)',
        '--chart-3': 'oklch(0.398 0.07 227.392)',
        '--chart-4': 'oklch(0.828 0.189 84.429)',
        '--chart-5': 'oklch(0.769 0.188 70.08)',
        '--sidebar': 'oklch(0.985 0 0)',
        '--sidebar-foreground': 'oklch(0.145 0 0)',
        '--sidebar-primary': 'oklch(0.205 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.97 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
        '--sidebar-border': 'oklch(0.922 0 0)',
        '--sidebar-ring': 'oklch(0.708 0 0)'
    },
    dark: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.269 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.922 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.371 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--border': 'oklch(1 0 0 / 10%)',
        '--input': 'oklch(1 0 0 / 15%)',
        '--ring': 'oklch(0.556 0 0)',
        '--chart-1': 'oklch(0.488 0.243 264.376)',
        '--chart-2': 'oklch(0.696 0.17 162.48)',
        '--chart-3': 'oklch(0.769 0.188 70.08)',
        '--chart-4': 'oklch(0.627 0.265 303.9)',
        '--chart-5': 'oklch(0.645 0.246 16.439)',
        '--sidebar': 'oklch(0.205 0 0)',
        '--sidebar-foreground': 'oklch(0.985 0 0)',
        '--sidebar-primary': 'oklch(0.488 0.243 264.376)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.269 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
        '--sidebar-border': 'oklch(1 0 0 / 10%)',
        '--sidebar-ring': 'oklch(0.439 0 0)'
    },
    blue: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.97 0.013 240.53)',
        '--foreground': 'oklch(0.25 0.084 240.53)',
        '--card': 'oklch(0.985 0.008 240.53)',
        '--card-foreground': 'oklch(0.25 0.084 240.53)',
        '--popover': 'oklch(0.985 0.008 240.53)',
        '--popover-foreground': 'oklch(0.25 0.084 240.53)',
        '--primary': 'oklch(0.55 0.18 240.53)',
        '--primary-foreground': 'oklch(0.985 0.008 240.53)',
        '--secondary': 'oklch(0.94 0.02 240.53)',
        '--secondary-foreground': 'oklch(0.35 0.1 240.53)',
        '--muted': 'oklch(0.94 0.02 240.53)',
        '--muted-foreground': 'oklch(0.5 0.05 240.53)',
        '--accent': 'oklch(0.9 0.03 240.53)',
        '--accent-foreground': 'oklch(0.35 0.1 240.53)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.88 0.025 240.53)',
        '--input': 'oklch(0.88 0.025 240.53)',
        '--ring': 'oklch(0.55 0.18 240.53)',
        '--chart-1': 'oklch(0.55 0.18 240.53)',
        '--chart-2': 'oklch(0.45 0.15 220.53)',
        '--chart-3': 'oklch(0.65 0.12 260.53)',
        '--chart-4': 'oklch(0.35 0.2 200.53)',
        '--chart-5': 'oklch(0.75 0.1 280.53)',
        '--sidebar': 'oklch(0.96 0.015 240.53)',
        '--sidebar-foreground': 'oklch(0.25 0.084 240.53)',
        '--sidebar-primary': 'oklch(0.55 0.18 240.53)',
        '--sidebar-primary-foreground': 'oklch(0.985 0.008 240.53)',
        '--sidebar-accent': 'oklch(0.9 0.03 240.53)',
        '--sidebar-accent-foreground': 'oklch(0.35 0.1 240.53)',
        '--sidebar-border': 'oklch(0.88 0.025 240.53)',
        '--sidebar-ring': 'oklch(0.55 0.18 240.53)'
    },
    green: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 142.5)',
        '--foreground': 'oklch(0.2 0.1 142.5)',
        '--card': 'oklch(0.99 0.01 142.5)',
        '--card-foreground': 'oklch(0.2 0.1 142.5)',
        '--popover': 'oklch(0.99 0.01 142.5)',
        '--popover-foreground': 'oklch(0.2 0.1 142.5)',
        '--primary': 'oklch(0.55 0.15 142.5)',
        '--primary-foreground': 'oklch(0.99 0.01 142.5)',
        '--secondary': 'oklch(0.95 0.03 142.5)',
        '--secondary-foreground': 'oklch(0.3 0.12 142.5)',
        '--muted': 'oklch(0.95 0.03 142.5)',
        '--muted-foreground': 'oklch(0.45 0.08 142.5)',
        '--accent': 'oklch(0.92 0.04 142.5)',
        '--accent-foreground': 'oklch(0.3 0.12 142.5)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 142.5)',
        '--input': 'oklch(0.9 0.035 142.5)',
        '--ring': 'oklch(0.55 0.15 142.5)',
        '--chart-1': 'oklch(0.55 0.15 142.5)',
        '--chart-2': 'oklch(0.45 0.18 122.5)',
        '--chart-3': 'oklch(0.65 0.12 162.5)',
        '--chart-4': 'oklch(0.35 0.2 102.5)',
        '--chart-5': 'oklch(0.75 0.1 182.5)',
        '--sidebar': 'oklch(0.97 0.025 142.5)',
        '--sidebar-foreground': 'oklch(0.2 0.1 142.5)',
        '--sidebar-primary': 'oklch(0.55 0.15 142.5)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 142.5)',
        '--sidebar-accent': 'oklch(0.92 0.04 142.5)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.12 142.5)',
        '--sidebar-border': 'oklch(0.9 0.035 142.5)',
        '--sidebar-ring': 'oklch(0.55 0.15 142.5)'
    },
    purple: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 300)',
        '--foreground': 'oklch(0.2 0.1 300)',
        '--card': 'oklch(0.99 0.01 300)',
        '--card-foreground': 'oklch(0.2 0.1 300)',
        '--popover': 'oklch(0.99 0.01 300)',
        '--popover-foreground': 'oklch(0.2 0.1 300)',
        '--primary': 'oklch(0.55 0.15 300)',
        '--primary-foreground': 'oklch(0.99 0.01 300)',
        '--secondary': 'oklch(0.95 0.03 300)',
        '--secondary-foreground': 'oklch(0.3 0.12 300)',
        '--muted': 'oklch(0.95 0.03 300)',
        '--muted-foreground': 'oklch(0.45 0.08 300)',
        '--accent': 'oklch(0.92 0.04 300)',
        '--accent-foreground': 'oklch(0.3 0.12 300)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 300)',
        '--input': 'oklch(0.9 0.035 300)',
        '--ring': 'oklch(0.55 0.15 300)',
        '--chart-1': 'oklch(0.55 0.15 300)',
        '--chart-2': 'oklch(0.45 0.18 280)',
        '--chart-3': 'oklch(0.65 0.12 320)',
        '--chart-4': 'oklch(0.35 0.2 260)',
        '--chart-5': 'oklch(0.75 0.1 340)',
        '--sidebar': 'oklch(0.97 0.025 300)',
        '--sidebar-foreground': 'oklch(0.2 0.1 300)',
        '--sidebar-primary': 'oklch(0.55 0.15 300)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 300)',
        '--sidebar-accent': 'oklch(0.92 0.04 300)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.12 300)',
        '--sidebar-border': 'oklch(0.9 0.035 300)',
        '--sidebar-ring': 'oklch(0.55 0.15 300)'
    },
    orange: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.97 0.03 45)',
        '--foreground': 'oklch(0.2 0.05 30)',
        '--card': 'oklch(0.98 0.02 45)',
        '--card-foreground': 'oklch(0.2 0.05 30)',
        '--popover': 'oklch(0.98 0.02 45)',
        '--popover-foreground': 'oklch(0.2 0.05 30)',
        '--primary': 'oklch(0.6 0.2 45)',
        '--primary-foreground': 'oklch(0.95 0.03 45)',
        '--secondary': 'oklch(0.9 0.05 45)',
        '--secondary-foreground': 'oklch(0.3 0.08 30)',
        '--muted': 'oklch(0.9 0.05 45)',
        '--muted-foreground': 'oklch(0.5 0.06 35)',
        '--accent': 'oklch(0.85 0.08 50)',
        '--accent-foreground': 'oklch(0.3 0.08 30)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.88 0.04 45)',
        '--input': 'oklch(0.88 0.04 45)',
        '--ring': 'oklch(0.6 0.2 45)',
        '--chart-1': 'oklch(0.6 0.2 45)',
        '--chart-2': 'oklch(0.65 0.18 25)',
        '--chart-3': 'oklch(0.7 0.15 65)',
        '--chart-4': 'oklch(0.55 0.22 15)',
        '--chart-5': 'oklch(0.75 0.12 85)',
        '--sidebar': 'oklch(0.93 0.04 45)',
        '--sidebar-foreground': 'oklch(0.2 0.05 30)',
        '--sidebar-primary': 'oklch(0.6 0.2 45)',
        '--sidebar-primary-foreground': 'oklch(0.95 0.03 45)',
        '--sidebar-accent': 'oklch(0.85 0.08 50)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.08 30)',
        '--sidebar-border': 'oklch(0.88 0.04 45)',
        '--sidebar-ring': 'oklch(0.6 0.2 45)'
    },
    red: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.97 0.03 15)',
        '--foreground': 'oklch(0.2 0.05 15)',
        '--card': 'oklch(0.98 0.02 15)',
        '--card-foreground': 'oklch(0.2 0.05 15)',
        '--popover': 'oklch(0.98 0.02 15)',
        '--popover-foreground': 'oklch(0.2 0.05 15)',
        '--primary': 'oklch(0.55 0.22 15)',
        '--primary-foreground': 'oklch(0.95 0.03 15)',
        '--secondary': 'oklch(0.9 0.05 15)',
        '--secondary-foreground': 'oklch(0.3 0.08 15)',
        '--muted': 'oklch(0.9 0.05 15)',
        '--muted-foreground': 'oklch(0.5 0.06 15)',
        '--accent': 'oklch(0.85 0.08 15)',
        '--accent-foreground': 'oklch(0.3 0.08 15)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.88 0.04 15)',
        '--input': 'oklch(0.88 0.04 15)',
        '--ring': 'oklch(0.55 0.22 15)',
        '--chart-1': 'oklch(0.55 0.22 15)',
        '--chart-2': 'oklch(0.6 0.2 350)',
        '--chart-3': 'oklch(0.65 0.18 35)',
        '--chart-4': 'oklch(0.5 0.25 0)',
        '--chart-5': 'oklch(0.7 0.15 55)',
        '--sidebar': 'oklch(0.93 0.04 15)',
        '--sidebar-foreground': 'oklch(0.2 0.05 15)',
        '--sidebar-primary': 'oklch(0.55 0.22 15)',
        '--sidebar-primary-foreground': 'oklch(0.95 0.03 15)',
        '--sidebar-accent': 'oklch(0.85 0.08 15)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.08 15)',
        '--sidebar-border': 'oklch(0.88 0.04 15)',
        '--sidebar-ring': 'oklch(0.55 0.22 15)'
    },
    pink: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 340)',
        '--foreground': 'oklch(0.2 0.08 340)',
        '--card': 'oklch(0.99 0.01 340)',
        '--card-foreground': 'oklch(0.2 0.08 340)',
        '--popover': 'oklch(0.99 0.01 340)',
        '--popover-foreground': 'oklch(0.2 0.08 340)',
        '--primary': 'oklch(0.6 0.18 340)',
        '--primary-foreground': 'oklch(0.99 0.01 340)',
        '--secondary': 'oklch(0.95 0.03 340)',
        '--secondary-foreground': 'oklch(0.3 0.12 340)',
        '--muted': 'oklch(0.95 0.03 340)',
        '--muted-foreground': 'oklch(0.45 0.08 340)',
        '--accent': 'oklch(0.92 0.04 340)',
        '--accent-foreground': 'oklch(0.3 0.12 340)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 340)',
        '--input': 'oklch(0.9 0.035 340)',
        '--ring': 'oklch(0.6 0.18 340)',
        '--chart-1': 'oklch(0.6 0.18 340)',
        '--chart-2': 'oklch(0.65 0.16 320)',
        '--chart-3': 'oklch(0.55 0.2 360)',
        '--chart-4': 'oklch(0.5 0.22 300)',
        '--chart-5': 'oklch(0.7 0.14 20)',
        '--sidebar': 'oklch(0.97 0.025 340)',
        '--sidebar-foreground': 'oklch(0.2 0.08 340)',
        '--sidebar-primary': 'oklch(0.6 0.18 340)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 340)',
        '--sidebar-accent': 'oklch(0.92 0.04 340)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.12 340)',
        '--sidebar-border': 'oklch(0.9 0.035 340)',
        '--sidebar-ring': 'oklch(0.6 0.18 340)'
    },
    yellow: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.03 75)',
        '--foreground': 'oklch(0.2 0.08 75)',
        '--card': 'oklch(0.99 0.02 75)',
        '--card-foreground': 'oklch(0.2 0.08 75)',
        '--popover': 'oklch(0.99 0.02 75)',
        '--popover-foreground': 'oklch(0.2 0.08 75)',
        '--primary': 'oklch(0.65 0.15 75)',
        '--primary-foreground': 'oklch(0.99 0.02 75)',
        '--secondary': 'oklch(0.94 0.04 75)',
        '--secondary-foreground': 'oklch(0.3 0.1 75)',
        '--muted': 'oklch(0.94 0.04 75)',
        '--muted-foreground': 'oklch(0.45 0.08 75)',
        '--accent': 'oklch(0.9 0.06 75)',
        '--accent-foreground': 'oklch(0.3 0.1 75)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.87 0.05 75)',
        '--input': 'oklch(0.87 0.05 75)',
        '--ring': 'oklch(0.65 0.15 75)',
        '--chart-1': 'oklch(0.65 0.15 75)',
        '--chart-2': 'oklch(0.7 0.12 95)',
        '--chart-3': 'oklch(0.6 0.18 55)',
        '--chart-4': 'oklch(0.55 0.2 45)',
        '--chart-5': 'oklch(0.75 0.1 105)',
        '--sidebar': 'oklch(0.96 0.035 75)',
        '--sidebar-foreground': 'oklch(0.2 0.08 75)',
        '--sidebar-primary': 'oklch(0.65 0.15 75)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.02 75)',
        '--sidebar-accent': 'oklch(0.9 0.06 75)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.1 75)',
        '--sidebar-border': 'oklch(0.87 0.05 75)',
        '--sidebar-ring': 'oklch(0.65 0.15 75)'
    },
    teal: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 180)',
        '--foreground': 'oklch(0.2 0.08 180)',
        '--card': 'oklch(0.99 0.01 180)',
        '--card-foreground': 'oklch(0.2 0.08 180)',
        '--popover': 'oklch(0.99 0.01 180)',
        '--popover-foreground': 'oklch(0.2 0.08 180)',
        '--primary': 'oklch(0.5 0.16 180)',
        '--primary-foreground': 'oklch(0.99 0.01 180)',
        '--secondary': 'oklch(0.95 0.03 180)',
        '--secondary-foreground': 'oklch(0.3 0.1 180)',
        '--muted': 'oklch(0.95 0.03 180)',
        '--muted-foreground': 'oklch(0.45 0.08 180)',
        '--accent': 'oklch(0.92 0.04 180)',
        '--accent-foreground': 'oklch(0.3 0.1 180)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 180)',
        '--input': 'oklch(0.9 0.035 180)',
        '--ring': 'oklch(0.5 0.16 180)',
        '--chart-1': 'oklch(0.5 0.16 180)',
        '--chart-2': 'oklch(0.45 0.18 200)',
        '--chart-3': 'oklch(0.55 0.14 160)',
        '--chart-4': 'oklch(0.4 0.2 220)',
        '--chart-5': 'oklch(0.6 0.12 140)',
        '--sidebar': 'oklch(0.97 0.025 180)',
        '--sidebar-foreground': 'oklch(0.2 0.08 180)',
        '--sidebar-primary': 'oklch(0.5 0.16 180)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 180)',
        '--sidebar-accent': 'oklch(0.92 0.04 180)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.1 180)',
        '--sidebar-border': 'oklch(0.9 0.035 180)',
        '--sidebar-ring': 'oklch(0.5 0.16 180)'
    },
    indigo: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 260)',
        '--foreground': 'oklch(0.2 0.08 260)',
        '--card': 'oklch(0.99 0.01 260)',
        '--card-foreground': 'oklch(0.2 0.08 260)',
        '--popover': 'oklch(0.99 0.01 260)',
        '--popover-foreground': 'oklch(0.2 0.08 260)',
        '--primary': 'oklch(0.45 0.18 260)',
        '--primary-foreground': 'oklch(0.99 0.01 260)',
        '--secondary': 'oklch(0.95 0.03 260)',
        '--secondary-foreground': 'oklch(0.3 0.1 260)',
        '--muted': 'oklch(0.95 0.03 260)',
        '--muted-foreground': 'oklch(0.45 0.08 260)',
        '--accent': 'oklch(0.92 0.04 260)',
        '--accent-foreground': 'oklch(0.3 0.1 260)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 260)',
        '--input': 'oklch(0.9 0.035 260)',
        '--ring': 'oklch(0.45 0.18 260)',
        '--chart-1': 'oklch(0.45 0.18 260)',
        '--chart-2': 'oklch(0.5 0.16 240)',
        '--chart-3': 'oklch(0.4 0.2 280)',
        '--chart-4': 'oklch(0.35 0.22 220)',
        '--chart-5': 'oklch(0.55 0.14 300)',
        '--sidebar': 'oklch(0.97 0.025 260)',
        '--sidebar-foreground': 'oklch(0.2 0.08 260)',
        '--sidebar-primary': 'oklch(0.45 0.18 260)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 260)',
        '--sidebar-accent': 'oklch(0.92 0.04 260)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.1 260)',
        '--sidebar-border': 'oklch(0.9 0.035 260)',
        '--sidebar-ring': 'oklch(0.45 0.18 260)'
    },
    rose: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 5)',
        '--foreground': 'oklch(0.2 0.06 5)',
        '--card': 'oklch(0.99 0.01 5)',
        '--card-foreground': 'oklch(0.2 0.06 5)',
        '--popover': 'oklch(0.99 0.01 5)',
        '--popover-foreground': 'oklch(0.2 0.06 5)',
        '--primary': 'oklch(0.58 0.2 5)',
        '--primary-foreground': 'oklch(0.99 0.01 5)',
        '--secondary': 'oklch(0.95 0.03 5)',
        '--secondary-foreground': 'oklch(0.3 0.08 5)',
        '--muted': 'oklch(0.95 0.03 5)',
        '--muted-foreground': 'oklch(0.45 0.06 5)',
        '--accent': 'oklch(0.92 0.04 5)',
        '--accent-foreground': 'oklch(0.3 0.08 5)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 5)',
        '--input': 'oklch(0.9 0.035 5)',
        '--ring': 'oklch(0.58 0.2 5)',
        '--chart-1': 'oklch(0.58 0.2 5)',
        '--chart-2': 'oklch(0.63 0.18 345)',
        '--chart-3': 'oklch(0.53 0.22 25)',
        '--chart-4': 'oklch(0.48 0.24 340)',
        '--chart-5': 'oklch(0.68 0.16 35)',
        '--sidebar': 'oklch(0.97 0.025 5)',
        '--sidebar-foreground': 'oklch(0.2 0.06 5)',
        '--sidebar-primary': 'oklch(0.58 0.2 5)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 5)',
        '--sidebar-accent': 'oklch(0.92 0.04 5)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.08 5)',
        '--sidebar-border': 'oklch(0.9 0.035 5)',
        '--sidebar-ring': 'oklch(0.58 0.2 5)'
    },
    emerald: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.02 160)',
        '--foreground': 'oklch(0.2 0.08 160)',
        '--card': 'oklch(0.99 0.01 160)',
        '--card-foreground': 'oklch(0.2 0.08 160)',
        '--popover': 'oklch(0.99 0.01 160)',
        '--popover-foreground': 'oklch(0.2 0.08 160)',
        '--primary': 'oklch(0.52 0.16 160)',
        '--primary-foreground': 'oklch(0.99 0.01 160)',
        '--secondary': 'oklch(0.95 0.03 160)',
        '--secondary-foreground': 'oklch(0.3 0.1 160)',
        '--muted': 'oklch(0.95 0.03 160)',
        '--muted-foreground': 'oklch(0.45 0.08 160)',
        '--accent': 'oklch(0.92 0.04 160)',
        '--accent-foreground': 'oklch(0.3 0.1 160)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.035 160)',
        '--input': 'oklch(0.9 0.035 160)',
        '--ring': 'oklch(0.52 0.16 160)',
        '--chart-1': 'oklch(0.52 0.16 160)',
        '--chart-2': 'oklch(0.47 0.18 140)',
        '--chart-3': 'oklch(0.57 0.14 180)',
        '--chart-4': 'oklch(0.42 0.2 120)',
        '--chart-5': 'oklch(0.62 0.12 200)',
        '--sidebar': 'oklch(0.97 0.025 160)',
        '--sidebar-foreground': 'oklch(0.2 0.08 160)',
        '--sidebar-primary': 'oklch(0.52 0.16 160)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.01 160)',
        '--sidebar-accent': 'oklch(0.92 0.04 160)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.1 160)',
        '--sidebar-border': 'oklch(0.9 0.035 160)',
        '--sidebar-ring': 'oklch(0.52 0.16 160)'
    },
    amber: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.03 60)',
        '--foreground': 'oklch(0.2 0.08 60)',
        '--card': 'oklch(0.99 0.02 60)',
        '--card-foreground': 'oklch(0.2 0.08 60)',
        '--popover': 'oklch(0.99 0.02 60)',
        '--popover-foreground': 'oklch(0.2 0.08 60)',
        '--primary': 'oklch(0.68 0.18 60)',
        '--primary-foreground': 'oklch(0.99 0.02 60)',
        '--secondary': 'oklch(0.94 0.04 60)',
        '--secondary-foreground': 'oklch(0.3 0.1 60)',
        '--muted': 'oklch(0.94 0.04 60)',
        '--muted-foreground': 'oklch(0.45 0.08 60)',
        '--accent': 'oklch(0.9 0.06 60)',
        '--accent-foreground': 'oklch(0.3 0.1 60)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.87 0.05 60)',
        '--input': 'oklch(0.87 0.05 60)',
        '--ring': 'oklch(0.68 0.18 60)',
        '--chart-1': 'oklch(0.68 0.18 60)',
        '--chart-2': 'oklch(0.73 0.15 80)',
        '--chart-3': 'oklch(0.63 0.2 40)',
        '--chart-4': 'oklch(0.58 0.22 30)',
        '--chart-5': 'oklch(0.78 0.12 90)',
        '--sidebar': 'oklch(0.96 0.035 60)',
        '--sidebar-foreground': 'oklch(0.2 0.08 60)',
        '--sidebar-primary': 'oklch(0.68 0.18 60)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.02 60)',
        '--sidebar-accent': 'oklch(0.9 0.06 60)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.1 60)',
        '--sidebar-border': 'oklch(0.87 0.05 60)',
        '--sidebar-ring': 'oklch(0.68 0.18 60)'
    },
    coral: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.025 15)',
        '--foreground': 'oklch(0.2 0.12 15)',
        '--card': 'oklch(0.995 0.015 15)',
        '--card-foreground': 'oklch(0.2 0.12 15)',
        '--popover': 'oklch(0.995 0.015 15)',
        '--popover-foreground': 'oklch(0.2 0.12 15)',
        '--primary': 'oklch(0.62 0.2 15)',
        '--primary-foreground': 'oklch(0.995 0.015 15)',
        '--secondary': 'oklch(0.94 0.04 15)',
        '--secondary-foreground': 'oklch(0.3 0.14 15)',
        '--muted': 'oklch(0.94 0.04 15)',
        '--muted-foreground': 'oklch(0.46 0.08 15)',
        '--accent': 'oklch(0.9 0.05 15)',
        '--accent-foreground': 'oklch(0.3 0.14 15)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.86 0.045 15)',
        '--input': 'oklch(0.86 0.045 15)',
        '--ring': 'oklch(0.62 0.2 15)',
        '--chart-1': 'oklch(0.62 0.2 15)',
        '--chart-2': 'oklch(0.52 0.18 355)',
        '--chart-3': 'oklch(0.72 0.16 35)',
        '--chart-4': 'oklch(0.42 0.22 335)',
        '--chart-5': 'oklch(0.82 0.14 55)',
        '--sidebar': 'oklch(0.97 0.03 15)',
        '--sidebar-foreground': 'oklch(0.2 0.12 15)',
        '--sidebar-primary': 'oklch(0.62 0.2 15)',
        '--sidebar-primary-foreground': 'oklch(0.995 0.015 15)',
        '--sidebar-accent': 'oklch(0.9 0.05 15)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.14 15)',
        '--sidebar-border': 'oklch(0.86 0.045 15)',
        '--sidebar-ring': 'oklch(0.62 0.2 15)'
    },
    slate: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.98 0.005 220)',
        '--foreground': 'oklch(0.2 0.02 220)',
        '--card': 'oklch(0.99 0.003 220)',
        '--card-foreground': 'oklch(0.2 0.02 220)',
        '--popover': 'oklch(0.99 0.003 220)',
        '--popover-foreground': 'oklch(0.2 0.02 220)',
        '--primary': 'oklch(0.45 0.05 220)',
        '--primary-foreground': 'oklch(0.99 0.003 220)',
        '--secondary': 'oklch(0.95 0.01 220)',
        '--secondary-foreground': 'oklch(0.3 0.03 220)',
        '--muted': 'oklch(0.95 0.01 220)',
        '--muted-foreground': 'oklch(0.5 0.02 220)',
        '--accent': 'oklch(0.92 0.015 220)',
        '--accent-foreground': 'oklch(0.3 0.03 220)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--border': 'oklch(0.9 0.015 220)',
        '--input': 'oklch(0.9 0.015 220)',
        '--ring': 'oklch(0.45 0.05 220)',
        '--chart-1': 'oklch(0.45 0.05 220)',
        '--chart-2': 'oklch(0.35 0.06 200)',
        '--chart-3': 'oklch(0.55 0.04 240)',
        '--chart-4': 'oklch(0.25 0.07 180)',
        '--chart-5': 'oklch(0.65 0.03 260)',
        '--sidebar': 'oklch(0.975 0.008 220)',
        '--sidebar-foreground': 'oklch(0.2 0.02 220)',
        '--sidebar-primary': 'oklch(0.45 0.05 220)',
        '--sidebar-primary-foreground': 'oklch(0.99 0.003 220)',
        '--sidebar-accent': 'oklch(0.92 0.015 220)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.03 220)',
        '--sidebar-border': 'oklch(0.9 0.015 220)',
        '--sidebar-ring': 'oklch(0.45 0.05 220)'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/customize/themes/custom-themes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Custom Themes
 * 
 * Add your own custom theme variations here.
 * These themes will be merged with the default available themes.
 */ __turbopack_context__.s([
    "customThemes",
    ()=>customThemes,
    "getAllThemes",
    ()=>getAllThemes,
    "getCustomThemeNames",
    ()=>getCustomThemeNames,
    "validateTheme",
    ()=>validateTheme
]);
const customThemes = {
};
function getAllThemes() {
    // This will be used by the theme system to combine all themes
    return customThemes;
}
function validateTheme(theme) {
    const requiredVars = [
        '--background',
        '--foreground',
        '--primary',
        '--primary-foreground',
        '--secondary',
        '--secondary-foreground',
        '--muted',
        '--muted-foreground',
        '--accent',
        '--accent-foreground',
        '--destructive',
        '--border',
        '--input',
        '--ring',
        '--card',
        '--card-foreground',
        '--popover',
        '--popover-foreground'
    ];
    return requiredVars.every((variable)=>variable in theme);
}
function getCustomThemeNames() {
    return Object.keys(customThemes);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/config/appearance.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"fonts\":{\"primary\":\"Saira\",\"heading\":\"Roboto\",\"mono\":\"JetBrains Mono\"},\"theme\":{\"defaultTheme\":\"slate\"},\"branding\":{\"appName\":\"Moorcheh AI \",\"appTitle\":\"Moorcheh app\",\"appSubtitle\":\"How can I help you \",\"appDescription\":\"\",\"companyName\":\"edge AI \",\"contactEmail\":\"neel_patel2004@outlook.com\",\"storagePrefix\":\"moorcheh-ai-chat\",\"exportPrefix\":\"MoorchehAI\",\"logo\":\"/assets/logo.png\"}}"));}),
"[project]/projects/deltahacks12/customize/themes/theme-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Main Theme Configuration
 *
 * This file now reads theme settings from appearance.json.
 * Edit the appearance.json file to change your application's theme settings.
 */ __turbopack_context__.s([
    "advancedThemeConfig",
    ()=>advancedThemeConfig,
    "requiredThemeVariables",
    ()=>requiredThemeVariables,
    "themeConfig",
    ()=>themeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/config/appearance.json (json)");
var _appearanceConfig_theme;
;
const themeConfig = {
    // Default theme loaded from appearance.json - CHANGE THIS IN appearance.json TO SWITCH YOUR APP'S THEME
    defaultTheme: ((_appearanceConfig_theme = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__["default"].theme) === null || _appearanceConfig_theme === void 0 ? void 0 : _appearanceConfig_theme.defaultTheme) || 'slate',
    // System theme detection
    enableSystemTheme: true,
    // Theme switcher UI
    enableThemeToggle: true,
    // Theme persistence
    persistTheme: true,
    // Available themes in theme switcher
    availableThemes: [
        'light',
        'dark',
        'blue',
        'green',
        'purple',
        'orange',
        'red',
        'pink',
        'yellow',
        'teal',
        'indigo',
        'rose',
        'emerald',
        'amber',
        'system',
        'coral',
        'slate'
    ],
    // Theme display names (shown in UI)
    themeLabels: {
        light: 'Light',
        dark: 'Dark',
        blue: 'Ocean Blue',
        green: 'Nature Green',
        purple: 'Purple Dream',
        orange: 'Sunset Orange',
        red: 'Ruby Red',
        pink: 'Blossom Pink',
        yellow: 'Golden Yellow',
        teal: 'Aqua Teal',
        indigo: 'Deep Indigo',
        rose: 'Rose Garden',
        emerald: 'Emerald Forest',
        amber: 'Warm Amber',
        system: 'System',
        coral: 'Coral',
        slate: 'Slate'
    },
    // Animation settings
    transitionDuration: 200
};
const advancedThemeConfig = {
    // CSS class prefix for themes
    themeClassPrefix: 'theme-',
    // CSS variable prefix  
    cssVariablePrefix: '--',
    // Local storage key for theme persistence
    storageKey: __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STORAGE_PREFIX ? "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STORAGE_PREFIX, "-theme") : 'moorcheh-chat-theme',
    // Media query for system theme detection
    systemThemeQuery: '(prefers-color-scheme: dark)',
    // Enable CSS transitions for theme changes
    enableTransitions: true,
    // Debug mode (console logs theme changes)
    debug: false
};
const requiredThemeVariables = [
    '--background',
    '--foreground',
    '--primary',
    '--primary-foreground',
    '--secondary',
    '--secondary-foreground',
    '--muted',
    '--muted-foreground',
    '--accent',
    '--accent-foreground',
    '--destructive',
    '--border',
    '--input',
    '--ring',
    '--card',
    '--card-foreground',
    '--popover',
    '--popover-foreground'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/customize/fonts/font-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Main Font Configuration
 *
 * This file now reads font settings from appearance.json.
 * Edit the appearance.json file to change your application's font settings.
 */ __turbopack_context__.s([
    "advancedFontConfig",
    ()=>advancedFontConfig,
    "fontConfig",
    ()=>fontConfig,
    "fontLoadingPriority",
    ()=>fontLoadingPriority,
    "fontPresets",
    ()=>fontPresets,
    "responsiveTypography",
    ()=>responsiveTypography,
    "typographyUtils",
    ()=>typographyUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/config/appearance.json (json)");
var _appearanceConfig_fonts, _appearanceConfig_fonts1, _appearanceConfig_fonts2;
;
const fontConfig = {
    // Primary fonts loaded from appearance.json
    primaryFont: ((_appearanceConfig_fonts = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts) === null || _appearanceConfig_fonts === void 0 ? void 0 : _appearanceConfig_fonts.primary) || 'Roboto',
    headingFont: ((_appearanceConfig_fonts1 = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts) === null || _appearanceConfig_fonts1 === void 0 ? void 0 : _appearanceConfig_fonts1.heading) || 'Inter',
    monoFont: ((_appearanceConfig_fonts2 = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts) === null || _appearanceConfig_fonts2 === void 0 ? void 0 : _appearanceConfig_fonts2.mono) || 'Fira Code',
    // Google Fonts integration
    enableGoogleFonts: true,
    // Performance settings
    preloadFonts: true,
    fontDisplay: 'swap',
    enableOptimization: true,
    // Typography scale
    baseFontSize: '16px',
    scaleRatio: 1.25
};
const advancedFontConfig = {
    // Font loading timeout
    fontTimeout: 3000,
    // Character subsets to load
    fontSubsets: [
        'latin',
        'latin-ext'
    ],
    // Font weights to load
    defaultWeights: [
        400,
        500,
        600,
        700
    ],
    // Enable font feature settings
    enableFontFeatures: true,
    // Font feature settings
    fontFeatures: {
        // Enable ligatures for code fonts
        ligatures: true,
        // Enable tabular numbers
        tabularNums: false,
        // Enable old-style numbers
        oldStyleNums: false
    },
    // CSS variable names
    cssVariables: {
        primary: '--font-primary',
        heading: '--font-heading',
        mono: '--font-mono'
    },
    // Fallback fonts
    fallbackFonts: {
        sansSerif: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
    }
};
const responsiveTypography = {
    // Base font sizes for different screen sizes
    baseSizes: {
        mobile: '14px',
        tablet: '15px',
        desktop: '16px',
        large: '17px'
    },
    // Scale ratios for different screen sizes
    scaleRatios: {
        mobile: 1.2,
        tablet: 1.25,
        desktop: 1.25,
        large: 1.3
    },
    // Line height settings
    lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2
    },
    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
    }
};
const typographyUtils = {
    // Generate font size scale
    generateFontScale: function(baseSize, ratio) {
        let steps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 8;
        const scale = {};
        for(let i = 0; i < steps; i++){
            const size = baseSize * Math.pow(ratio, i);
            scale["scale-".concat(i)] = "".concat(size.toFixed(2), "px");
        }
        return scale;
    },
    // Get font family with fallbacks
    getFontFamily: (fontName)=>{
        // This will be implemented by the font loading system
        return fontName;
    },
    // Validate font configuration
    validateConfig: (config)=>{
        const errors = [];
        if (!config.primaryFont) {
            errors.push('Primary font is required');
        }
        if (!config.headingFont) {
            errors.push('Heading font is required');
        }
        if (!config.monoFont) {
            errors.push('Monospace font is required');
        }
        if (config.scaleRatio <= 1) {
            errors.push('Scale ratio must be greater than 1');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
};
const fontLoadingPriority = [
    'primaryFont',
    'headingFont',
    'monoFont'
];
const fontPresets = {
    modern: {
        primaryFont: 'Inter',
        headingFont: 'Inter',
        monoFont: 'JetBrains Mono'
    },
    editorial: {
        primaryFont: 'Lora',
        headingFont: 'Playfair Display',
        monoFont: 'Source Code Pro'
    },
    friendly: {
        primaryFont: 'Open Sans',
        headingFont: 'Poppins',
        monoFont: 'Fira Code'
    },
    technical: {
        primaryFont: 'Roboto',
        headingFont: 'Roboto',
        monoFont: 'JetBrains Mono'
    },
    minimal: {
        primaryFont: 'system-ui',
        headingFont: 'system-ui',
        monoFont: 'ui-monospace'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/customize/fonts/available-fonts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Available Fonts
 * 
 * This file contains a curated selection of popular Google Fonts.
 * For the complete Google Fonts catalog, visit: https://fonts.google.com
 */ __turbopack_context__.s([
    "availableFonts",
    ()=>availableFonts,
    "fontCategories",
    ()=>fontCategories,
    "generateGoogleFontsUrl",
    ()=>generateGoogleFontsUrl,
    "getFontDefinition",
    ()=>getFontDefinition,
    "getFontNames",
    ()=>getFontNames,
    "getFontsByCategory",
    ()=>getFontsByCategory,
    "getFontsByPopularity",
    ()=>getFontsByPopularity,
    "getMostPopularFonts",
    ()=>getMostPopularFonts,
    "googleFontsInfo",
    ()=>googleFontsInfo,
    "popularCombinations",
    ()=>popularCombinations,
    "validateFont",
    ()=>validateFont
]);
const availableFonts = {
    // MOST POPULAR SANS-SERIF FONTS
    'Inter': {
        name: 'Inter',
        googleFontsName: 'Inter',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        preload: true,
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'A highly legible font family designed for user interfaces',
        designer: 'Rasmus Andersson',
        popularity: 5
    },
    'Roboto': {
        name: 'Roboto',
        googleFontsName: 'Roboto',
        weights: [
            100,
            300,
            400,
            500,
            700,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Google\'s signature family of fonts',
        designer: 'Christian Robertson',
        popularity: 5
    },
    'Open Sans': {
        name: 'Open Sans',
        googleFontsName: 'Open+Sans',
        weights: [
            300,
            400,
            500,
            600,
            700,
            800
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Friendly and open curves with upright stress',
        designer: 'Steve Matteson',
        popularity: 5
    },
    'Poppins': {
        name: 'Poppins',
        googleFontsName: 'Poppins',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Geometric sans-serif with rounded edges',
        designer: 'Jonny Pinhorn',
        popularity: 5
    },
    'Lato': {
        name: 'Lato',
        googleFontsName: 'Lato',
        weights: [
            100,
            300,
            400,
            700,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Humanist sans-serif with warm characteristics',
        designer: 'Łukasz Dziedzic',
        popularity: 5
    },
    'Saira': {
        name: 'Saira',
        googleFontsName: 'Saira',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Modern geometric sans-serif with excellent readability',
        designer: 'Omnibus-Type',
        popularity: 4
    },
    // MORE POPULAR SANS-SERIF FONTS
    'Nunito': {
        name: 'Nunito',
        googleFontsName: 'Nunito',
        weights: [
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Rounded terminal sans-serif',
        designer: 'Vernon Adams',
        popularity: 4
    },
    'Montserrat': {
        name: 'Montserrat',
        googleFontsName: 'Montserrat',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Urban typography inspired by Buenos Aires',
        designer: 'Julieta Ulanovsky',
        popularity: 4
    },
    'Outfit': {
        name: 'Outfit',
        googleFontsName: 'Outfit',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Modern geometric sans-serif',
        designer: 'Rodrigo Fuenzalida',
        popularity: 4
    },
    'Work Sans': {
        name: 'Work Sans',
        googleFontsName: 'Work+Sans',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Optimized for work environments',
        designer: 'Wei Huang',
        popularity: 4
    },
    'DM Sans': {
        name: 'DM Sans',
        googleFontsName: 'DM+Sans',
        weights: [
            400,
            500,
            700
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Versatile geometric sans-serif',
        designer: 'Colophon Foundry',
        popularity: 4
    },
    'Source Sans Pro': {
        name: 'Source Sans Pro',
        googleFontsName: 'Source+Sans+Pro',
        weights: [
            200,
            300,
            400,
            600,
            700,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Adobe\'s first open source font family',
        designer: 'Paul D. Hunt',
        popularity: 4
    },
    'Rubik': {
        name: 'Rubik',
        googleFontsName: 'Rubik',
        weights: [
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Slightly rounded corners sans-serif',
        designer: 'Hubert and Fischer',
        popularity: 4
    },
    'Ubuntu': {
        name: 'Ubuntu',
        googleFontsName: 'Ubuntu',
        weights: [
            300,
            400,
            500,
            700
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Humanist sans-serif from Canonical',
        designer: 'Dalton Maag',
        popularity: 3
    },
    'Fira Sans': {
        name: 'Fira Sans',
        googleFontsName: 'Fira+Sans',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Designed for Firefox OS',
        designer: 'Erik Spiekermann',
        popularity: 3
    },
    'Manrope': {
        name: 'Manrope',
        googleFontsName: 'Manrope',
        weights: [
            200,
            300,
            400,
            500,
            600,
            700,
            800
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Modern geometric sans-serif',
        designer: 'Mikhail Sharanda',
        popularity: 3
    },
    'Plus Jakarta Sans': {
        name: 'Plus Jakarta Sans',
        googleFontsName: 'Plus+Jakarta+Sans',
        weights: [
            200,
            300,
            400,
            500,
            600,
            700,
            800
        ],
        category: 'sans-serif',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Contemporary geometric sans-serif',
        designer: 'Tokotype',
        popularity: 3
    },
    // POPULAR SERIF FONTS
    'Merriweather': {
        name: 'Merriweather',
        googleFontsName: 'Merriweather',
        weights: [
            300,
            400,
            700,
            900
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Designed to be pleasant to read on screens',
        designer: 'Sorkin Type',
        popularity: 5
    },
    'Playfair Display': {
        name: 'Playfair Display',
        googleFontsName: 'Playfair+Display',
        weights: [
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'High-contrast serif for large sizes',
        designer: 'Claus Eggers Sørensen',
        popularity: 5
    },
    'Lora': {
        name: 'Lora',
        googleFontsName: 'Lora',
        weights: [
            400,
            500,
            600,
            700
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Well-balanced contemporary serif',
        designer: 'Cyreal',
        popularity: 4
    },
    'Source Serif Pro': {
        name: 'Source Serif Pro',
        googleFontsName: 'Source+Serif+Pro',
        weights: [
            200,
            300,
            400,
            600,
            700,
            900
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Adobe\'s serif font family',
        designer: 'Frank Grießhammer',
        popularity: 4
    },
    'PT Serif': {
        name: 'PT Serif',
        googleFontsName: 'PT+Serif',
        weights: [
            400,
            700
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Transitional serif with humanist features',
        designer: 'Alexandra Korolkova',
        popularity: 4
    },
    'Crimson Text': {
        name: 'Crimson Text',
        googleFontsName: 'Crimson+Text',
        weights: [
            400,
            600,
            700
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Inspired by old-style serif typefaces',
        designer: 'Sebastian Kosch',
        popularity: 3
    },
    'Libre Baskerville': {
        name: 'Libre Baskerville',
        googleFontsName: 'Libre+Baskerville',
        weights: [
            400,
            700
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Based on 1941 ATF Baskerville',
        designer: 'Impallari Type',
        popularity: 3
    },
    'Cormorant Garamond': {
        name: 'Cormorant Garamond',
        googleFontsName: 'Cormorant+Garamond',
        weights: [
            300,
            400,
            500,
            600,
            700
        ],
        category: 'serif',
        fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Display serif inspired by Claude Garamond',
        designer: 'Christian Thalmann',
        popularity: 3
    },
    // MONOSPACE FONTS
    'JetBrains Mono': {
        name: 'JetBrains Mono',
        googleFontsName: 'JetBrains+Mono',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Coding font with ligatures',
        designer: 'JetBrains',
        hasLigatures: true,
        popularity: 5
    },
    'Fira Code': {
        name: 'Fira Code',
        googleFontsName: 'Fira+Code',
        weights: [
            300,
            400,
            500,
            600,
            700
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Monospaced font with programming ligatures',
        designer: 'Nikita Prokopov',
        hasLigatures: true,
        popularity: 5
    },
    'Source Code Pro': {
        name: 'Source Code Pro',
        googleFontsName: 'Source+Code+Pro',
        weights: [
            200,
            300,
            400,
            500,
            600,
            700,
            900
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Adobe\'s monospace font family',
        designer: 'Paul D. Hunt',
        popularity: 4
    },
    'IBM Plex Mono': {
        name: 'IBM Plex Mono',
        googleFontsName: 'IBM+Plex+Mono',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'IBM\'s corporate typeface for code',
        designer: 'IBM',
        popularity: 4
    },
    'Roboto Mono': {
        name: 'Roboto Mono',
        googleFontsName: 'Roboto+Mono',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Monospaced addition to the Roboto family',
        designer: 'Christian Robertson',
        popularity: 4
    },
    'Space Mono': {
        name: 'Space Mono',
        googleFontsName: 'Space+Mono',
        weights: [
            400,
            700
        ],
        category: 'monospace',
        fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Original fixed-width type family',
        designer: 'Colophon Foundry',
        popularity: 3
    },
    // DISPLAY FONTS
    'Space Grotesk': {
        name: 'Space Grotesk',
        googleFontsName: 'Space+Grotesk',
        weights: [
            300,
            400,
            500,
            600,
            700
        ],
        category: 'display',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Proportional variant of Space Mono',
        designer: 'Florian Karsten',
        popularity: 4
    },
    'Oswald': {
        name: 'Oswald',
        googleFontsName: 'Oswald',
        weights: [
            200,
            300,
            400,
            500,
            600,
            700
        ],
        category: 'display',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Reworking of the classic gothic typeface',
        designer: 'Vernon Adams',
        popularity: 4
    },
    'Raleway': {
        name: 'Raleway',
        googleFontsName: 'Raleway',
        weights: [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ],
        category: 'display',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Elegant sans-serif typeface family',
        designer: 'Matt McInerney',
        popularity: 4
    },
    'Bebas Neue': {
        name: 'Bebas Neue',
        googleFontsName: 'Bebas+Neue',
        weights: [
            400
        ],
        category: 'display',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'All caps display font',
        designer: 'Ryoichi Tsunekawa',
        popularity: 3
    },
    // HANDWRITING FONTS
    'Dancing Script': {
        name: 'Dancing Script',
        googleFontsName: 'Dancing+Script',
        weights: [
            400,
            500,
            600,
            700
        ],
        category: 'handwriting',
        fallback: 'cursive',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Lively casual script',
        designer: 'Pablo Impallari',
        popularity: 4
    },
    'Great Vibes': {
        name: 'Great Vibes',
        googleFontsName: 'Great+Vibes',
        weights: [
            400
        ],
        category: 'handwriting',
        fallback: 'cursive',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Connecting script typeface',
        designer: 'TypeSETit',
        popularity: 3
    },
    'Pacifico': {
        name: 'Pacifico',
        googleFontsName: 'Pacifico',
        weights: [
            400
        ],
        category: 'handwriting',
        fallback: 'cursive',
        display: 'swap',
        subsets: [
            'latin',
            'latin-ext'
        ],
        description: 'Brush script typeface',
        designer: 'Vernon Adams',
        popularity: 3
    }
};
function getFontsByCategory(category) {
    return Object.entries(availableFonts).filter((param)=>{
        let [, font] = param;
        return font.category === category;
    });
}
function getFontsByPopularity() {
    let minRating = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3;
    return Object.entries(availableFonts).filter((param)=>{
        let [, font] = param;
        return (font.popularity || 0) >= minRating;
    });
}
function getMostPopularFonts() {
    return getFontsByPopularity(5);
}
function getFontNames() {
    return Object.keys(availableFonts);
}
function getFontDefinition(name) {
    return availableFonts[name];
}
function generateGoogleFontsUrl(fontNames) {
    const fontQueries = fontNames.map((name)=>{
        const font = availableFonts[name];
        if (!font) return null;
        const weights = font.weights.join(',');
        return "".concat(font.googleFontsName, ":wght@").concat(weights);
    }).filter(Boolean).join('&family=');
    return "https://fonts.googleapis.com/css2?family=".concat(fontQueries, "&display=swap");
}
function validateFont(name) {
    return name in availableFonts;
}
const fontCategories = {
    'sans-serif': 'Sans-serif fonts for clean, modern interfaces',
    'serif': 'Serif fonts for traditional, readable text',
    'monospace': 'Monospace fonts for code and technical content',
    'display': 'Display fonts for headings and emphasis',
    'handwriting': 'Script and handwriting fonts for personality'
};
const popularCombinations = [
    {
        name: 'Modern & Clean',
        primary: 'Inter',
        heading: 'Inter',
        mono: 'JetBrains Mono',
        description: 'Perfect for modern applications and dashboards'
    },
    {
        name: 'Editorial Style',
        primary: 'Lora',
        heading: 'Playfair Display',
        mono: 'Source Code Pro',
        description: 'Great for content-heavy applications'
    },
    {
        name: 'Friendly & Approachable',
        primary: 'Open Sans',
        heading: 'Poppins',
        mono: 'Fira Code',
        description: 'Welcoming and easy to read'
    },
    {
        name: 'Technical & Professional',
        primary: 'Roboto',
        heading: 'Roboto',
        mono: 'JetBrains Mono',
        description: 'Clean and professional for technical interfaces'
    },
    {
        name: 'Creative & Unique',
        primary: 'Nunito',
        heading: 'Space Grotesk',
        mono: 'IBM Plex Mono',
        description: 'Stand out with unique character'
    },
    {
        name: 'Elegant & Sophisticated',
        primary: 'Source Sans Pro',
        heading: 'Playfair Display',
        mono: 'Source Code Pro',
        description: 'Refined and professional'
    },
    {
        name: 'Bold & Impactful',
        primary: 'Work Sans',
        heading: 'Oswald',
        mono: 'Roboto Mono',
        description: 'Strong visual presence'
    },
    {
        name: 'Warm & Readable',
        primary: 'Merriweather',
        heading: 'Merriweather',
        mono: 'Space Mono',
        description: 'Comfortable reading experience'
    }
];
const googleFontsInfo = {
    baseUrl: 'https://fonts.googleapis.com',
    apiUrl: 'https://fonts.googleapis.com/css2',
    preconnectUrls: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ],
    // Quick link to browse all Google Fonts
    browseUrl: 'https://fonts.google.com',
    // Popular categories on Google Fonts
    popularCategories: [
        'Sans Serif',
        'Serif',
        'Display',
        'Handwriting',
        'Monospace'
    ],
    // Tips for choosing fonts
    selectionTips: [
        'Consider your brand personality',
        'Test readability at different sizes',
        'Limit to 2-3 font families maximum',
        'Check language support for your audience',
        'Consider loading performance'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/lib/branding-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 🎨 Branding Configuration
 *
 * This file manages all branding-related configuration from appearance.json.
 * Users can customize their app by editing the appearance.json file.
 */ __turbopack_context__.s([
    "branding",
    ()=>branding,
    "getBrandingConfig",
    ()=>getBrandingConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/config/appearance.json (json)");
;
function getBrandingConfig() {
    const branding = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$config$2f$appearance$2e$json__$28$json$29$__["default"].branding;
    // Handle logo - if it's a data URI, use it directly; otherwise treat as file path
    let logo = branding === null || branding === void 0 ? void 0 : branding.logo;
    if (logo && !logo.startsWith('data:') && !logo.startsWith('/')) {
        // If it's not a data URI or absolute path, assume it's a relative path
        logo = "/assets/".concat(logo);
    }
    return {
        appName: (branding === null || branding === void 0 ? void 0 : branding.appName) || 'Moorcheh AI Assistant',
        appTitle: (branding === null || branding === void 0 ? void 0 : branding.appTitle) || 'Moorcheh Chat',
        appSubtitle: (branding === null || branding === void 0 ? void 0 : branding.appSubtitle) || 'Your intelligent chat companion',
        appDescription: (branding === null || branding === void 0 ? void 0 : branding.appDescription) || 'AI-powered chat application with customizable themes and fonts',
        companyName: (branding === null || branding === void 0 ? void 0 : branding.companyName) || 'Moorcheh',
        contactEmail: (branding === null || branding === void 0 ? void 0 : branding.contactEmail) || 'support@moorcheh.ai',
        storagePrefix: (branding === null || branding === void 0 ? void 0 : branding.storagePrefix) || 'moorcheh-chat',
        exportPrefix: (branding === null || branding === void 0 ? void 0 : branding.exportPrefix) || 'Moorcheh-chat',
        logo: logo || '/assets/logo.png'
    };
}
const branding = {
    getAppName: ()=>getBrandingConfig().appName || 'Moorcheh AI Assistant',
    getAppTitle: ()=>getBrandingConfig().appTitle || 'Moorcheh Chat',
    getAppSubtitle: ()=>getBrandingConfig().appSubtitle || 'Your intelligent chat companion',
    getAppDescription: ()=>getBrandingConfig().appDescription || 'AI-powered chat application with customizable themes and fonts',
    getCompanyName: ()=>getBrandingConfig().companyName || 'Moorcheh',
    getContactEmail: ()=>getBrandingConfig().contactEmail || 'support@moorcheh.ai',
    getStoragePrefix: ()=>getBrandingConfig().storagePrefix || 'moorcheh-chat',
    getExportPrefix: ()=>getBrandingConfig().exportPrefix || 'Moorcheh-chat',
    getLogo: ()=>getBrandingConfig().logo,
    // Storage key helpers
    getThemeStorageKey: ()=>"".concat(getBrandingConfig().storagePrefix, "-theme"),
    getChatDataStorageKey: ()=>"".concat(getBrandingConfig().storagePrefix, "-data"),
    // Export filename helper
    getExportFilename: (date)=>{
        const dateStr = (date || new Date()).toISOString().split('T')[0];
        return "".concat(getBrandingConfig().exportPrefix, "-").concat(dateStr, ".txt");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/customize/fonts/custom-fonts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Custom Fonts
 * 
 * Add your own custom font configurations here.
 * These can be custom font files or additional Google Fonts not in the default list.
 */ __turbopack_context__.s([
    "bestPractices",
    ()=>bestPractices,
    "customFonts",
    ()=>customFonts,
    "fontInstallationGuide",
    ()=>fontInstallationGuide,
    "generateFontFaceCSS",
    ()=>generateFontFaceCSS,
    "getCustomFontDefinition",
    ()=>getCustomFontDefinition,
    "getCustomFontNames",
    ()=>getCustomFontNames,
    "isCustomGoogleFont",
    ()=>isCustomGoogleFont,
    "isSelfHostedFont",
    ()=>isSelfHostedFont,
    "isSystemFont",
    ()=>isSystemFont
]);
const customFonts = {
};
function generateFontFaceCSS(fontName) {
    const font = customFonts[fontName];
    if (!font || !font.fontFiles) return '';
    return font.fontFiles.map((file)=>"\n      @font-face {\n        font-family: '".concat(font.name, "';\n        font-weight: ").concat(file.weight, ";\n        font-style: ").concat(file.style, ";\n        font-display: ").concat(font.display || 'swap', ";\n        src: url('").concat(file.url, "') format('").concat(file.format || 'woff2', "');\n      }\n    ")).join('\n');
}
function getCustomFontNames() {
    return Object.keys(customFonts);
}
function isSelfHostedFont(fontName) {
    const font = customFonts[fontName];
    return Boolean((font === null || font === void 0 ? void 0 : font.fontFiles) && font.fontFiles.length > 0);
}
function isCustomGoogleFont(fontName) {
    const font = customFonts[fontName];
    return Boolean(font === null || font === void 0 ? void 0 : font.googleFontsName);
}
function isSystemFont(fontName) {
    const font = customFonts[fontName];
    return Boolean(font === null || font === void 0 ? void 0 : font.isSystemFont);
}
function getCustomFontDefinition(name) {
    return customFonts[name];
}
const fontInstallationGuide = {
    selfHosted: {
        title: 'Self-Hosted Fonts',
        steps: [
            '1. Place your font files in the `public/fonts/` directory',
            '2. Add font definition to `customFonts` object above',
            '3. Include `fontFiles` array with paths to your font files',
            '4. The system will automatically generate @font-face CSS',
            '5. Use the font name in your font configuration'
        ],
        example: "\n// 1. File structure:\n// public/fonts/MyFont-Regular.woff2\n// public/fonts/MyFont-Bold.woff2\n\n// 2. Font definition:\n'MyFont': {\n  name: 'MyFont',\n  weights: [400, 700],\n  category: 'sans-serif',\n  fallback: 'Arial, sans-serif',\n  fontFiles: [\n    { weight: 400, style: 'normal', url: '/fonts/MyFont-Regular.woff2' },\n    { weight: 700, style: 'normal', url: '/fonts/MyFont-Bold.woff2' },\n  ],\n}\n    "
    },
    googleFonts: {
        title: 'Additional Google Fonts',
        steps: [
            '1. Find the font on Google Fonts (fonts.google.com)',
            '2. Get the exact font name and URL-encoded name',
            '3. Add font definition with `googleFontsName` property',
            '4. Specify available weights and subsets',
            '5. The system will automatically load from Google Fonts'
        ],
        example: "\n// Example for \"DM Sans\" font:\n'DM Sans': {\n  name: 'DM Sans',\n  googleFontsName: 'DM+Sans', // URL-encoded name\n  weights: [400, 500, 700],\n  category: 'sans-serif',\n  fallback: 'system-ui, sans-serif',\n  display: 'swap',\n  subsets: ['latin'],\n}\n    "
    },
    system: {
        title: 'System Fonts',
        steps: [
            '1. Define font with `isSystemFont: true`',
            '2. Provide comprehensive fallback stack',
            '3. Set `preload: false` for better performance',
            '4. System fonts load instantly (no network request)'
        ],
        example: "\n'System UI': {\n  name: 'System UI',\n  weights: [400, 500, 600, 700],\n  category: 'sans-serif',\n  fallback: 'system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif',\n  isSystemFont: true,\n  preload: false,\n}\n    "
    }
};
const bestPractices = {
    performance: [
        'Use WOFF2 format for best compression and browser support',
        'Preload only critical fonts (usually just the primary font)',
        'Limit the number of font weights to reduce load time',
        'Use font-display: swap for better perceived performance',
        'Consider using system fonts for better performance'
    ],
    accessibility: [
        'Ensure sufficient contrast between text and background',
        'Test fonts at different sizes and weights',
        'Provide fallback fonts that are widely available',
        'Consider users with dyslexia (some fonts are more readable)',
        'Test with screen readers and assistive technologies'
    ],
    design: [
        'Limit to 2-3 font families maximum',
        'Pair fonts with similar x-heights for consistency',
        'Use different fonts to create hierarchy (heading vs body)',
        'Consider the personality and tone of your brand',
        'Test fonts across different devices and screen sizes'
    ],
    technical: [
        'Use consistent naming conventions',
        'Include comprehensive fallback stacks',
        'Test font loading in slow network conditions',
        'Monitor font loading performance with web vitals',
        'Consider using a font loading strategy library'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/lib/logger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Logger utility for consistent logging across the application
 * Replaces console statements with proper logging levels
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class Logger {
    log(level, message) {
        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            args[_key - 2] = arguments[_key];
        }
        if (!this.isDevelopment && level === 'debug') {
            return;
        }
        const timestamp = new Date().toISOString();
        const prefix = "[".concat(timestamp, "] [").concat(level.toUpperCase(), "]");
        switch(level){
            case 'debug':
                // eslint-disable-next-line no-console
                console.debug(prefix, message, ...args);
                break;
            case 'info':
                // eslint-disable-next-line no-console
                console.info(prefix, message, ...args);
                break;
            case 'warn':
                // eslint-disable-next-line no-console
                console.warn(prefix, message, ...args);
                break;
            case 'error':
                // eslint-disable-next-line no-console
                console.error(prefix, message, ...args);
                break;
        }
    }
    debug(message) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        this.log('debug', message, ...args);
    }
    info(message) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        this.log('info', message, ...args);
    }
    warn(message) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        this.log('warn', message, ...args);
    }
    error(message) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        this.log('error', message, ...args);
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "isDevelopment", ("TURBOPACK compile-time value", "development") === 'development');
    }
}
const logger = new Logger();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/components/chat/CustomizationInitializer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomizationInitializer",
    ()=>CustomizationInitializer
]);
/**
 * CustomizationInitializer Component
 * 
 * This component runs on the client side to initialize the customization system.
 * It ensures themes and fonts are applied as early as possible and respects theme-config.ts changes.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$available$2d$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/themes/available-themes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$custom$2d$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/themes/custom-themes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/themes/theme-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/fonts/font-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/fonts/available-fonts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/lib/branding-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/customize/fonts/custom-fonts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/lib/logger.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function CustomizationInitializer() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomizationInitializer.useEffect": ()=>{
            const initializeCustomization = {
                "CustomizationInitializer.useEffect.initializeCustomization": ()=>{
                    try {
                        // Combine all themes
                        const allThemes = {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$available$2d$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themes"],
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$custom$2d$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customThemes"]
                        };
                        // Get the theme to apply - prioritize config over saved theme
                        let themeToApply = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme;
                        // Check for saved theme only if it matches the current config
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].persistTheme) {
                            const savedTheme = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey());
                            if (savedTheme) {
                                // If saved theme differs from config, update localStorage to match config
                                if (savedTheme !== __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme) {
                                    // Theme updated from config
                                    localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey(), __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme);
                                    themeToApply = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme;
                                } else {
                                    themeToApply = savedTheme;
                                }
                            } else {
                                // No saved theme, use config default and save it
                                localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey(), __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme);
                            }
                        }
                        // Handle system theme
                        if (themeToApply === 'system') {
                            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            themeToApply = prefersDark ? 'dark' : 'light';
                        }
                        // Apply theme
                        const theme = allThemes[themeToApply];
                        if (theme) {
                            const root = document.documentElement;
                            // Clear existing theme classes
                            const existingThemeClasses = Array.from(root.classList).filter({
                                "CustomizationInitializer.useEffect.initializeCustomization.existingThemeClasses": (cls)=>cls.startsWith('theme-')
                            }["CustomizationInitializer.useEffect.initializeCustomization.existingThemeClasses"]);
                            existingThemeClasses.forEach({
                                "CustomizationInitializer.useEffect.initializeCustomization": (cls)=>root.classList.remove(cls)
                            }["CustomizationInitializer.useEffect.initializeCustomization"]);
                            // Apply theme variables
                            Object.entries(theme).forEach({
                                "CustomizationInitializer.useEffect.initializeCustomization": (param)=>{
                                    let [property, value] = param;
                                    root.style.setProperty(property, value);
                                }
                            }["CustomizationInitializer.useEffect.initializeCustomization"]);
                            // Add theme class
                            root.classList.add("theme-".concat(themeToApply));
                            // Add transition class for smooth theme changes
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].transitionDuration > 0) {
                                root.style.setProperty('--theme-transition-duration', "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].transitionDuration, "ms"));
                                root.classList.add('theme-transitioning');
                            }
                        // Theme applied successfully
                        } else {
                            // Theme not found, falling back to light theme
                            // Fallback to light theme
                            const lightTheme = allThemes['light'];
                            if (lightTheme) {
                                const root = document.documentElement;
                                Object.entries(lightTheme).forEach({
                                    "CustomizationInitializer.useEffect.initializeCustomization": (param)=>{
                                        let [property, value] = param;
                                        root.style.setProperty(property, value);
                                    }
                                }["CustomizationInitializer.useEffect.initializeCustomization"]);
                                root.classList.add('theme-light');
                            }
                        }
                        // Apply fonts
                        applyFonts();
                    } catch (error) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Failed to initialize customization:', error);
                    }
                }
            }["CustomizationInitializer.useEffect.initializeCustomization"];
            const applyFonts = {
                "CustomizationInitializer.useEffect.applyFonts": ()=>{
                    try {
                        const root = document.documentElement;
                        // Get font definitions
                        const primaryFont = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont] || __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont];
                        const headingFont = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].headingFont] || __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].headingFont];
                        const monoFont = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].monoFont] || __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].monoFont];
                        // Apply font CSS variables
                        if (primaryFont) {
                            root.style.setProperty('--font-primary', "'".concat(primaryFont.name, "', ").concat(primaryFont.fallback));
                        }
                        if (headingFont) {
                            root.style.setProperty('--font-heading', "'".concat(headingFont.name, "', ").concat(headingFont.fallback));
                        }
                        if (monoFont) {
                            root.style.setProperty('--font-mono', "'".concat(monoFont.name, "', ").concat(monoFont.fallback));
                        }
                        // Load Google Fonts if enabled
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].enableGoogleFonts) {
                            const googleFonts = [
                                __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont,
                                __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].headingFont,
                                __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].monoFont
                            ].filter({
                                "CustomizationInitializer.useEffect.applyFonts.googleFonts": (fontName)=>{
                                    var _availableFonts_fontName;
                                    return (_availableFonts_fontName = __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["availableFonts"][fontName]) === null || _availableFonts_fontName === void 0 ? void 0 : _availableFonts_fontName.googleFontsName;
                                }
                            }["CustomizationInitializer.useEffect.applyFonts.googleFonts"]).filter({
                                "CustomizationInitializer.useEffect.applyFonts.googleFonts": (value, index, self)=>self.indexOf(value) === index
                            }["CustomizationInitializer.useEffect.applyFonts.googleFonts"]); // Remove duplicates
                            if (googleFonts.length > 0) {
                                loadGoogleFonts(googleFonts);
                            }
                        }
                        // Load custom fonts
                        const customFontNames = [
                            __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont,
                            __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].headingFont,
                            __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontConfig"].monoFont
                        ].filter({
                            "CustomizationInitializer.useEffect.applyFonts.customFontNames": (fontName)=>__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFonts"][fontName]
                        }["CustomizationInitializer.useEffect.applyFonts.customFontNames"]);
                        customFontNames.forEach({
                            "CustomizationInitializer.useEffect.applyFonts": (fontName)=>{
                                const existingStyle = document.getElementById("custom-font-".concat(fontName));
                                if (existingStyle) {
                                    existingStyle.remove();
                                }
                                const css = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateFontFaceCSS"])(fontName);
                                if (css) {
                                    const style = document.createElement('style');
                                    style.id = "custom-font-".concat(fontName);
                                    style.textContent = css;
                                    document.head.appendChild(style);
                                }
                            }
                        }["CustomizationInitializer.useEffect.applyFonts"]);
                    } catch (error) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Failed to apply fonts:', error);
                    }
                }
            }["CustomizationInitializer.useEffect.applyFonts"];
            const loadGoogleFonts = {
                "CustomizationInitializer.useEffect.loadGoogleFonts": (fontNames)=>{
                    const existingLink = document.getElementById('google-fonts');
                    if (existingLink) {
                        existingLink.remove();
                    }
                    const googleFontsUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateGoogleFontsUrl"])(fontNames);
                    const link = document.createElement('link');
                    link.id = 'google-fonts';
                    link.rel = 'stylesheet';
                    link.href = googleFontsUrl;
                    // Add preconnect for performance
                    if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
                        const preconnect1 = document.createElement('link');
                        preconnect1.rel = 'preconnect';
                        preconnect1.href = 'https://fonts.googleapis.com';
                        document.head.appendChild(preconnect1);
                    }
                    if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
                        const preconnect2 = document.createElement('link');
                        preconnect2.rel = 'preconnect';
                        preconnect2.href = 'https://fonts.gstatic.com';
                        preconnect2.crossOrigin = 'anonymous';
                        document.head.appendChild(preconnect2);
                    }
                    document.head.appendChild(link);
                }
            }["CustomizationInitializer.useEffect.loadGoogleFonts"];
            // Initialize immediately
            initializeCustomization();
            // Listen for system theme changes if system theme is enabled
            if (__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeConfig"].enableSystemTheme) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const handleSystemThemeChange = {
                    "CustomizationInitializer.useEffect.handleSystemThemeChange": ()=>{
                        const currentTheme = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey());
                        if (currentTheme === 'system') {
                            initializeCustomization();
                        }
                    }
                }["CustomizationInitializer.useEffect.handleSystemThemeChange"];
                mediaQuery.addEventListener('change', handleSystemThemeChange);
                return ({
                    "CustomizationInitializer.useEffect": ()=>mediaQuery.removeEventListener('change', handleSystemThemeChange)
                })["CustomizationInitializer.useEffect"];
            }
        }
    }["CustomizationInitializer.useEffect"], []);
    return null; // This component doesn't render anything
}
_s(CustomizationInitializer, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = CustomizationInitializer;
var _c;
__turbopack_context__.k.register(_c, "CustomizationInitializer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/components/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/lib/logger.ts [app-client] (ecmascript)");
"use client";
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$lib$2f$logger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('ErrorBoundary caught an error:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });
    }
    render() {
        if (this.state.hasError) {
            var _this_state_error;
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-screen p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md w-full p-6 bg-destructive/10 border border-destructive rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2 text-destructive",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/projects/deltahacks12/components/ErrorBoundary.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mb-4",
                            children: ((_this_state_error = this.state.error) === null || _this_state_error === void 0 ? void 0 : _this_state_error.message) || 'An unexpected error occurred'
                        }, void 0, false, {
                            fileName: "[project]/projects/deltahacks12/components/ErrorBoundary.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                this.setState({
                                    hasError: false,
                                    error: null
                                });
                                window.location.reload();
                            },
                            className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90",
                            children: "Reload Page"
                        }, void 0, false, {
                            fileName: "[project]/projects/deltahacks12/components/ErrorBoundary.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/projects/deltahacks12/components/ErrorBoundary.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/projects/deltahacks12/components/ErrorBoundary.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/contexts/ViewContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewProvider",
    ()=>ViewProvider,
    "useView",
    ()=>useView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ViewContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ViewProvider(param) {
    let { children } = param;
    _s();
    // TODO: Replace with proper authentication/user context when backend is integrated
    // Future: const { user, role } = useAuth(); viewMode based on user.role
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('clinician');
    const toggleView = ()=>{
        setViewMode((prev)=>prev === 'clinician' ? 'patient' : 'clinician');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewContext.Provider, {
        value: {
            viewMode,
            toggleView,
            isClinicianView: viewMode === 'clinician',
            isPatientView: viewMode === 'patient'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/projects/deltahacks12/contexts/ViewContext.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ViewProvider, "c5G2oEHpgg6fMyMuUJdrr1NAw6M=");
_c = ViewProvider;
function useView() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ViewContext);
    if (context === undefined) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
}
_s1(useView, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ViewProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/projects/deltahacks12/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
"[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$projects$2f$deltahacks12$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/projects/deltahacks12/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/projects/deltahacks12/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=projects_deltahacks12_352c738e._.js.map