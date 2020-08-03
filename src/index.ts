import { CanvasDrawingLibrary } from "./lib/rendering";
import { Game, GameOptions } from "./Game";
import { RenderOptions } from "./lib/interfaces";
import "./index.css";
import { CanvasUI } from "./ui/CanvasUI";

function setupGame() {
    const renderOptions: RenderOptions = {
        tileSize: 32,
        numTiles: 19,
        uiWidth: 4,
    };
    const renderingLibrary = new CanvasDrawingLibrary("game", renderOptions);
    const gameUI = new CanvasUI();
    const gameOptions: GameOptions = {
        renderingLibrary: renderingLibrary,
        ui: gameUI,
    };
    const game = Game.getInstance(gameOptions);
    game.setupGame();
}

setupGame();
