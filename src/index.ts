// import { Display } from "./dun";
import { Game } from "./game";

function component() {
    let element = document.createElement("div");
    element.setAttribute("id", "darband_game");
    return element;
}

document.body.appendChild(component());

// Display.Rect.cache = true;
const game = Game.getSingleton();
game.init();