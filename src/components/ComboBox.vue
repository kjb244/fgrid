<template>
    <section>
        <b-row>
            <b-col sm="12" md="5">
                <div class="input-wrapper" :class="{ focused: textInput.focused }">

                    <input type="text"
                        ref="textbox"
                        @focus="textInputFocused"
                        @blur="textInputBlurred"
                        @input="inputType"
                        @keydown="keydownInput"
                        v-model="textInput.text"
                        :placeholder="textInput.placeholder"
                        :aria-label="textInput.ariaLabel"/>

                    <div v-if="textInput.focused" class="fruit-div-parent">
                        <div  v-for="(fruit, index) in fruitData" :key="fruit.name" >
                            <div class="fruit-div"
                                 v-show="fruit.visible"
                                 :class="{ 'keyboard-selected': fruit.selectedKeyBoard }"
                                 @click="fruitClicked(index)">
                                <img :src="fruit.icon"/>
                                <div class="fruit-name">{{fruit.name}}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </b-col>
        </b-row>
    </section>
</template>

<script>
    import { mapActions } from 'vuex';


    export default {
        name: 'ComboBox',
        components: {
        },
        data(){
            return{
                fruitData: null,
                textInput: {
                    text: '',
                    placeholder: 'Choose a Fruit:',
                    ariaLabel: 'Fruit picker input. Navigate up and down to hear suggested matches after typing in partial matches',
                    focused: false,
                }
            }
        },
        computed: {

        },
        /**
         * Run ajax call on load to get the fruits we want to show
         */
        created: function(){
            this.getFruits().then((payload) => {
                const modifiedPayload = payload.map((e) =>{
                    //add in a few attributes we use later
                    //visible is used for filtering, and selectedKeyBoard is used for down/up arrows
                    const obj = {...e, visible: true, selectedKeyBoard: false};
                    return obj;
                });
                this.fruitData = modifiedPayload;
            });
        },
        methods:{
            /**
             * From the store bring in the getFruits ajax promise
             */
            ...mapActions([
                'getFruits',
            ]),

            /**
             * Handle keydown; used for arrow up and down keys to highlight the row selected if user is using arrow keys.
             * Also used to handle the enter key if they used up/down arrows to select a fruit
             * @param event
             * @returns {void}
             */
            keydownInput: function(event){
              const { keyCode } = event;
              const downArrow = 40;
              const upArrow = 38;
              const enterKey = 13;
              //exit if they didn't hit up or down arrow
              if (!(keyCode === downArrow || keyCode === upArrow || keyCode === enterKey)) return false;

              const fruits = this.fruitData;
              const firstFruitVisible = fruits.find(e => e.visible === true);
              let fruitIndexCurrentlySelected =  fruits.findIndex(e => e.selectedKeyBoard === true && e.visible === true);

              if (keyCode === downArrow){
                  //fruit must be visible to do anything
                  if (firstFruitVisible){
                      //if first arrow down then just make the first one selected
                      if (fruitIndexCurrentlySelected === -1){
                        firstFruitVisible.selectedKeyBoard = true;
                      } else {
                          //get the next one
                          const nextFruit = fruits.find((e,i) => i > fruitIndexCurrentlySelected && e.visible === true);
                          //if there is a next fruit (aka: not on last row)
                          if (nextFruit){
                              //make current one false and next one true
                              fruits[fruitIndexCurrentlySelected].selectedKeyBoard = false;
                              nextFruit.selectedKeyBoard = true;
                          }
                      }
                  }
              } else if (keyCode === upArrow){
                  //fruit must be visible to do anything
                  if (firstFruitVisible){
                      //if first one selected and they hit up then just clear it out
                      if (fruitIndexCurrentlySelected === 0){
                          fruits[fruitIndexCurrentlySelected].selectedKeyBoard = false;
                      } else {
                          //can't use find here since it will exit with first one and we want the reverse; we will use filter in place
                          const prevFruitArr = fruits.filter((e,i) => i < fruitIndexCurrentlySelected && e.visible === true);
                          if (prevFruitArr.length){
                              //make current one false and previous one true
                              fruits[fruitIndexCurrentlySelected].selectedKeyBoard = false;
                              prevFruitArr[prevFruitArr.length-1].selectedKeyBoard = true;
                          }
                      }

                  }
              } else if (keyCode === enterKey){
                  if (fruitIndexCurrentlySelected > -1){
                      //clear any highlighted rows if they are using keyboard up/down keys
                      this.fruitData.forEach(e => e.selectedKeyBoard = false);
                      this.textInput.text = fruits[fruitIndexCurrentlySelected].name;
                      this.textInput.focused = false;
                      this.$refs.textbox.blur();

                  }
              }
            },

            /**
             * Filter fruits - if the input text is included in the fruit array then make it visible
             */
            filterFruits: function(){
                const text = this.textInput.text;
                this.fruitData.forEach((e) =>{
                    if (e.name.toLowerCase().includes(text.toLowerCase())){
                        e.visible = true;
                    } else {
                        e.visible = false;
                    }
                });
            },

            /**
             * When users types in the input filter the fruits dropdown
             */
            inputType: function(){
                //remove any selected keyboard class we have on here
                this.fruitData.forEach(e => e.selectedKeyBoard = false);
                this.filterFruits();
            },

            /**
             * If user clicks a fruit then put that one in the input box and hide the selections
             * @param index of fruit
             */
            fruitClicked: function(index){
                const fruit = this.fruitData[index];
                this.textInput.text = fruit.name;
                this.textInput.focused = false;
            },

            /**
             * If users focuses on input box then set focused and filter drop down
             */
            textInputFocused: function(){
                this.textInput.focused = true;
                this.filterFruits();
            },

            /**
             * If a user blurs on the input box then then hide the dropdown choices
             */
            textInputBlurred: function(){
                const fruitVisible = this.fruitData.some(e => e.visible === true);
                //if we're not showing any options they clicked somewhere outside the input box
                if (!fruitVisible){
                    this.textInput.focused = false;
                    this.textInput.text = '';
                } else {
                    //TODO find better way to do this - possibly can do with custom directive or vanilla js "find where they clicked"
                    //click is conflicting with blur; so I hacked it with a timeout
                    setTimeout(() => {
                        //if they don't have anything in the input box then close the dropdown
                        //if they do keep it there
                        if(this.textInput.text.length === 0){
                            //clear any highlighted rows if they are using keyboard up/down keys
                            this.fruitData.forEach(e => e.selectedKeyBoard = false);
                            this.textInput.focused = false;
                        }
                    },200)
                }
            }
        }
    }

