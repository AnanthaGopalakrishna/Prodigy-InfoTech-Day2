const loginContainer=document.getElementById("loginContainer");
const appContainer=document.getElementById("appContainer");

let employees=JSON.parse(localStorage.getItem("employees"))||[];

let editIndex=-1;

function login(){

let user=document.getElementById("username").value;
let pass=document.getElementById("password").value;

if(user==="admin" && pass==="admin123"){

localStorage.setItem("loggedIn","true");

showApp();

}else{

document.getElementById("loginError").innerHTML="Invalid Username or Password";

}

}

function logout(){

localStorage.removeItem("loggedIn");
location.reload();

}

function showApp(){

loginContainer.classList.add("hidden");
appContainer.classList.remove("hidden");

displayEmployees();

}

if(localStorage.getItem("loggedIn")){

showApp();

}

document.getElementById("saveBtn").addEventListener("click",saveEmployee);

function saveEmployee(){

let name=document.getElementById("empName").value.trim();

let email=document.getElementById("empEmail").value.trim();

let department=document.getElementById("empDepartment").value.trim();

let salary=document.getElementById("empSalary").value.trim();

if(name==="" || email==="" || department==="" || salary===""){

alert("All fields are required");

return;

}

let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Enter Valid Email");

return;

}

let employee={

id:editIndex==-1?Date.now():employees[editIndex].id,

name,

email,

department,

salary

};

if(editIndex==-1){

employees.push(employee);

}else{

employees[editIndex]=employee;

editIndex=-1;

document.getElementById("saveBtn").innerHTML="Add Employee";

}

localStorage.setItem("employees",JSON.stringify(employees));

clearForm();

displayEmployees();

}

function displayEmployees(){

let table=document.getElementById("employeeTable");

table.innerHTML="";

employees.forEach((emp,index)=>{

table.innerHTML+=`

<tr>

<td>${emp.id}</td>

<td>${emp.name}</td>

<td>${emp.email}</td>

<td>${emp.department}</td>

<td>${emp.salary}</td>

<td>

<button class="edit" onclick="editEmployee(${index})">Edit</button>

<button class="delete" onclick="deleteEmployee(${index})">Delete</button>

</td>

</tr>

`;

});

}

function editEmployee(index){

editIndex=index;

document.getElementById("empName").value=employees[index].name;

document.getElementById("empEmail").value=employees[index].email;

document.getElementById("empDepartment").value=employees[index].department;

document.getElementById("empSalary").value=employees[index].salary;

document.getElementById("saveBtn").innerHTML="Update Employee";

}

function deleteEmployee(index){

if(confirm("Delete Employee?")){

employees.splice(index,1);

localStorage.setItem("employees",JSON.stringify(employees));

displayEmployees();

}

}

function clearForm(){

document.getElementById("empName").value="";

document.getElementById("empEmail").value="";

document.getElementById("empDepartment").value="";

document.getElementById("empSalary").value="";

}