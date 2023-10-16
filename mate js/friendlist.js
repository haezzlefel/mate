"use strict";

// API URL
const HOST_API_URL = "#";
const INDEX_API_URL = HOST_API_URL + "/api/v1/users";


const friends = [];


const friendList = document.querySelector("#friend-list-container");


function renderFriendList(friends) {
  
  if (!friends || !friends.length) {
    return;
  }
  
  let rawHTML = "";
  
  friends.forEach((friend) => {
    //  template 
    rawHTML += `
                <div class="col-sm-3">
                    <!-- Cards -->
                    <div class="friend-cards border-0 m-3" style="width: 16rem;">
                        <!-- Image -->
                        <img class="card-img-top border rounded-circle"
                            src="${friend.avatar}" alt="friend-image"
                            data-bs-toggle="modal" 
                            data-bs-target="#friendList" 
                            class="img-fluid"
                            data-id="${friend.id}">
                        <!-- Title -->
                        <div class="card-body m-1 p-0">
                            <h5 class="card-title text-center m-0">
                            ${friend.name} ${friend.surname}
                            </h5>
                        </div>
                    </div>
                </div>
        `;
    // 
    friendList.innerHTML = rawHTML;
  });
}

//  Modal
function displayFriendDetail(id) {
  //  modal 
  const modalTitle = document.querySelector("#modal-title");
  const modalSrc = document.querySelector("#modal-src");
  const modalEmail = document.querySelector("#modal-email");
  const modalGender = document.querySelector("#modal-gender");
  const modalAge = document.querySelector("#modal-age");
  const modalRegion = document.querySelector("#modal-region");
  const modalBirthday = document.querySelector("#modal-birthday");

  //  modal  user 
  modalTitle.textContent = ``;
  modalSrc.src = ``;
  modalEmail.textContent = ``;
  modalGender.textContent = ``;
  modalAge.textContent = ``;
  modalRegion.textContent = ``;
  modalBirthday.textContent = ``;

  //  ID 
  axios
    .get(INDEX_API_URL + `/${id}`)
    .then(function (response) {
      // API
      const data = response.data;
      //  modal 
      modalTitle.textContent = `${data.name} ${data.surname}`;
      modalSrc.src = `${data.avatar}`;
      modalEmail.textContent = `email:${data.email}`;
      modalGender.textContent = `gender:${data.gender}`;
      modalAge.textContent = `age:${data.age}`;
      modalRegion.textContent = `region:${data.region}`;
      modalBirthday.textContent = `birthday:${data.birthday}`;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// API 
axios
  .get(INDEX_API_URL)
  .then(function (response) {

    friends.push(...response.data.results);

    renderFriendList(friends);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });


friendList.addEventListener("click", function clickOnImage(event) {

  if (event.target.classList.contains("card-img-top")) {

    displayFriendDetail(Number(event.target.dataset.id));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const friendCards = document.querySelectorAll(".friend-cards");

  searchInput.addEventListener("input", function() {
      const searchTerm = searchInput.value.trim().toLowerCase();

      friendCards.forEach(card => {
          const cardTitle = card.querySelector(".card-title");
          const friendName = cardTitle.textContent.toLowerCase();
          const shouldDisplay = friendName.includes(searchTerm);

          if (shouldDisplay) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      });
  });
});
