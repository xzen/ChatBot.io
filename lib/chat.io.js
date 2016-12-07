'use strict';

/**
  * Chat.io
  */
var Chat = function Chat (login, bots) {
  this.entitys = bots;
  this.login = login;

  this.currentContact;
  this.currentMessageSend;

  this.Bots = {};

  return this;
};

/**
  * Run
  */
Chat.prototype.run = function () {
  // Initialise
  this.renderContacts(this.entitys);
  this.loadBots(this.entitys);
  this.updateHeader(this.login);

  // Events
  this.sendValue();

  return;
};

/**
  * Render Contacts
  *
  * @param {Object} entity
  * @return {Chat}
  */
Chat.prototype.renderContacts = function (entitys) {
  var dom = '';

  entitys.forEach(function(entity) {
    dom += '<li data-contact-id="' + entity.id + '" class="chat-bot-contact-card mdl-list__item mdl-list__item--three-line">';
      dom += '<span class="mdl-list__item-primary-content">';
        dom += '<i class="material-icons mdl-list__item-avatar">person</i>';
        dom += '<span>'+ entity.name + '</span>';
        dom += '<span class="mdl-list__item-text-body">' + entity.devise + '</span>';
      dom += '</span>';
    dom += '</li>';
  });

  document.body.querySelector('.chat-bot-contacts-list > ul').innerHTML = dom;

  return this;
};

/**
  * Select Contact
  */
Chat.prototype.selectContact = function () {
  var el = document.querySelector('.chat-bot-contact-card');

  el.addEventListener('click', function (e) {

  });

  return;
};

/**
  * Update Header
  *
  * @param {Object} login
  * @return {Chat}
  */
Chat.prototype.updateHeader = function (login) {
  document.body.querySelector('.chat-bot-login').innerHTML = login.name;

  return this;
};

/**
  * Message received
  *
  * @return {String} dom;
  */
Chat.prototype.renderMessageReceived = function (message) {
  var date = new Date();
  var elMsgContent = document.querySelector('.chat-bot-messages-content');
  var dom = '';

  dom += '<div class="chat-bot-message-content-receive mdl-grid">';
    dom += '<div class="chat-bot-message-receive mdl-cell mdl-cell--1-col">';
      dom += '<i class="material-icons mdl-list__item-avatar">person</i>';
    dom += '</div>';
    dom += '<div class="chat-bot-buble-message-receive mdl-cell mdl-cell--11-col">' + message + '</div>';
    dom += '<div class="chat-bot-buble-message-legend mdl-cell mdl-cell--12-col">' + date.toUTCString() + '</div>';
  dom += '</div>';
  dom += ' <div class="spacer"></div>';

  elMsgContent.innerHTML += dom;

  return this;
};

/**
  * Message send
  *
  * @param {String} message
  * @return {String} dom
  */
Chat.prototype.renderMessageSend = function (message) {
  var elMsgContent = document.querySelector('.chat-bot-messages-content');
  var dom = '';

  dom += '<div class="chat-bot-message-content-send mdl-grid">';
    dom += '<div class="chat-bot-buble-message-send mdl-cell mdl-cell--11-col">' + message + '</div>';
  dom += '</div>';
  dom += '<div class="spacer"></div>';

  elMsgContent.innerHTML += dom;

  return this;
};

/**
  * Send Value from input say
  *
  * @return {Chat}
  */
Chat.prototype.sendValue = function () {
  var el = document.querySelector('.chat-bot-send-input');
  var elMsgContent = document.querySelector('.chat-bot-messages-content');

  el.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;

    if (key === 13) {
      this.currentMessageSend = el.value;

      this.renderMessageSend(this.currentMessageSend);
      el.value = '';

      // Action Ai
      this.actionsAi(this.currentMessageSend);
    }
  }.bind(this));

  return this;
};

/**
  * Load Bots
  *
  * @param {Object} bots
  * @return {Chat}
  */
Chat.prototype.loadBots = function (bots) {
  bots.forEach(function(bot) {
    Object.assign(this.Bots, {
      [bot.id]: new Bot(bot)
    });
  }.bind(this));

  return this;
}

/**
  * Actions Ai
  *
  * @param {String} wording
  * @return {Chat}
  */
Chat.prototype.actionsAi = function (wording) {
  for(var id in this.Bots) {
    var bot = this.Bots[id];

    if (bot.run(wording)) {
      this.renderMessageReceived(bot.run(wording));
    }
  };

  return this;
}

/* RUNER CHAT.IO*/

var login = {
  'name': 'Cyril VIMARD'
};

var bots = [{
    'id': 'sansa123',
    'name': 'Sansa STARKS',
    'devise': 'L\'hiver vient.',
    'version': '1.0.0',
    'ai': {
      'meteo': {
        'wording': ['donner meteo', 'meteo'],
        'action': function () {
          return 'Il fait Froid !';
        },
      },
      'roll': {
        'wording': ['roll', 'lancer le dés'],
        'action': function () {
          var text = '';

          text += 'Je lance les des ! <br />';
          text += 'Le resulat est le : ' + Math.round(Math.random() * 10);

          return text;
        }
      }
    }
  }, {
  'id': 'tyrion456',
  'name': 'Tyrion LANNISTER',
  'devise': 'Un Lannister paye toujours ses dettes.',
  'version': '0.0.1',
  'ai': {
    'meteo': {
      'wording': ['donner meteo', 'meteo'],
      'action': function () {
        return 'Il fait Chaud !';
      },
    },
    'hours': {
      'wording': ['heure'],
       'action': function () {
        var date = new Date();

        return 'il est ' + date.toLocaleTimeString();
       }
    }
  }
}];

var chat = new Chat(login, bots);

chat.run();
