<template>
    <section>
        <b-row>
            <b-col sm="12" md="5">
                <div class="input-wrapper" v-bind:class="{ focused: textInput.focused }">

                    <input type="text"
                       @focus="textInputFocused"
                       @blur="textInputBlurred"
                       @input="inputType"
                       v-model="textInput.text"
                       :placeholder="textInput.placeholder"/>

                    <div v-if="textInput.focused" class="fruit-div-parent">
                        <div  v-for="(fruit, index) in fruitData" :key="index" >
                            <div class="fruit-div" v-if="fruit.visible" @click="fruitClicked(index)">
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
    import Vue from 'vue';
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
                    focused: false,
                }
            }
        },
        computed: {

        },

        created: function(){
            this.getFruits().then((payload) => {
                const modifiedPayload = payload.map((e) =>{
                    const obj = {...e, visible: true};
                    return obj;
                });
                this.fruitData = modifiedPayload;
            });
        },
        methods:{
            ...mapActions([
                'getFruits',
            ]),
            inputType: function(){
                const text = this.textInput.text;
                this.fruitData.forEach((e) =>{
                   if (e.name.toLowerCase().includes(text.toLowerCase())){
                       e.visible=true;
                   } else {
                       e.visible = false;
                   }
                });
            },
            fruitClicked: function(index){
                const fruit = this.fruitData[index];
                this.textInput.text = fruit.name;
                this.textInput.focused = false;
            },
            textInputFocused: function(){
                this.textInput.focused=true;
                const text = this.textInput.text;
                this.fruitData.forEach((e) =>{
                    if (e.name.toLowerCase().includes(text.toLowerCase())){
                        e.visible=true;
                    } else {
                        e.visible = false;
                    }
                });
            },
            textInputBlurred: function(){
                const fruitVisible = this.fruitData.some(e => e.visible === true);
                //if we're showing any options they clicked somewhere outside the input box
                if (!fruitVisible){
                    this.textInput.focused = false;
                    this.textInput.text = '';
                } else {
                    //TODO find better way to do this
                    setTimeout((e) => {
                        if(this.textInput.text.length === 0){
                            this.textInput.focused = false;
                        }
                    },200)

                }
            }
        }
    }

</script>

<style scoped>
    .input-wrapper{

    }
    .input-wrapper.focused{
        border: 2px solid #a0a0e0;
        border-radius: 7px;
    }

    .input-wrapper.focused input[type="text"]{
        background-color: inherit;
        background: right 5% top 50% no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJZJREFUOE/t0iEKQkEUheHvLcLmAtyCWQWzxWR2CfJABKNBsJoMFl2ASS3uwmZ0E4I8GEEGxwmviTfOnfMzc84p1Jyipt4PAvaY4ZrwpoU5hq997EEbG/RxiyBNHDHGJQWozntYoYN7uNjAGSUO7+BUCgNM0cUDJyyxi7/2LcbqqaMg2GL9yZdcDyZBtEgVLgfIFvUP4Al6DhIR01DXcgAAAABJRU5ErkJggg==);
    }

    .input-wrapper.focused input[type="text"]:focus{
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

    .fruit-div:hover{
        background-color: #ececec;
    }

</style>
