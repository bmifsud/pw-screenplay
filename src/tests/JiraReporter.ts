import { StageCrewMember } from '@serenity-js/core';
import { DomainEvent, SceneFinished } from '@serenity-js/core/lib/events';
import { ExecutionFailedWithError } from '@serenity-js/core/lib/model';

export class JiraReporter implements StageCrewMember {
    constructor(private readonly jiraUrl: string) {}

    assignedTo(stage: any): StageCrewMember {
        return this;
    }

    notifyOf(event: DomainEvent): void {
        if (event instanceof SceneFinished && event.outcome instanceof ExecutionFailedWithError) {
            this.logBugToJira(event);
        }
    }

    private async logBugToJira(event: SceneFinished) {
        const error = (event.outcome as ExecutionFailedWithError).error;
        const testName = event.sceneId.value;

        const payload = {
            fields: {
                project: { key: 'QA' },
                summary: `Test Failure: ${testName}`,
                description: `Error: ${error.message}\n\nStacktrace:\n${error.stack}`,
                issuetype: { name: 'Bug' }
            }
        };

        console.log(`[JiraReporter] Attempting to log bug to Jira for test: ${testName}`);
        try {
            const response = await fetch(`${this.jiraUrl}/rest/api/2/issue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('user:token').toString('base64')
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`[JiraReporter] Successfully logged bug to Jira. Issue Key: ${data.key}`);
            } else {
                console.error(`[JiraReporter] Failed to log bug to Jira. Status: ${response.status}`);
            }
        } catch (error_) {
            console.error(`[JiraReporter] Network error while logging to Jira:`, error_);
        }
    }
}
