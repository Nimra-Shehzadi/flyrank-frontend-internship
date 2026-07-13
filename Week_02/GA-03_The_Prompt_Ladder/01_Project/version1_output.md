Here's the beginner-friendly version. Compared to the first one, I simplified it on purpose since it's for people learning:

Plain, commented JavaScript — no helper functions beyond the email check, no abstraction. Each step in the submit handler is written out explicitly so it's easy to follow line by line.
Simpler CSS — basic colors, no CSS variables, standard box-shadow instead of a token system. Easier to read and modify without needing to understand CSS custom properties first.
Only Full Name and Email are validated — matches your requirements exactly (Theme and Notifications aren't required fields).
Comments explain the "why," not just the "what" — e.g. why event.preventDefault() is needed, why the pattern checks email format.