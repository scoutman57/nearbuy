






function myFunction() {
    var form = document.createElement("FORM");
    form.setAttribute("id", "myForm");
    document.body.appendChild(form);

    var username = document.createElement("INPUT");
    username.setAttribute("type", "text");
    username.setAttribute("value", "username");
    document.getElementById("myForm").appendChild(username);


    var  password= document.createElement("INPUT");
    password.setAttribute("type", "text");
    password.setAttribute("value", "Password");
    document.getElementById("myForm").appendChild(password);



    var button = document.createElement("BUTTON");
    var text = document.createTextNode("Submit");
    button.appendChild(text);

    document.getElementById("myForm").appendChild(button);


    document.getElementById("myForm").appendChild(password);







}
