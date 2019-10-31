/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const parent = document.querySelector('.cards');

// Request for my info
let myData = axios.get('https://api.github.com/users/marfan')
 .then(res => {
    parent.prepend(userCard(res.data));
  });


// add followers tabs
const tabParent = document.createElement('div');
  tabParent.classList.add('tabs')
  tabParent.classList.add('card')
  tabParent.style.flexDirection = 'row';
  tabParent.style.flexWrap = 'wrap';
  tabParent.style.justifyContent = 'space-evenly';
  tabParent.style.textAlign = 'center';
const tabTitleContainer = document.createElement('div');
  tabTitleContainer.style.width = '100%';
const tabTitle = document.createElement('h1');
  tabTitle.textContent = 'Loyal Followers';
  tabTitle.style.fontSize = '2rem';
  tabTitle.style.marginBottom = '.5rem';
const tabSubTitle = document.createElement('h3');
  tabSubTitle.textContent = 'Click for details';
  tabSubTitle.style.fontSize = '1.5rem'
  tabSubTitle.style.marginBottom = '1rem';

  tabParent.appendChild(tabTitleContainer);
  tabTitleContainer.appendChild(tabTitle);
  tabTitleContainer.appendChild(tabSubTitle);

parent.appendChild(tabParent);


axios.get('https://api.github.com/users/MarFan/followers')
  .then(res => {
    res.data.forEach(user => {
      tabParent.appendChild(createTab(user));
    })  
  });  

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


// End add followers tabs

function userCard(obj) {
  const newCard = document.createElement('div');
    newCard.classList.add('card');
  const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('userInfoContainer');
  const userImg = document.createElement('img');
    userImg.src = obj.avatar_url;
  const newCardInfo = document.createElement('div');
    newCardInfo.classList.add('card-info');
  const nameTitle = document.createElement('h3');
    nameTitle.textContent = obj.name
    nameTitle.classList.add('name');
  const nameUser = document.createElement('p');
    nameUser.classList.add('username');
    nameUser.textContent = obj.login;
  const userLocation = document.createElement('p');
    userLocation.textContent = obj.location;
  const userProfile = document.createElement('p');
    userProfile.textContent = 'Profile: ';
  const profileLink = document.createElement('a');
    profileLink.href = obj.html_url;
    profileLink.target = "_blank";
    profileLink.textContent = 'view';
  const cardFollowers = document.createElement('p');
    cardFollowers.textContent = `Followers: ${obj.followers}`;
  const cardFollowing = document.createElement('p');
    cardFollowing.textContent = `Following: ${obj.following}`;
  const userBio = document.createElement('p');
    userBio.textContent = `Bio : ${obj.bio}`;

  const gitHubChart = document.createElement('div');
    gitHubChart.classList.add('calendar');

  newCard.appendChild(userInfoContainer);
  newCard.appendChild(gitHubChart);

  userInfoContainer.appendChild(userImg);
  userInfoContainer.appendChild(newCardInfo);
  newCardInfo.appendChild(nameTitle);
  newCardInfo.appendChild(nameUser);
  newCardInfo.appendChild(userLocation);
  newCardInfo.appendChild(userProfile);
  newCardInfo.appendChild(cardFollowers);
  newCardInfo.appendChild(cardFollowing);
  newCardInfo.appendChild(userBio);
  userProfile.appendChild(profileLink);

  GitHubCalendar(gitHubChart, obj.login, {responsive: true});

  if(obj.login !== 'MarFan'){
    const userClose = document.createElement('div');
      userClose.textContent = '\u0078';
      userClose.classList.add('close');
      newCard.appendChild(userClose);

      userClose.addEventListener('click', () => {
        TweenMax.to(newCard, .5, {autoAlpha: 0, display: 'none'})
      })
  }
  
  

  return newCard;
}


function createTab(follower){
  const followerTab = document.createElement('div')
    followerTab.classList.add('follower');
    followerTab.style.display = 'flex';
    followerTab.style.alignItems = 'center';
    followerTab.style.borderRadius = '6px';
    followerTab.style.border = '1px solid lightgray';
    followerTab.style.margin = '4px';
    followerTab.style.cursor = 'pointer';
  const followerAvatar = document.createElement('img');
    followerAvatar.src = follower.avatar_url;
    followerAvatar.style.width = '32px';
    followerAvatar.style.height = 'auto';
    
  const followerName = document.createElement('span');
    followerName.textContent = follower.login;
    followerName.style.padding = '0 12px';
    followerName.style.fontWeight = 'bold';
    followerName.style.fontSize = '14px';

  followerTab.appendChild(followerAvatar);
  followerTab.appendChild(followerName);

  followerTab.addEventListener('click', () => {
    getUserData(follower.url);
  })

  return followerTab;

}

function getUserData(url) {

  axios.get(url)
    .then(res => {
      parent.appendChild(userCard(res.data));
    });

} 