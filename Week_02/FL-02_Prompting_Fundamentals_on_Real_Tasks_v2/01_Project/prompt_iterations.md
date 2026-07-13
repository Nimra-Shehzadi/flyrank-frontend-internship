# Iteration 1 – Role Assignment

## Prompt

You are a senior Frontend Engineer and UI/UX mentor.

Create a responsive Settings Form using HTML, CSS, and JavaScript.

Include:
- Full Name
- Email
- Theme Selection
- Enable Notifications
- Save Button

Validate required fields.

## Observation

The response became more professional and included better coding practices.

This backs up your observation. Compared to the naive version, adding just "You are a senior Frontend Engineer and UI/UX mentor" — with no other instructions — changed things on its own:

Data-driven validation instead of copy-pasted if-blocks — Full Name and Email are both defined in one fieldConfig array with their own validation rule and message, instead of writing the same four lines twice
Email format is actually checked, not just "is it empty" — a senior engineer assumes email validation means format, not just presence
CSS custom properties (:root variables) for color — a pattern that shows up once you're thinking about maintainability, not just "make it look okay"
Disabled button state styling added even though it wasn't asked for — a UX-minded engineer anticipates a loading/disabled state
autocomplete="name" and autocomplete="email" — a small UX detail a mentor-level engineer would add without being told
Comments explain engineering reasoning (e.g. why .every() isn't used), which reads like a mentor narrating decisions, not just a code generator

Nothing here was in the explicit requirements — it came purely from the role framing. Good evidence for your case study that who you ask the AI to be shapes the code, separately from what you ask it to build.Settings form role assignmentCode · HTML 


# Iteration 2 – Context & Motivation

## Prompt

You are a senior Frontend Engineer and UI/UX mentor.

I am a Frontend AI Engineering intern completing an internship assignment. The goal is to build a beginner-friendly, responsive Settings Form that demonstrates clean coding practices.

Create a responsive Settings Form using HTML, CSS, and JavaScript.

Include:
- Full Name
- Email
- Theme Selection
- Enable Notifications
- Save Button

Validate all required fields and display a success message.

## Observation

The additional context helped the AI understand the purpose of the project and produced a more focused and practical solution.

## Iteration 3 – Few-shot Examples

Observation:
Examples made the output more accurate and consistent.

## Iteration 4 – Output Structure

Observation:
The response was better organized into HTML, CSS, and JavaScript files.

## Iteration 5 – Step Decomposition

Observation:
Breaking the task into steps improved clarity and reduced mistakes.