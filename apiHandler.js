const API_KEY = 'AIzaSyCKSnk-YB6GrK4baHO6-PdzcDJNefB_Lvs';
const CLIENT_ID = '806996105672-spuc34ruio2d1t957smtan7urhqsj32h.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks";
const DISC_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

class ApiHandler{
    auth;

    constructor(){
        this.auth = null;
        this.#handleClientLoad();
        document.getElementById('authorize').addEventListener('click', this.authClick);
        console.log("Constructor 'finished'");
    }

    // SECTION: Static functions //

    /**
     * Gets the values of a form
     * 
     * @param {string} id 
     * 
     * @returns Array of submitted form values
     */
    static getFormValues(id){
        var formRes = [];
        var form = document.getElementById(id);
        for(let i = 0; i < form.length - 1; i++){
            formRes[i] = form.elements[i].value;
            console.log(formRes[i] + "\n");
        }

        return formRes;
    }

    /**
     * Formats a date according to RFC3339 for Google API
     * 
     * @param {Date} d A Date object
     * 
     * @returns RFC3339 datetime string
     */
     static ISODateString(d){
        function pad(n){return n<10 ? '0'+n : n}
        return d.getUTCFullYear()+'-'
             + pad(d.getUTCMonth()+1)+'-'
             + pad(d.getUTCDate())+'T'
             + pad(d.getUTCHours())+':'
             + pad(d.getUTCMinutes())+':'
             + pad(d.getUTCSeconds())+'Z';
    }

    // SECTION: Google Auth //

    authClick(event){
        this.auth = gapi.auth2.getAuthInstance();
        this.auth.signIn();
    }

    #initClient(){
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISC_DOCS,
            scope: SCOPES
        }).then(() => {
            console.log("Init done");
        }, (error) => {
            console.error(JSON.stringify(error, null, 2));
        });
    }

    #handleClientLoad(){
        gapi.load("client:auth2", this.#initClient);
    }
}
