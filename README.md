# ChatBot.io
Version : 0.0.1

Auhtors : VIMARD Cyril

Js-version : ES5

## Introduction
The ChatBot.io is a primary proof and concept for test a different futur for the ChatBot test.

## How to use ?
* Open the index.html in your web browser
* Say a word : "roll", "meteo", "heure" for return et specific information by a Bot.
* If you should add a other action in the specific action add that in ai bot object configuration :

```
  'myAction': {
      'wording': ['myAction', 'my action'],
      'action': function () {
        return 'I execute my action';
      },
    }
```
