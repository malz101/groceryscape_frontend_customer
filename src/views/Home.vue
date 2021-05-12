<template>
  <div class="home">

    <!-- Not Logged In Modal -->
    <div id="not-logged-in-modal" class="modal">
      <div class="modal-content">
        <h6>You are not logged in.</h6>
        <p>Register or Log In to continue.</p>
      </div>
      <div class="modal-footer">
        <a href="/login" class="modal-close btn bg-primary">Login</a>
        <a href="#" class="modal-close btn-flat">Close</a>
      </div>
    </div>

    <div class="container">
      <div class="search-div">
            <input type="search" name="search" id="search" v-model="searchString" placeholder="Enter Search Here..." @input="search">
            <a @click="search" class="btn search-btn">Search</a>
        </div>
    </div>
    <div class="section vld-parent">
      <div v-if="localCategories!={} && !isLoading">
        <div class="container" v-for="category of Object.keys(localCategories).sort()" :key="category">
          <h6>{{category}}</h6>
          <div class="grid">
            <div class="card" v-for="grocery of localCategories[category].slice(0, 8)" :key="grocery.id">
              <div class="card-image">
                <a :href="'/item/'+grocery.id"><img src="../assets/grocery.jpg" alt="Grocery Image"></a>
              </div>
              <div class="card-content">
                <span class="card-title"> <a :href="'/item/'+grocery.id">{{grocery.name}}</a> </span>
                <p>{{grocery['cost_per_unit']}}</p>
              </div>
              <div class="card-action">
                <a v-if="!(idsInCart.includes(grocery.id))" @click="addItemToCart(grocery.id)" class="add-to-cart-btn btn-small btn-flat">Add to Cart</a>
                <a v-else href="/cart" class="add-to-cart-btn btn-small btn-flat">View Cart</a>
                <star-rating :clearable="true" :rating="0" :show-rating="false" :star-size="14" :animate="true" @rating-selected ="setRating($event, grocery.id)"></star-rating> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else >
        <div class="container loading">
          <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" />
        </div>
      </div>
    </div>

    <div class="section">
      <div class="quality-row">
        <div class="card">
          <div class="card-content">
            <div class="card-row">
              <span class="icon-span"><i class="material-icons">local_shipping</i></span>
              <div class="card-data">
                <span class="card-title"> Free & Next Day Delivery</span>
                <p>Islandwide free shipping</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-row">
              <span class="icon-span"><i class="material-icons">local_mall</i></span>
              <div class="card-data">
                <span class="card-title">100% Satisfaction Guaranteed</span>
                <p>Best quality Produce</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-row">
              <span class="icon-span"><i class="material-icons">local_offer</i></span>
              <div class="card-data">
                <span class="card-title">Great Daily Deals Discount</span>
                <p>Affordable produce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Home',
  data(){
    return{
      searchString:'',
      localCategories:{},
      isLoading: true
    }
  },
  async created(){
    this.isLoading = true;
    await this.getGroceries();
    if(this.isLoggedIn){
      await this.getCart();
    }
    this.localCategories = this.categories;
    this.isLoading = false;
  },
  mounted(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  },
  methods:{
    ...mapActions(['getGroceries', 'addToCart', 'getCart', 'rateGrocery']),
    async addItemToCart(id){
      if(this.isLoggedIn){
        const form = new FormData();
        form.set('item_id', id);
        form.set('quantity', 1)
        await this.addToCart(form);
      }
      else{
        var notLoggedInModal = document.querySelector('#not-logged-in-modal');
        let instance = M.Modal.getInstance(notLoggedInModal);

        instance.open();
      }
    },
    async setRating(rating, groceryId){
      if(this.isLoggedIn){
        let form = new FormData();
        form.set('item_id', groceryId);
        form.set('rating', rating);
        await this.rateGrocery(form);
      }
      else{
        var notLoggedInModal = document.querySelector('#not-logged-in-modal');
        let instance = M.Modal.getInstance(notLoggedInModal);

        instance.open();
      }
    },
    search(){
      let result = {}
      for(let [category, groceries] of Object.entries(this.categories)){
        for(let grocery of groceries){
          if(grocery['name'].toLowerCase().includes(this.searchString.toLowerCase())){
            if(result[category]){
              result[category].push(grocery);
            }
            else{
              result[category] = [grocery];
            }
          }
        }
        if(category.toLowerCase().includes(this.searchString.toLowerCase())){
          result[category] = groceries;
        }
      }
      this.localCategories =  result;
    }
  },
  computed:{
    ...mapGetters(['isLoggedIn','categories', 'cart', 'idsInCart']),
  },
}
</script>

<style lang="scss" scoped>
.bg-primary{
  background: var(--bg-primary);
}

.search-div{
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  a{  
    display: flex;
    align-items: center;
    box-shadow: none;
    height: 35px;
    background: var(--color-primary);
    color: #00242c;
    border-radius: 0;
  }
  a:hover{
    opacity: 0.9;
  }

  a:focus{
    border: 1px solid grey;
  }

  input[type=search]{
    width: 200px;
    background: white;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid grey;
    height: 35px;
  }
  input[type=search]:focus{
    border: 1px solid var(--color-primary);
  }
}  

.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-between;

  .card{
    width:170px;
    padding: 12px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-image{
      width: 170px;
      height: 100px;
      img:hover{
        transform: scale(1.1);
      }
    }
    .card-content{
      text-align: center;
      padding:16px 0px 0px 0px;
      p{
        font-weight: bold;
        max-height: 80px;
        font-size: 10px;
        overflow: hidden;
      }
    }

    .card-title{
      margin-bottom: 0;
      display: block;
      width: 170px;
      white-space: nowrap;
      overflow: hidden;
      a{
        color: orange;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
      }
      a:hover{
        text-decoration: underline;
      }
    }

    .card-action{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top:8px;
      padding-bottom: 8px;
      .add-to-cart-btn{
        color: orange;
        font-size: 0.8em;
      }
      .add-to-cart-btn:hover{
        background: orange;
        color: white;
      }
    }
  }
}

.loading{
  height: 60px;
}

.quality-row{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap ;

  .card-container{
    width: 70%;
  }

  .card{
    box-shadow: none;
    .card-row{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      color:  rgb(10, 71, 71);
      
      .icon-span{
        border: 1px solid rgb(10, 71, 71);;
        border-radius: 50%;
        margin-right: 8px;
      }

      i{
        font-size: 32px;
        padding: 16px;
      }
    }
    .card-data{
      display: inline;
      .card-title{
        font-size: 16px;
      }
      p{
        font-size: 12px;
      }
    }
  }
}

</style>
