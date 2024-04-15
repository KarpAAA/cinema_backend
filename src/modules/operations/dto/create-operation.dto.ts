
export class CreateOperationDto {
    userId: number
    sessionId: number

    selectedSeats: [
        {
            row: number,
            seat: number,
            price: number
        }
    ]
    selectedGoods: [
        {
            id: number,
            amount: number,
        }
    ]

    price: number
}
