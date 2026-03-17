## List of API Endpoints
All the communication with backend AI is being carried out by 2 path: ```/chat``` and ```/chat/:sessionId```.

Example of URL for local deployment: ```http://localhost:5000/chat```
### HTTP Methods
### ```'/chat'```
General endpoint to initiate conversation or to retrieve saved sessions ids.

**```GET BASE_URL/chat```** returns a list of all sessions

no body required.

**```POST BASE_URL/chat```** sends a message to the backend to start the chat and initiate Session. Returns a stream from llm and sessionId.

Request body:

```
{
  message: "Hello World!"
}
```

Response body:

```
{
  sessionId: "asdfqweqwgqwhq",
  text: "Last chunk!",
}
.
.
.
{
  sessionId: "asdfqweqwgqwhq",
  text: "Second chunk",
}

{
  sessionId: "asdfqweqwgqwhq",
  text: "First chunk",
}
```
### ```'/chat/:sessionId'```
Endpoint to access certain session by **sessionId** parameter

**```GET BASE_URL/chat/:sessionId```** returns chat history of the specified session. No body required, only sessionId.

**```POST BASE_URL/chat/:sessionId```** sends a message to the chat by sessionId parameter and recieves the reply.

Request body:

```
{
  message: "Hello World!"
}
```

**```DELETE BASE_URL/chat/:sessionId```** deletes the session, uses sessionId parameter.
