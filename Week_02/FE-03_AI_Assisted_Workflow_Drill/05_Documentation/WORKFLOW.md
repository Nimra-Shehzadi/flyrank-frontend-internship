# AI-Assisted Workflow Drill

## Overview

This exercise explored how prompt quality affects the quality of AI-generated code. I implemented the same feature—a Settings Form with validation—using two different prompting approaches. The goal was to compare the output of a vague prompt with the output of a detailed, structured prompt and understand the importance of providing clear requirements when working with AI tools.

## Round 1 – Vague Prompt

In the first round, I asked the AI to create a simple settings form using HTML, CSS, and JavaScript without giving any additional requirements. The generated result was functional but basic. The layout contained the required fields, but validation, accessibility, responsiveness, and user feedback were limited. The code also required manual improvements before it could be considered production-ready.

## Round 2 – Detailed Prompt

In the second round, I used a detailed prompt that specified separate project files, validation rules, semantic HTML, accessibility requirements, responsive design, error handling, and success messages. The generated result was significantly better. The form had a cleaner layout, stronger validation, improved user experience, and more organized code. Because the requirements were clearly defined, the AI produced a more complete solution with fewer corrections needed.

## Comparison

Comparing both versions demonstrated that prompt quality has a direct impact on development quality. The detailed prompt produced code that was easier to understand, easier to maintain, and closer to real-world development standards. The vague prompt generated a working solution but lacked many important features that improve usability and code quality.

## Key Learning

This exercise taught me that AI should be treated as a development partner rather than a replacement for engineering judgment. Clear instructions, verification, and review are essential for obtaining reliable results. I also learned that testing AI-generated code and refining prompts are important parts of a professional frontend development workflow.