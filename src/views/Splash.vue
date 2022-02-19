<template>
   <section>
       <b-container class="mt-4">
           <h1 class="text-center">Splash Page</h1>
           <b-row class="mt-4">
               <b-col sm="12" md="5" lg="4">
               <combo-box v-model="fruit"></combo-box>
               </b-col>
           </b-row>
       </b-container>

   </section>
</template>
<script>

    import ComboBox from "../components/ComboBox.vue";


    export default {
        name: 'splash',
        components: {
            ComboBox
        },
        computed:{

        },
        data(){
            return {
                fruit: '',
            }
        },
        methods:{

        },
        created: function(){

        }
    }
</script>
