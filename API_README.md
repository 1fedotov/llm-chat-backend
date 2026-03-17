## List of API Endpoints
### 'chat{s}/'
General endpoint to initiate conversation or to retrieve saved sessions ids

```GET``` returns a list of all sessions

no body required.

```POST``` sends a message to the backend to start the chat and initiate Session. Returns a stream from llm and sessionId

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
### 'chat{s}/:sessionId'
Endpoint to access certain session by **sessionId** parameter

```GET``` returns chat history of the specified session. No body required, only sessionId

```POST``` sends a message to the chat by sessionId parameter and recieves the reply

Request body:

```
{
  message: "Hello World!"
}
```

```DELETE``` deletes the session, uses sessionId parameter 
