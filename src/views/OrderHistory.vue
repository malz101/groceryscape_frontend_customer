<template>
    <div class="order-history">
        {{orders[0]}}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    async created(){
        await this.getOrders();
    },
    computed:{
        ...mapGetters(['orders'])
    },
    methods:{
        ...mapActions(['getOrders'])
    },
    
}
</script>