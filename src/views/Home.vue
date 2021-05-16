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

    <div class="section">
      <div class="container">
        <div class="categories-grid">
          <div class="categories">
            <span class="categories-title">Product Categories</span>
            <ul class="categories-list">
                 <li v-for="category of Object.keys(categories).sort().slice(0,9)" :key="category">
                  <img :src="`${api}/uploads/${categories[category][0]['photo']}`" alt="Grocery Image">
                  <span>{{category}}</span>
                  <strong>{{categories[category].length}}</strong>
                </li>
            </ul>
          </div>
          <div class="slider">
            <ul class="slides">
              <li>
                <img src="../assets/breakfast1.jpg">
              </li>
              <li>
                <img src="../assets/breakfast2.jpg">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section vld-parent">
      <div v-if="localCategories!={} && !isLoading">
        <div class="container" v-for="category of Object.keys(localCategories).sort().slice(0,2)" :key="category">
          <div class="title-container">
            <h6>{{category}}</h6>
            <a href="/shop" class="btn-small">View All</a>
          </div>
          <div class="grid">
            <div class="card" v-for="grocery of localCategories[category].slice(0, 8)" :key="grocery.id">
              <div class="card-image">
                <a :href="'/item/'+grocery.id"><img :src="`${api}/uploads/${grocery['photo']}`" alt="Grocery Image"></a>
              </div>
              <div class="card-content">
                <span class="card-title"> <a :href="'/item/'+grocery.id">{{grocery.name}}</a> </span>
                <p class="units"> <i class="material-icons tiny" :class="{'in-stock':grocery['quantity']>0, 'out-of-stock':grocery['quantity']==0}">check_circle</i> <b>In stock</b>- 1 {{grocery['units']}}</p>
                <p class="price">${{grocery['cost_per_unit']}}</p>
              </div>
              <div class="card-action">
                <a v-if="!(idsInCart.includes(grocery.id))" @click="addItemToCart(grocery['id'])" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">add_shopping_cart</i> Add to Cart</a>
                <a v-else :href="'/item/'+grocery.id" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">shopping_cart</i> Read more</a>
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
      <div class="container" style="text-align: center;"><a href="/shop" class="btn show-more-btn">Show More</a></div>
    </div>
    <div class="section quality-section">
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
                <p>Best quality produce</p>
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
import config from '../config';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Home',
  data(){
    return{
      searchString:'',
      localCategories:{},
      isLoading: true,
      api:''
    }
  },
  async created(){
    this.isLoading = true;
    await this.getGroceries();
    if(this.isLoggedIn){
      await this.getCart();
    }
    this.localCategories = this.categories;
    this.api = config.api;
    this.isLoading = false;
  },
  mounted(){
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems,{duration: 3000, interval:5000});  
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

.home{
  background: var(--color-accent);
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

.categories-grid{
  display: grid;
  gap: 20px 40px;
  grid-template-columns: repeat(6, auto);

  @media screen and (max-width:900px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    .categories, .slider{
      justify-content: center;
    }
  }

  .categories{
    grid-column: 1;

    .categories-title{
      background: var(--bg-primary);
      color: #fff;
      display: block;
      padding: 1em 2em;
    }
    .categories-list{
      margin-top: 0;
      li{
        font-size: 0.8em;
        padding: 0.7em 2em;
        background: #fff;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      img{
        width: 25px;
        height: 25px;
      }
      span{
        display: inline-block;
      }
      strong{
        margin-left: auto;
        padding: 3px;
        border-radius: 3px;
        background: var(--color-accent);
      }
      li:hover{
        background: var(--color-accent);
        cursor: pointer;
        border-left: 2px solid var(--color-primary);
        strong{
          background: var(--bg-primary);
          color: #fff;
        }
      }
    }
  }
  .slider{  
    grid-column: span 5;
    min-width: 400px;
  }
}

.title-container{
  display: flex;
  align-items: center;
  a{
    margin-left: auto;
    text-transform: none;
    border-radius: 16px;
    background: green;
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
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: 0px 0px 8px 2px #eee;
    .card-image{
      width: 130px;
      height: 130px;
      img{
        height: 130px;
      }
    }
    .card-content{
      text-align: center;
      padding:16px 0px 0px 0px;
      .units{
        font-size: 10px;
        color: var(--light-color);
        display: flex;
        align-items: center;
        gap: 4px;
        justify-content: center;
      }
      .in-stock{
        color: green;
      }
      .out-of-stock{
        color: red;
      }
      .price{
        font-weight: bold;
        max-height: 80px;
        margin: 4px 0px;
        font-size: 12px;
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
        color: green;
        text-align: center;
        font-size: 12px;
        font-weight: 800;
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
        border-radius: 18px;
        margin-bottom: 8px;
        display: flex;
        height: 26px;
        align-items: center;
        color: white;
        background: green;
        font-size: 0.8em;
        padding-top: 0;
        padding-bottom: 0;
        text-transform: none;
      }
      .add-to-cart-btn:hover{
        background: var(--bg-primary);
      }
    }
  }
}

.card:hover{
  img{
    transform: scale(1.1);
  }
}

.loading{
  height: 60px;
}

.quality-section{
  background: #fff;
}

.show-more-btn{
  padding: 1em 2em;
  background: green;
  color: white;
  display: inline-flex;
  align-items: center;
  text-transform: none;
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
