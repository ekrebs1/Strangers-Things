
const userLoggedIn = () => {
  return localStorage.getItem("auth-token");
};


//logout 

$("#logout-btn").on("click", async function (e) {
  e.preventDefault();
  localStorage.clear();
  await loadPage();
});

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

//isAuthor included here
async function fetchPosts() {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(
      `${BASE_URL}/posts`,
      authToken
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: builtToken,
            },
          }
        : {}
    );
    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.log(error);
  }
}


    
const createPostHTML = (posts) => {
  return $(`
    <div class="card">
  <div class="description">
    <h2>${posts.title}</h2>
    <h5>${posts.description}</h5>
    <h1>Price: ${posts.price}</h1>
    <h3>Location: ${posts.location}</h3>
    
    
    <br>
    
    
    <form id="delete">
   ${
     posts.isAuthor
       ? ' <button type="submit" class="delete-btn"> delete </button>'
       : ""
   }
   </form>
   <form id="message">
   
   ${
    posts.isAuthor
      ? ""
      : `<div>Send Message: <input type="text" name="message" id="message-text">`
   }
  <Button type="submit" class="submit-btn">SUBMIT</button>
</form>
  
  </div>
   
 
   
    <h4>Seller: ${posts.author.username}</h4>
  </div>
</div>
`).data("data", posts);
};

const renderPosts = async () => {
  const posts = await fetchPosts();

  console.log(posts);

  posts.forEach((post) => {
    const postHTML = createPostHTML(post);
    $("main").append(postHTML);
  });
};
renderPosts();



//Back to Top Button
mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Delete

async function deletePost(postID) {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(
      `${BASE_URL}/posts/${postID}`,
      authToken
        ? 
        
        {
          method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: builtToken,
            },
          }
        : {}
    );

    const  data  = await response.json();
    return data;

    
  } catch (error) {
    console.log(error);
  }
}



$(".card").on("click", ".delete-btn", async function () {
  const postElement = $(this).closest(".card");
  const post = postElement.data(data, "posts");

  try {
    await deletePost(post._id);
    postElement.slideUp();
  } catch (error) {
    console.log(error);
  }
});


async function sendMessage(postID, message) {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

$(".submit-btn").on("click", async function (e) {
  e.preventDefault();
  const post = $(this).closest("#message.text").data("posts");
  const message = $("#message-text").val();
  $(this).closest("#message").data("post", null);
  
  try {
    await sendMessage(post._id, message);
  } catch (err) {
    throw err;
  }
});


function isMessageAuthor(message) {
  if (message.fromUser._id == localStorage.getItem("accountID")) {
    return true;
  } else {
    return false;
  }
}


//search bar
$(document).ready(function () {
  $("#mySearch").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});




