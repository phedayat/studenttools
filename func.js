function getCalendars(){
    return gapi.client.calendar.calendarList.list({});
}

function findCalendar(calName){
    getCalendars().then((res) => {
        let list = res.result.items;

        for(let i = 0; i < list.length; i++){
            if(list[i].summary == calName){
                document.cookie = `calendarId=${list[i].id}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
                console.log('Calendar Found');
            }
        }
    });
}

function listUpcomingEvents(calendarId, numRes = 10){
    return gapi.client.calendar.events.list({
        'calendarId': calendarId,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': numRes,
        'orderBy': 'startTime'
    });
}

function insertNewEvent(calId, eventObj){
    gapi.client.calendar.events.insert({
        'calendarId': calId,
        'resource': eventObj
    }).then((res) => {console.log("Event inserted\n"); console.log(res);});
}

function getTaskLists(){
    return gapi.client.tasks.tasklists.list({});
}

function findTaskList(tlName){
    getTaskLists().then((res) => {
        let list = res.result.items;
        for(let i = 0; i < list.length; i++){
            if(list[i].title == tlName){
                document.cookie = "taskListId=" + list[i].id + "; ";
                console.log("Tasklist found");
            }
        }
    });
}

async function insertNewTask(tlId, task){
    gapi.client.tasks.tasks.insert({
        'taskListId': tlId,
        'resource':task
    }).then((res) => { console.log("Insert finished"); });
}