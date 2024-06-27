export interface DashboardBean {
    totalSales: number;
    currentMonthOrderCount: number;
    currentDayOrderCount: number;
    ordersRejectedInConfirmation: number;
    ordersRejectedInDelivery: number;
    ordersInProgress: number;
    ordersNotTreated: number;
    ordersReturned: number;
    ordersValidated: number;
    ordersToConfirm: number;
    dateOrdersToConfirm: number;
    ordersToDeliver: number;
    dateOrdersToDeliver: number;
    ordersToReturn: number;
    dateOrdersToReturn: number;
}