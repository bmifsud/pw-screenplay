import { Task } from '@serenity-js/core';
import { GetRequest,PostRequest, Send } from '@serenity-js/rest';

export const BookingApi = {
    createBooking: (payload: any) => Task.where(`#actor creates a booking`,
        Send.a(PostRequest.to('https://restful-booker.herokuapp.com/booking')
            .with(payload)
            .using({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    ),

    getBooking: (id: string | number) => Task.where(`#actor retrieves booking ${id}`,
        Send.a(GetRequest.to(`https://restful-booker.herokuapp.com/booking/${id}`))
    ),

    getNonExistentBooking: () => Task.where(`#actor retrieves non-existent booking`,
        Send.a(GetRequest.to(`https://restful-booker.herokuapp.com/booking/999999`))
    ),

    triggerServerError: () => Task.where(`#actor triggers server error`,
        Send.a(PostRequest.to(`https://restful-booker.herokuapp.com/booking/500-error`))
    )
};
