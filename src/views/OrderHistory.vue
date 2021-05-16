<template>
    <div class="order-history">
        {{orders}}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    async created(){
        await this.getOrders();
    },
    methods:{
        ...mapActions(['getOrders'])
    },
    computed:{
        ...mapGetters(['orders'])
    }
}
</script>