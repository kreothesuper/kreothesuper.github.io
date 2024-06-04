const getEvents = require('./serives/notion');

;(async () =>{
    const eventList = await getEvents();

    console.log(eventList);
})();
