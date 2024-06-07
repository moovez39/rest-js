const api = 'http://localhost:8080/api/user'

async function getUsers(url) {
    const data = await fetch(url).then(response => response.json())
    modals(data)
    userTable(data)
}


function userTable(json) {
    json.forEach(user => $('#user_table').append(
        `<tr id="user${user.id}">
        <td>${user['id']}</td>
        <td>${user['username']}</td>
        <td>${user['password']}</td>
        <td>${user['sex']}</td>
        <td>${user['email']}</td>
        <td id="roles">${user['roles'].map(role => role.roleName)}</td>
        <td><button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#edit-modal${user.id}">Edit</button></td>
        <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal${user.id}">Delete</button></td>
        </tr>`
    ))
}

function modals(json) {
    for (let user of json) {
        $('body').append(
            `
<form name="edit${user.id}">
<div class="modal" id="edit-modal${user.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalVerticallyCenteredLabel"` + `${user.id}">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <label for="id${user.id}" class="form-label"><b>ID</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="id${user.id}" placeholder="username" value="${user.id}" readonly>
                        <label for="username${user.id}" class="form-label"><b>Username</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="username${user.id}" value="${user.username}" placeholder="username">

                        <label for="password${user.id}" class="form-label"><b>Password</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="password${user.id}" value="${user.password}" placeholder="password">
                        <br>
                        <label for="${user.id}" class="form-check-label "><b>Sex</b></label>
                        <div id="sex${user.id}">
                        <div class="form-check form-check-inline">
                                <label class="form-check-label" for="male">Male</label>
                                <input class="form-check-input" type="radio" id="male${user.id}" value="m" name="sex${user.id}">
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"
                                       id="female${user.id}"  value="f" name="sex${user.id}">
                                <label class="form-check-label" for="female">Female</label>
                            </div>
                        </div>
                        <br/>
                        <label for="email${user.id}" class="form-label"><b>Email</b></label>
                        <input type="email" class="form-control w-50" style="margin: auto"
                               id="email${user.id}" value="${user.email}" placeholder="name@example.com"
                        <br/>

                        <label for="roles${user.id}"><b>Roles</b></label>
                        <select class="form-select w-50"
                                multiple size="2" aria-label="roles" id="roles${user.id}" style="margin: auto">
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="edit-submit${user.id}" class="btn btn-primary" data-bs-dismiss="modal" data-bs-toggle="#">Edit</button>
                    </div>
                </div>
            </div>
        </div>
</form>`)
        if (user.sex === "m") {
            $(document).ready(function () {
                $(`input[name="sex${user.id}"][value="m"]`).prop('checked', true);
            });

        } else {
            $(document).ready(function () {
                $(`input[name="sex${user.id}"][value="f"]`).prop('checked', true);
            })
        }
        fetch('http://localhost:8080/api/user/role').then(function (response) {
            if (response.ok) {
                // userFormId.find('#roles').empty();
                response.json().then(roleList => {
                    roleList.forEach(role => {
                        $('#roles' + user.id)
                            .append($('<option>')
                                .prop('selected', user.roles.filter(e => e.id === role.id).length)
                                .val(role.id).text(role.roleName));
                    })
                })
            }
        })
        $('body').append(
            `
        <form name="delete${user.id}">
           <div class="modal" id="delete-modal${user.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalVerticallyCenteredLabel-delete"` + `${user.id}">Delete User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <label for="id-delete${user.id}" class="form-label"><b>ID</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="id-delete${user.id}" placeholder="username" value="${user.id}" readonly>
                        <label for="username-delete${user.id}" class="form-label"><b>Username</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="username-delete${user.id}" value="${user.username}" placeholder="username" readonly>

                        <label for="password-delete${user.id}" class="form-label"><b>Password</b></label>
                        <input type="text" class="form-control w-50 row-cols-5" style="margin: auto"
                               id="password-delete${user.id}" value="${user.password}" placeholder="password" readonly>
                        <br>
                        <label for=sex-delete"${user.id}" class="form-check-label "><b>Sex</b></label>
                        <div id="sex-delete${user.id}">
                        <div class="form-check form-check-inline">
                                <label class="form-check-label" for="male">Male</label>
                                <input class="form-check-input" type="radio" id="male-delete${user.id}" value="m" name="sex-delete${user.id}" disabled>
                            </div>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="female">Female</label>
                                <input class="form-check-input" type="radio"
                                       id="female${user.id}"  value="f" name="sex-delete${user.id}" disabled>
                            </div>
                        </div>
                        <br/>
                        <label for="email-delete${user.id}" class="form-label"><b>Email</b></label>
                        <input type="email" class="form-control w-50" style="margin: auto"
                               id="email-delete${user.id}" value="${user.email}" placeholder="name@example.com" readonly>
                        <br/>

                        <label for="roles-delete${user.id}"><b>Roles</b></label>
                        <select class="form-select w-50"
                                multiple size="2" aria-label="roles" id="roles-delete${user.id}" style="margin: auto" >
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="delete-submit${user.id}" class="btn btn-danger"  data-bs-dismiss="modal" data-bs-toggle="#">Delete</button>
                    </div>
                    
                </div>
            </div>
        </div>
        </form>
        `)
        if (user.sex === "m") {
            $(document).ready(function () {
                $(`input[name="sex-delete${user.id}"][value="m"]`).prop('checked', true);
            });

        } else {
            $(document).ready(function () {
                $(`input[name="sex-delete${user.id}"][value="f"]`).prop('checked', true);
            })
        }
        fetch('http://localhost:8080/api/user/role').then(function (response) {
            if (response.ok) {
                // userFormId.find('#roles').empty();
                response.json().then(roleList => {
                    roleList.forEach(role => {
                        $('#roles-delete' + user.id)
                            .append($('<option disabled>')
                                .prop('selected', user.roles.filter(e => e.id === role.id).length)
                                .val(role.id).text(role.roleName));
                    })
                })
            }
        })
        const deleteButton = $('#delete-submit' + user.id)
        deleteButton.attr('onClick', 'deleteUser(' + user.id + ');')
        const editButton = $('#edit-submit' + user.id)
        editButton.attr('onClick', 'editUser(' + user.id + ')')
    }
}

