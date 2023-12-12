document.addEventListener(`keydown`, function (event) {
  if (event.key === `Enter`) buttonClick();
});

////// LISTENERS FUNCTIONS ///////

const buttonClick = () => {
  var input = document.getElementById("message-body");
  publishMessage(input.value);
  input.value = "";
};

const showMessage = (messageEvent) => {
  const msgContainer = document.createElement("div");
  msgContainer.classList.add(`msg-container`);

  if (messageEvent.publisher === UUID) msgContainer.classList.add(`msg-color1`);
  if (messageEvent.publisher !== UUID) msgContainer.classList.add(`msg-color2`);


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

const handleMove = (messageEvent) => {
  tempFigureData = messageEvent.message.description;
  console.log(`tempFigureData is`, tempFigureData);

  if (hexAll[tempFigureData[3]].childElementCount > 0) {
    Figure.prototype.beat(tempFigureData[3]);
  }

  new Figure(tempFigureData[0], tempFigureData[3], tempFigureData[2], false);
  hexAll[tempFigureData[1]].firstChild.figure.removeFigure();

  console.log(`move was handeled`);
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
      }
    },

    message: (messageEvent) => {
      // showMessage(messageEvent.message.description);
      if (typeof(messageEvent.message.description) === `string`)
      showMessage(messageEvent);

      if (messageEvent.publisher !== player.name && typeof(messageEvent.message.description) !== `string`) {
        handleMove(messageEvent);
        player.changeTurn();
        player.activateTurn();

      } 
        

      console.log(`MESSAGE EVENT`, messageEvent);
    },

    presence: (event) => {
      console.log(`PRESENCE EVENT`, event);

      if (event.action === "join") {
        console.log(`User ${event.uuid} has joined.`);

        // SET PLAYER in const PLAYER //
        let color = event.occupancy === 1 ? `white` : `black`;
        let turn = event.occupancy === 1 ? true : false;
        if (event.uuid === UUID) {
          player = new Player(event.uuid, event.occupancy, color, turn);
          player.activateTurn();

          if (player.nr === 1)
            lootPlayer1title.firstChild.innerHTML = player.name + ` loot`;
          else if (player.nr === 2)
            lootPlayer2title.firstChild.innerHTML = player.name + ` loot`;
        }
      } else if (event.action === "leave") {
        console.log(`User ${event.uuid} has left.`);
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




