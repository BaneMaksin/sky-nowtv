# Task answers

#### Display the user's email when you hover over the message - how can you achieve this in both CSS and JavaScript ?
This can be achieved via CSS by utilising the pseudo classes like before and after, and by reading the attribute value. This is the approach I have taken.

It can be achieved via JavaScript by using the DOM events like mouse enter, mouse leave or mouse over events.

#### How could you improve the accessibility of your website?

There are a couple of ways to improve adequate web acceptability, but it usually requires time, proper testing and maintenance. Usually by following the rules below, a proper strategy could be created:

* By following excellent a11y rules
* Use headings correctly to organize the structure of your content
* Using semantic markup correctly
* Include proper alt text for images
* Use color with care
* Use CSS declaration with care
* Design forms for accessibility
* Use tables for tabular data, not for layout
* Ensure that all content can be accessed with the keyboard alone in a logical way
* Use ARIA roles and landmarks (but only when necessary since semantic markups provide better support)
* Make dynamic content accessible


#### Can you make sure the design of your website is responsive?

The web application is fully responsive and 2 Cypress tests have been written as a simple example to verify it.


#### How would you go about automating and testing your application?

There are various ways to automate and tests web application.

For start, we can break it into 3 levels, unit, integration and end to end tests. Based on what we would like to achieve for all 3 them, we would need to define a strategy for CI / CD support by utilizing some of the tools like Cypress, Browserstack, Docker, Kubernetes and many others.

---

[Back to README overview](../README.md)
