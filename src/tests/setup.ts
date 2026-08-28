import { server } from '../mocks/node';

if (process.env.MOCK_API === 'true') {
    console.log('MOCK_API is set to true. MSW is intercepting API requests.');
    server.listen({ onUnhandledRequest: 'bypass' });
}
