# pw-screenplay (Playwright + Serenity/JS)

This is a functional QA automation prototype utilizing the Serenity/JS Playwright boilerplate. It demonstrates advanced architectural design, business-aligned testing using the Screenplay Pattern, and CI/CD integrations for a portfolio interview.

## Key Features

*   **Screenplay Pattern**: Implements Actors, Abilities, Tasks, and Questions via Serenity/JS for both UI and API testing.
*   **API Interception & Mocking**: Integrates Mock Service Worker (MSW) to validate framework resilience and simulate server errors/latency.
*   **Jira Integration**: Implements a `JiraReporter` Serenity/JS Stage Crew Member to automatically log bug tickets (mocked via MSW) containing error stack traces when tests fail.
*   **Test Suite Separation**: Maintains separate test execution contexts for Happy Paths (`test:pass_suite`) and Negative Paths/Error Handling (`test:demo_failure`).

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm ci
    ```
2.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```

## Local Execution Commands

The framework leverages `cross-env` to set environmental contexts. MSW can be enabled for local mocking by injecting `MOCK_API=true`.

*   **Run Happy Path Suite (Passes):**
    ```bash
    npm run test:pass_suite
    ```

*   **Run Negative Path Suite (Fails intentionally and logs to Jira mock):**
    ```bash
    MOCK_API=true npm run test:demo_failure
    ```

*   **View Serenity Living Documentation (Reports):**
    ```bash
    npm run test:report
    ```

## Transitioning MSW Jira Mock to a Live Jira Instance

The `test:demo_failure` suite currently uses MSW to mock the Jira `POST /rest/api/2/issue` endpoint. To transition this to a live Jira instance:

1.  Open `src/tests/JiraReporter.ts`.
2.  Replace `'https://your-jira-instance.atlassian.net'` with your actual Jira Cloud domain.
3.  Replace the mock authentication header (`Buffer.from('user:token').toString('base64')`) with your base64-encoded `email:api_token`. You can manage this via environment variables (e.g., `process.env.JIRA_API_TOKEN`).
4.  Remove the `MOCK_API=true` prefix when running tests to bypass MSW and hit the real Atlassian API. Ensure the payload fields (`project key`, `issuetype`) map correctly to your specific Jira project schema.
