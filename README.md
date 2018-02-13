# ChatBot.io
Version : 0.0.1

Author : VIMARD Cyril

Js-version : ES5

## Introduction
The ChatBot.io is a primary proof and concept for test a different features for an ChatBot.

## How to use ?
* Open the index.html in your web browser and enter a word the bot for get a response.
* Say a word : "roll", "meteo", "heure" for return et specific information by the Bot.
* If you should add an other actions add this config in ai bot object :

```
  'myAction': {
      'wording': ['myAction', 'my action'],
      'action': function () {
        return 'I execute my action';
      },
    }
```
