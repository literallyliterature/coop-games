(function(t){function e(e){for(var n,s,i=e[0],c=e[1],l=e[2],d=0,f=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,i=1;i<o.length;i++){var c=o[i];0!==a[c]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=o[0]))}return t}var n={},a={app:0},r=[];function s(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=n,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/coop-games/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;r.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("cd49")},"034f":function(t,e,o){"use strict";o("85ec")},1726:function(t,e,o){"use strict";o("41b2")},"41b2":function(t,e,o){},"85ec":function(t,e,o){},cd49:function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{staticStyle:{background:"#252525"}},[o("v-main",{staticClass:"mt-12"},[o("router-view")],1)],1)},r=[],s=(o("034f"),o("2877")),i=o("6544"),c=o.n(i),l=o("7496"),u=o("f6c4"),d={},f=Object(s["a"])(d,a,r,!1,null,null,null),v=f.exports;c()(f,{VApp:l["a"],VMain:u["a"]});var m=o("8c4f"),h=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-row",{staticStyle:{"max-width":"400px",margin:"auto"},attrs:{justify:"center","no-gutters":""}},["started"===t.gameStatus||"completed"===t.gameStatus?o("v-col",{attrs:{cols:"auto"}},[o("div",{staticStyle:{border:"1px solid rgba(0, 0, 0, 0.2)"}},t._l(3,(function(e){return o("v-row",{key:e,attrs:{"no-gutters":""}},t._l(3,(function(n){return o("v-col",{key:n,attrs:{cols:"auto","no-gutters":""}},[o("div",{staticStyle:{border:"1px solid rgba(0, 0, 0, 0.7)"}},t._l(3,(function(a){return o("v-row",{key:a,attrs:{"no-gutters":""}},t._l(3,(function(r){return o("v-col",{key:r},[o("SudokuCell",{ref:"cell-"+t.getRowIndex(e,a)+"-"+t.getColIndex(n,r),refInFor:!0,attrs:{cell:t.game.cells[t.getRowIndex(e,a)][t.getColIndex(n,r)],"is-focused":t.getRowIndex(e,a)===t.game.focusedRow&&t.getColIndex(n,r)===t.game.focusedCol,"is-game-complete":"completed"===t.gameStatus,mistake:t.checkIfCellHasAMistake({squareRow:e,rowIndex:a,squareCol:n,colIndex:r})},on:{focused:t.setFocusedRowAndCol,keyPressed:t.triggerKeyPress}})],1)})),1)})),1)])})),1)})),1),"started"===t.gameStatus?o("SudokuControls",{staticClass:"mt-12",attrs:{"disable-undo-button":!t.savedUndoStates.length,"in-notes-mode":t.inNotesMode},on:{"update:inNotesMode":function(e){t.inNotesMode=e},"update:in-notes-mode":function(e){t.inNotesMode=e},action:t.triggerUserAction,undo:t.undoState}}):t._e()],1):t._e(),"completed"===t.gameStatus?o("v-col",{attrs:{cols:"12"}}):t._e(),"started"!==t.gameStatus?o("v-col",{staticClass:"mt-12",attrs:{cols:"auto"}},[o("v-chip-group",{attrs:{color:"primary",column:"",mandatory:""},model:{value:t.selectedDifficulty,callback:function(e){t.selectedDifficulty=e},expression:"selectedDifficulty"}},t._l(["easy","medium","hard","expert"],(function(e){return o("v-chip",{key:e,attrs:{outlined:"",value:e},domProps:{textContent:t._s(e)}})})),1),o("v-btn",{staticClass:"mt-4",attrs:{block:"",color:"primary darken-3",small:""},on:{click:function(e){return t.initialiseGame(t.selectedDifficulty)}}},[t._v(" Start ")])],1):t._e(),"started"===t.gameStatus?o("v-col",{staticClass:"mt-6",attrs:{cols:"8"}},[o("v-btn",{attrs:{block:"",color:"grey lighten-1",outlined:""},on:{click:t.checkForMistakes}},[t._v(" Check for mistakes ")])],1):t._e(),"started"===t.gameStatus?o("v-col",{staticClass:"mt-6",attrs:{cols:"8"}},[o("v-menu",{attrs:{bottom:"","close-on-content-click":!1,"offset-y":""},on:{input:t.resetSaveInput},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[o("v-btn",t._g(t._b({attrs:{block:"",color:"grey lighten-1",outlined:""}},"v-btn",a,!1),n),[t._v(" Save states ")])]}}],null,!1,3129599276),model:{value:t.showingMenu,callback:function(e){t.showingMenu=e},expression:"showingMenu"}},[o("v-card",{attrs:{"min-width":"150px"}},[t.showNewSaveInput?o("v-form",{staticClass:"pa-2 pl-4 pb-4",on:{submit:function(e){return e.preventDefault(),t.saveState.apply(null,arguments)}}},[o("v-text-field",{attrs:{autofocus:"","hide-details":"",label:"Save state as"},on:{blur:t.saveState},model:{value:t.newSaveStateLabel,callback:function(e){t.newSaveStateLabel=e},expression:"newSaveStateLabel"}})],1):o("div",{staticClass:"text-left pa-4",class:t.savedStates.length?"pb-0":""},[o("a",{staticClass:"text-body-2",on:{click:function(e){t.showNewSaveInput=!0}}},[t._v(" Save current state ")])]),t.savedStates.length?o("v-list",t._l(t.savedStates,(function(e,n){return o("v-list-item",{key:n,on:{click:function(o){return t.restoreState(e.cells)}}},[t._v(" "+t._s(e.label)+" ")])})),1):t._e()],1)],1)],1):t._e(),o("v-fade-transition",["started"===t.gameStatus&&t.savedRedoStates.length?o("v-col",{staticClass:"mt-6",attrs:{cols:"8"}},[o("v-btn",{attrs:{block:"",color:"grey lighten-1",outlined:""},on:{click:t.redoState}},[t._v(" Redo ")])],1):t._e()],1),o("v-snackbar",{staticClass:"mb-8",attrs:{color:t.snackbarColour,bottom:""},model:{value:t.showingSnackbar,callback:function(e){t.showingSnackbar=e},expression:"showingSnackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},p=[],g=o("2909"),b=o("ade3"),S=o("5530"),w=o("d4ec"),y=o("bee2"),k=o("262e"),C=o("2caf"),x=(o("159b"),o("5b81"),o("d3b7"),o("25f0"),o("99af"),o("caad"),o("ac1f"),o("1276"),o("d81d"),o("4de4"),o("9ab4")),j=o("2ef0"),I=o("1b40"),_=o("b595");function O(t){return t%9}function R(t){return Math.floor(t/9)}function M(t){var e=O(t),o=R(t),n=Math.floor;return 3*n(o/3)+n(e/3)}function V(t){var e=t.gameString,o=t.originalsString;return e.split("").map((function(t,e){return{column:O(e),focused:!1,index:e,notedNumbers:{},original:o[e],row:R(e),showAsError:!1,square:M(e),correctValue:t,userInput:o[e]}}))}var N=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"div",staticClass:"sudoku-cell d-flex",staticStyle:{"font-size":"11px"},style:{background:t.backgroundColour},attrs:{tabindex:"0",readonly:""},on:{focus:function(e){return t.$emit("focused",{row:t.cell.row,col:t.cell.column})},keydown:function(e){return e.preventDefault(),function(e){return t.$emit("keyPressed",e)}.apply(null,arguments)}}},[" "!==t.cell.original?o("div",{staticStyle:{color:"#cacaca","font-size":"20px"},domProps:{textContent:t._s(t.cell.correctValue)}}):" "!==t.cell.userInput?o("div",{class:t.mistake?"error--text":"",staticStyle:{"font-size":"20px"},style:t.mistake?"":"color: #dadada",domProps:{textContent:t._s(t.cell.userInput)}}):o("div",{staticClass:"font-weight-bold",staticStyle:{"max-width":"35px","font-size":"9px",color:"#c2c2c2"},domProps:{textContent:t._s(t.displayedNotes)}})])},A=[],F=(o("a15b"),o("b64b"),I["b"].extend({props:{cell:{type:Object,required:!0},isFocused:{type:Boolean,default:!1},isGameComplete:{type:Boolean,default:!1},mistake:{type:Boolean,default:!1}}})),U=function(t){Object(k["a"])(o,t);var e=Object(C["a"])(o);function o(){return Object(w["a"])(this,o),e.apply(this,arguments)}return Object(y["a"])(o,[{key:"focus",value:function(){var t;null!==(t=this.$refs.div)&&void 0!==t&&t.focus&&this.$refs.div.focus()}},{key:"backgroundColour",get:function(){return this.isGameComplete?" "===this.cell.original?"#475247":"#343d34":this.readonly?this.isFocused?"#34345f":"#343434":this.isFocused?"#48486f":"#474747"}},{key:"displayedNotes",get:function(){var t=this;return Object.keys(this.cell.notedNumbers).filter((function(e){return t.cell.notedNumbers[e]})).join(" ")}},{key:"readonly",get:function(){return this.isGameComplete||" "!==this.cell.original}}]),o}(F);U=Object(x["a"])([Object(I["a"])({})],U);var D=U,q=D,P=(o("1726"),Object(s["a"])(q,N,A,!1,null,null,null)),T=P.exports,$=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-row",{attrs:{align:"center","align-content":"center",dense:"",justify:"space-between"}},[o("v-col",{staticStyle:{"max-width":"120px"},attrs:{cols:"auto"}},[o("v-row",{attrs:{dense:"",justify:"center"}},t._l(t.arrowItems,(function(e,n){return o("v-col",{key:n,attrs:{cols:"auto"}},[o("v-btn",{attrs:{icon:"",small:"",color:"grey lighten-1"},on:{click:function(o){return t.action(e.actionStr)}}},[o("v-icon",[t._v(t._s(e.icon))])],1)],1)})),1)],1),o("v-col",{staticStyle:{"max-width":"50px"},attrs:{cols:"auto"}},[o("v-row",{attrs:{justify:"center",dense:""}},[o("v-col",[o("v-btn",{attrs:{color:t.inNotesMode?"primary":"grey lighten-1",icon:""},on:{click:function(e){return t.$emit("update:in-notes-mode",!t.inNotesMode)}}},[o("v-icon",[t._v("mdi-pencil-outline")])],1)],1),o("v-col",[o("v-btn",{attrs:{icon:"",color:"grey lighten-1"},on:{click:function(e){return t.action("del")}}},[o("v-icon",[t._v("mdi-delete")])],1)],1),o("v-col",[o("v-btn",{attrs:{disabled:t.disableUndoButton,icon:"",color:"grey lighten-1"},on:{click:function(e){return t.$emit("undo")}}},[o("v-icon",[t._v("mdi-undo")])],1)],1)],1)],1),o("v-col",{staticStyle:{"max-width":"140px"},attrs:{cols:"auto"}},[o("v-row",{attrs:{dense:"",justify:"center"}},t._l(t.numItems,(function(e,n){return o("v-col",{key:n,attrs:{cols:"auto"}},[o("v-btn",{attrs:{icon:"",outlined:"",color:"grey lighten-1"},on:{click:function(o){return t.action(e.actionStr)}}},[o("v-icon",[t._v(t._s(e.icon))])],1)],1)})),1)],1)],1)},B=[],E=I["b"].extend({props:{inNotesMode:{type:Boolean,default:!1}}}),G=function(t){Object(k["a"])(o,t);var e=Object(C["a"])(o);function o(){var t;return Object(w["a"])(this,o),t=e.apply(this,arguments),t.arrowItems=[{icon:"mdi-arrow-top-left",actionStr:"up-left"},{icon:"mdi-arrow-up",actionStr:"up"},{icon:"mdi-arrow-top-right",actionStr:"up-right"},{icon:"mdi-arrow-left",actionStr:"left"},{icon:"mdi-image-filter-center-focus",actionStr:"remove-focus"},{icon:"mdi-arrow-right",actionStr:"right"},{icon:"mdi-arrow-bottom-left",actionStr:"down-left"},{icon:"mdi-arrow-down",actionStr:"down"},{icon:"mdi-arrow-bottom-right",actionStr:"down-right"}],t.numItems=[{icon:"mdi-numeric-1",actionStr:"1"},{icon:"mdi-numeric-2",actionStr:"2"},{icon:"mdi-numeric-3",actionStr:"3"},{icon:"mdi-numeric-4",actionStr:"4"},{icon:"mdi-numeric-5",actionStr:"5"},{icon:"mdi-numeric-6",actionStr:"6"},{icon:"mdi-numeric-7",actionStr:"7"},{icon:"mdi-numeric-8",actionStr:"8"},{icon:"mdi-numeric-9",actionStr:"9"}],t}return Object(y["a"])(o,[{key:"action",value:function(t){this.$emit("action",t)}}]),o}(E);G=Object(x["a"])([Object(I["a"])({props:{disableUndoButton:{type:Boolean,default:!1}}})],G);var L=G,z=L,K=o("8336"),H=o("62ad"),J=o("132d"),W=o("0fd9"),Q=Object(s["a"])(z,$,B,!1,null,null,null),X=Q.exports;c()(Q,{VBtn:K["a"],VCol:H["a"],VIcon:J["a"],VRow:W["a"]});var Y=function(t){Object(k["a"])(o,t);var e=Object(C["a"])(o);function o(){var t;return Object(w["a"])(this,o),t=e.apply(this,arguments),t.game=null,t.gameStatus="uninitialised",t.inNotesMode=!1,t.mistakesToShow=[],t.newSaveStateLabel="",t.savedStates=[],t.savedRedoStates=[],t.savedUndoStates=[],t.selectedDifficulty="easy",t.showingMenu=!1,t.showingSnackbar=!1,t.showNewSaveInput=!1,t.snackbarColour="success darken-4",t.snackbarText="Woot woot! Great job!",t}return Object(y["a"])(o,[{key:"flattenedCells",get:function(){return this.game?Object(j["flatten"])(this.game.cells):[]}},{key:"allRows",get:function(){return this.game?this.game.cells:[]}},{key:"allCols",get:function(){if(!this.game)return[];var t=[];return this.flattenedCells.forEach((function(e){t[e.column]||(t[e.column]=[]),t[e.column].push(e)})),t}},{key:"allSquares",get:function(){if(!this.game)return[];var t=[];return this.flattenedCells.forEach((function(e){t[e.square]||(t[e.square]=[]),t[e.square].push(e)})),t}},{key:"getColIndex",value:function(t,e){return 3*(t-1)+(e-1)}},{key:"getRowIndex",value:function(t,e){return 3*(t-1)+(e-1)}},{key:"initialiseGame",value:function(t){var e=Object(_["getSudoku"])(t),o=e.solution,n=e.puzzle.replaceAll("-"," "),a=V({gameString:o,originalsString:n}),r=[];a.forEach((function(t){r[t.row]||(r[t.row]=[]),r[t.row][t.column]=t})),this.gameStatus="started",this.game={cells:r,difficulty:this.selectedDifficulty,focusedCol:void 0,focusedRow:void 0,gameString:o,originalsString:n},this.savedStates=[],this.savedRedoStates=[],this.savedUndoStates=[],this.mistakesToShow=[],this.saveCurrentState("Beginning")}},{key:"redoState",value:function(){if(this.game&&this.savedRedoStates.length){this.saveUndoState(!1);var t=this.savedRedoStates.pop();t&&this.restoreState(t.cells)}}},{key:"restoreState",value:function(t){this.game&&(this.game.cells=Object(j["cloneDeep"])(t))}},{key:"resetSaveInput",value:function(){this.showNewSaveInput=!1,this.newSaveStateLabel=""}},{key:"saveState",value:function(){this.saveCurrentState(this.newSaveStateLabel),this.resetSaveInput(),this.showingMenu=!1}},{key:"saveCurrentState",value:function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.newSaveStateLabel;e&&this.savedStates.push({label:e,cells:Object(j["cloneDeep"])(null===(t=this.game)||void 0===t?void 0:t.cells)||[]})}},{key:"saveUndoState",value:function(){var t,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.savedUndoStates.push({label:(new Date).toString(),cells:Object(j["cloneDeep"])(null===(t=this.game)||void 0===t?void 0:t.cells)||[]}),e&&(this.savedRedoStates=[])}},{key:"undoState",value:function(){var t;if(this.game&&this.savedUndoStates.length){this.savedRedoStates.push({label:(new Date).toString(),cells:Object(j["cloneDeep"])(null===(t=this.game)||void 0===t?void 0:t.cells)||[]});var e=this.savedUndoStates.pop();e&&this.restoreState(e.cells)}}},{key:"setFocusedRowAndCol",value:function(t){var e,o,n,a=t.row,r=t.col;this.game&&void 0!==r&&(this.game.focusedCol=r),this.game&&void 0!==a&&(this.game.focusedRow=a);var s=this.$refs["cell-".concat(null===(e=this.game)||void 0===e?void 0:e.focusedRow,"-").concat(null===(o=this.game)||void 0===o?void 0:o.focusedCol)],i=null===s||void 0===s||null===(n=s[0])||void 0===n?void 0:n.focus;i&&i()}},{key:"triggerKeyPress",value:function(t){var e=["1","2","3","4","5","6","7","8","9"],o=t.key,n={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down",Backspace:"del",Delete:"del"};e.includes(o)&&this.triggerUserAction(o,null===t||void 0===t?void 0:t.ctrlKey),n[o]&&this.triggerUserAction(n[o])}},{key:"triggerUserAction",value:function(t,e){var o=this;if(this.game){var n=this.game,a=n.cells,r=n.focusedRow,s=n.focusedCol;if(void 0!==r&&void 0!==s){var i=a[r][s];if("remove-focus"===t)this.game.focusedCol=void 0,this.game.focusedRow=void 0;else if("left"===t)this.setFocusedRowAndCol({col:Math.max(s-1,0)});else if("up"===t)this.setFocusedRowAndCol({row:Math.max(r-1,0)});else if("right"===t)this.setFocusedRowAndCol({col:Math.min(s+1,8)});else if("down"===t)this.setFocusedRowAndCol({row:Math.min(r+1,8)});else if("del"===t)i.userInput!==i.original&&this.saveUndoState(),i.notedNumbers={},i.userInput=i.original,this.mistakesToShow.length&&this.checkForMistakes();else if(["1","2","3","4","5","6","7","8","9"].includes(t)){var c=this.inNotesMode?!e:!!e;"completed"!==this.gameStatus&&" "===i.original&&(c?" "===i.userInput&&(i.notedNumbers=Object(S["a"])(Object(S["a"])({},i.notedNumbers),{},Object(b["a"])({},t,!i.notedNumbers[t]))):i.userInput!==t&&(this.saveUndoState(),i.userInput=t,this.checkIfGameIsCompleted(),this.mistakesToShow.length&&this.checkForMistakes(),this.removeAdjacentNotes(i)))}else if(["up-left","up-right","down-left","down-right"].includes(t)){var l=t.split("-");l.forEach((function(t){return o.triggerUserAction(t,e)}))}this.setFocusedRowAndCol({})}}}},{key:"gameStarted",get:function(){return"started"===this.gameStatus}},{key:"checkIfGameIsCompleted",value:function(){this.flattenedCells.every((function(t){return t.correctValue===t.userInput}))&&(this.gameStatus="completed",this.showingSnackbar=!0)}},{key:"checkForMistakes",value:function(){var t=this.flattenedCells.filter((function(t){return t.userInput!==t.original&&t.correctValue!==t.userInput})).map((function(t){return{row:t.row,col:t.column}}));this.mistakesToShow=Object(j["uniqBy"])(t,(function(t){var e=t.row,o=t.col;return"".concat(e,"-").concat(o)}))}},{key:"checkIfCellHasAMistake",value:function(t){var e=t.squareRow,o=t.squareCol,n=t.colIndex,a=t.rowIndex,r=this.getColIndex(o,n),s=this.getRowIndex(e,a);return this.mistakesToShow.some((function(t){var e=t.row,o=t.col;return e===s&&o===r}))}},{key:"removeAdjacentNotes",value:function(t){var e=t.userInput;if(e){var o=[].concat(Object(g["a"])(this.allRows[t.row]),Object(g["a"])(this.allCols[t.column]),Object(g["a"])(this.allSquares[t.square])),n=Object(j["flattenDeep"])(o);n.forEach((function(t){t.notedNumbers[e]=!1}))}}}]),o}(I["b"]);Y=Object(x["a"])([Object(I["a"])({components:{SudokuCell:T,SudokuControls:X}})],Y);var Z=Y,tt=Z,et=o("b0af"),ot=o("cc20"),nt=o("ef9a"),at=o("0789"),rt=o("4bd4"),st=o("8860"),it=o("da13"),ct=o("e449"),lt=o("2db4"),ut=o("8654"),dt=Object(s["a"])(tt,h,p,!1,null,null,null),ft=dt.exports;c()(dt,{VBtn:K["a"],VCard:et["a"],VChip:ot["a"],VChipGroup:nt["a"],VCol:H["a"],VFadeTransition:at["b"],VForm:rt["a"],VList:st["a"],VListItem:it["a"],VMenu:ct["a"],VRow:W["a"],VSnackbar:lt["a"],VTextField:ut["a"]}),n["a"].use(m["a"]);var vt=[{path:"",name:"Sudoku",component:ft}],mt=new m["a"]({mode:"history",base:"/coop-games/",routes:vt}),ht=mt,pt=o("2f62");n["a"].use(pt["a"]);var gt=new pt["a"].Store({state:{},mutations:{},actions:{},modules:{sudoku:{namespaced:!0,mutations:{focusCell:function(t,e){var o=e.row,n=e.col;t.focusedCell={row:o,col:n}},initialiseGame:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"easy",o=Object(_["getSudoku"])(e),n=o.solution,a=o.puzzle.replaceAll("-"," ");t.gameString=n,t.originalsString=a,t.cells=V({gameString:n,originalsString:a})},setCellValue:function(t,e){var o=e.row,n=e.col,a=e.value;t.cells[9*o+n].userInput=a}},state:function(){return{cells:[],focusedCell:{row:-1,col:-1},gameString:"",originalsString:""}},getters:{complete:function(t){return t.cells.every((function(t){return t.userInput===t.correctValue}))},duplicates:function(t,e){return e.mistakes.filter((function(e){return t.cells.some((function(t){return t.userInput===e.userInput&&t.index!==e.index&&(t.column===e.column||t.row===e.row||t.square===e.square)}))}))},mistakes:function(t){return t.cells.filter((function(t){return" "===t.original&&t.userInput!==t.correctValue&&" "!==t.userInput}))},userInputsString:function(t){return t.cells.map((function(t){return t.userInput})).join("")}}}}}),bt=o("f309");n["a"].use(bt["a"]);var St=new bt["a"]({theme:{dark:!0}});n["a"].config.productionTip=!1,new n["a"]({router:ht,store:gt,vuetify:St,render:function(t){return t(v)}}).$mount("#app")}});
//# sourceMappingURL=app.8eaea1da.js.map