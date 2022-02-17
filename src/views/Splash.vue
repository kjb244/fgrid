<template>
   <section>
       <b-container class="mt-4">
           <b-row>
               <b-col sm="12">
                   <combo-box></combo-box>
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
        created: function(){

        }
    }
</script>