</script>

<style scoped>
    .input-wrapper.focused{
        border: 2px solid #a0a0e0;
        border-radius: 7px;
    }

    .input-wrapper.focused input[type="text"]{
        background-color: inherit;
        background: right 5% top 50% no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJZJREFUOE/t0iEKQkEUheHvLcLmAtyCWQWzxWR2CfJABKNBsJoMFl2ASS3uwmZ0E4I8GEEGxwmviTfOnfMzc84p1Jyipt4PAvaY4ZrwpoU5hq997EEbG/RxiyBNHDHGJQWozntYoYN7uNjAGSUO7+BUCgNM0cUDJyyxi7/2LcbqqaMg2GL9yZdcDyZBtEgVLgfIFvUP4Al6DhIR01DXcgAAAABJRU5ErkJggg==);
    }

    .input-wrapper.focused input[type="text"]:focus, .input-wrapper input[type=text]:focus-visible{
        outline: none;
    }

    .input-wrapper input[type="text"]{
        width: 100%;
        border: 0;
        background: #ececec right 5% top 50% no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJZJREFUOE/t0iEKQkEUheHvLcLmAtyCWQWzxWR2CfJABKNBsJoMFl2ASS3uwmZ0E4I8GEEGxwmviTfOnfMzc84p1Jyipt4PAvaY4ZrwpoU5hq997EEbG/RxiyBNHDHGJQWozntYoYN7uNjAGSUO7+BUCgNM0cUDJyyxi7/2LcbqqaMg2GL9yZdcDyZBtEgVLgfIFvUP4Al6DhIR01DXcgAAAABJRU5ErkJggg==);
        padding: 8px;
    }

    .fruit-div{
        display: flex;
        padding: 8px 0 8px 8px;
    }

    .fruit-div img{
        margin-right: 8px;
    }

    .fruit-div .fruit-name:hover{
        cursor: context-menu;
    }

    .fruit-div:hover,  .fruit-div.keyboard-selected{
        background-color: #ececec;
    }

    .fruit-div-parent > div:nth-child(1){
        border-top: 1px solid #ececec;
    }

</style>
