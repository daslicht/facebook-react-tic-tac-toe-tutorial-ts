/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Game_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(Game_1.Game, null), document.getElementById('container'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Board_1 = __webpack_require__(4);
	var Item = (function () {
	    function Item() {
	    }
	    return Item;
	}());
	var Game = (function (_super) {
	    __extends(Game, _super);
	    function Game() {
	        _super.call(this);
	        this.state = {
	            status: "Next Player is X",
	            squares: this.initSquares(null),
	            history: [{
	                    squares: this.initSquares(null)
	                }],
	            stepNumber: 0,
	            xIsNext: true,
	        };
	    }
	    Game.prototype.initSquares = function (value) {
	        var squares = new Array(9);
	        for (var i = 0; i < squares.length; i++) {
	            squares[i] = value;
	        }
	        return squares;
	    };
	    Game.prototype.handleClick = function (i) {
	        console.log('handleClick:', i, this.state.stepNumber);
	        var history = this.state.history;
	        var current = history[this.state.stepNumber];
	        var squares = current.squares.slice();
	        console.log('squares', squares);
	        if (this.calculateWinner(squares) || this.state.stepNumber > 9) {
	            return;
	        }
	        squares[i] = this.state.xIsNext ? 'X' : 'O';
	        // console.log('s', this.state.history)
	        history.concat(history);
	        this.setState({
	            history: history.concat([{
	                    squares: squares
	                }]),
	            stepNumber: this.state.stepNumber + 1,
	            xIsNext: !this.state.xIsNext,
	        });
	    };
	    Game.prototype.calculateWinner = function (squares) {
	        var lines = [
	            [0, 1, 2],
	            [3, 4, 5],
	            [6, 7, 8],
	            [0, 3, 6],
	            [1, 4, 7],
	            [2, 5, 8],
	            [0, 4, 8],
	            [2, 4, 6],
	        ];
	        for (var i = 0; i < lines.length; i++) {
	            var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
	            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	                return squares[a];
	            }
	        }
	        return null;
	    };
	    Game.prototype.jumpTo = function (move) {
	        console.log('move', move);
	        this.setState({
	            stepNumber: move,
	            xIsNext: (move % 2) ? false : true,
	        });
	    };
	    Game.prototype.render = function () {
	        var _this = this;
	        //console.log('s: ',if(this.state.current)
	        var history = this.state.history;
	        var current = history[this.state.stepNumber]; //this.state.stepNumber
	        var winner = this.calculateWinner(this.state.squares);
	        var status;
	        status = "Next Player is " + (this.state.xIsNext ? 'O' : 'X');
	        if (winner) {
	            this.setState({
	                status: 'Winner: ' + winner,
	                squares: this.initSquares(''),
	                history: this.initSquares(''),
	            });
	        }
	        var moves = this.state.history.map(function (step, move) {
	            var desc = move ? 'Move #' + move : 'Game start';
	            return (React.createElement("li", {key: move}, 
	                React.createElement("a", {href: "#", onClick: function () { return _this.jumpTo(move); }}, 
	                    move, 
	                    "-", 
	                    desc)
	            ));
	        });
	        return (React.createElement("div", {className: "game"}, 
	            React.createElement("div", {className: "game-board"}, 
	                React.createElement(Board_1.Board, {squares: current.squares, handleClick: this.handleClick, game: this})
	            ), 
	            React.createElement("div", {className: "game-info"}, 
	                React.createElement("div", null, current.squares), 
	                React.createElement("ol", null, moves))));
	    };
	    return Game;
	}(React.Component));
	exports.Game = Game;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Square_1 = __webpack_require__(5);
	var Item = (function () {
	    function Item() {
	    }
	    return Item;
	}());
	var Board = (function (_super) {
	    __extends(Board, _super);
	    function Board() {
	        _super.apply(this, arguments);
	    }
	    Board.prototype.renderSquare = function (i) {
	        //console.log('render board')
	        //console.log(' this.props.squares[i]: ', this.props.squares[i])
	        //return <Square value={ this.props.squares[i] } onClick={  this.props.handleClick } game={this.props.game} />
	        return React.createElement(Square_1.Square, {value: this.props.squares[i], index: i, game: this.props.game});
	    };
	    Board.prototype.render = function () {
	        return (React.createElement("div", null, 
	            React.createElement("div", {className: "status"}, 
	                "Status:", 
	                this.props.game.state.xIsNext), 
	            React.createElement("div", {className: "board-row"}, 
	                this.renderSquare(0), 
	                this.renderSquare(1), 
	                this.renderSquare(2)), 
	            React.createElement("div", {className: "board-row"}, 
	                this.renderSquare(3), 
	                this.renderSquare(4), 
	                this.renderSquare(5)), 
	            React.createElement("div", {className: "board-row"}, 
	                this.renderSquare(6), 
	                this.renderSquare(7), 
	                this.renderSquare(8))));
	    };
	    return Board;
	}(React.Component));
	exports.Board = Board;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Item = (function () {
	    function Item() {
	    }
	    return Item;
	}());
	/* stateless functional component */
	var Square = (function (_super) {
	    __extends(Square, _super);
	    function Square() {
	        _super.apply(this, arguments);
	    }
	    Square.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("button", {className: "square", onClick: function () { return _this.props.game.handleClick(_this.props.index); }}, this.props.value));
	    };
	    return Square;
	}(React.Component));
	exports.Square = Square;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map