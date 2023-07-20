
let now = dayjs();
//Holds the names of the days of the week
//Will be used to match the number that corrolates with the day of the week range from 0 to 6 
const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//Holds the names of the months
//Will be used to match the number that corrolates with the month range from 0 to 11
const monthNames = ["January", "Febuary", "March", "April", "MAy", "June", "July", "August", "September", "October", "November", "December"]
//holds the times for the window of time the user will be presented with
const timeWindow = [9, 10, 11, 12, 13, 14, 15, 16, 17]
// gives the current hour ranges from 1 - 24
var hour = now.hour()

//adds the current date to the website
function currentDate() {
  //returns a value from 0-6 that will be used to natch the name of the day in the dayName array
  var day = now.day();
  //returns a value from 0-11 that will be used to natch the name of the month in the monthName array
  var month = now.month();
  //returns a value from 1-31 to display the date of the month
  var date = now.date();

  $("#currentDay").text(dayNames[day] + ", " + monthNames[month] + date);
};

//Creates the time block for the times we want to add events to  
function timeBlockGenerator() {
  //runs a for loop for for however long the timewindow array is
  for (i = 0; i < timeWindow.length; i++) {
    //checks the hour and then compares it to the hour in the timewindow array to determine the class property
    if (hour > 17 || hour < timeWindow[i]) {
      classProperty = "past"
    }
    else if (hour == timeWindow[i] || hour == timeWindow[i]) {
      classProperty = "present"
    }
    else {
      classProperty = "future"
    };
    //createst the parent element that holds the time, text, and button and a unique ID
    var parent = $("<div></div>").attr('id', `hour-${timeWindow[i]}`).addClass(`row time-block ${classProperty}`)
    //checks the time window to set AM or PM to the time
    if (timeWindow[i] < 12) {
      $("<div></div>").addClass("col-2 col-md-1 hour text-center py-3").text(timeWindow[i] + "AM").appendTo(parent)
    }
    else {
        var noon = 12
        if (timeWindow[i] > 12) {
          noon = timeWindow[i] - 12
        };
        $("<div></div>").addClass("col-2 col-md-1 hour text-center py-3").text((noon) + "PM").appendTo(parent)
    };
    $("<textarea></texarea>").addClass("col-8 col-md-10 description").text(localStorage.getItem(`hour-${timeWindow[i]}`)).appendTo(parent)
    var btnParent = $("<button></button>").addClass("btn saveBtn col-2 col-md-1").click(setEvent).appendTo(parent)
    $("<i></i>").addClass("fas fa-save").appendTo(btnParent)
    parent.appendTo($(".container-lg"))
  };
};
//saves the text in the textarea element by usining the this refrence.
function setEvent() {
  //grabs the parrent of the button using this refrence and the id of the parent
  var timeID = $(this).parent().attr("id");
  //grabs the child of the parent using the siblings function and passing the class of the child element
  //the value of the child is grabbed by the val()
  var textBlock = $(this).siblings(".description").val();
  localStorage.setItem(timeID, textBlock);
};

//Makes sure the website is fully loaded before running the functions
$(document).ready(function() {
  currentDate();
  timeBlockGenerator();
});
