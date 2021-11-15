const formPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Form</title></head><body><h1>Form</h1><form action="/message" method="post"><input type="text" name="message" /><button type="submit">Send</button></form></body></html>';

const helloPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Home</title></head><body><h1>Hello, world!</h1></body></html>';

module.exports = { formPage, helloPage };
