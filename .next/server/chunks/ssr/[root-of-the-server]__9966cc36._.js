module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/customize/themes/available-themes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/customize/themes/custom-themes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/config/appearance.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"fonts\":{\"primary\":\"Saira\",\"heading\":\"Roboto\",\"mono\":\"JetBrains Mono\"},\"theme\":{\"defaultTheme\":\"slate\"},\"branding\":{\"appName\":\"Moorcheh AI \",\"appTitle\":\"Moorcheh app\",\"appSubtitle\":\"How can I help you \",\"appDescription\":\"\",\"companyName\":\"edge AI \",\"contactEmail\":\"neel_patel2004@outlook.com\",\"storagePrefix\":\"moorcheh-ai-chat\",\"exportPrefix\":\"MoorchehAI\",\"logo\":\"/assets/logo.png\"}}"));}),
"[project]/customize/themes/theme-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/config/appearance.json (json)");
;
const themeConfig = {
    // Default theme loaded from appearance.json - CHANGE THIS IN appearance.json TO SWITCH YOUR APP'S THEME
    defaultTheme: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__["default"].theme?.defaultTheme || 'slate',
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
    storageKey: process.env.NEXT_PUBLIC_STORAGE_PREFIX ? `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-theme` : 'moorcheh-chat-theme',
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
}),
"[project]/customize/fonts/font-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/config/appearance.json (json)");
;
const fontConfig = {
    // Primary fonts loaded from appearance.json
    primaryFont: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts?.primary || 'Roboto',
    headingFont: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts?.heading || 'Inter',
    monoFont: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__["default"].fonts?.mono || 'Fira Code',
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
    generateFontScale: (baseSize, ratio, steps = 8)=>{
        const scale = {};
        for(let i = 0; i < steps; i++){
            const size = baseSize * Math.pow(ratio, i);
            scale[`scale-${i}`] = `${size.toFixed(2)}px`;
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
}),
"[project]/customize/fonts/available-fonts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    return Object.entries(availableFonts).filter(([, font])=>font.category === category);
}
function getFontsByPopularity(minRating = 3) {
    return Object.entries(availableFonts).filter(([, font])=>(font.popularity || 0) >= minRating);
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
        return `${font.googleFontsName}:wght@${weights}`;
    }).filter(Boolean).join('&family=');
    return `https://fonts.googleapis.com/css2?family=${fontQueries}&display=swap`;
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
}),
"[project]/lib/branding-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/config/appearance.json (json)");
;
function getBrandingConfig() {
    const branding = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$appearance$2e$json__$28$json$29$__["default"].branding;
    // Handle logo - if it's a data URI, use it directly; otherwise treat as file path
    let logo = branding?.logo;
    if (logo && !logo.startsWith('data:') && !logo.startsWith('/')) {
        // If it's not a data URI or absolute path, assume it's a relative path
        logo = `/assets/${logo}`;
    }
    return {
        appName: branding?.appName || 'Moorcheh AI Assistant',
        appTitle: branding?.appTitle || 'Moorcheh Chat',
        appSubtitle: branding?.appSubtitle || 'Your intelligent chat companion',
        appDescription: branding?.appDescription || 'AI-powered chat application with customizable themes and fonts',
        companyName: branding?.companyName || 'Moorcheh',
        contactEmail: branding?.contactEmail || 'support@moorcheh.ai',
        storagePrefix: branding?.storagePrefix || 'moorcheh-chat',
        exportPrefix: branding?.exportPrefix || 'Moorcheh-chat',
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
    getThemeStorageKey: ()=>`${getBrandingConfig().storagePrefix}-theme`,
    getChatDataStorageKey: ()=>`${getBrandingConfig().storagePrefix}-data`,
    // Export filename helper
    getExportFilename: (date)=>{
        const dateStr = (date || new Date()).toISOString().split('T')[0];
        return `${getBrandingConfig().exportPrefix}-${dateStr}.txt`;
    }
};
}),
"[project]/customize/fonts/custom-fonts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    return font.fontFiles.map((file)=>`
      @font-face {
        font-family: '${font.name}';
        font-weight: ${file.weight};
        font-style: ${file.style};
        font-display: ${font.display || 'swap'};
        src: url('${file.url}') format('${file.format || 'woff2'}');
      }
    `).join('\n');
}
function getCustomFontNames() {
    return Object.keys(customFonts);
}
function isSelfHostedFont(fontName) {
    const font = customFonts[fontName];
    return Boolean(font?.fontFiles && font.fontFiles.length > 0);
}
function isCustomGoogleFont(fontName) {
    const font = customFonts[fontName];
    return Boolean(font?.googleFontsName);
}
function isSystemFont(fontName) {
    const font = customFonts[fontName];
    return Boolean(font?.isSystemFont);
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
        example: `
