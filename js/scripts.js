/* ============================================= */
/*                   Scripts                     */
/* ============================================= */

const APIurl = `https://randomuser.me/api/?results=12&inc=name,
picture,email,location,dob,phone&noinfo`;


function addCardstoDOM(fetchResults) {
    console.log(fetchResults);
    const cardContainer = document.getElementById('gallery');
    let cardDiv = '';
    fetchResults.forEach(result => {
        const picture = result.picture;
        const name = result.name;
        const email = result.email;
        const location = result.location;
        cardDiv += `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${location.city}, ${location.state}</p>
                </div>
            </div>
        `
    });
    cardContainer.insertAdjacentHTML("beforeend", cardDiv);
}



fetch(APIurl)
    .then(results => results.json())
    .then(results => results.results)
    .then(results => addCardstoDOM(results))
    .catch(results => Error(console.log(results)));