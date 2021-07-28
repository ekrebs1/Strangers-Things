
const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";


const fetchMessages = async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: builtToken,
      },
    });
    const { data } = await response.json();
    return data.messages;
  } catch (err) {
    throw err;
  }
};
const getAccount = async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const builtToken = `Bearer ${authToken}`;
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: builtToken,
      },
    });
    const data = await response.json();
    const userID = data.data._id;

    localStorage.setItem("userID", userID);
  } catch (err) {
    throw err;
  }
};
getAccount();
const renderMessages = async () => {
  const myMessageHead = `<h1>My Messages</h1>`;
  const strangersMessageHead = `<h1>Other Users Messages</h1>`;
  const messages = await fetchMessages();
  $("#msg-board").empty();
  messages.forEach((message) => {
    const messageHTML = createMsgHTML(message);
    if (message.fromUser._id === localStorage.getItem("userID")) {
      $(".sent-messages").prepend(messageHTML);
    } else {
      $(".received-messages").prepend(messageHTML);
    }
  });
  $(".sent-messages").prepend(myMessageHead);
  $(".received-messages").prepend(strangersMessageHead);
};
renderMessages();
const createMsgHTML = (message) => {
  return $(`
    <div class="card" style="width: 30rem;">
    <div class="card-body">
    <h5 class="msg-card-title">From: ${message.fromUser.username}</h5>
    <h5 class="msg-card-subject">Subject: ${message.post.title}</h5>
    <p class="msg-card-text">${message.content}</p>
    </div>
    `).data("message", message);
};
const createMsg = async (messageObj) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "POST",
      body: JSON.stringify({
        message: messageObj,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const newMessage = await response.json();
    return newMessage;
  } catch (err) {
    console.error(err);
  }
};

let currentPostMessage;

$("#new-post-form").remove();
$("#message-btn").remove();

renderPostButton();
