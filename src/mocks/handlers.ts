import { http, HttpResponse } from 'msw';

export const handlers = [
    // Mock Jira Create Issue API
    http.post('https://your-jira-instance.atlassian.net/rest/api/2/issue', async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return new HttpResponse(undefined, { status: 401 });
        }

        try {
            const payload = await request.json();
            // Basic validation of the strict JSON payload format for Jira
            if (!payload.fields || !payload.fields.project || !payload.fields.summary || !payload.fields.issuetype) {
                return HttpResponse.json({ errorMessages: ['Invalid payload'] }, { status: 400 });
            }

            return HttpResponse.json({
                id: '10000',
                key: 'BUG-123',
                self: 'https://your-jira-instance.atlassian.net/rest/api/2/issue/10000'
            }, { status: 201 });
        } catch {
            return new HttpResponse(undefined, { status: 400 });
        }
    }),

    // Mock Restful-Booker 4xx error for negative path
    http.get('https://restful-booker.herokuapp.com/booking/999999', () => {
        return new HttpResponse('Not Found', { status: 404 });
    }),

    // Mock 5xx server error
    http.post('https://restful-booker.herokuapp.com/booking/500-error', () => {
        return new HttpResponse('Internal Server Error', { status: 500 });
    }),

    // Mock network latency for Restful Booker
    http.get('https://restful-booker.herokuapp.com/booking/latency', async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return HttpResponse.json({
            firstname: 'Slow',
            lastname: 'Response',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2023-01-01',
                checkout: '2023-01-02'
            }
        });
    }),

    // Mock API payload errors
    http.post('https://restful-booker.herokuapp.com/booking/invalid-payload', () => {
        return HttpResponse.json({ error: 'Invalid booking format' }, { status: 400 });
    })
];
