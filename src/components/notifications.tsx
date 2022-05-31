import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
    position: 'center-top',
    clickToClose: true,
    pauseOnHover: true,
})
export const NotificationSuccess = (text:string) => {Notify.success(text)};
export const NotificationFailure = (text:string) => {Notify.failure(text)};
export const NotificationWarning = (text:string) => {Notify.warning(text)};