# Explain It Like You Built It

## Week 6 – Frontend AI Engineering

### Topic
Interactive Button State Management in React

## What I Chose

For this task, I chose the interactive action button from my Week 6
Interactive UI project.

The button is designed to show different states and give clear feedback
to the user after an action is triggered.

## How It Works

I used React's `useState` to keep track of the current message and its
status.

Initially, the interface shows a ready state. When the user interacts
with the button, the state changes and the interface updates.

For a successful action, the UI displays a success message. If something
fails, it displays an error message instead.

This means the button is not just a visual element. Its state controls
what the user sees and helps communicate what is happening.

## Why I Used State

React state allows the interface to update without manually changing
the HTML.

When the state changes, React automatically updates the relevant part
of the interface.

For example, the message can change from a ready state to a success or
error state depending on the user's action.

## Accessibility

I also used accessible labels and a live status message so that changes
in the interface can be communicated clearly, including to users who
use assistive technologies.

## What I Learned

The main thing I learned from this part of the project is that a good
interactive button should communicate its current state clearly.

The important part is not only making the button look good, but also
making its behavior understandable and accessible to the user.

## Project

This explanation is based on my Week 6 Interactive UI project built
with React and TypeScript.