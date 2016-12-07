'use strict';

/**
  * Bot.io
  */
var Bot = function Bot (bot) {
  this.bot = bot;

  return;
};

/**
  * Check entity arguments
  *
  * @param {Object} entity
  * @return {Bool}
  */
Bot.prototype.checkEntity = function (entity) {
  if (! entity) {
    console.warn('Bot argument is missing !');

    return false;
  }

  if (! entity.name) {
    console.warn('Bot "Name" is missing !');

    return false;
  }

  if (! entity.version) {
    console.warn('Bot "Version" is missing !');

    return false;
  }

  if (! entity.ai) {
    console.warn('Bot "Ai" is missing !');

    return false;
  }

  return true;
};

/**
  * Run
  *
  * @param {String} wording
  */
Bot.prototype.run = function (wording) {
  if (! this.checkEntity(this.bot)) {
    return;
  }

  var getBotSay = this.getAiAction(wording);

  if (! getBotSay) {
    return;
  }

  return getBotSay;
};

/**
  * Get Artificial Intelligence by Actions
  *
  * @param {String} wording
  */
Bot.prototype.getAiAction = function (wording) {
  var ai = this.bot.ai;

  for (var action in ai) {
    var actions = ai[action];

    // Get specfic action by wording
    for (var i = 0, len = actions.wording.length; i < len; i += 1) {
      if (wording == actions.wording[i]) {

        return actions.action();
      }
    }
  }

  return false;
};

/* DEMO BOT */

/**
  * Ai : Sansa Bot
  *
  * @function {meteo}
  * @function {hours}
  */
/*var botSansa = {
  'name': 'Sansa',
  'version': '1.0.0',
  'ai': {
    'meteo': {
      'wording': ['donner météo', 'météo'],
      'action': function () {
        return 'Il fait Chaud';
      },
    },
    'hours': {
      'wording': ['heure'],
       'action': function () {
         return 'il est 12:00';
       }
    }
  }
};

var bot = new Bot(botSansa);

console.log(bot.run('heure'));*/