function deleteUser(id) {
    fetch(`http://localhost:8080/api/user/${id}`, {method: 'DELETE'})
}

function editUser(id) {
    let headers = new Headers();
    const rolesOption = document.getElementById("roles" + id)
    const sexOptions = document.getElementById("sex" + id)
    let selectedRoles = [];
    for (const rolesSelect of rolesOption) {
        if (rolesSelect.selected) {
            selectedRoles.push({
                id: rolesSelect.value,
                roleName: rolesSelect.text
            });
        }
    }
    let selectedSex = document.querySelector(`input[type="radio"][name="sex${id}"]:checked`);
    console.log(selectedSex)
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let userEdit = {
        'id': ($('#id' + id).val()),
        'username': $('#username' + id).val(),
        'password': $('#password' + id).val(),
        'sex': selectedSex.value,
        'email': $('#email' + id).val(),
        'roles': selectedRoles
    }

    let request = new Request('http://localhost:8080/api/user', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(userEdit)
    });
    fetch(request).then(response => (response.json()).then(result => console.log(result)))

}

function createUser() {
    let headers = new Headers();
    const rolesOption = document.getElementById("roles-create")
    let selectedRoles = [];
    for (const rolesSelect of rolesOption) {
        if (rolesSelect.selected) {
            selectedRoles.push({
                id: rolesSelect.value,
                roleName: rolesSelect.text
            });
        }
    }
    let selectedSex = document.querySelector(`input[type="radio"][name="sex-create"]:checked`);
    console.log(selectedSex)
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let userEdit = {
        'username': $('#username-create').val(),
        'password': $('#password-create').val(),
        'sex': selectedSex.value,
        'email': $('#email-create').val(),
        'roles': selectedRoles
    }

    let request = new Request('http://localhost:8080/api/user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userEdit)
    });
    fetch(request).then(response => (response.json()).then(result => console.log(result)))
}

const newUser = $('#create-user')
newUser.attr('onClick', 'createUser()')

function headerAndUserInfo() {
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
}

function updateData(e) {
    // e.preventDefault()
    $('#user_table').empty()
    document.querySelectorAll('.modal').forEach(el => el.remove())
    fetch(api).then(response => response.json()).then(data => {
        userTable(data)
        modals(data)
        headerAndUserInfo()

    })
}

document.getElementById("nav-home-tab").addEventListener('click',updateData)
document.addEventListener('submit',e =>{
    e.preventDefault()
    $('#user_table').empty()
    setTimeout(updateData,100)
})
const forms = document.forms
console.log(forms)
for(let form of forms)
    console.log(form)
getUsers(api)
headerAndUserInfo()