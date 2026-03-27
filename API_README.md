# API Documentation: Chat Endpoints

All backend AI communication is handled via two primary paths: `/chat` and `/chat/:sessionId`.

* **Local Deployment URL:** `http://localhost:5000/chat`

---

## 1. Global Chat Endpoint: `/chat`

Used to list existing sessions or initiate a brand-new conversation.

### **GET** `/chat`
**Description:** Retrieves a list of all saved session IDs.
* **Body:** Not required.
* **Response:** A list of session objects/IDs.

### **POST** `/chat`
**Description:** Sends a message to the backend to start a chat and initiate a new session. Returns an LLM stream and the generated `sessionId`.
* **Request Body:**
    ```json
    {
      "message": "Hello World!"
    }
    ```
* **Response Body (Streamed):**
    ```json
    { "sessionId": "asdf123", "text": "First chunk" }
    { "sessionId": "asdf123", "text": "Second chunk" }
    { "sessionId": "asdf123", "text": "Last chunk!" }
    ```

---

## 2. Session-Specific Endpoint: `/chat/:sessionId`

Used to interact with or manage a specific chat history.

### **GET** `/chat/:sessionId`
**Description:** Returns the full chat history of the specified session. 
* **Parameters:** `sessionId`
* **Body:** Not required.

### **POST** `/chat/:sessionId`
**Description:** Sends a message to a specific session and receives a streamed reply.
* **Parameters:** `sessionId`
* **Request Body:**
    ```json
    {
      "message": "Tell me more!"
    }
    ```

### **DELETE** `/chat/:sessionId`
**Description:** Permanently deletes the session identified by the `sessionId` parameter.
* **Parameters:** `sessionId`
* **Body:** Not required.
