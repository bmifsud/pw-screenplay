# Architectural Specification: Screenplay Pattern vs. Page Object Model (POM)

This prototype utilizes the **Screenplay Pattern** via Serenity/JS rather than the traditional Page Object Model (POM). This architectural decision was made to address the inherent scalability, maintainability, and reporting limitations of POM in modern QA automation.

## 1. Separation of Concerns & Reusability
*   **POM limitation:** Page Objects inherently violate the Single Responsibility Principle by combining structure (locators) and behavior (methods) into monolithic classes. As applications grow, these classes become bloated, tightly coupled, and difficult to maintain.
*   **Screenplay advantage:** Screenplay separates state (Abilities), behavior (Tasks/Interactions), and structure (Targets/Questions). Actors perform generic interactions (`Click.on()`, `Enter.theValue()`) upon targets, preventing code duplication across different page domains.

## 2. Business-Aligned Readability (Living Documentation)
*   **POM limitation:** POM test scripts often read like a sequence of clicks and text entries, masking the actual business intent.
*   **Screenplay advantage:** Screenplay enforces a Domain-Specific Language (DSL). Code such as `actor.attemptsTo(Navigate.toHomePage(), Click.on(Cart.checkoutButton))` directly translates into human-readable Serenity BDD reports. This bridges the gap between engineering and product stakeholders by mapping test execution directly to business capabilities.

## 3. Seamless Multi-Domain Testing
*   **POM limitation:** POM is strictly bound to the UI layer. When a test requires API setup or database verification alongside UI validation, POM frameworks typically require cumbersome, loosely integrated helper classes.
*   **Screenplay advantage:** Actors are polymorphic. An actor can simultaneously hold the ability to `BrowseTheWebWithPlaywright` and `CallAnApi`. This allows a single actor to effortlessly set up test data via REST, execute the workflow via the UI, and assert backend state changes—all within a unified execution context and reporting stream.

## Conclusion
For an enterprise-grade prototype, the Screenplay Pattern provides a fundamentally superior architecture. It minimizes maintenance overhead, maximizes code reuse, and generates highly visual living documentation that proves the framework's value to the business.
