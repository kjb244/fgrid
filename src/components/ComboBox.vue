<template>
    <section>
        <b-row>
            <b-col sm="12" md="5">
                <div class="input-wrapper" @blur="alert()" v-bind:class="{ focused: textInput.focused }">
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
                                <div>{{fruit.name}}</div>
                            </div>

                        </div>

                    </div>

                </div>
            </b-col>
        </b-row>




    </section>
</template>

<script>
    //import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
    import Vue from 'vue';
    import { FormInputPlugin } from 'bootstrap-vue';
    import { mapActions } from 'vuex';
    Vue.use(FormInputPlugin);


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
    }
    .input-wrapper.focused input[type="text"]:focus{
        outline: none;
    }
    .input-wrapper input[type="text"]{
        width: 100%;
        border: 0;
        background-color: #ececec;
        padding: 8px;
    }
    .fruit-div{
        display: flex;
        margin-top: 8px;
        padding-left: 6px;
        padding-top: 2px;
        padding-bottom: 4px;
    }
    .fruit-div img{
        margin-right: 8px;
    }
    .fruit-div:hover{
        background-color: #ececec;

    }

</style>
