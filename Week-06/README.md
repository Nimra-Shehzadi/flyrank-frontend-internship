# Generate Report — Interactive Motion UI

A polished React + TypeScript interactive button built for the FlyRank Frontend AI Engineering Internship — Week 6.

## Overview

This project demonstrates how a single UI action can communicate its complete lifecycle through intentional state changes and micro-interactions.

The main action is a **Generate Report** button that moves through different states based on user interaction.

## States Demonstrated

- **Idle** — Button is ready for interaction.
- **Hover / Focus** — Visual feedback communicates that the button is interactive.
- **Active** — Press interaction provides immediate tactile feedback.
- **Loading** — A spinner and status message communicate that processing is in progress.
- **Success** — A successful completion state confirms that the report was generated.
- **Error** — A failure state provides clear feedback and allows the user to try again.
- **Disabled** — The button cannot be triggered repeatedly while loading.

## Key Features

- State-driven button lifecycle
- Smooth hover and active animations
- Loading spinner
- Success and error feedback
- Protection against rapid repeated clicks
- Keyboard accessibility
- Visible focus state
- Responsive layout
- `prefers-reduced-motion` support
- React + TypeScript implementation

## Interaction Flow

```text
Idle
  ↓
Hover / Focus
  ↓
Active
  ↓
Loading
  ↓
Success / Error
  ↓
Idle