!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;var r=n(8),o=n(10),i=n(11),s=n(2),a=function(){function e(e){var t=this;this.player=null,this.tiles=[],this.monsters=[],this.items=[],this.levelID=0,this.maxLevelID=16,this.gameState="TITLE",this.renderer=e.renderingLibrary,this.ui=e.ui,this.renderer.setOnRendererReady((function(){t.ui.renderTitleScreen(t),t.render()}))}return e.getInstance=function(t){if(void 0===e.instance){if(void 0===t)throw new Error("getInstance needs to be passed the parameters when called for the fist time");e.instance=new e(t)}return e.instance},e.prototype.getRandomPassableTile=function(){return this.getRandomTile((function(e){return e.passable}))},e.prototype.getTiles=function(e){var t=s.flatten(this.tiles);return void 0===e?t:t.filter(e)},e.prototype.getPassableTiles=function(){return this.getTiles((function(e){return e.passable}))},e.prototype.setupGame=function(){var e=this,t=document.querySelector("html");if(null===t)throw Error("Please run the app in the browser environment");t.onkeydown=function(t){if("TITLE"===e.gameState)e.startGame();else if("DEAD"===e.gameState)e.ui.renderTitleScreen(e);else if("PLAYING"===e.gameState){if(void 0===e.player)return;"w"===t.key&&e.player.tryMove(0,-1),"s"===t.key&&e.player.tryMove(0,1),"a"===t.key&&e.player.tryMove(-1,0),"d"===t.key&&e.player.tryMove(1,0),"Enter"===t.key&&e.startLevel(e.levelID+1),"ArrowUp"==t.key&&e.monsters[0].tryMove(0,-1),"ArrowDown"==t.key&&e.monsters[0].tryMove(0,1),"ArrowLeft"==t.key&&e.monsters[0].tryMove(-1,0),"ArrowRight"==t.key&&e.monsters[0].tryMove(1,0),e.render()}}},e.prototype.startGame=function(){this.gameState="PLAYING",this.startLevel(0),this.render()},e.prototype.startLevel=function(e){this.levelID=e,this.generateLevel()},e.prototype.generateLevel=function(){var e=this;s.tryTo("generate map",(function(){return e.generateTiles()===e.getRandomPassableTile().getConnectedTiles().length}));var t=this.getRandomPassableTile();if(this.player=new o.Player(t),this.monsters=this.generateMonsters(),this.levelID>0&&this.getRandomPassableTile().replace(i.StaircaseUp),this.levelID<this.maxLevelID){var n=this.getRandomPassableTile().replace(i.StaircaseDown);0===this.levelID&&(n.sprite=42)}},e.prototype.generateMonsters=function(){for(var e=[],t=0,n=[[r.Wolf,r.Wolf,r.Man,r.Snake,r.Snake],[r.Kobold,r.Goblin]][this.levelID];t<n.length;t++){var o=n[t];e.push(r.createMonster(o))}return e},e.prototype.renderTiles=function(){for(var e=this.renderer.options.numTiles,t=0;t<e;t++)for(var n=0;n<e;n++)this.getTile(t,n).draw()},e.prototype.renderMonsters=function(){for(var e=0,t=this.monsters;e<t.length;e++){t[e].draw()}},e.prototype.generateTiles=function(){for(var e=0,t=[],n=this.renderer.options.numTiles,r=0;r<n;r++){t[r]=[];for(var o=0;o<n;o++)Math.random()<.3||!this.inBounds(r,o)?t[r][o]=new i.Wall(r,o):(t[r][o]=new i.Floor(r,o),e++)}return this.tiles=t,e},e.prototype.inBounds=function(e,t){var n=this.renderer.options.numTiles;return e>0&&t>0&&e<n-1&&t<n-1},e.prototype.getTile=function(e,t){return this.inBounds(e,t)?this.tiles[e][t]:new i.Wall(e,t)},e.prototype.tick=function(){for(var e,t=this.monsters.length-1;t>=0;t--)(null===(e=this.monsters[t].life)||void 0===e?void 0:e.isAlive())?this.monsters[t].update():this.monsters.splice(t,1);this.player.life.isAlive()||(this.gameState="DEAD")},e.prototype.render=function(){"PLAYING"!==this.gameState&&"DEAD"!==this.gameState||(this.renderer.clearScreen(),this.renderTiles(),this.renderMonsters(),this.player.draw(),this.ui.render(this))},e.prototype.getRandomTile=function(e){var t=s.flatten(this.tiles),n=void 0===e?t:t.filter(e);return n[s.randomRange(0,n.length-1)]},e}();t.Game=a},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.WizardLife=t.Actor=t.AI=t.Inventory=t.Life=void 0;var i=n(9),s=n(0),a=function(){function e(e,t,n,r){this.game=s.Game.getInstance(),this.hp=e,this.maxHp=t,this.defence=n,this.actor=r}return e.prototype.die=function(){this.hp=0,this.actor.getTile().monster=null,this.game.ui.msg(this.game,this.actor.getName()+" dies")},e.prototype.isAlive=function(){return this.hp>0},e.prototype.takeDamage=function(e,t,n,r){var o=t;if(!e||!this.isAlive())return o;r&&(o=r.power-this.defence),o=n.reduce((function(e,t){return e+t.value}),o);var s=this.hp;return this.hp=Math.max(0,this.hp-o),this.hp<=0&&this.die(),this.game.ui.msg(this.game,e.getName()+" attacks "+this.actor.getName()+" for "+o+". Was "+s+" is "+this.hp,i.Colors.red),o},e.prototype.heal=function(e){return this.hp=Math.min(this.maxHp,this.hp+e),this.game.ui.msg(this.game,this.actor.name+" heals by "+e),e},e}();t.Life=a;var l=function(){function e(){this.game=s.Game.getInstance(),this.items=[]}return e.prototype.getCurrentWeapon=function(){return this.weapon},e.prototype.pickItem=function(e){this.items.push(e)},e}();t.Inventory=l;!function(){function e(){}e.prototype.getName=function(){return"Some quest"}}();var u=function(){function e(e,t,n,r){void 0===t&&(t={}),void 0===n&&(n=[]),void 0===r&&(r=10),this.monster=e,this.attackCountThisTurn=0,this.pursuing=void 0,this.game=s.Game.getInstance(),this.skills=t,this.quests=n,this.xp=r,this.xpLevel=0,this.pursue(this.game.player)}return e.prototype.getSkills=function(){return this.skills},e.prototype.getQuests=function(){return this.quests},e.prototype.addQuest=function(e){this.quests.push(e)},e.prototype.act=function(){if(this.monster.stunned)return this.monster.stunned=!1,void this.game.ui.msg(this.game,this.monster.name+" is no longer stunned");this.towardPursuedActor()},e.prototype.pursue=function(e){this.pursuing=e},e.prototype.towardPursuedActor=function(){if(void 0!==this.pursuing){var e=this.monster.getAdjacentTiles();if((e=e.filter((function(e){var t=e.getActorsOnThis();return 0===t.length||t.filter((function(e){return e.isPlayer})).length>0}))).length>0){var t=this.pursuing.getTile();e.sort((function(e,n){return e.distance(t)-n.distance(t)}));var n=e[0];this.monster.tryMove(n.x-this.monster.tile.x,n.y-this.monster.tile.y)}}},e}();t.AI=u;var c=function(){function e(e,t,n,r,o,i){this.isPlayer=!1,this.stunned=!1,this.game=s.Game.getInstance(),this.tile=t,this.name=null!=e?e:"Unnamed monster",this.sprite=n,this.domains=i,void 0!==r&&(this.life=r),void 0!==o&&(this.ai=o)}return e.prototype.getName=function(){return this.name},e.prototype.getTile=function(){return this.tile},e.prototype.draw=function(){void 0!==this.sprite&&this.game.renderer.drawSprite(this.sprite,this.tile.x,this.tile.y),void 0!==this.life&&this.drawHP()},e.prototype.drawHP=function(){var e,t,n,r,o=this.game.renderer.options.tileSize,i=o*((null!==(t=null===(e=this.life)||void 0===e?void 0:e.hp)&&void 0!==t?t:0)/(null!==(r=null===(n=this.life)||void 0===n?void 0:n.maxHp)&&void 0!==r?r:1)),s=o-i;this.game.renderer.drawRect("lime",this.tile.x*o,this.tile.y*o+o-2,i,2),this.game.renderer.drawRect("red",this.tile.x*o+i,this.tile.y*o+o-2,s,2)},e.prototype.tryMove=function(e,t){var n,r=this.tile.getNeighbor(e,t);if(r.passable){if(null===r.monster)this.move(r);else if(this.isPlayer!==r.monster.isPlayer){void 0!==this.ai&&this.ai.attackCountThisTurn++,r.monster.stunned=!0,this.game.ui.msg(this.game,this.name+" stuns "+r.monster.name);null===(n=r.monster.life)||void 0===n||n.takeDamage(this,10,[])}return!0}return!1},e.prototype.move=function(e){this.game.ui.msg(this.game,this.name+" "+(this.isPlayer?"move":"moves")+" to "+e.x+", "+e.y),this.getTile().monster=null,this.tile=e,e.monster=this},e.prototype.getAdjacentTiles=function(){return this.game.getTile(this.tile.x,this.tile.y).getAdjacentPassableTiles()},e}();t.Actor=c;var h=function(e){function t(t,n){return void 0===n&&(n=200),e.call(this,n,n,3,t)||this}return o(t,e),t}(a);t.WizardLife=h},function(e,t,n){"use strict";function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=t.tryTo=t.flatten=t.randomRange=void 0,t.randomRange=r,t.flatten=function(e,n){void 0===n&&(n=[]);for(var r=0,o=e.length;r<o;r++){var i=e[r];Array.isArray(i)?t.flatten(i,n):n.push(i)}return n},t.tryTo=function(e,t){for(var n=1e3;n>0;n--)if(t())return;throw"Timeout while trying to "+e},t.shuffle=function(e){for(var t,n,o=1;o<e.length;o++)n=r(0,o),t=e[o],e[o]=e[n],e[n]=t;return e}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(l," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var s,a,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<e.length;a++){var l=[].concat(e[a]);r&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(5);var r,o=n(0),i=n(12),s=n(14);r={renderingLibrary:new i.CanvasDrawingLibrary("game",{tileSize:32,numTiles:19,uiWidth:4}),ui:new s.CanvasUI},o.Game.getInstance(r).setupGame()},function(e,t,n){var r=n(6),o=n(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function a(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],l=t.base?i[0]+t.base:i[0],u=n[l]||0,c="".concat(l," ").concat(u);n[l]=u+1;var h=a(c),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==h?(s[h].references++,s[h].updater(d)):s.push({identifier:c,updater:g(d,t),references:1}),r.push(c)}return r}function u(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var s=i(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var c,h=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=h(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function f(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,m=0;function g(e,t){var n,r,o;if(t.singleton){var i=m++;n=p||(p=u(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=u(t),r=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=a(n[r]);s[o].references--}for(var i=l(e,t),u=0;u<n.length;u++){var c=a(n[u]);0===s[c].references&&(s[c].updater(),s.splice(c,1))}n=i}}}},function(e,t,n){"use strict";n.r(t);var r=n(3),o=n.n(r)()(!1);o.push([e.i,"html,\nbody {\n    border: 0;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n}\n\n.container {\n    position: relative;\n    width: 95%;\n    height: 95%;\n}\n\n.container canvas, #game-ui {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n#game-ui {\n    display: none;\n    background-color: rgba(2, green, blue, 0.75);\n    width: 90%;\n    height: auto;\n    color: red;\n}\n\ncanvas {\n    outline: 1px solid white;\n}\n\nbody {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: indigo;\n    text-align: center;\n}\n",""]),t.default=o},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.ConfusedAI=t.ConsumerAI=t.SlowAI=t.MoveAndAttackAI=t.SimpleLife=t.createMonster=t.Snake=t.Dragon=t.Elf=t.Troll=t.Man=t.Dwarf=t.Wolf=t.Orc=t.Kobold=t.Goblin=t.Monster=void 0;var i=n(1),s=n(0),a=function(e){function t(t,n,r,o,i,s,a){void 0===i&&(i=100);var l=e.call(this,t,r,n)||this;return l.life=null!=s?s:new y(l,i),l.ai=null!=a?a:new b(l),l}return o(t,e),t.prototype.update=function(){this.game.ui.msg(this.game,this.name+" "+(this.stunned?"is":"is NOT")+" stunned"),this.ai.act()},t}(i.Actor);t.Monster=a;var l=function(e){function t(t){return e.call(this,"goblin",12,t,[0,1,2],95)||this}return o(t,e),t}(a);t.Goblin=l;var u=function(e){function t(t){return e.call(this,"kobold",15,t,[0,1,2],125)||this}return o(t,e),t}(a);t.Kobold=u;var c=function(e){function t(t){return e.call(this,"orc",14,t,[0,1,2,3],115)||this}return o(t,e),t}(a);t.Orc=c;var h=function(e){function t(t){var n=e.call(this,"wolf",11,t,[0,1,2,3,4],95)||this;return n.ai=new I(n),n}return o(t,e),t}(a);t.Wolf=h;var d=function(e){function t(t){return e.call(this,"dwarf",19,t,[7,8,9,10,11,12],120)||this}return o(t,e),t}(a);t.Dwarf=d;var f=function(e){function t(t){return e.call(this,"man",16,t,[3,4,5],100)||this}return o(t,e),t}(a);t.Man=f;var p=function(e){function t(t){var n=e.call(this,"troll",17,t,[3,4],160)||this;return n.ai=new w(n),n}return o(t,e),t}(a);t.Troll=p;var m=function(e){function t(t){return e.call(this,"elf",18,t,[0,1,2],150)||this}return o(t,e),t}(a);t.Elf=m;var g=function(e){function t(t){var n=e.call(this,"dragon",3,t,[10,11,12,13,14,15],250,void 0)||this;return n.ai=new T(n),n}return o(t,e),t}(a);t.Dragon=g;var v=function(e){function t(t){return e.call(this,"snake",13,t,[7,8,9],15)||this}return o(t,e),t}(a);t.Snake=v,t.createMonster=function(e){return new e(s.Game.getInstance().getRandomPassableTile())};var y=function(e){function t(t,n){return void 0===n&&(n=100),e.call(this,n,n,2,t)||this}return o(t,e),t}(i.Life);t.SimpleLife=y;var b=function(e){function t(t){return e.call(this,t)||this}return o(t,e),t.prototype.act=function(){this.attackCountThisTurn=0,e.prototype.act.call(this),0===this.attackCountThisTurn&&e.prototype.act.call(this)},t}(i.AI);t.MoveAndAttackAI=b;var w=function(e){function t(t,n){void 0===n&&(n=5);var r=e.call(this,t)||this;return r.speed=n,r}return o(t,e),t.prototype.act=function(){var t=this.monster.stunned;e.prototype.act.call(this),t||(this.monster.stunned=!0,this.game.ui.msg(this.game,this.monster.name+" is stunned"))},t}(i.AI);t.SlowAI=w;var T=function(e){function t(t){return e.call(this,t)||this}return o(t,e),t.prototype.eat=function(e){var t,n;null===(t=e.life)||void 0===t||t.die();var r=this.monster.life.heal((null===(n=e.life)||void 0===n?void 0:n.maxHp)/2);return this.game.ui.msg(this.game,this.monster.name+" heals by "+r+" by eating "+e.name),r>0},t.prototype.act=function(){var t=this;if(e.prototype.act.call(this),this.monster.life.hp<.75*this.monster.life.maxHp){var n=this.game.monsters.filter((function(e){return void 0!==e.life&&e.life.maxHp<t.monster.life.maxHp/2})).sort((function(e,n){return e.tile.distance(t.monster.tile)-n.tile.distance(t.monster.tile)}));this.pursue(n[0]);var r=this.monster.tile.getAdjacentActors().filter((function(e){return void 0!==e.life&&e.life.maxHp<t.monster.life.maxHp/2}));r.length>0&&this.eat(r[0])}else this.pursue(this.game.player)},t}(i.AI);t.ConsumerAI=T;var I=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.act=function(){var e=this.monster.tile.getAdjacentPassableTiles();if(e.length>0){var t=e[0].x-this.monster.tile.x,n=e[0].y-this.monster.tile.y;this.monster.tryMove(t,n)}},t}(i.AI);t.ConfusedAI=I},function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.Texts=t.Items=t.Levels=t.Colors=t.Settings=t.ActorType=void 0;var o={wall:"#c3c3c3",floor:"#323232",fire:"#e25822",ice:"#a5f2f3",poison:"#45f12c",magic:"#8b008b",chaos:"#d40f0f",wealth:"#c6c6c6",gold_metallic:"#d4af37",gold_old:"#cfb53b",gold_yellow:"#ffdf00",red:"#ff0000",white:"#ffffff",black:"#000000",orange:"#aa8811",blue:"#0000FF",purple:"#440044"};t.Colors=o,t.ActorType={MONSTER:"monster",WEAPON:"weapon",POTION:"potion"};t.Levels=[{domain:"abstracts",levelID:0,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:1,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:2,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:3,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:4,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:5,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:6,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:7,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:8,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:9,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:10,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:11,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:12,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"dungeons",levelID:13,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:14,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:15,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:16,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:17,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:18,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:19,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:20,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:21,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:22,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:23,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:24,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:25,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]},{domain:"gates",levelID:26,possibleMonsters:["goblin","kobold","orc","dwarf","man","troll","elf","dragon","snake"]}];var i=[{name:"dagger",ch:"_",col:"#dfd",speed:100,domains:[1,2,5,6]},{name:"long sword",ch:"}",col:"#2f9",speed:100,domains:[1,5,5,6]},{name:"knife",ch:"-",col:"#2f9",speed:100,domains:[1,4,5,6]},{name:"orc",ch:"+",col:"#2f9",speed:100,domains:[3,4,5,6]},{name:"orc",ch:"(",col:"#2f9",speed:100,domains:[3,4,5,6]},{name:"orc",ch:")",col:"#2f9",speed:100,domains:[3,4,5,6]},{name:"orc",ch:")",col:"#2f9",speed:100,domains:[3,4,5,6]},{name:"blue potion",ch:"_",col:o.blue,speed:100,domains:[1,3]},{name:"purple potion",ch:"_",col:o.purple,speed:100,domains:[2,3,4,5]}];t.Items=i;var s;t.Texts={en:{quotes:["He who fights monsters must take care lest he thereby\nbecome a monster","Live for today, for tomorrow never comes.","Always watch and follow nature","Where many die there is no fear of death","Deceit sleeps with greed","There is nothing sinister in sorcery, only in the hearts of men.","Only he who wanders can find new paths.","Death answers before she is asked. ","The world needs more heroes.","Better unlearned and bright, than erudite and foolish.","Better go without healing, than call for an unskilled healer.","Skill is not a heavy load to carry.","Even the best climber may fall.","There is no death for the honorable, only a change of bodies.","Straight ahead is always shortest, but not always best.","The sky is no less blue only because the blind can not see it.","Death smiles at us all. All a man can do is to smile back.","Nowhere are there more hiding places than in the heart.","What is the use of running when we are not on the right track?","When men speak ill of you, live so that nobody will believe them.","Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.","Hope is the dreams of the man awake.","He who starts a fight had better do the fighting himself.","Do not cry before you are hurt.","Cowards may die many times before their deaths.","Fear the reckoning of those you have wronged.","He who becomes a sheep will be eaten by the wolf.","The art of living well and the art of dying well is one.","Heroism consists in hanging on one minute longer.","Men brave and generous live the best lives, seldom will they sorrow; then there are fools, afraid of everything, who grumble instead of giving."],poems:[]},ru:{quotes:["He who fights monsters must take care lest he thereby\nbecome a monster","Live for today, for tomorrow never comes.","Always watch and follow nature","Where many die there is no fear of death","Deceit sleeps with greed"],poems:[]}},function(e){e.MOVE_UP="MOVE_UP",e.MOVE_RIGHT="MOVE_RIGHT",e.MOVE_DOWN="MOVE_DOWN",e.MOVE_LEFT="MOVE_LEFT",e.PICK_ITEM="PICK_ITEM",e.DROP_ITEM="DROP_ITEM",e.DROP_LAST_ITEM="DROP_LAST_ITEM",e.QUAFF="QUAFF",e.OPEN_INVENTORY="OPEN_INVENTORY",e.WIELD="WIELD",e.UNWIELD="UNWIELD",e.THROW="THROW",e.INVOKE="INVOKE",e.PRAY="PRAY"}(s||(s={}));var a={programName:"darband",version:"0.0.1",debug:!0,test:!1,mapW:36,mapH:13,windowW:36,windowH:16,logHeight:8,msg:{x:5,y:0},game:{winLevel:0,startLevel:16},keybindings:(r={},r[s.MOVE_UP]="",r[s.MOVE_RIGHT]="",r[s.MOVE_DOWN]="",r[s.MOVE_LEFT]="",r[s.PICK_ITEM]="",r[s.DROP_ITEM]="",r[s.DROP_LAST_ITEM]="",r[s.QUAFF]="",r[s.OPEN_INVENTORY]="",r[s.WIELD]="",r[s.UNWIELD]="",r[s.THROW]="",r[s.INVOKE]="",r[s.PRAY]="",r)};t.Settings=a},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.UninitializedPlayer=t.Player=void 0;var i=n(1),s=function(e){function t(t){var n=e.call(this,"You",t,0)||this;return n.life=new i.WizardLife(n,400),n.isPlayer=!0,n}return o(t,e),t.prototype.tryMove=function(t,n){return!!e.prototype.tryMove.call(this,t,n)&&(this.game.tick(),!0)},t}(i.Actor);t.Player=s;var a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t}(s);t.UninitializedPlayer=a},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.StaircaseDown=t.StaircaseUp=t.Staircase=t.Wall=t.Floor=t.Tile=void 0;var i=n(0),s=n(2),a=function(){function e(e,t,n,r,o){void 0===n&&(n=0),void 0===r&&(r=!0),void 0===o&&(o=null),this.x=e,this.y=t,this.sprite=n,this.passable=r,this.monster=o,this.game=i.Game.getInstance()}return e.prototype.draw=function(){this.game.renderer.drawSprite(this.sprite,this.x,this.y)},e.prototype.getActorsOnThis=function(){var e=this;return this.game.monsters.filter((function(t){return t.tile.x===e.x&&t.tile.y===e.y}))},e.prototype.getNeighbor=function(e,t){return this.game.getTile(this.x+e,this.y+t)},e.prototype.getAdjacentNeighbors=function(){return s.shuffle([this.getNeighbor(0,-1),this.getNeighbor(0,1),this.getNeighbor(-1,0),this.getNeighbor(1,0)])},e.prototype.getAdjacentActors=function(){return this.getAdjacentNeighbors().filter((function(e){return null!==e.monster})).map((function(e){return e.monster}))},e.prototype.getAdjacentPassableTiles=function(){return this.getAdjacentNeighbors().filter((function(e){return e.passable}))},e.prototype.distance=function(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)},e.prototype.getConnectedTiles=function(){for(var e,t=[this],n=[this];n.length;){var r=null===(e=n.pop())||void 0===e?void 0:e.getAdjacentPassableTiles().filter((function(e){return!t.includes(e)}));t=t.concat(null!=r?r:[]),n=n.concat(null!=r?r:[])}return t},e.prototype.replace=function(e){return this.game.tiles[this.x][this.y]=new e(this.x,this.y),this.game.tiles[this.x][this.y]},e}();t.Tile=a;var l=function(e){function t(t,n){return e.call(this,t,n,32,!0)||this}return o(t,e),t}(a);t.Floor=l;var u=function(e){function t(t,n){return e.call(this,t,n,33,!1)||this}return o(t,e),t}(a);t.Wall=u;var c=function(e){function t(t,n,r,o){var i=e.call(this,t,n,r,!0)||this;return i.direction=o,i}return o(t,e),t}(a);t.Staircase=c;var h=function(e){function t(t,n,r){return void 0===r&&(r=44),e.call(this,t,n,r,"UP")||this}return o(t,e),t}(c);t.StaircaseUp=h;var d=function(e){function t(t,n,r){return void 0===r&&(r=43),e.call(this,t,n,r,"DOWN")||this}return o(t,e),t}(c);t.StaircaseDown=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasDrawingLibrary=void 0;var r=n(13),o=function(){function e(e,t){var n;this.isRendererReady=!1;var r=document.getElementById(e);this.canvas=r;var o=this.canvas.getContext("2d");if(null===o)throw new Error("No matching drawing context supported");this.context=o,this.options=t,this.context.imageSmoothingEnabled=!1,this.onRendererReady=null!==(n=t.onRendererReady)&&void 0!==n?n:function(){};var i=t.tileSize,s=t.numTiles,a=t.uiWidth;r.width=i*(s+a),r.height=i*s,r.style.width=r.width+"px",r.style.height=r.height+"px",this.spritesheet=new Image,this.loadAssets()}return e.prototype.setOnRendererReady=function(e){this.isRendererReady?e():this.onRendererReady=e},e.prototype.loadAssets=function(){var e=this;this.spritesheet.src=r.default,this.spritesheet.onload=function(){e.isRendererReady=!0,e.onRendererReady()}},e.prototype.drawSprite=function(e,t,n){var r=this.context,o=this.options.tileSize,i=this.spritesheet.height/o,s=this.spritesheet.width/o,a=Math.floor(e/s)*o,l=e%i*o;r.drawImage(this.spritesheet,l,a,o,o,t*o,n*o,o,o)},e.prototype.drawRect=function(e,t,n,r,o){void 0===r&&(r=this.canvas.width),void 0===o&&(o=this.canvas.height);var i=this.context,s=i.fillStyle;i.fillStyle=e,i.fillRect(t,n,r,o),i.fillStyle=s},e.prototype.drawText=function(e,t,n,r,o){var i;this.context.fillStyle=o,this.context.font=t+"px monospace",i=n?(this.canvas.width-this.context.measureText(e).width)/2:this.canvas.width-this.options.uiWidth*this.options.tileSize,this.context.fillText(e,i,r)},e.prototype.clearScreen=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},e}();t.CanvasDrawingLibrary=o},function(e,t,n){"use strict";n.r(t),t.default=n.p+"ed154dfad390b910057308a394fa740b.png"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasUI=void 0;var r=function(){function e(){}return e.prototype.msg=function(e,t,n){console.log(t),e.renderer.drawText("Level: "+e.levelID,25,!1,40,"violet")},e.prototype.render=function(e){e.renderer.drawText("Level: "+e.levelID,25,!1,40,"violet")},e.prototype.renderTitleScreen=function(e){e.renderer.drawRect("rgba(0,0,0,.75)",0,0),e.gameState="TITLE",e.renderer.drawText("PRESS ANY KEY TO START",50,!0,500,"white")},e}();t.CanvasUI=r}]);