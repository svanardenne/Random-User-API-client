/* ============================================= */
/*                   Scripts                     */
/* ============================================= */

const APIurl = `https://randomuser.me/api/?results=12&inc=name,
picture,email,location,dob,phone&noinfo&nat=US`;
const body = document.getElementsByTagName('BODY')[0];
const cardContainer = document.getElementById('gallery');
let employees = [];
let filteredEmployees = [];
let modalIndex;

function addCardstoDOM(fetchResults) {
    console.log(fetchResults);
    let cardDiv = '';
    fetchResults.forEach((result, index) => {
        cardDiv += `
            <div class="card" data-index=${index}>
                <div class="card-img-container">
                    <img class="card-img" src="${result.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                    <p class="card-text">${result.email}</p>
                    <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
                </div>
            </div>
        `
    });
    cardContainer.innerHTML = '';
    cardContainer.insertAdjacentHTML("beforeend", cardDiv);
}

function createModal(employeeData, index) {
    let phone = employeeData[index].phone;
    phone = phone.replace(/\D+/g, '')
                 .replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3');
    let modalContents = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employeeData[index].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employeeData[index].name.first} ${employeeData[index].name.last}</h3>
                    <p class="modal-text">${employeeData[index].email}</p>
                    <p class="modal-text cap">${employeeData[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${employeeData[index].phone}</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    return modalContents;
}


function toggleModal(employeeData, contentContainer, index) {
    contentContainer.innerHTML = `
        <img class="modal-img" src="${employeeData[index].picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employeeData[index].name.first} ${employeeData[index].name.last}</h3>
        <p class="modal-text">${employeeData[index].email}</p>
        <p class="modal-text cap">${employeeData[index].location.city}</p>
        <hr>
        <p class="modal-text">${employeeData[index].phone}</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    `
}

function closeModal(modal) {
    body.removeChild(modal);
}

function filterSearch(searchInput) {
    filteredEmployees = employees.filter(employee => employee.name.first.includes(searchInput.value));
    console.log(filteredEmployees);
}


function appendSearch(filterSearch) {
    const searchContainer = document.querySelector('.search-container');
    let html = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;
    searchContainer.insertAdjacentHTML('beforeend', html);
    const searchButton = document.getElementById('search-submit');
    const searchInput = document.getElementById('search-input');
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterSearch(searchInput);
        addCardstoDOM(filteredEmployees);
    });
}


fetch(APIurl)
    .then(results => results.json())
    .then(results => results.results)
    .then(results => employees = results)
    .then(results => addCardstoDOM(employees))
    .catch(results => Error(console.log(results)))
    .finally(appendSearch(filterSearch));



    
cardContainer.addEventListener('click', (e) => {
    if (e.target !== cardContainer) {
        const card = e.target.closest('.card');
        modalIndex = parseInt(card.getAttribute('data-index'));
        console.log(modalIndex);
        body.insertAdjacentHTML('beforeend', createModal(employees, modalIndex));
        const modalContainer = document.querySelector('.modal-container');
        const contentContainer = document.querySelector('.modal-info-container');
        const modalClose = document.getElementById('modal-close-btn');
        const prev = document.getElementById('modal-prev');
        const next = document.getElementById('modal-next');
        prev.addEventListener('click', () => {
            if (modalIndex > 0) {
                modalIndex = modalIndex - 1;
                toggleModal(employees, contentContainer, modalIndex);
            }
        });
        next.addEventListener('click', () => {
            if (modalIndex < 11) {
                modalIndex = modalIndex + 1;
                toggleModal(employees, contentContainer, modalIndex);
            }
        });
        modalClose.addEventListener('click', () => {
            closeModal(modalContainer);
            });
    }
});

