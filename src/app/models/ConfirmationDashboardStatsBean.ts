export interface ConfirmationDashboardStatsBean {
    orderTreated: number;
    orderTreatedThisDay: number;
    orderTreatedThisMonth: number;
    accountConfirmed: number;
    orderNotTreated: number;
    orderNotAnswerInConfirmation: number;
    orderRejectedInConfirmation: number;
    orderValidatedInConfirmation: number;
    ordersToConfirm: number;
    dateOrdersToConfirm: number;
    ordersToReturn: number;
    dateOrdersToReturn: number;
    accountToConfirm: number;
    dateAccountToConfirm: number;
}