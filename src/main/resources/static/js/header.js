fetch('http://localhost:8080/api/user/info')
    .then(response => response.json())
    .then(user => {
        console.log(user)
            const emailHeader = document.getElementById("email-header");
            const rolesHeader = document.getElementById("roles-header");
            const roles = user.roles.map(function (role) {
                return role.name;
            });
            emailHeader.innerText = user.email;
            rolesHeader.innerText = user.roles.map(function (role) {
                return ' ' + role.roleName;
            })
            const tableBody = document.getElementById("user-info");

            let row = tableBody.insertRow();
            row.insertCell().innerHTML = user.id;
            row.insertCell().innerHTML = user.username;
            row.insertCell().innerHTML = user.password;
            row.insertCell().innerHTML = user.sex;
            row.insertCell().innerHTML = user.email;
            row.insertCell().innerHTML = user.roles.map(function (role) {
                return ' ' + role.roleName;
            });
        }
    )
