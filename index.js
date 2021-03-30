function update(){
    let calId = ApiHandler.getCookie(document.cookie, 'calendarId');
    listUpcomingEvents(calId, 15).then((res) => {
        let items = res.result.items;
        for(let i = 0; i < items.length; i++){
            let eventStart = (new Date(items[i].start.dateTime)).toLocaleTimeString();
            let eventEnd = (new Date(items[i].end.dateTime)).toLocaleTimeString();
            
            let eventStartDate = (new Date(items[i].start.dateTime)).toLocaleDateString();
            let eventEndDate = (new Date(items[i].end.dateTime)).toLocaleDateString();

            let eventSummary = items[i].summary;

            let eventString = `${i+1}: ${eventSummary.bold()}; ${eventStartDate}, ${eventStart} - ${eventEndDate}, ${eventEnd}`;
            ApiHandler.appendText('content', eventString);
        }
    });
}

function insEvent(){
    var val = ApiHandler.getFormValues('event');
    let calId = ApiHandler.getCookie(document.cookie, 'calendarId');
    
    var event = {
        'summary': val[0],
        'description': val[3],
        'start':{
            'dateTime': ApiHandler.ISODateString(new Date(val[1]))
        },
        'end':{
            'dateTime': ApiHandler.ISODateString(new Date(val[2]))
        }
    }

    insertNewEvent(calId, event);
}

function insTask(){
    var val = ApiHandler.getFormValues('task');

    var task = {
        'title': val[0],
        'notes': val[2],
        'due': ApiHandler.ISODateString(new Date(val[1]))
    }

    let tlId = ApiHandler.getCookie(document.cookie, 'taskListId');
    insertNewTask(tlId, task);
}

// Make a new event
document.getElementById('eventSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    insEvent();
});

// Enable a calendar
document.getElementById('calSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    let val = ApiHandler.getFormValues('calEnable');
    findCalendar(val[0]);
});

// Enable a task list
document.getElementById('tlSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    let val = ApiHandler.getFormValues('tlEnable');
    findTaskList(val[0]);
});

// Make a new task
document.getElementById('taskSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    insTask();
});