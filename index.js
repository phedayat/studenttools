document.getElementById('eventSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    ApiHandler.getFormValues('event');
});