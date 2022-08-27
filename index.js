// Your code here
function createEmployeeRecord (array){
    let employeeDetails;
    employeeDetails ={
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
        }
    return employeeDetails;    
}
//We are creating an array from array(s) that is well structured
function createEmployeeRecords(array){
    const newEmployeeArray = array.map(createEmployeeRecord);
    return newEmployeeArray;
}

//Created an object using the the parameter to create the values for the keys pushed into the empty array for timeIn then into the Employee record then returned the object.
function createTimeInEvent(employeeRecord, dateStamped){
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamped.split(" ")[1]),
        date: dateStamped.split(" ")[0]
    }
     employeeRecord.timeInEvents.push(timeIn);    
     return employeeRecord;
}
//Created an object using the the parameter to create the values for the keys pushed into the empty array for timeOut then into the Employee record then returned the object.
function createTimeOutEvent (employeeRecord, dateStamped){
    let timeOut= {
        type: "TimeOut",
        hour: parseInt(dateStamped.split(" ")[1]),
        date: dateStamped.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}
//
function  hoursWorkedOnDate (employeeRecord, date){
    const gotIn = employeeRecord.timeInEvents.find(gotIn => gotIn.date === date);
    const gotOut = employeeRecord.timeOutEvents.find(gotOut => gotOut.date === date);
    return (Math.abs(gotOut.hour - gotIn.hour)/100);
}
//
function wagesEarnedOnDate (employeeRecord, date){
   return  hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour;
}

function allWagesFor (employeeRecord){
    let wagesArray = [];
    const dates = employeeRecord.timeInEvents.map(timeIn => timeIn.date)
    for(let date of dates){
        wagesArray.push(wagesEarnedOnDate(employeeRecord, date));
    }
    return wagesArray.reduce((prev, curr) => prev + curr);
}
function calculatePayroll(employeeArray) {
    let sumOfPayOwed = employeeArray.map(obj => allWagesFor(obj))
    .reduce((a, b) => (a = a + b), 0);

    return sumOfPayOwed;
}




