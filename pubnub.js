
// const UUID = `bartek`;
const UUID = prompt(`Write Player's Name`);


document.addEventListener(`keydown`, function (event) {
  if (event.key === `Enter`) buttonClick();
});

const buttonClick = () => {
  var input = document.getElementById("message-body");
  publishMessage(input.value);
  input.value = "";
};

const showMessage = (messageEvent) => {
  const msgContainer = document.createElement("div");
  msgContainer.classList.add(`msg-container`);

  const publisher = document.createElement("div");
  publisher.classList.add(`chat-publisher`, `chat-msg`);
  publisher.innerText = messageEvent.publisher + `:`;

  const message = document.createElement(`div`);
  message.classList.add(`chat-msg`);
  message.innerText = messageEvent.message.description;

  document.getElementById("messages").appendChild(msgContainer);
  msgContainer.appendChild(publisher);
  msgContainer.appendChild(message);
};

let pubnub;

const setupPubNub = () => {
  // Update this block with your publish/subscribe keys
  pubnub = new PubNub({
    publishKey: "pub-c-fd1b18ca-94ec-4583-aa88-ddccfbb0bbd7",
    subscribeKey: "sub-c-5c726282-d6ff-4602-be14-f44ce290f32f",
    userId: UUID,
  });

  // add listener
  const listener = {
    status: (statusEvent) => {
      if (statusEvent.category === "PNConnectedCategory") {
        console.log("Connected");
        // handleConnected();
      }
    },

    message: (messageEvent) => {
      // showMessage(messageEvent.message.description);
      showMessage(messageEvent);
      console.log(`MESSAGE EVENT`, messageEvent);
    },

    presence: (event) => {
      console.log(`PRESENCE EVENT`, event);
      
      if (event.action === "join") {
        console.log(`User ${UUID} has joined.`);
      } else if (event.action === "leave") {
        console.log(`User ${UUID} has left.`);
      }
    },

  };

  pubnub.addListener(listener);

  // subscribe to a channel
  pubnub.subscribe({
    channels: ["hello_world"],
    withPresence: true,
  });
};

// run after page is loaded

window.onload = setupPubNub;

// window.onload = () => {
//   console.log(`before unsubscrube`);
  
//   if (pubnub) {
//     pubnub.unsubscribe({
//       channels: ["hello_world"],
//     });
//   }
//   console.log(`After unsubscribe`);
  
//   setupPubNub();
// };



// publish message
const publishMessage = async (message) => {
  // With the right payload, you can publish a message, add a reaction to a message,
  // send a push notification, or send a small payload called a signal.
  const publishPayload = {
    channel: "hello_world",
    message: {
      title: "greeting",
      description: message,
    },
  };
  await pubnub.publish(publishPayload);
};
