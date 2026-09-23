# Decision log

Your methods section. About one page total.

Answer these as you go, not the night before it is due.
Specifics beat polish - a short honest answer is worth more than a long vague one.

Delete these instructions when you are done, or leave them. It does not matter.

---

## 1. What did you set out to build, and what changed?

What you wanted at the start, and what is actually live now.
Name one thing you dropped or added along the way, and why.

I set out to build a website portfolio that would showcase myself to hiring managers and
recruiters in the industry in the pursuit of finding a career opportunity. Initially the
portfolio was supposed to show a lot of myself including interests, hobbies, and who I am,
but I changed my mind halfway and decided to showcase only the professional side and
expertise in the tech world. So right now the portfolio is live and it showcases things like
skills, projects, and experiences like a more visual resume. Along the way I added many
features such as visuals and animations to make the website more interactive and easier to
see and enjoy. The hope is for hiring managers to be impressed and remember me.

---

## 2. A fork in the road

Name one real choice where you could have gone two ways.
Plain HTML or a framework. One page or several. Your own CSS or someone's template.
What goes on the front page and what does not.

Say which you picked, what the alternative was, and what you gave up by not taking it.

"There was no alternative" is not an answer. Find the fork.

A good fork in the road I faced was the setup for email/contact method. I initially just
wanted to put my email and phone number and suggest contact, but I decided to implement a
Formspree.io form to have messages sent directly from the website. I could have just left it
as mailto, which is the method I originally had, and while this method has pros like opening
the user's default mailing app, I thought being able to fill out a form directly was more
convenient and shows initiative and expertise on my end.

---

## 3. Where you overruled the agent

One time Claude suggested, wrote, or claimed something and you did not take it.

What did it do? How did you notice? What did you do instead?

If it genuinely never happened, say so plainly, and then say what you would have had to
check in order to notice. Being honest here costs you far less than a story you cannot
defend when you record your video.

I asked Claude to implement an animated rainbow smoke effect that followed the cursor.
It ran laggy in practice once I actually tried moving the mouse around the live page, so I
overruled it and told Claude to revert. It reverted cleanly back to the trailing-dot cursor
I had before. Quick fix, and Claude handled the revert well.

---

## 4. How you know it works

What check did you run, and what did it tell you?

Then the real question: **what would have made this check fail?**
A check that could not have failed is not a check.

Link to your `verification/` folder.

It was checked via `curl -I` and `curl` against the live URL. It returned the 200 OK status,
meaning it was up and running. A visual check upon going to the URL confirmed everything was
working. If a non-200 status was returned, I would know it failed. See `verification/` for
the screenshot, the fetch result, and the note.

---

## 5. What is still wrong

One thing on your own site that is not right, not finished, or that you do not
fully understand.

What would you do next, and how would you find out?

The projects section is not entirely finished. While it is sufficient to present, I would
like a more interactive view of the projects. My next task will be to find a way to
visualize the projects and maybe add an interactive feature or two.
