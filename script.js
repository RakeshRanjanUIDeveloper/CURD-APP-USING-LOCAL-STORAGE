let row = null;
function formSubmit(){
    let userEnteredData = readDataFromForm();
    let data = insertDataToLocalStorage(userEnteredData);
    if(userEnteredData == false){
        message.innerHTML = "Please Enter your data!"
    }else{
        if(row == null){
            insertDataToTable(data);
            message.innerHTML ="Record Added"
        }
        else{
            updateRecord();
            message.innerHTML ="Record Updated"
        }
    }
    document.getElementById('form').reset();
}

//Read data which User has entered
function readDataFromForm(){
    let formName = document.getElementById('name').value;
    let formDesignation = document.getElementById('designation').value;
    let formSalary = document.getElementById('salary').value;
    let formData = [formName, formDesignation, formSalary];
    if(formData.includes("")){
        return false
    }else{
        return formData;
    }
}

//Insert data in Local Storage which User has Entered
function insertDataToLocalStorage(userEnteredData){
    //To store in Local Storage
    let nameLS = localStorage.setItem("Name", userEnteredData[0]);
    let designationLS = localStorage.setItem("Designation", userEnteredData[1]);
    let salaryLS = localStorage.setItem("Salary", userEnteredData[2]);

    //Read data from Local Storage

    let n = localStorage.getItem("Name", nameLS);
    let d = localStorage.getItem("Designation", designationLS);
    let s = localStorage.getItem("Salary", salaryLS);

    let localStorageData = [n, d, s];
    return localStorageData;
}

function insertDataToTable(data){
    row = document.getElementById('mytable').insertRow();
    row.insertCell(0).innerHTML = data[0];
    row.insertCell(1).innerHTML = data[1];
    row.insertCell(2).innerHTML = data[2];
    row.insertCell(3).innerHTML = `<button onclick="editRecord(this)">Edit</button>
                                    <button onclick="deleteRecord(this)">Delete</button>`;                    
}

//EDIT
function editRecord(td){
    row = td.parentElement.parentElement;
    document.getElementById('name').value = row.cells[0].innerHTML;
    document.getElementById('designation').value = row.cells[1].innerHTML;
    document.getElementById('salary').value = row.cells[2].innerHTML;
}

//UPDATE
function updateRecord(){
    row.cells[0].innerHTML = document.getElementById('name').value;
    row.cells[1].innerHTML = document.getElementById('designation').value;
    row.cells[2].innerHTML = document.getElementById('salary').value;
    row = null;
}

//DELETE
function deleteRecord(td){
    let ans = confirm("Are you sure that you want to delete this record ?")
    if(ans == true){
        row = td.parentElement.parentElement;
        document.getElementById('mytable').deleteRow(row.rowIndex);
    }
    message.innerHTML ="Record has been deleted"
}


