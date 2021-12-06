# Node

## Overview

- Extends Javascript, built on top of it to allow JS to run outside of the browser, for example on a server
- Node.js uses V8 to compile JS to machine code
  > V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others.
  >
  > V8 compiles and executes JavaScript source code, handles memory allocation for objects, and garbage collects objects it no longer needs. _https://v8.dev/docs_
-
-
- event driven architecture

## Core Modules (some of them)

### _http_

- launch a server, send requests

### _https_

- launch an SSL server

### _fs_

- file manipulation

### _path_

- construct paths to files on a file system that work across all operating systems

### _os_

- assists with operating system relevant information

## Http Core Module

- require http and set to a const
- use http's createServer method to return a Server object, save to a const
- use Server's listen method to listen for a request to a local port

## Request

- check out keys on the request such as
  - url, method, headers

## Response

### Headers

- on both requests and responses, http headers are added to transport metadata
- attach a header with `res.setHeader(<key>, <value>);`
- [list of supported headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
- [more reading on headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- default headers set by the browser include
  - connection, date, keep-alive, transfer-encoding

## Lifecycle

![Nodejs Program Lifecycle](/assets/nodejs_program_lifecycle.png)

### Single Threaded

- this node application event loop operates by executing single threaded javascript
- the node process uses one thread on the computer it is running on
- super fast handling, as long as there is not too much CPU intensive server-side work
- break event loop with `process.exit()`
- event loop should generally be handling event callbacks, ideally fast running code

![Single Thread, Event Loop, & Blocking Code](/assets/single_thread_event_loop_blocking_code.png)

### Event Loop

![Event Loop](/assets/event_loop.png)

### Streams & Buffers

![Streams & Buffers](/assets/streams_and_buffers.png)