// 1. File structure:
// public/fonts/MyFont-Regular.woff2
// public/fonts/MyFont-Bold.woff2

// 2. Font definition:
'MyFont': {
  name: 'MyFont',
  weights: [400, 700],
  category: 'sans-serif',
  fallback: 'Arial, sans-serif',
  fontFiles: [
    { weight: 400, style: 'normal', url: '/fonts/MyFont-Regular.woff2' },
    { weight: 700, style: 'normal', url: '/fonts/MyFont-Bold.woff2' },
  ],
}
    `
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
        example: `
// Example for "DM Sans" font:
'DM Sans': {
  name: 'DM Sans',
  googleFontsName: 'DM+Sans', // URL-encoded name
  weights: [400, 500, 700],
  category: 'sans-serif',
  fallback: 'system-ui, sans-serif',
  display: 'swap',
  subsets: ['latin'],
}
    `
    },
    system: {
        title: 'System Fonts',
        steps: [
            '1. Define font with `isSystemFont: true`',
            '2. Provide comprehensive fallback stack',
            '3. Set `preload: false` for better performance',
            '4. System fonts load instantly (no network request)'
        ],
        example: `
'System UI': {
  name: 'System UI',
  weights: [400, 500, 600, 700],
  category: 'sans-serif',
  fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  isSystemFont: true,
  preload: false,
}
    `
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
}),
"[project]/lib/logger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Logger utility for consistent logging across the application
 * Replaces console statements with proper logging levels
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
class Logger {
    isDevelopment = ("TURBOPACK compile-time value", "development") === 'development';
    log(level, message, ...args) {
        if (!this.isDevelopment && level === 'debug') {
            return;
        }
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
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
    debug(message, ...args) {
        this.log('debug', message, ...args);
    }
    info(message, ...args) {
        this.log('info', message, ...args);
    }
    warn(message, ...args) {
        this.log('warn', message, ...args);
    }
    error(message, ...args) {
        this.log('error', message, ...args);
    }
}
const logger = new Logger();
}),
"[project]/components/chat/CustomizationInitializer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$available$2d$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/themes/available-themes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$custom$2d$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/themes/custom-themes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/themes/theme-config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/fonts/font-config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/fonts/available-fonts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/branding-config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/customize/fonts/custom-fonts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-ssr] (ecmascript)");
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeCustomization = ()=>{
            try {
                // Combine all themes
                const allThemes = {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$available$2d$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themes"],
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$custom$2d$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customThemes"]
                };
                // Get the theme to apply - prioritize config over saved theme
                let themeToApply = __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme;
                // Check for saved theme only if it matches the current config
                if (__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].persistTheme) {
                    const savedTheme = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey());
                    if (savedTheme) {
                        // If saved theme differs from config, update localStorage to match config
                        if (savedTheme !== __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme) {
                            // Theme updated from config
                            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey(), __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme);
                            themeToApply = __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme;
                        } else {
                            themeToApply = savedTheme;
                        }
                    } else {
                        // No saved theme, use config default and save it
                        localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey(), __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].defaultTheme);
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
                    const existingThemeClasses = Array.from(root.classList).filter((cls)=>cls.startsWith('theme-'));
                    existingThemeClasses.forEach((cls)=>root.classList.remove(cls));
                    // Apply theme variables
                    Object.entries(theme).forEach(([property, value])=>{
                        root.style.setProperty(property, value);
                    });
                    // Add theme class
                    root.classList.add(`theme-${themeToApply}`);
                    // Add transition class for smooth theme changes
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].transitionDuration > 0) {
                        root.style.setProperty('--theme-transition-duration', `${__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].transitionDuration}ms`);
                        root.classList.add('theme-transitioning');
                    }
                // Theme applied successfully
                } else {
                    // Theme not found, falling back to light theme
                    // Fallback to light theme
                    const lightTheme = allThemes['light'];
                    if (lightTheme) {
                        const root = document.documentElement;
                        Object.entries(lightTheme).forEach(([property, value])=>{
                            root.style.setProperty(property, value);
                        });
                        root.classList.add('theme-light');
                    }
                }
                // Apply fonts
                applyFonts();
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error('Failed to initialize customization:', error);
            }
        };
        const applyFonts = ()=>{
            try {
                const root = document.documentElement;
                // Get font definitions
                const primaryFont = __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont] || __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont];
                const headingFont = __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].headingFont] || __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].headingFont];
                const monoFont = __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availableFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].monoFont] || __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customFonts"][__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].monoFont];
                // Apply font CSS variables
                if (primaryFont) {
                    root.style.setProperty('--font-primary', `'${primaryFont.name}', ${primaryFont.fallback}`);
                }
                if (headingFont) {
                    root.style.setProperty('--font-heading', `'${headingFont.name}', ${headingFont.fallback}`);
                }
                if (monoFont) {
                    root.style.setProperty('--font-mono', `'${monoFont.name}', ${monoFont.fallback}`);
                }
                // Load Google Fonts if enabled
                if (__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].enableGoogleFonts) {
                    const googleFonts = [
                        __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont,
                        __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].headingFont,
                        __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].monoFont
                    ].filter((fontName)=>__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availableFonts"][fontName]?.googleFontsName).filter((value, index, self)=>self.indexOf(value) === index); // Remove duplicates
                    if (googleFonts.length > 0) {
                        loadGoogleFonts(googleFonts);
                    }
                }
                // Load custom fonts
                const customFontNames = [
                    __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].primaryFont,
                    __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].headingFont,
                    __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$font$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontConfig"].monoFont
                ].filter((fontName)=>__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customFonts"][fontName]);
                customFontNames.forEach((fontName)=>{
                    const existingStyle = document.getElementById(`custom-font-${fontName}`);
                    if (existingStyle) {
                        existingStyle.remove();
                    }
                    const css = (0, __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$custom$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateFontFaceCSS"])(fontName);
                    if (css) {
                        const style = document.createElement('style');
                        style.id = `custom-font-${fontName}`;
                        style.textContent = css;
                        document.head.appendChild(style);
                    }
                });
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error('Failed to apply fonts:', error);
            }
        };
        const loadGoogleFonts = (fontNames)=>{
            const existingLink = document.getElementById('google-fonts');
            if (existingLink) {
                existingLink.remove();
            }
            const googleFontsUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$fonts$2f$available$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateGoogleFontsUrl"])(fontNames);
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
        };
        // Initialize immediately
        initializeCustomization();
        // Listen for system theme changes if system theme is enabled
        if (__TURBOPACK__imported__module__$5b$project$5d2f$customize$2f$themes$2f$theme$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeConfig"].enableSystemTheme) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemThemeChange = ()=>{
                const currentTheme = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$branding$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branding"].getThemeStorageKey());
                if (currentTheme === 'system') {
                    initializeCustomization();
                }
            };
            mediaQuery.addEventListener('change', handleSystemThemeChange);
            return ()=>mediaQuery.removeEventListener('change', handleSystemThemeChange);
        }
    }, []);
    return null; // This component doesn't render anything
}
}),
"[project]/components/ErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error('ErrorBoundary caught an error:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-screen p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md w-full p-6 bg-destructive/10 border border-destructive rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2 text-destructive",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorBoundary.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mb-4",
                            children: this.state.error?.message || 'An unexpected error occurred'
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorBoundary.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fileName: "[project]/components/ErrorBoundary.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ErrorBoundary.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ErrorBoundary.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
}),
"[project]/contexts/ViewContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewProvider",
    ()=>ViewProvider,
    "useView",
    ()=>useView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ViewContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ViewProvider({ children }) {
    // TODO: Replace with proper authentication/user context when backend is integrated
    // Future: const { user, role } = useAuth(); viewMode based on user.role
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('clinician');
    const toggleView = ()=>{
        setViewMode((prev)=>prev === 'clinician' ? 'patient' : 'clinician');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewContext.Provider, {
        value: {
            viewMode,
            toggleView,
            isClinicianView: viewMode === 'clinician',
            isPatientView: viewMode === 'patient'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ViewContext.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function useView() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ViewContext);
    if (context === undefined) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9966cc36._.js.map