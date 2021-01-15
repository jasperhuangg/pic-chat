import './App.css';
import React from "react"
import firebase from "firebase"

function App() {



  // ---- State values (Step 2)
  const [name, setName] = React.useState(null)        // name of the current user
  const [messages, setMessages] = React.useState([])  // all of the messages we are displaying

  // ---- Called after the first render (Step 3)
  React.useEffect(() => {

    // ---- Ask the user for their name
    setName(
      prompt("Please enter your name") ||
      generateID()
    )

    // ---- Subscribe to the messages collection and get them
    const unsubscribe = firebase.firestore().collection("messages")

      // ---- Sort by timestamp
      .orderBy("timestamp")

      // ---- Called whenever an update is sent by Firebase
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => doc.data())
        setMessages(messages)

        // ---- Scroll to the bottom of the messages div
        scrollToBottom()
      })

    // ---- Called when the app unmounts (prevent memory leaks)
    return () => unsubscribe()

  }, [])


  // ---- (Step 4)
  const onSend = (content) => {

    // ---- Trims any leading/trailing whitespaces off of the content string
    if (content.trim()) {
      const message = {
        sender: name,
        content: content,
        timestamp: Date.now()
      }

      // ---- Add the message to the collection
      firebase.firestore().collection("messages")
        .add(message)

      // ---- Clear the input
      document.getElementById("input").value = ""
    }
  }

  // ---- Step 1
  return (
    <div className="container__outer">
      <div className="container__inner">
        <div
          className="messages"
          id="messages"
        >
          {messages.map(message =>
            constructMessageJSX(message, name)
          )}
        </div>
        <input
          autoFocus={true}
          autoComplete={"off"}
          id="input"
          className="input"
          placeholder="Say something..."
          onFocus={scrollToBottom}

          // ---- (Step 4) (leave commented out for now)
          onKeyPress={e => {
            if (e.key === "Enter")
              onSend(e.currentTarget.value)
          }}
        />
      </div>
    </div>
  );
}

// ---- (Step 1)

/* ---------------------------------------- Utility Functions ---------------------------------------- */
/**
 * Generates a random name to use when user cancels the Enter Name prompt.
 */
const generateID = () => {

  let randomStr = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const entities = [
    "Ghost",
    "Dog",
    "Kitty",
    "Dragon",
    "Leopard",
    "Tiger",
    "Grasshopper",
    "Koala",
    "Kangaroo",
    "Beaver",
    "Octopus",
    "Panda",
    "Human",
    "Gorilla",
    "Bonobo",
    "Zombie",
    "Wombat",
    "Cucumber"
  ]
  const entity = entities[Math.floor(Math.random() * entities.length)]
  for (let i = 0; i < 8; i++ )
    randomStr.push(characters.charAt(Math.floor(Math.random() * characters.length)));
  return `Anonymous${entity}_${randomStr.join("")}`;
}

/**
 * Scrolls to the bottom of the messages container.
 */
const scrollToBottom = () => {

  const messagesDiv = document.getElementById("messages")
  messagesDiv.scrollTop = messagesDiv.scrollHeight
}

/**
 * Constructs the HTML element (aka the message bubble) for a given message.
 */
const constructMessageJSX = (message, name) => {

  const { sender, content } = message
  const messageClassStr = `message ${sender === name ? `message__self` : `message__other`}`
  return (
    <div className={messageClassStr}>
      <div className="_sender">
        {sender}
      </div>
      <div className="_content">
        {content}
      </div>
    </div>
  )
}

export default App;
