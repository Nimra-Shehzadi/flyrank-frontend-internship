# Testing Pass — Week 6

A React + TypeScript testing project built for the FlyRank Frontend AI Engineering Internship.

## Overview

This project demonstrates component testing and user interaction testing using:

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- jsdom

The interface includes success and failure states to verify that the UI responds correctly to user actions.

## Features

- Component rendering tests
- User interaction testing
- Success state testing
- Error/failure state testing
- Recovery from failure to success
- Accessible roles and labels
- Live status announcements
- CI-ready test setup

## Test Coverage

The test suite verifies:

1. Component renders correctly
2. Initial testing dashboard appears
3. Passing test changes the UI to success state
4. Failure simulation displays the error state
5. Failed state can recover to success
6. Accessible button roles and labels work correctly
7. Live status message is accessible

## Project Structure

```text
Testing-Pass/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── App.test.tsx
│   ├── setupTests.ts
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── README.md